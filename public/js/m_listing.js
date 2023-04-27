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