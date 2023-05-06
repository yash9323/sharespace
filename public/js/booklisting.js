function startdatechecker(startdate,availabletill){
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

function enddatechecker(enddate,availabletill,startdate){
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

function paymentchecker(payment){
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

let form = document.querySelector('form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    var error_div = document.getElementById('error')
    error_div.style.display = "none"
    error_div.textContent = ""
    let availabletill = document.getElementById("available-till")
    let start_date = document.getElementById("start_date")
    let end_date = document.getElementById("end_date")
    let payment = document.getElementById("payment")
    try{
        startdatechecker(start_date.value,availabletill.value)
        enddatechecker(end_date.value,availabletill.value,start_date.value)
        paymentchecker(payment.value)
    }
    catch(e){
        var error_div = document.getElementById('error')
        error_div.style.display = "block"
        error_div.textContent = e
        return
    }
    start_date.value = start_date.value.trim()
    end_date.value = end_date.value.trim()
    payment.value = payment.value.trim() 
    form.submit()
})

let l = document.getElementById("start_date")
let today = new Date()
let day = today.getDate()
let month = today.getMonth() + 1
let year = today.getFullYear()
if(day<10){
        day='0'+day
    } 
if(month<10){
    month='0'+month
}
let t = year+'-'+month+'-'+day;
l.setAttribute("min",t)
let ll = document.getElementById("end_date")
let dy = today.getDate() + 1 
if(dy<10){
    dy='0'+dy
} 
let tt  = year+'-'+month+'-'+dy;
console.log(tt)
ll.setAttribute("min",tt)