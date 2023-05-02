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