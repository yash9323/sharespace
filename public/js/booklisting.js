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