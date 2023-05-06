function availabletillcheker(availabletill) {
  if (availabletill === undefined) throw "Error: availabletill was not passed";
  if (typeof availabletill !== "string") throw "Error: availabletill passed was not string";
  if (availabletill.trim().length === 0) throw "Error: availabletill cannot be just blank spaces!";
  if (/<|>/.test(availabletill)) throw "No injection of tags allowed!"
  if (availabletill.length !== 10) throw "Error: Invalid date";
  if (!/\d{4}-\d{2}-\d{2}/.test(availabletill)) throw "Error: Date should be in YYYY-MM-DD format";
  const splitdate = availabletill.split("-")
  const year = parseInt(splitdate[0]);
  const month = parseInt(splitdate[1]) - 1;
  const day = parseInt(splitdate[2]);
  const formateddate = new Date(year, month, day);
  const today = new Date();
  today.setHours(0, 0, 0, 0)
  if (formateddate <= today) throw "Error : You cannot make a listing available till today or backdate";
}

let form = document.querySelector('form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    var error_div = document.getElementById('error')
    error_div.style.display = "none"
    error_div.textContent = ""
    let adrressinput = document.getElementById("address")
    let descriptioninput = document.getElementById("description")
    let priceinput = document.getElementById("price")
    let lengthinput = document.getElementById("length")
    let widthinput = document.getElementById("width")
    let heightinput = document.getElementById("height")
    let available_tillinput = document.getElementById("available_till")
    let areainput = document.getElementById("area")
    let volumeinput = document.getElementById("volume")
    try {
        if (/<|>/.test(adrressinput.value)) throw "No injection of tags allowed!"
        if (/<|>/.test(descriptioninput.value)) throw "No injection of tags allowed!"
        if (/<|>/.test(priceinput.value)) throw "No injection of tags allowed!"
        if (/<|>/.test(lengthinput.value)) throw "No injection of tags allowed!"
        if (/<|>/.test(widthinput.value)) throw "No injection of tags allowed!"
        if (/<|>/.test(heightinput.value)) throw "No injection of tags allowed!"
        if (/<|>/.test(available_tillinput.value)) throw "No injection of tags allowed!"
        availabletillcheker(available_tillinput.value)
        if (/<|>/.test(areainput.value)) throw "No injection of tags allowed!"
        if (/<|>/.test(volumeinput.value)) throw "No injection of tags allowed!"
        if (adrressinput.value === undefined) throw "Error: Address Cannot be Empty";
        if (typeof adrressinput.value !== "string") throw "Error: Address can only be string input";
        if (adrressinput.value.trim().length === 0) throw "Error: Address can not be just spaces";
        if (adrressinput.value.length < 5 || adrressinput.value.length > 40) throw "Error: Address can only be between 5 and 40 characters";
        if (descriptioninput.value === undefined) throw "Error: Description Cannot be Empty";
        if (typeof descriptioninput.value !== "string") throw "Error: Description can only be string input";
        if (descriptioninput.value.trim().length === 0) throw "Error: Description can not be just spaces";
        if (descriptioninput.value.length < 5 || descriptioninput.value.length > 40) throw "Error: Description can only be between 5 and 40 characters";
        if (priceinput.value === undefined) throw "Error: The price is not passed !"
        if (typeof priceinput.value !== "string") throw "Error: The price is not type string"
        if (priceinput.value.trim().length === 0) throw "Error: price can not be just spaces";
        if (/[A-Za-z]/.test(priceinput.value)) throw "Error : Price can not have any letters";
        if (Number(priceinput.value) < 1) throw "Error: Price can not be zero or negative";
        if (lengthinput.value === undefined) throw "Error: The length is not passed !"
        if (typeof lengthinput.value !== "string") throw "Error: The length is not type string"
        if (lengthinput.value.trim().length === 0) throw "Error: length can not be just spaces";
        if (/[A-Za-z]/.test(lengthinput.value)) throw "Error : length can not have any letters";
        if (Number(lengthinput.value) < 1) throw "Error: length can not be zero or negative";
        if (widthinput.value === undefined) throw "Error: The width is not passed !"
        if (typeof widthinput.value !== "string") throw "Error: The width is not type string"
        if (widthinput.value.trim().length === 0) throw "Error: width can not be just spaces";
        if (/[A-Za-z]/.test(widthinput.value)) throw "Error : width can not have any letters";
        if (Number(widthinput.value) < 1) throw "Error: width can not be zero or negative";
        if (heightinput.value === undefined) throw "Error: The width is not passed !"
        if (typeof heightinput.value !== "string") throw "Error: The width is not type string"
        if (heightinput.value.trim().length === 0) throw "Error: width can not be just spaces";
        if (/[A-Za-z]/.test(heightinput.value)) throw "Error : width can not have any letters";
        if (Number(heightinput.value) < 1) throw "Error: width can not be zero or negative";
        if (areainput.value === undefined) throw "Error : Area not passed";
        if (typeof areainput.value !== "string") throw "Error: Area not type string";
        if (Number(areainput.value) < 1) throw "Error: area Cannot be negative or zero";
        if ((lengthinput.value * widthinput.value) !== Number(areainput.value)) throw "Error: Inconsistent Area calculation"
        if (/[A-Za-z]/.test(areainput.value)) throw "Error : area can not have any letters";
        if (volumeinput.value === undefined) throw "Error : volume not passed";
        if (typeof volumeinput.value !== "string") throw "Error: volume not type string";
        if (Number(volumeinput.value) < 1) throw "Error: volume Cannot be negative or zero";
        if ((lengthinput.value * widthinput.value * heightinput.value) !== Number(volumeinput.value)) throw "Error: Inconsistent volume calculation"
        if (/[A-Za-z]/.test(volumeinput.value)) throw "Error : volume can not have any letters";
    }
    catch (e) {
        var error_div = document.getElementById('error')
        error_div.style.display = "block"
        error_div.textContent = e
        adrressinput.focus()
        return
    }
    adrressinput.value = adrressinput.value.trim()
    descriptioninput.value = descriptioninput.value.trim()
    priceinput.value = priceinput.value.trim()
    lengthinput.value = lengthinput.value.trim()
    widthinput.value = widthinput.value.trim()
    heightinput.value = heightinput.value.trim()
    areainput.value = areainput.value.trim()
    volumeinput.value = volumeinput.value.trim()
    available_tillinput.value = available_tillinput.value.trim()
    form.submit()
})

function calculatearea() {
    var length = document.getElementById("length").value;
    var width = document.getElementById("width").value;
    var area = length * width;
    document.getElementById("area_display").innerHTML = area;
    document.getElementById("area").value = area;
  }

function calculatevolume(){
    var length = document.getElementById("length").value;
    var width = document.getElementById("width").value;
    var height = document.getElementById("height").value;
    var volume = length * width * height;
    document.getElementById("volume_display").innerHTML = volume;
    document.getElementById("volume").value = volume;
}

window.onload = calculatearea()
window.onload = calculatevolume()

let popupcontainer = document.getElementById('confirmdelete')
let deletebutton = document.getElementById('delete_space');
function displaypopup(){
  popupcontainer.style.display = 'Block'
  deletebutton.style.display = 'None'
}
function canceldelete(){
  popupcontainer.style.display = 'None'
  deletebutton.style.display = 'Block'
}