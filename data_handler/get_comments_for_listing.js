import { dbConnection, closeConnection } from '../config/mongoConnection.js';
import comments from '../config/mongoCommentsCollections.js';

export default async function main(id) {
    const db = await dbConnection();
    const commentscollection = await comments()
    let commentdoc = await commentscollection.find({ listing_id : id }).toArray();
    return commentdoc;
}