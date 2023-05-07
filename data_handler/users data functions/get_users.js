import { dbConnection, closeConnection } from '../../config/mongoConnection.js';
import users from '../../config/mongoCollections.js';
import * as h from '../../helpers.js';

export default async function main(){
    const db = await dbConnection();
    const usercollection = await users()
    let userslist = await usercollection.find({}).toArray();
    return userslist;
}
