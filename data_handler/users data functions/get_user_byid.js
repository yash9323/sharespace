import { dbConnection, closeConnection } from '../../config/mongoConnection.js';
import users from '../../config/mongoCollections.js';
import * as h from '../../helpers.js';

export default async function main(id){
    h.objectidchecker(id)
    const db = await dbConnection();
    const usercollection = await users()
    let userslist = await usercollection.findOne({_id: id})
    let o = {
        first_name : userslist.first_name,
        last_name : userslist.last_name,
        email: userslist.email,
        phone_no: userslist.phone_no,
    }
    return o;
}