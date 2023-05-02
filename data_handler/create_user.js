import { dbConnection, closeConnection } from '../config/mongoConnection.js';
import users from '../config/mongoCollections.js';
import * as h from '../helpers.js';

export default async function main(ob) {
    h.fnamechecker(ob.first_name)
    h.lnamechecker(ob.last_name)
    await h.emailaddresschecker(ob.email)
    h.passwordchecker(ob.password)
    h.phonenochecker(ob.phone_no)
    const db = await dbConnection();
    const usercollection = await users()
    let ack = await usercollection.insertOne(ob);
    return ack;
}