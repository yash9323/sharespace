import {dbConnection,closeConnection}from '../../config/mongoConnection.js';
import bookings from '../../config/mongoBookingsCollections.js';
import * as h from '../../helpers.js';

export default async function main(ob,available_till){
    h.startdatechecker(ob.start_date,available_till)
    h.enddatechecker(ob.end_date,available_till,ob.start_date)
    h.paymentchecker(ob.payment)
    const db = await dbConnection();
    const bookingcollection = await bookings()
    let ack = await bookingcollection.insertOne(ob,{returnDocument: 'true'});
    return ack;
}