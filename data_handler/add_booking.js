import {dbConnection,closeConnection}from '../config/mongoConnection.js';
import bookings from '../config/mongoBookingsCollections.js';

export default async function main(ob){
    //start date check should not be less than today's date
        // end date should not be more than listing available date
        // check if payment is of the 4 types specified and type etc 
    // do input checking 
    const db = await dbConnection();
    const bookingcollection = await bookings()
    let ack = await bookingcollection.insertOne(ob,{returnDocument: 'true'});
    return ack;
}