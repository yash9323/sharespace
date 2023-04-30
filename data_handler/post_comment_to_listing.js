import { dbConnection, closeConnection } from '../config/mongoConnection.js';
import comments from '../config/mongoCommentsCollections.js';

export default async function main(ob) {
    const db = await dbConnection();
    const commentscollection = await comments()
    let success = await commentscollection.insertOne(ob);
    return success;
}