import { dbConnection, closeConnection } from '../config/mongoConnection.js';
import listings from '../config/mongoListingCollections.js';
import * as h from '../helpers.js';

export default async function main(ob) {
    h.addresscheker(ob.address)
    h.descriptioncheker(ob.description)
    h.pricechecker(ob.price)
    h.lengthchecker(ob.length)
    h.widthchecker(ob.width)
    h.heightchecker(ob.height)
    h.latchecker(ob.lat)
    h.lonchecker(ob.lon)
    h.areachecker(ob.area, ob.length, ob.width)
    h.volumechecker(ob.volume, ob.length, ob.width, ob.height)
    const db = await dbConnection();
    const listingcollection = await listings()
    let ack = await listingcollection.insertOne(ob);
    return ack;
}