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

navigator.geolocation.getCurrentPosition(async (position)=>{
    var s = "lat:"+String(position.coords.latitude)+" lon:"+String(position.coords.longitude)
    document.getElementById("location").innerHTML = s
    document.getElementById("lat").value = position.coords.latitude
    document.getElementById("lon").value = position.coords.longitude
    //await myMap(position.coords.latitude,position.coords.longitude)
},(error)=>{
    alert(error)
})

// async function myMap(lat,lon){
//     const { AdvancedMarkerView } = await google.maps.importLibrary("marker");
//     var mapProp= {
//         center:new google.maps.LatLng(lat,lon),
//         zoom:15,
//     };
//     var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
//     const marker = new AdvancedMarkerView({
//         map: map
//         position: position,
//         title: "Uluru",
//       });
//     google.maps.event.addListener(map, 'click', function(event) {
//     alert(event.latLng.lat() + ", " + event.latLng.lng());
//     });
// }

  