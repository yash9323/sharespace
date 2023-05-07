import {dbConnection,closeConnection}from '../../config/mongoConnection.js';
import bookings from '../../config/mongoBookingsCollections.js';
import * as h from '../../helpers.js';

export default async function main(id){
    h.objectidchecker(id)
    const db = await dbConnection();
    const bookingcollection = await bookings()
    let booking = await bookingcollection.find({listing_id: id}).toArray();
    return booking;
}