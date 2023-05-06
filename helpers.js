import users from './config/mongoCollections.js';

export function fnamechecker(fname) {
    if (fname === undefined) throw "Error: First Name not passed";
    if (typeof fname !== "string") throw "Error: First Name passed is not String!"
    if (fname.trim().length === 0) throw "Error: First Name passed only has empty spaces"
    if (/\d/.test(fname)) throw "Error: First Name Passed had numbers not accepted"
    if (fname.length < 2 || fname.length > 25) throw "Error: First Name should be between 2-25 characters"
    if (/<|>/.test(fname)) throw "No injection of tags allowed!"
}
export function lnamechecker(lname) {
    if (lname === undefined) throw "Error: Last Name not passed";
    if (typeof lname !== "string") throw "Error: Last Name passed is not String!"
    if (lname.trim().length === 0) throw "Error: Last Name passed only has empty spaces"
    if (/\d/.test(lname)) throw "Error: Last Name Passed had numbers not accepted"
    if (lname.length < 2 || lname.length > 25) throw "Error: Last Name should be between 2-25 characters"
    if (/<|>/.test(lname)) throw "No injection of tags allowed!"
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
    if (/<|>/.test(address)) throw "No injection of tags allowed!"
}

export function descriptioncheker(description){
    if (description === undefined) throw "Error: Description Cannot be Empty";
    if (typeof description !== "string") throw "Error: Description can only be string input";
    if (description.trim().length === 0) throw "Error: Description can not be just spaces";
    if (description.length < 5 || description.length > 40) throw "Error: Description can only be between 5 and 40 characters";
    if (/<|>/.test(description)) throw "No injection of tags allowed!"
}

export function pricechecker(price){
    if (price === undefined) throw "Error: The price is not passed !";
    if (typeof price !== "string") throw "Error: The price is not type string";
    if (price.trim().length === 0) throw "Error: price can not be just spaces";
    if (/[A-Za-z]/.test(price)) throw "Error : Price can not have any letters"
    if (Number(price) < 1) throw "Error: Price can not be zero or negative";
    if (/<|>/.test(price)) throw "No injection of tags allowed!"
}

export function lengthchecker(length){
    if (length === undefined) throw "Error: The length is not passed !"
    if (typeof length !== "string") throw "Error: The length is not type string"
    if (/<|>/.test(length)) throw "No injection of tags allowed!"
    if (length.trim().length === 0) throw "Error: length can not be just spaces";
    if (/[A-Za-z]/.test(length)) throw "Error : length can not have any letters";
    if (Number(length) < 1) throw "Error: length can not be zero or negative";
}

export function widthchecker(width){
    if (width === undefined) throw "Error: The width is not passed !"
    if (typeof width !== "string") throw "Error: The width is not type string"
    if (width.trim().length === 0) throw "Error: width  can not be just spaces";
    if (/<|>/.test(width)) throw "No injection of tags allowed!"
    if (/[A-Za-z]/.test(width)) throw "Error : width can not have any letters";
    if (Number(width) < 1) throw "Error: width  can not be zero or negative";
}

export function heightchecker(height){
    if (height === undefined) throw "Error: The height is not passed !"
    if (typeof height !== "string") throw "Error: The height is not type string"
    if (height.trim().length === 0) throw "Error: height can not be just spaces";
    if (/<|>/.test(height)) throw "No injection of tags allowed!"
    if (/[A-Za-z]/.test(height)) throw "Error : height can not have any letters";
    if (Number(height) < 1) throw "Error: height can not be zero or negative";
}

export function areachecker(area,length,width){
    if (area === undefined) throw "Error : Area not passed";
    if (typeof area !== "string") throw "Error: Area not type string";
    if (area.trim().length === 0) throw "No empty spaces allowed please dont mess with the system"
    if (/<|>/.test(area)) throw "No injection of tags allowed!"
    if (Number(area) < 1 ) throw "Error: area Cannot be negative or zero";
    if (/[A-Za-z]/.test(area)) throw "Error : area can not have any letters";
    if ((Number(length) * Number(width)) !== Number(area)) throw "Error: Inconsistent Area calculation"
}

export function volumechecker(volume,length,width,height){
    if (volume === undefined) throw "Error : volume not passed";
    if (typeof volume !== "string") throw "Error: volume not type string";
    if (volume.trim().length === 0) throw "No empty spaces allowed please dont mess with the system"
    if (/<|>/.test(volume)) throw "No injection of tags allowed!"
    if (Number(volume) < 1 ) throw "Error: volume Cannot be negative or zero";
    if (/[A-Za-z]/.test(volume)) throw "Error : volume can not have any letters";
    if ((Number(length) * Number(width) * Number(height)) !== Number(volume)) throw "Error: Inconsistent volume calculation"
}

export function lonchecker(lon){
    if (lon === undefined) throw "Error : lon not passed";
    if (typeof lon !== "string") throw "Error: lon not type string"; 
    if (lon.trim().length === 0) throw "No empty spaces allowed please dont mess with the system"
    if (/<|>/.test(lon)) throw "No injection of tags allowed!"
}

export function latchecker(lat){
    if (lat === undefined) throw "Error : lat not passed";
    if (typeof lat !== "string") throw "Error: lat not type string"; 
    if (lat.trim().length === 0) throw "No empty spaces allowed please dont mess with the system"
    if (/<|>/.test(lat)) throw "No injection of tags allowed!"
}

export function reviewchecker(review){
    if (review === undefined) throw "Error: review was not passed";
    if (typeof review !== "string") throw "Error: Review passed was not string";
    if (review.trim().length === 0) throw "Error: review cannot be just blank spaces!";
    if (/\d/.test(review)) throw "Error: you cannot have numbers in review!";
    if (review.length > 50 || review.length < 3) throw "Error: Your review should be between 3-50 characters";
    if (/<|>/.test(review)) throw "No injection of tags allowed!"
}

export function ratingchecker(rating){
    if (rating === undefined) throw "Error: Rating was not passed";
    if (typeof rating !== "string") throw "Error: Rating passed was not string";
    if (rating.trim().length === 0) throw "Error: Rating cannot be just blank spaces!";
    if (rating.length > 1) throw "Error: your rating has to be a single number"
    if (/[A-Za-z]/.test(rating)) throw "Error: you cannot have alphabets in rating!";
    if (Number(rating) > 5 || Number(rating) < 1) throw "Error: Rating has to be between 1-5 nothing else;"
    if (/<|>/.test(rating)) throw "No injection of tags allowed!"
}

export function commmentchecker(comment){
    if (comment === undefined) throw "Error: comment was not passed";
    if (typeof comment !== "string") throw "Error: comment passed was not string";
    if (comment.trim().length === 0) throw "Error: comment cannot be just blank spaces!";
    if (/\d/.test(comment)) throw "Error: you cannot have numbers in comment!";
    if (comment.length > 50 || comment.length < 3) throw "Error: Your comment should be between 3-50 characters";
    if (/<|>/.test(comment)) throw "No injection of tags allowed!"
}

export function availabletillcheker(availabletill){
    if (availabletill === undefined) throw "Error: availabletill was not passed";
    if (typeof availabletill !== "string") throw "Error: availabletill passed was not string";
    if (availabletill.trim().length === 0) throw "Error: availabletill cannot be just blank spaces!";
    if (/<|>/.test(availabletill)) throw "No injection of tags allowed!"
    if (availabletill.length !== 10) throw "Error: Invalid date";
    if(!/\d{4}-\d{2}-\d{2}/.test(availabletill)) throw "Error: Date should be in YYYY-MM-DD format";
    const splitdate = availabletill.split("-")
    const year = parseInt(splitdate[0]);
    const month = parseInt(splitdate[1]) - 1;
    const day = parseInt(splitdate[2]);
    const formateddate =  new Date(year, month, day);
    const today = new Date();
    today.setHours(0,0,0,0)
    if (formateddate <= today) throw "Error : You cannot make a listing available till today or backdate";
}

export function startdatechecker(startdate,availabletill){
    if (startdate === undefined) throw "Error: start date was not passed";
    if (typeof startdate !== "string") throw "Error: start date passed was not string";
    if (startdate.trim().length === 0) throw "Error: start date cannot be just blank spaces!";
    if (/<|>/.test(startdate)) throw "No injection of tags allowed!"
    if (startdate.length !== 10) throw "Error: Invalid date";
    if(!/\d{4}-\d{2}-\d{2}/.test(startdate)) throw "Error: Date should be in YYYY-MM-DD format";
    const splitdate = startdate.split("-")
    const year = parseInt(splitdate[0]);
    const month = parseInt(splitdate[1]) - 1;
    const day = parseInt(splitdate[2]) ;
    const formateddate =  new Date(year, month, day);
    const avdate = availabletill.split("-")
    const avyear = parseInt(avdate[0]);
    const avmonth = parseInt(avdate[1]) - 1;
    const avday = parseInt(avdate[2]);
    const avformateddate =  new Date(avyear, avmonth, avday);
    const today = new Date();
    today.setHours(0,0,0,0)
    if (formateddate < today) throw "Error : You cannot backdate a booking should be today or more";
    if (formateddate > avformateddate) throw "Error: YOu are trying to use a start date that is more than available till";
}

export function enddatechecker(enddate,availabletill,startdate){
    if (enddate === undefined) throw "Error: end date was not passed";
    if (typeof enddate !== "string") throw "Error: end date passed was not string";
    if (enddate.trim().length === 0) throw "Error: end date cannot be just blank spaces!";
    if (/<|>/.test(enddate)) throw "No injection of tags allowed!"
    if (enddate.length !== 10) throw "Error: Invalid date";
    if(!/\d{4}-\d{2}-\d{2}/.test(enddate)) throw "Error: Date should be in YYYY-MM-DD format";
    const splitdate = enddate.split("-")
    const year = parseInt(splitdate[0]);
    const month = parseInt(splitdate[1]) - 1;
    const day = parseInt(splitdate[2]);
    const formateddate =  new Date(year, month, day);
    const avdate = availabletill.split("-")
    const avyear = parseInt(avdate[0]);
    const avmonth = parseInt(avdate[1]) - 1;
    const avday = parseInt(avdate[2]);
    const avformateddate =  new Date(avyear, avmonth, avday);
    if (formateddate > avformateddate) throw "Error : You know right your end date cannot be more than the date the listing is available! Sorry!";
    const ssplitdate = startdate.split("-")
    const syear = parseInt(ssplitdate[0]);
    const smonth = parseInt(ssplitdate[1]) - 1;
    const sday = parseInt(ssplitdate[2]);
    const sformateddate =  new Date(syear, smonth, sday);
    if (formateddate < sformateddate) throw "Error : You cannot book a listing that has a end date before start date! Sorry thats not possible";
}

export function paymentchecker(payment){
    if (payment === undefined) throw "Error: payment was not passed";
    if (typeof payment !== "string") throw "Error: payment passed was not string";
    if (payment.trim().length === 0) throw "Error: payment cannot be just blank spaces!";
    if (/<|>/.test(payment)) throw "No injection of tags allowed!"
    payment = payment.trim().toLowerCase()
    if (payment === "card") return 
    if (payment === "venmo") return
    if (payment === "zelle") return
    if (payment === "cash") return
    throw "Error : error processing the payment mode! can only be the 4 types specified!"
}
