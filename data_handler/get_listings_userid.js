import { ObjectId } from 'mongodb';
import {dbConnection,closeConnection}from '../config/mongoConnection.js';
import listings from '../config/mongoListingCollections.js';

export default async function main(id){
    const db = await dbConnection();
    const listingcollection = await listings()
    let listing = await listingcollection.find({
        user_id: id}).toArray();
    return listing;
}