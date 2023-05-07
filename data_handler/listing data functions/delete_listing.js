import { dbConnection, closeConnection } from '../../config/mongoConnection.js';
import listings from '../../config/mongoListingCollections.js';
import reviews from '../../config/mongoReviewsCollections.js';
import comments from '../../config/mongoCommentsCollections.js';
import bookings from '../../config/mongoBookingsCollections.js';
import * as h from '../../helpers.js';

export default async function main(id) {
    h.objectidchecker(id)
    const db = await dbConnection();
    const listingcollection = await listings()
    const bookingcollection = await bookings()
    const commentscollection = await comments()
    const reviewcollection = await reviews()
    let listing = await listingcollection.findOneAndDelete({ _id: id });
    let bookingdelte = bookingcollection.deleteMany({ listing_id : id })
    let commentsdelete = commentscollection.deleteMany({ listing_id : id })
    let reviewsdelete = reviewcollection.deleteMany({ listing_id : id })
    return listing;
}