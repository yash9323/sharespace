import {dbConnection,closeConnection}from '../config/mongoConnection.js';
import listings from '../config/mongoListingCollections.js';

export default async function main(){
    const db = await dbConnection();
    const listingcollection = await listings()
    let listingslist = await listingcollection.find({}).toArray();
    return listingslist
}