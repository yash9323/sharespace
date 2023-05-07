import {dbConnection,closeConnection}from '../../config/mongoConnection.js';
import listings from '../../config/mongoListingCollections.js';
import * as h from '../../helpers.js';

export default async function main(data){
    h.addresscheker(data.address)
    h.descriptioncheker(data.description)
    h.pricechecker(data.price)
    h.lengthchecker(data.length)
    h.widthchecker(data.width)
    h.heightchecker(data.height)
    h.areachecker(data.area, data.length, data.width)
    h.volumechecker(data.volume, data.length, data.width, data.height)
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