import { dbConnection, closeConnection } from '../../config/mongoConnection.js';
import comments from '../../config/mongoCommentsCollections.js';
import * as h from '../../helpers.js';

export default async function main(id) {
    h.objectidchecker(id)
    const db = await dbConnection();
    const commentscollection = await comments()
    let commentdoc = await commentscollection.find({ listing_id : id }).toArray();
    return commentdoc;
}