import { dbConnection, closeConnection } from '../../config/mongoConnection.js';
import reviews from '../../config/mongoReviewsCollections.js';
import bookings from '../../config/mongoBookingsCollections.js';
import * as h from '../../helpers.js';

export default async function main(ob) {
    h.reviewchecker(ob.review)
    h.ratingchecker(ob.rating)
    const db = await dbConnection();
    const reviewcollection = await reviews()
    let success = await reviewcollection.insertOne(ob);
    const bookingcollection = await bookings()
    let x = await bookingcollection.findOneAndUpdate({_id:ob.booking_id},{$set:{reviewed:"yes"}})
    return success;
}