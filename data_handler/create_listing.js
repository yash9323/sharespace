import {dbConnection,closeConnection}from '../config/mongoConnection.js';
import listings from '../config/mongoListingCollections.js';

export default async function main(ob){
    // do input checking 
    const db = await dbConnection();
    const listingcollection = await listings()
    let ack = await listingcollection.insertOne(ob);
    return ack;
}