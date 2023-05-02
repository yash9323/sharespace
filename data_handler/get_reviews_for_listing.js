import { dbConnection, closeConnection } from '../config/mongoConnection.js';
import reviews from '../config/mongoReviewsCollections.js';

export default async function main(id) {
    const db = await dbConnection();
    const reviewcollection = await reviews()
    let reviewdoc = await reviewcollection.find({ listing_id : id }).toArray();
    return reviewdoc;
}