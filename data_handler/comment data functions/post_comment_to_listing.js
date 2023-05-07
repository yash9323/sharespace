import { dbConnection, closeConnection } from '../../config/mongoConnection.js';
import comments from '../../config/mongoCommentsCollections.js';
import * as h from '../../helpers.js';

export default async function main(ob) {
    h.commmentchecker(ob.comment)
    const db = await dbConnection();
    const commentscollection = await comments()
    let success = await commentscollection.insertOne(ob);
    return success;
}