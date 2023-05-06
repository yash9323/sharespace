import { dbConnection, closeConnection } from '../config/mongoConnection.js';
import listings from '../config/mongoListingCollections.js';

export default async function main(id) {
    // delete everything related to that listing reviews, comments , bookings etc 
    const db = await dbConnection();
    const listingcollection = await listings()
    let listing = await listingcollection.findOneAndDelete({ _id: id });
    return listing;
}