import {dbConnection,closeConnection}from '../config/mongoConnection.js';
import bookings from '../config/mongoBookingsCollections.js';

export default async function main(ob){
    // do input checking 
    const db = await dbConnection();
    const bookingcollection = await bookings()
    let ack = await bookingcollection.insertOne(ob,{returnDocument: 'true'});
    return ack;
}