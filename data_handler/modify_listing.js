import {dbConnection,closeConnection}from '../config/mongoConnection.js';
import listings from '../config/mongoListingCollections.js';

export default async function main(data){
    const db = await dbConnection();
    const listingcollection = await listings()
    let listing = await listingcollection.findOneAndUpdate({_id: data.id},{$set:{
        address: data.address,
        description: data.description,
        price: data.price,
        length: data.length,
        width: data.width,
        height :data.height,
        area: data.area,
        volume: data.volume,
        available_till : data.available_till
    }});
    return listing
}