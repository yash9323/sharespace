import users from './config/mongoCollections.js';

export function fnamechecker(fname) {
    if (fname === undefined) throw "Error: First Name not passed";
    if (typeof fname !== "string") throw "Error: First Name passed is not String!"
    if (fname.trim().length === 0) throw "Error: First Name passed only has empty spaces"
    if (/\d/.test(fname)) throw "Error: First Name Passed had numbers not accepted"
    if (fname.length < 2 || fname.length > 25) throw "Error: First Name should be between 2-25 characters"
}
export function lnamechecker(lname) {
    if (lname === undefined) throw "Error: Last Name not passed";
    if (typeof lname !== "string") throw "Error: Last Name passed is not String!"
    if (lname.trim().length === 0) throw "Error: Last Name passed only has empty spaces"
    if (/\d/.test(lname)) throw "Error: Last Name Passed had numbers not accepted"
    if (lname.length < 2 || lname.length > 25) throw "Error: Last Name should be between 2-25 characters"
}
export async function emailaddresschecker(email) {
    if (email === undefined) throw "Error: Email Adress not passed";
    if (typeof email !== "string") throw "Error: Email Adress passed is not String!"
    if (email.trim().length === 0) throw "Error: Email Adress passed only has empty spaces"
    email = email.toLowerCase()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw "Error: Incorrect format of Email Address"
    await checkemailindb(email)
}

export async function eaddresschecker(email) {
    if (email === undefined) throw "Error: Email Adress not passed";
    if (typeof email !== "string") throw "Error: Email Adress passed is not String!"
    if (email.trim().length === 0) throw "Error: Email Adress passed only has empty spaces"
    email = email.toLowerCase()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw "Error: Incorrect format of Email Address"
}

export function passwordchecker(password){
    if (password === undefined) throw "Error: password not passed";
    if (typeof password !== "string") throw "Error: password passed is not String!"
    if (password.trim().length === 0) throw "Error: password passed only has empty spaces"
    if (/\s/.test(password)) throw "Error: Password cannot contain empty spaces"
    if (password.length < 8) throw "Error: the Password must have atleast 8 characters"
    if (!/[A-Z]/.test(password)) throw "Error: Password must contain 1 capital letter"
    if (!/\d/.test(password)) throw "Error: Password must contain 1 number"
    if (!/[!@{}|:";'<>#\$%\^&\*\(\),\?\.\\\+~\-=\[\]/]/.test(password)) throw "Error: Password must contain 1 special character"
}
export function phonenochecker(phoneno){
    if (phoneno === undefined) throw "Error: Phone No. not passed";
    if (typeof phoneno !== "string") throw "Error: Phone No. passed is not String!"
    if (phoneno.trim().length === 0) throw "Error: Phone No. passed only has empty spaces"
    if (!/[0-9]{10}/.test(phoneno)) throw "Error: Phone number should have 10 digits and only numbers"
}

export async function checkemailindb(emailAddress){
    emailAddress = emailAddress.toLowerCase()
    const usercollection = await users() 
    let hit = await usercollection.findOne({email:emailAddress});
    if (hit !== null){
        throw "Error : Email Id ALREADY TAKEN! PLEASE TRY A NEW EMAIL ID"
    }
    return hit
}

export function addresscheker(address){
    if (address === undefined) throw "Error: Address Cannot be Empty";
    if (typeof address !== "string") throw "Error: Address can only be string input";
    if (address.trim().length === 0) throw "Error: Address can not be just spaces";
    if (address.length < 5 || address.length > 40) throw "Error: Address can only be between 5 and 40 characters";
}

export function descriptioncheker(description){
    if (description === undefined) throw "Error: Description Cannot be Empty";
    if (typeof description !== "string") throw "Error: Description can only be string input";
    if (description.trim().length === 0) throw "Error: Description can not be just spaces";
    if (description.length < 5 || description.length > 40) throw "Error: Description can only be between 5 and 40 characters";
}

export function pricechecker(price){
    if (price === undefined) throw "Error: The price is not passed !";
    if (typeof price !== "string") throw "Error: The price is not type string";
    if (price.trim().length === 0) throw "Error: price can not be just spaces";
    if (/[A-Za-z]/.test(price)) throw "Error : Price can not have any letters"
    if (Number(price) < 1) throw "Error: Price can not be zero or negative";
}

export function lengthchecker(length){
    if (length === undefined) throw "Error: The length is not passed !"
    if (typeof length !== "string") throw "Error: The length is not type string"
    if (length.trim().length === 0) throw "Error: length can not be just spaces";
    if (/[A-Za-z]/.test(length)) throw "Error : length can not have any letters";
    if (Number(length) < 1) throw "Error: length can not be zero or negative";
}

export function widthchecker(width){
    if (width === undefined) throw "Error: The width is not passed !"
    if (typeof width !== "string") throw "Error: The width is not type string"
    if (width.trim().length === 0) throw "Error: width  can not be just spaces";
    if (/[A-Za-z]/.test(width)) throw "Error : width can not have any letters";
    if (Number(width) < 1) throw "Error: width  can not be zero or negative";
}

export function heightchecker(height){
    if (height === undefined) throw "Error: The height is not passed !"
    if (typeof height !== "string") throw "Error: The height is not type string"
    if (height.trim().length === 0) throw "Error: height can not be just spaces";
    if (/[A-Za-z]/.test(height)) throw "Error : height can not have any letters";
    if (Number(height) < 1) throw "Error: height can not be zero or negative";
}

export function areachecker(area,length,width){
    if (area === undefined) throw "Error : Area not passed";
    if (typeof area !== "string") throw "Error: Area not type string";
    if (Number(area) < 1 ) throw "Error: area Cannot be negative or zero";
    if (/[A-Za-z]/.test(area)) throw "Error : area can not have any letters";
    if ((Number(length) * Number(width)) !== Number(area)) throw "Error: Inconsistent Area calculation"
}

export function volumechecker(volume,length,width,height){
    if (volume === undefined) throw "Error : volume not passed";
    if (typeof volume !== "string") throw "Error: volume not type string";
    if (Number(volume) < 1 ) throw "Error: volume Cannot be negative or zero";
    if (/[A-Za-z]/.test(volume)) throw "Error : volume can not have any letters";
    if ((Number(length) * Number(width) * Number(height)) !== Number(volume)) throw "Error: Inconsistent volume calculation"
}

export function lonchecker(lon){
    if (lon === undefined) throw "Error : lon not passed";
    if (typeof lon !== "string") throw "Error: lon not type string"; 
}

export function latchecker(lat){
    if (lat === undefined) throw "Error : lat not passed";
    if (typeof lat !== "string") throw "Error: lat not type string"; 
}
