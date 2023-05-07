import { dbConnection, closeConnection } from '../../config/mongoConnection.js';
import reviews from '../../config/mongoReviewsCollections.js';
import * as h from '../../helpers.js';

export default async function main(id) {
    h.objectidchecker(id)
    const db = await dbConnection();
    const reviewcollection = await reviews()
    let reviewdoc = await reviewcollection.find({ listing_id : id }).toArray();
    return reviewdoc;
}