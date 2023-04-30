import {dbConnection,closeConnection}from '../config/mongoConnection.js';
import bookings from '../config/mongoBookingsCollections.js';

export default async function main(){
    const db = await dbConnection();
    const bookingcollection = await bookings()
    let booking = await bookingcollection.find({}).toArray();
    for (let l of booking){
        let start = new Date(l.start_date)
        let end = new Date(l.end_date)
        let today = new Date()
        if (today >= end){
            let x = await bookingcollection.findOneAndUpdate({_id:l._id},{$set:{status:"expired"}})
        }
    }
    return undefined;
}