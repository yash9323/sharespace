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

dotenv.config();

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
app.get('/getlisting/:id',checkauthenticated,async (req,res)=>{
    let d = await get_listing(new ObjectId(req.params.id.trim()))
    let user_data = await get_user_byid(d.user_id)
    d.user_data = user_data
    if (req.user._id.toString() === d.user_id.toString()){
        d.allow_reserve = false
    }
    else{
        // fetch user details to show customer
        d.allow_reserve = true
    }
    res.render("view_listing.ejs",d)
})

app.get('/book/:id',checkauthenticated,async (req,res)=>{
    let d = await get_listing(new ObjectId(req.params.id.trim()))
    res.render("book_listing.ejs",d)
})

app.get('/modifylisting/:id',checkauthenticated,async (req,res)=>{
    let d = await get_listing(new ObjectId(req.params.id.trim()))
    res.render("modify_listing.ejs",d)
})

app.post('/deletelisting/:id',checkauthenticated,async (req,res)=>{
    // add check only owner of listing can delete listing
    let confirm_delete = await delete_listing(new ObjectId(req.params.id.trim()))
    return res.redirect('/mylistings')
})

app.post('/modifylisting/:id',checkauthenticated,async (req,res)=>{
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

    res.redirect('/getlisting/'+success.value._id.toString())
})

app.get('/mylistings',checkauthenticated,async (req,res)=>{
    let user_listings = await get_listings_userid(req.user._id)
    for(let u of user_listings){
        if (u.available === false){
            let booking_details = await get_bookings_owned(u._id)
            let user_details = await get_user_byid(booking_details.
                bookedby_user_id)
            u.booking_details = booking_details
            u.user_details = user_details
        }
    }
    res.render("mylistings.ejs",{data:user_listings})
})

app.get("/viewbookings",checkauthenticated,async (req,res)=>{
    let bookies = await get_bookings_userid(req.user._id)
    for (let b of bookies){
        let bb = await get_listing(b.listing_id)
        b.listing_details = bb
    }
    res.render("viewbooking.ejs",{data:bookies})
})

app.get('/success/:id',checkauthenticated,async (req,res)=>{
    let booking_details = await get_booking(new ObjectId(req.params.id))
    let d = await get_listing(booking_details.listing_id)
    return res.render("booking_confirmation.ejs",{booking_details:booking_details,listing:d})
})

app.post('/bookbooking/:id',checkauthenticated,async (req,res)=>{
    //allow booking available false other return error
    let obb = new ObjectId(req.params.id)
    let d = await get_listing(obb)
    let o = {
        bookedby_user_id: req.user._id,
        listing_id : obb,
        belongs_to : d.user_id,
        start_date : req.body.start_date,
        end_date : req.body.end_date,
        payment: req.body.payment
    }
    let su = await add_booking(o)
    let dd = await change_available(obb)
    return res.redirect("/success/"+ new ObjectId(su.insertedId))
})

app.get("/",checknotauthenticated,(req, res) => {
    res.render('landing.ejs');
})

app.get("/register", checknotauthenticated,(req, res) => {
    res.render('register.ejs');
})

app.post('/register', checknotauthenticated,async (req, res) => {
    // do all input checking if error redirect to register again or alert
    try {
        const hasedpassword = await bcrypt.hash(req.body.password, 10)
        const user_obj = {
            id: Math.random() * 100,
            first_name: req.body.fname,
            last_name: req.body.lname,
            email: req.body.email,
            password: hasedpassword,
            phone_no: req.body.phone_no,
            rating: 0
        };
        await add_user(user_obj);
        res.redirect("/login")
    }
    catch {
        res.redirect("/register")
        console.log("error while hashing")
    }
})

app.get("/newlisting",checkauthenticated,(req,res)=>{
    res.render("newlisting.ejs");
})

app.post("/createlisting",checkauthenticated,async(req,res)=>{
    // do input checking here 
    let new_data = req.body 
    new_data.user_id = req.user._id
    new_data.available = true 
    try{
        let ack = await create_listing(new_data)
        return res.redirect("/home")
    } 
    catch(e){
        return res.redirect("/newlisting")
    }
})

app.get('/login', checknotauthenticated,(req, res) => {
    res.render('login.ejs')
})

app.get('/home', checkauthenticated,async (req, res) => {
    let data = await get_listings()
    for (let l of data){
        let s = "/getlisting/"+ l._id.toString()
        l.link = s
    }
    res.render('home.ejs',{data:data,fname : req.user.first_name,lname : req.user.last_name})
})


app.post('/login',checknotauthenticated,passport.authenticate('login', {
    successRedirect: '/home',
    failureRedirect: '/login',
    failureFlash: true
}))

app.delete('/logout', checkauthenticated,(req, res) => {
    req.logOut(
        function (err) {
            if (err) {
                return next(err);
            }
        })
    return res.redirect('/')
})

function checkauthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    return res.redirect('/')
}

function checknotauthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/home')
    }
    next()
}

app.listen(7777, () => {
    console.log("Server Running on port 7777");
})