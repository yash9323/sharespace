import {dbConnection,closeConnection}from '../../config/mongoConnection.js';
import bookings from '../../config/mongoBookingsCollections.js';

// for seeding purposes 

export default async function main(ob){
    const db = await dbConnection();
    const bookingcollection = await bookings()
    let ack = await bookingcollection.insertOne(ob,{returnDocument: 'true'});
    return ack;
}