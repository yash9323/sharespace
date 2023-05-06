// import dependencies
import { dbConnection, closeConnection } from './config/mongoConnection.js';
import create_user from './data_handler/create_user.js';
import create_listing from './data_handler/create_listing.js';
import add_booking from './data_handler/add_booking.js';
import change_available from './data_handler/change_available.js';

console.log("Dropping the old database")
const db = await dbConnection();
await db.dropDatabase();

console.log("Now adding users!")
const users = [
    {
        "id": 90.88413028548936,
        "first_name": "YASH",
        "last_name": "BHUTORIA",
        "email": "yash@sharespace.com",
        "password": "$2b$10$cLE.F2LTcWw0e99XOWoxw.tTPC/nOYc6j2WrONG39C4smSF9WcrGe",
        "phone_no": "1234567890"
    },
    {
        "id": 60.704455539117184,
        "first_name": "JOHN",
        "last_name": "WICK",
        "email": "johnwick@sharespace.com",
        "password": "$2b$10$iPmDfkS6zxMOONCLEiqHM.kv5rxEEVFh108NVwZBjWxMdspgBngua",
        "phone_no": "1234567890"
    },
    {
        "id": 88.97788877430126,
        "first_name": "RYAN",
        "last_name": "REYNOLDS",
        "email": "rreynolds@sharespace.com",
        "password": "$2b$10$sTCABA4zuSAFnzHzOKjYUulD2KzvjB1OI3F/Xh5wpRv9wbi4S4cni",
        "phone_no": "9876573849"
    }
]
let useridcollection = []
for (let user of users) {
    console.log("Now Adding user :", user.first_name)
    let res = await create_user(user)
    useridcollection.push(res.insertedId)
}

const user1listings = [
    {
        "address": "28 Terrace Avenue, Apt 1F",
        "description": "Space available to store in Garage",
        "price": "25",
        "length": "10",
        "width": "20",
        "height": "10",
        "available_till": "2023-06-30",
        "area": "200",
        "volume": "2000",
        "lat": "40.7424",
        "lon": "-74.0325",
        "picture": "image-1683360569005.jpeg",
        "user_id": useridcollection[0],
        "available": true,
        "booked_till": "N/a"
    },
    {
        "address": "69 Hutton Street",
        "description": "Apt 2D, Space available in garage",
        "price": "10",
        "length": "10",
        "width": "8",
        "height": "8",
        "available_till": "2023-08-30",
        "area": "80",
        "volume": "640",
        "lat": "40.7424",
        "lon": "-74.0325",
        "picture": "image-1683361062984.jpeg",
        "user_id": useridcollection[0],
        "available": true,
        "booked_till": "N/a"
    },
    {
        "address": "77 Nelson Avenue",
        "description": "Space available in Rooftop",
        "price": "30",
        "length": "20",
        "width": "20",
        "height": "10",
        "available_till": "2023-06-28",
        "area": "400",
        "volume": "4000",
        "lat": "40.7424",
        "lon": "-74.0325",
        "picture": "image-1683361182878.jpeg",
        "user_id": useridcollection[0],
        "available": true,
        "booked_till": "N/a"
    }
]

const user2listings = [
    {
        "address": "5th avenue NY",
        "description": "Extra space in a storage room !",
        "price": "48",
        "length": "35",
        "width": "40",
        "height": "20",
        "available_till": "2023-08-31",
        "area": "1400",
        "volume": "28000",
        "lat": "40.7424",
        "lon": "-74.0325",
        "picture": "image-1683361469927.jpeg",
        "user_id": useridcollection[1],
        "available": true,
        "booked_till": "N/a"
    },
    {
        "address": "Central Avenue Apt 1F",
        "description": "Empty Space to store!",
        "price": "8",
        "length": "10",
        "width": "10",
        "height": "6",
        "available_till": "2023-06-30",
        "area": "100",
        "volume": "600",
        "lat": "40.7424",
        "lon": "-74.0325",
        "picture": "image-1683361631867.jpeg",
        "user_id": useridcollection[1],
        "available": true,
        "booked_till": "N/a"
    }
]

console.log("Now Adding listings for user 1");
let user1listingids = []
for (let listing of user1listings){
    let res = await create_listing(listing)
    user1listingids.push(res.insertedId)
}

console.log("Now Adding listings for user 2");
let user2listingids = []
for (let listing of user2listings){
    let res = await create_listing(listing)
    user2listingids.push(res.insertedId)
}

console.log("Adding Temp Bookings on user3 behalf");
const bookings = [
    {
        "bookedby_user_id": useridcollection[2],
          "listing_id": user1listingids[0],
          "belongs_to": useridcollection[0],
          "start_date": "2023-02-09",
          "end_date": "2023-04-28",
          "payment": "Venmo",
          "status": "ongoing"
    },
    {
        "bookedby_user_id": useridcollection[2],
          "listing_id": user1listingids[1],
          "belongs_to": useridcollection[0],
          "start_date": "2023-04-09",
          "end_date": "2023-07-28",
          "payment": "Cash",
          "status": "ongoing"
    }
]

for (let booking of bookings){
    let su = await add_booking(booking)
    let dd = await change_available(booking.listing_id, booking.end_date)
}

console.log("Done seeding ! Now npm start")
await closeConnection()