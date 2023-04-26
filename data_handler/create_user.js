import {dbConnection,closeConnection}from '../config/mongoConnection.js';
import users from '../config/mongoCollections.js';

export default async function main(ob){
    // do input checking 
    const db = await dbConnection();
    const usercollection = await users()
    let ack = await usercollection.insertOne(ob);
    return ack;
}