import { dbConnection, closeConnection } from '../../config/mongoConnection.js';
import listings from '../../config/mongoListingCollections.js';
import * as h from '../../helpers.js';

export default async function main(id) {
    h.objectidchecker(id)
    const db = await dbConnection();
    const listingcollection = await listings()
    let listing = await listingcollection.findOne({ _id: id });
    return listing;
}