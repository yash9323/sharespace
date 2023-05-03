import express from 'express';
import flash from 'express-flash';
import methodoverride from 'method-override';
import dotenv from 'dotenv';
import passport from 'passport';
import initializepassport from './passport_config.js';
import session from 'express-session';
import add_user from './data_handler/create_user.js';
import bcrypt from 'bcrypt';
import users from './data_handler/get_users.js';
import create_listing from './data_handler/create_listing.js'
import get_listings from './data_handler/get_listings.js'
import get_listing from './data_handler/get_listing.js'
import add_booking from './data_handler/add_booking.js'
import { ObjectId } from 'mongodb';
import change_available from './data_handler/change_available.js'
import get_booking from './data_handler/get_booking.js'
import get_bookings_userid from './data_handler/get_bookings_userid.js'
import get_listings_userid from './data_handler/get_listings_userid.js'
import get_bookings_owned from './data_handler/get_bookings_owned.js'
import get_user_byid from './data_handler/get_user_byid.js';
import modify_listing from './data_handler/modify_listing.js';
import delete_listing from './data_handler/delete_listing.js';
import multer from 'multer';
import get_all_bookings_on_listingid from './data_handler/get_all_bookings_on_listingid.js'
import change_available_to_true from './data_handler/change_available_to_true.js'
import get_bookings_sorted from './data_handler/get_bookings_sorted.js'
import get_comments_for_listing from './data_handler/get_comments_for_listing.js'
import post_comment_to_listing from './data_handler/post_comment_to_listing.js'
import * as h from './helpers.js';
import post_review from './data_handler/post_review.js';
import get_reviews_for_listing from './data_handler/get_reviews_for_listing.js'

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

const upload = multer( {storage: multerStorage, fileFilter: multerFilter });

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

initializepassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)

app.get('/getreviewsforlisting/:id',authenticatedrequest,async (req,res)=>{
    let reviews = await get_reviews_for_listing(new ObjectId(req.params.id))
    res.json(reviews)
})

app.post("/postreview",authenticatedrequest,async (req,res)=>{
    let ob = {
        review:req.body.review,
        rating:req.body.rating,
        booking_id: new ObjectId(req.body.booking_id),
        listing_id: new ObjectId(req.body.listing_id),
        postedby_user: new ObjectId(req.body.postedby_user),
    }
    let ack = await post_review(ob)
    res.json("review posted")
})

app.post("/postcomment/:id",authenticatedrequest,async (req,res)=>{
    let user_data = await get_user_byid(req.user._id)
    let ob = {
        comment : req.body.comment,
        time: new Date(),
        listing_id : new ObjectId(req.params.id.trim()),
        madeby : req.user._id,
        fname : user_data.first_name,
        lname : user_data.last_name,
    }
    let postcomment = await post_comment_to_listing(ob)
    res.json("comment posted")
})

app.get('/vlisting/:id',authenticatedrequest,async (req,res)=>{
    let d = await get_listing(new ObjectId(req.params.id.trim()))
    let user_data = await get_user_byid(d.user_id)
    d.user_data = user_data
    if (req.user._id.toString() === d.user_id.toString()){
        d.allow_reserve = false
    }
    else{
        d.allow_reserve = true
    }
    res.render("view_listing.ejs",d)
})

app.get('/book/:id',authenticatedrequest,async (req,res)=>{
    let d = await get_listing(new ObjectId(req.params.id.trim()))
    res.render("book_listing.ejs",d)
})

app.get('/modifylisting/:id',authenticatedrequest,async (req,res)=>{
    let d = await get_listing(new ObjectId(req.params.id.trim()))
    res.render("modify_listing.ejs",d)
})

app.post('/deletelisting/:id',authenticatedrequest,async (req,res)=>{
    // add check only owner of listing can delete listing
    let confirm_delete = await delete_listing(new ObjectId(req.params.id.trim()))
    return res.redirect('/mylistings')
})

app.post('/modifylisting/:id',authenticatedrequest,async (req,res)=>{
    let new_details = {
        id : new ObjectId(req.params.id.trim()),
        address: req.body.address,
        description: req.body.description,
        price: req.body.price,
        length: req.body.length,
        width: req.body.width,
        height :req.body.height,
        area: req.body.area,
        volume: req.body.volume,
        available_till : req.body.available_till
    }
    let success = await modify_listing(new_details)
    res.redirect('/viewlisting/'+success.value._id.toString())
})

app.get('/viewlisting/:id',authenticatedrequest,async (req,res)=>{
    let d = await get_listing(new ObjectId(req.params.id.trim()))
    let all_bookings = await get_all_bookings_on_listingid(d._id)
    d.bookings = all_bookings
    res.render("viewuserlisting.ejs",d)
})

app.post('/makeavailable/:id',authenticatedrequest,async (req,res)=>{
    let change = await change_available_to_true(new ObjectId(req.params.id.trim()))
    res.redirect('/home')
})

app.get('/mylistings',authenticatedrequest,async (req,res)=>{
    let user_listings = await get_listings_userid(req.user._id)
    await get_bookings_sorted()
    res.render("mylistings.ejs",{data:user_listings})
})

app.get('/bookingdataofuser',authenticatedrequest,async (req,res)=>{
    let bookies = await get_bookings_userid(req.user._id)
    for (let b of bookies){
        let bb = await get_listing(b.listing_id)
        b.listing_details = bb
    }
    return res.json(bookies)
})

app.get("/viewbookings",authenticatedrequest,async (req,res)=>{
    await get_bookings_sorted()
    res.render("viewbooking.ejs")
})

app.get('/getcomments/:id',authenticatedrequest,async (req,res)=>{
    let comments = await get_comments_for_listing(new ObjectId(req.params.id))
    res.json(comments)
})

app.get('/success/:id',authenticatedrequest,async (req,res)=>{
    let booking_details = await get_booking(new ObjectId(req.params.id))
    let d = await get_listing(booking_details.listing_id)
    return res.render("booking_confirmation.ejs",{booking_details:booking_details,listing:d})
})

app.post('/bookbooking/:id',authenticatedrequest,async (req,res)=>{
    //allow booking available false other return error
    let obb = new ObjectId(req.params.id)
    let d = await get_listing(obb)
    let o = {
        bookedby_user_id: req.user._id,
        listing_id : obb,
        belongs_to : d.user_id,
        start_date : req.body.start_date,
        end_date : req.body.end_date,
        payment: req.body.payment,
        status : "ongoing"
    }
    let su = await add_booking(o)
    let dd = await change_available(obb,o.end_date)
    return res.redirect("/success/"+ new ObjectId(su.insertedId))
})

app.get("/",notauthenticatedrequest,(req, res) => {
    res.render('landing.ejs');
})

app.get("/register", notauthenticatedrequest,(req, res) => {
    res.render('register.ejs',{error:false});
})

app.post('/register', notauthenticatedrequest,async (req, res) => {
    try{
        h.fnamechecker(req.body.fname)
        h.lnamechecker(req.body.lname)
        await h.emailaddresschecker(req.body.email)
        h.passwordchecker(req.body.password)
        h.passwordchecker(req.body.confirmpassword)
        h.phonenochecker(req.body.phone_no)
        if (req.body.password !== req.body.confirmpassword) throw "Error: Password and Confirm Password not same"
    }
    catch(e){
        return res.render('register.ejs',{error:e})
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
        return res.redirect("/login")
    }
    catch(e) {
        return res.render('register.ejs',{error:e})
    }
})

app.get("/newlisting",authenticatedrequest,(req,res)=>{
    res.render("newlisting.ejs",{error:false});
})

app.post("/createlisting",authenticatedrequest,upload.single('image'),async(req,res)=>{
    console.log(req.body)
    try{
        h.addresscheker(req.body.address)
        h.descriptioncheker(req.body.description)
        h.pricechecker(req.body.price)
        h.lengthchecker(req.body.length)
        h.widthchecker(req.body.width)
        h.heightchecker(req.body.height)
        h.latchecker(req.body.lat)
        h.lonchecker(req.body.lon)
        h.areachecker(req.body.area,req.body.length,req.body.width)
        h.volumechecker(req.body.volume,req.body.length,req.body.width,req.body.height)
    }
    catch(e){
        return res.render("newlisting.ejs",{error:e})
    }
    let new_data = req.body 
    new_data.picture = req.file.filename
    new_data.user_id = req.user._id
    new_data.available = true 
    new_data.booked_till = "N/a"
    try{
        let ack = await create_listing(new_data)
        return res.redirect("/home")
    } 
    catch(e){
        return res.redirect("/newlisting")
    }
})

app.get('/login', notauthenticatedrequest,(req, res) => {
    return res.render('login.ejs',{error:false})
})

app.get('/getalllistings',authenticatedrequest,async (req,res)=>{
    let data = await get_listings()
    for (let l of data){
        let s = "/vlisting/"+ l._id.toString()
        l.link = s
    }
    res.json(data)
})

// route home returns home ejs and some user data
app.get('/home', authenticatedrequest,async (req, res) => {
    return res.render('home.ejs',{fname : req.user.first_name,lname : req.user.last_name})
})

app.post('/login',notauthenticatedrequest,passport.authenticate('login', {
    successRedirect: '/home',
    failureRedirect: '/login',
    failureFlash: true
}))

// Route Function to log user out of the session and redirects to landing page
app.delete('/logout', authenticatedrequest,(req, res) => {
    req.logOut(
        function (err) {
            if (err) {
                return next(err);
            }
        })
    return res.redirect('/')
})

// Route to handle about page return about ejs no authentication needed
app.get("/about",(req,res)=>{
    return res.render('about.ejs')
})

// Route to handle all the other enpoints just in case user tries to go here and there
app.get('*',authenticatedrequest,(req,res)=>{
    return res.redirect('/home')
})

// Function to check if user is authenticated
function authenticatedrequest(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    return res.redirect('/')
}

// Function to check if user is not authenticated
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