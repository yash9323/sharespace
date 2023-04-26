import {dbConnection,closeConnection}from '../config/mongoConnection.js';
import users from '../config/mongoCollections.js';

async function main(){
    const db = await dbConnection();
    const usercollection = await users()
    let userslist = await usercollection.find({}).toArray();
    return userslist
}
export default await main()