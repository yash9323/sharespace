import express from 'express';
import flash from 'express-flash';
import methodoverride from 'method-override';
import dotenv from 'dotenv';
import passport from 'passport';
import initializepassport from './passport_config.js';
import session from 'express-session';
import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';
import multer from 'multer';
import * as h from './helpers.js';
import add_user from './data_handler/users data functions/create_user.js';
import users_get from './data_handler/users data functions/get_users.js';
import get_user_byid from './data_handler/users data functions/get_user_byid.js';
import create_listing from './data_handler/listing data functions/create_listing.js'
import get_listings from './data_handler/listing data functions/get_listings.js'
import get_listing from './data_handler/listing data functions/get_listing.js'
import add_booking from './data_handler/bookings data functions/add_booking.js'
import change_available from './data_handler/listing data functions/change_available.js'
import get_booking from './data_handler/bookings data functions/get_booking.js'
import get_bookings_userid from './data_handler/bookings data functions/get_bookings_userid.js'
import get_listings_userid from './data_handler/listing data functions/get_listings_userid.js'
import get_bookings_owned from './data_handler/bookings data functions/get_bookings_owned.js'
import modify_listing from './data_handler/listing data functions/modify_listing.js';
import delete_listing from './data_handler/listing data functions/delete_listing.js';
import get_all_bookings_on_listingid from './data_handler/bookings data functions/get_all_bookings_on_listingid.js'
import change_available_to_true from './data_handler/listing data functions/change_available_to_true.js'
import get_bookings_sorted from './data_handler/bookings data functions/get_bookings_sorted.js'
import get_comments_for_listing from './data_handler/comment data functions/get_comments_for_listing.js'
import post_comment_to_listing from './data_handler/comment data functions/post_comment_to_listing.js'
import post_review from './data_handler/review data functions/post_review.js';
import get_reviews_for_listing from './data_handler/review data functions/get_reviews_for_listing.js';

dotenv.config();

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/')
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        cb(null, `${file.fieldname}-${Date.now()}.${ext}`)
    }
});

const multerFilter = (req, file, cb) => {
    const fileTypes = ['jpg', 'jpeg', 'png'];
    const currFiletype = file.mimetype.split('/')[1];
    if (fileTypes.includes(currFiletype)) cb(null, true);
    else cb(new Error('Please upload only a JPG or PNG file'), false);
};

let users;
const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
const app = express();
app.set('view-engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(methodoverride('_method'));
app.use(express.static("public"));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

async function refresh_users(){
    users = await users_get()
}
await refresh_users()

initializepassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)

// end point to get reviews for a listing - done
app.get('/getreviewsforlisting/:id', authenticatedrequest, async (req, res) => {
    try{
        let obb = new ObjectId(req.params.id.trim())
        if (!ObjectId.isValid(obb)) throw "Error: The Object Id is Invalid";
        let d = await get_listing(obb)
        if (d === null) throw "Error: There is no such listing that you are trying to reviews for";
        let reviews = await get_reviews_for_listing(obb)
        return res.json(reviews)
    }
    catch(e){
        return res.json(e).status(400)
    }    
})

// end point to post review - done 
app.post("/postreview", authenticatedrequest, async (req, res) => {
    try{
        let ob = {
            review: req.body.review,
            rating: req.body.rating,
            booking_id: new ObjectId(req.body.booking_id),
            listing_id: new ObjectId(req.body.listing_id),
            postedby_user: new ObjectId(req.body.postedby_user),
        }
        h.reviewchecker(req.body.review)
        h.ratingchecker(req.body.rating)
        let obb = new ObjectId(ob.listing_id)
        if (!ObjectId.isValid(obb)) throw "Error: The Object Id is Invalid";
        let d = await get_listing(obb)
        if (d === null) throw "Error: There is no such listing that you are trying to post reviews for";
        let booking = await get_booking(ob.booking_id)
        if (booking === null) throw "Error: There is no such booking that you are trying to post reviews for";
        if (booking.bookedby_user_id.toString() !== ob.postedby_user.toString())  throw "Error: You are not authorized to post a review because you have not booked it!"
        if (ob.postedby_user.toString() !== req.user._id.toString()) throw "Error: You are not authorized to post a review! you are feeding wrong information!";
        let ack = await post_review(ob)
        if (ack === null) throw 'Error: There was a issue while posting a review! internal sever error!'
        return res.json("review posted")
    }
    catch(e){
        return res.json(e).status(400)
    } 
})

// end point to post comment on a listing - done
app.post("/postcomment/:id", authenticatedrequest, async (req, res) => {
    try{
        let obb = new ObjectId(req.params.id.trim())
        if (!ObjectId.isValid(obb)) throw "Error: The Object Id is Invalid";
        let d = await get_listing(obb)
        if (d === null) throw "Error: There is no such listing that you are trying to post a comment for";
        if (d.available === false) throw "Error : there is no point posting a comment to that listing since it is booked and not visible to anyone";
        let user_data = await get_user_byid(req.user._id)
        h.commmentchecker(req.body.comment)
        let ob = {
            comment: req.body.comment,
            time: new Date(),
            listing_id: obb,
            madeby: req.user._id,
            fname: user_data.first_name,
            lname: user_data.last_name,
        }
        let postcomment = await post_comment_to_listing(ob)
        if (postcomment === null) throw "Error: there was a problem posting a comment some internal issue with mongo"
        return res.json("comment posted")
    }
    catch(e){
        return res.json(e).status(400)
    }
})

// lets you see a listing - done 
app.get('/vlisting/:id', authenticatedrequest, async (req, res) => {
    try{
        let obb = new ObjectId(req.params.id.trim())
        if (!ObjectId.isValid(obb)) throw "Error: The Object Id is Invalid";
        let d = await get_listing(obb)
        if (d === null) throw "Error: There is no such listing that you are trying to view";
        let user_data = await get_user_byid(d.user_id)
        d.user_data = user_data
        if (req.user._id.toString() === d.user_id.toString()) {
            d.allow_reserve = false
        }
        else {
            d.allow_reserve = true
        }
        return res.render("view_listing.ejs", d)
    }
    catch(e){
        return res.render("error.ejs",{error:e})
    }
})

// lets you book a listing only if it not yours - done 
app.get('/book/:id', authenticatedrequest, async (req, res) => {
    try {
        let obb = new ObjectId(req.params.id.trim())
        if (!ObjectId.isValid(obb)) throw "Error: The Object Id is Invalid";
        let d = await get_listing(obb)
        if (d === null) throw "Error: There is no such listing that you are trying to book";
        if (d.user_id.toString() === req.user._id.toString()) throw "Error: You cannot book a listing if you host it!";
        if (d.available === false) throw "Error: You are trying to book a listing that is already booked!"
        return res.render("book_listing.ejs", d)
    }
    catch (e) {
        return res.render("error.ejs", { error: e })
    }
})

// lets you modify listing only if it is hosted by you - done 
app.get('/modifylisting/:id', authenticatedrequest, async (req, res) => {
    try {
        let obb = new ObjectId(req.params.id.trim())
        if (!ObjectId.isValid(obb)) throw "Error: The Object Id is Invalid!";
        let d = await get_listing(obb)
        if (d === null) throw "Error: There is no such listing that you are trying to modify!";
        if (d.user_id.toString() !== req.user._id.toString()) throw "Error: you cannot modify a listing if you dont host it!"
        if (d.available === false) throw "Error: You are trying to modify a listing that is already booked!"
        return res.render("modify_listing.ejs", d)
    }
    catch (e) {
        return res.render("error.ejs", { error: e })
    }
})

// allows you to delete a listing if you own it - done
app.post('/deletelisting/:id', authenticatedrequest, async (req, res) => {
    try {
        let obb = new ObjectId(req.params.id.trim())
        if (!ObjectId.isValid(obb)) throw "Error: The Object Id is Invalid!";
        let d = await get_listing(obb)
        if (d === null) throw "Error: There is no such listing that you are trying to delete!";
        if (d.user_id.toString() !== req.user._id.toString()) throw "Error: You cannot delete a listing if you dont host it"
        if (d.available === false) throw "Error: You are trying to delete a listing that is already booked!"
        let confirm_delete = await delete_listing(obb)
        if (confirm_delete === null) throw "Error: The delete was unsuccessfull! Internal error!"
    }
    catch (e) {
        return res.render("error.ejs", { error: e })
    }
    return res.redirect('/mylistings')
})

// seperate page to view user listing - done
app.get('/viewlisting/:id', authenticatedrequest, async (req, res) => {
    try {
        let obb = new ObjectId(req.params.id.trim())
        if (!ObjectId.isValid(obb)) throw "Error: The Object Id is Invalid!";
        let d = await get_listing(obb)
        if (d === null) throw "Error: There is no such listing that you are trying to view!";
        if (d.user_id.toString() !== req.user._id.toString()) throw "Error: You cannot view a listing if you dont own it!"
        let all_bookings = await get_all_bookings_on_listingid(obb)
        d.bookings = all_bookings
        res.render("viewuserlisting.ejs", d)
    }
    catch (e) {
        return res.render("error.ejs", { error: e })
    }
})

// renders your listings - done
app.get('/mylistings', authenticatedrequest, async (req, res) => {
    try {
        await get_bookings_sorted()
        if (!ObjectId.isValid(req.user._id)) throw "Error: The Object Id is Invalid!";
        let user_listings = await get_listings_userid(req.user._id)
        return res.render("mylistings.ejs", { data: user_listings })
    }
    catch (e) {
        return res.render("error.ejs", { error: e })
    }
})

// endpoint to return booking data of a user - done 
app.get('/bookingdataofuser', authenticatedrequest, async (req, res) => {
    try {
        if (!ObjectId.isValid(req.user._id)) throw "Error: The Object Id is Invalid!";
        let bookies = await get_bookings_userid(req.user._id)
        for (let b of bookies) {
            let bb = await get_listing(b.listing_id)
            if (bb === null) continue
            b.listing_details = bb
        }
        return res.json(bookies)
    }
    catch (e) {
        return res.json(e).status(400)
    }
})

// views bookings of a user - done
app.get("/viewbookings", authenticatedrequest, async (req, res) => {
    await get_bookings_sorted()
    return res.render("viewbooking.ejs")
})

// end point to get comments on a listing - done
app.get('/getcomments/:id', authenticatedrequest, async (req, res) => {
    try {
        let obb = new ObjectId(req.params.id.trim())
        if (!ObjectId.isValid(obb)) throw "Error: The Object Id is Invalid!";
        let d = await get_listing(obb)
        if (d === null) throw "Error: There is no such listing that you are trying to get comments for!";
        let comments = await get_comments_for_listing(obb)
        return res.json(comments)
    }
    catch(e){
        return res.json(e).status(400)
    }
})

// to get success after booking is made - done 
app.get('/success/:id', authenticatedrequest, async (req, res) => {
    try{
        let obb = new ObjectId(req.params.id.trim())
        if (!ObjectId.isValid(obb)) throw "Error: The Object Id is Invalid!";
        let booking_details = await get_booking(obb)
        if (booking_details === null) throw "Error: There is no such booking that you are trying to get sucess page for!";
        let d = await get_listing(booking_details.listing_id)
        if (d === null) throw "Error: There is no such listing that you are trying to get success for!";
        if (booking_details.bookedby_user_id.toString() !== req.user._id.toString()) throw "Error: Trying to view success page for an unauthorized booking"
        return res.render("booking_confirmation.ejs", { booking_details: booking_details, listing: d })
    }
    catch(e){
        return res.render("error.ejs", { error: e })
    }
})

// route for register - done 
app.get("/register", notauthenticatedrequest, (req, res) => {
    return res.render('register.ejs', { error: false });
})

// post route to register a user - done 
app.post('/register', notauthenticatedrequest, async (req, res) => {
    try {
        h.fnamechecker(req.body.fname)
        h.lnamechecker(req.body.lname)
        await h.emailaddresschecker(req.body.email)
        h.passwordchecker(req.body.password)
        h.passwordchecker(req.body.confirmpassword)
        h.phonenochecker(req.body.phone_no)
        if (req.body.password !== req.body.confirmpassword) throw "Error: Password and Confirm Password not same"
    }
    catch (e) {
        return res.render('register.ejs', { error: e })
    }
    try {
        const hasedpassword = await bcrypt.hash(req.body.password, 10)
        const user_obj = {
            id: Math.random() * 100,
            first_name: req.body.fname.toUpperCase().trim(),
            last_name: req.body.lname.toUpperCase().trim(),
            email: req.body.email.toLowerCase().trim(),
            password: hasedpassword,
            phone_no: req.body.phone_no,
        };
        let ack = await add_user(user_obj);
        if (ack === null) throw "Error : Internal Server Error!"
        await refresh_users()
        return res.redirect("/login")
    }
    catch (e) {
        return res.render('register.ejs', { error: e })
    }
})

// gets you a page to post a new listing - done 
app.get("/newlisting", authenticatedrequest, (req, res) => {
    return res.render("newlisting.ejs", { error: false });
})

// lets you post a listing - Done
app.post("/createlisting", authenticatedrequest, upload.single('image'), async (req, res) => {
    try {
        h.addresscheker(req.body.address)
        h.descriptioncheker(req.body.description)
        h.pricechecker(req.body.price)
        h.lengthchecker(req.body.length)
        h.widthchecker(req.body.width)
        h.heightchecker(req.body.height)
        h.latchecker(req.body.lat)
        h.lonchecker(req.body.lon)
        h.areachecker(req.body.area, req.body.length, req.body.width)
        h.volumechecker(req.body.volume, req.body.length, req.body.width, req.body.height)
        h.availabletillcheker(req.body.available_till)
        if (req.file === undefined) throw "Error: Picture was not selected!"
        let new_data = req.body
        new_data.picture = req.file.filename
        new_data.user_id = req.user._id
        new_data.available = true
        new_data.booked_till = "N/a"
        let ack = await create_listing(new_data)
        if (ack === null) throw "Error : Internal Server Error!"
        return res.redirect("/home")
    }
    catch (e) {
        return res.render("newlisting.ejs", { error: e })
    }
})

// allows lisitng owner to modify listing details - done 
app.post('/modifylisting/:id', authenticatedrequest, async (req, res) => {
    try {
        let obb = new ObjectId(req.params.id.trim())
        if (!ObjectId.isValid(obb)) throw "Error: The Object Id is Invalid!";
        let d = await get_listing(obb)
        if (d === null) throw "Error: There is no such listing that you are trying to modify!";
        if (d.user_id.toString() !== req.user._id.toString()) throw "Error: You cannot modify a listing if you dont own it!";
        let boo = await get_all_bookings_on_listingid(obb)
        for (let l of boo){
            if (l.status === "ongoing") throw "Error: You cannot modify since it is booked and being used!";
        }
        h.addresscheker(req.body.address)
        h.descriptioncheker(req.body.description)
        h.pricechecker(req.body.price)
        h.lengthchecker(req.body.length)
        h.widthchecker(req.body.width)
        h.heightchecker(req.body.height)
        h.areachecker(req.body.area, req.body.length, req.body.width)
        h.volumechecker(req.body.volume, req.body.length, req.body.width, req.body.height)
        h.availabletillcheker(req.body.available_till)
        let new_details = {
            id: obb,
            address: req.body.address,
            description: req.body.description,
            price: req.body.price,
            length: req.body.length,
            width: req.body.width,
            height: req.body.height,
            area: req.body.area,
            volume: req.body.volume,
            available_till: req.body.available_till
        }
        let success = await modify_listing(new_details)
        if (success === null) throw "Error: Internal Server Error!"
        return res.redirect('/viewlisting/' + success.value._id.toString())   
    }
    catch(e){
        return res.render("error.ejs",{error:e});
    }
})

// allows people to book lisitng if it is not their's - done 
app.post('/bookbooking/:id', authenticatedrequest, async (req, res) => {
    try{
        let obb = new ObjectId(req.params.id.trim())
        if (!ObjectId.isValid(obb)) throw "Error: The Object Id is Invalid!";
        let d = await get_listing(obb)
        if (d === null) throw "Error: There is no such listing that you are trying to book!";
        if (d.available === false) throw "Error: You are trying to book a listing that is not available!"
        if (d.user_id.toString() === req.user._id.toString()) throw "Error: You are trying to book a listing that is yours whats the point ?"
        h.startdatechecker(req.body.start_date,d.available_till)
        h.enddatechecker(req.body.end_date,d.available_till,req.body.start_date)
        h.paymentchecker(req.body.payment)
        let o = {
            bookedby_user_id: req.user._id,
            listing_id: obb,
            belongs_to: d.user_id,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            payment: req.body.payment,
            status: "ongoing"
        }
        let su = await add_booking(o,d.available_till)
        if (su === null) throw "Error: We had trouble booking your listing ! try again"
        let dd = await change_available(obb, o.end_date)
        return res.redirect("/success/" + new ObjectId(su.insertedId))
    }
    catch(e){
        return res.render("error.ejs",{error:e});
    }
})

// renders login only for non authenticated user and server error false - done 
app.get('/login', notauthenticatedrequest, (req, res) => {
    return res.render('login.ejs', { error: false })
})

// enpoint to get listings data and send json for authenticated users - done 
app.get('/getalllistings', authenticatedrequest, async (req, res) => {
    let data = await get_listings()
    for (let l of data) {
        let s = "/vlisting/" + l._id.toString()
        l.link = s
    }
    return res.json(data)
})

// route home returns home ejs and some user data - done
app.get('/home', authenticatedrequest, async (req, res) => {
    return res.render('home.ejs', { fname: req.user.first_name, lname: req.user.last_name })
})

// post login goes to passport config does error checking, uses passport middleware function - done 
app.post('/login', notauthenticatedrequest, passport.authenticate('login', {
    successRedirect: '/home',
    failureRedirect: '/login',
    failureFlash: true
}))

// allows user to make the listing available again - done 
app.post('/makeavailable/:id', authenticatedrequest, async (req, res) => {
    try{
        let obb = new ObjectId(req.params.id.trim())
        if (!ObjectId.isValid(obb)) throw "Error: The Object Id is Invalid!";
        let d = await get_listing(obb)
        if (d === null) throw "Error: There is no such listing that you are trying to make available!";
        if (d.user_id.toString() !== req.user._id.toString()) throw "Error: you are not authorized to make this listing available"
        let boo = await get_all_bookings_on_listingid(obb)
        for (let l of boo){
            if (l.status === "ongoing") throw "Error: You cannot make it available since it is booked and being used!";
        }
        let change = await change_available_to_true(obb);
        return res.redirect('/home');
    }
    catch(e){
        return res.render("error.ejs",{error:e});
    }
})

// Route Function to log user out of the session and redirects to landing page - done
app.delete('/logout', authenticatedrequest, (req, res) => {
    req.logOut(
        function (err) {
            if (err) {
                return next(err);
            }
        })
    return res.redirect('/')
})

// route for landing - done 
app.get("/", notauthenticatedrequest, (req, res) => {
    return res.render('landing.ejs');
})

// Route to handle all the other enpoints just in case user tries to go here and there - done 
app.get('*', authenticatedrequest, (req, res) => {
    return res.redirect('/home')
})

// Function to check if user is authenticated - done 
function authenticatedrequest(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    return res.redirect('/')
}

// Function to check if user is not authenticated - done 
function notauthenticatedrequest(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/home')
    }
    next()
}

// Running the server on port 7777
app.listen(7777, () => {
    console.log("Server Running on port 7777");
})