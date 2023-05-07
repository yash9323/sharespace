import {dbConnection,closeConnection}from '../../config/mongoConnection.js';
import listings from '../../config/mongoListingCollections.js';
import * as h from '../../helpers.js';

export default async function main(id,booked_till){
    h.objectidchecker(id)
    const db = await dbConnection();
    const listingcollection = await listings()
    let listing = await listingcollection.findOneAndUpdate({_id: id},{$set:{available : false,booked_till:booked_till}});
    return listing
}