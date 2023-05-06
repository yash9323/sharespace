function loadlistings() {
    var listingscontainer = document.getElementById("listings")
    listingscontainer.innerHTML = ""
    $.ajax({
        url: "http://localhost:7777/getalllistings",
        type: "GET",
        data: "json",
        success: function (res) {
            if(res.length === 0){
                listingscontainer.innerText= "No Listings"
            }
            for (let l of res) {
                if (l.available) {
                    const listingref = document.createElement("a");
                    listingref.setAttribute("href", l.link)
                    listingref.style.textDecoration = "none";
                    listingref.innerHTML =
                        `
                    <div class="card">
                        <div class="card-img">
                            <img src="/images/${l.picture}" alt="image" width="100%" height="100%">
                        </div>
                    <div class="card-info">
                        <p class="text-title">
                            ${l.address}
                        </p>
                        <p class="text-body">
                            ${l.description}
                        </p>
                        <p class="text-body">area available: ${l.area}
                        </p>
                    </div>
                    <div class="card-footer">
                        <span class="text-title">$ ${l.price}</span>
                    </div>
                </div>  
                    `
                    listingscontainer.appendChild(listingref)
                }
            }
        }
    })
}

function filterprice(){
    var f = document.getElementById("priceRange").value
    var filterval = document.getElementById("filter_price")
    filterval.innerHTML = `Filtering Listings with price less than or equal to ${f}`
    var listingscontainer = document.getElementById("listings")
    listingscontainer.innerHTML = ""
    $.ajax({
        url: "http://localhost:7777/getalllistings",
        type: "GET",
        data: "json",
        success: function (res) {
            for (let l of res) {
                if (l.available) {
                    if (l.price <= f) {
                        const listingref = document.createElement("a");
                        listingref.setAttribute("href", l.link)
                        listingref.style.textDecoration = "none";
                        listingref.innerHTML =
                            `
                        <div class="card">
                            <div class="card-img">
                                <img src="/images/${l.picture}" alt="image" width="100%" height="100%">
                            </div>
                        <div class="card-info">
                            <p class="text-title">
                                ${l.address}
                            </p>
                            <p class="text-body">
                                ${l.description}
                            </p>
                            <p class="text-body">area available: ${l.area}
                            </p>
                        </div>
                        <div class="card-footer">
                            <span class="text-title">$ ${l.price}</span>
                        </div>
                    </div>  
                        `
                        listingscontainer.appendChild(listingref)
                }
            }
        }
    }
    })
}

function filterarea(){
    var f = document.getElementById("areaRange").value
    var filterval = document.getElementById("filter_area")
    filterval.innerHTML = `Filtering Listings with area less than or equal to ${f}`
    var listingscontainer = document.getElementById("listings")
    listingscontainer.innerHTML = ""
    $.ajax({
        url: "http://localhost:7777/getalllistings",
        type: "GET",
        data: "json",
        success: function (res) {
            for (let l of res) {
                if (l.available) {
                    if (l.area <= f) {
                        const listingref = document.createElement("a");
                        listingref.setAttribute("href", l.link)
                        listingref.style.textDecoration = "none";
                        listingref.innerHTML =
                            `
                        <div class="card">
                            <div class="card-img">
                                <img src="/images/${l.picture}" alt="image" width="100%" height="100%">
                            </div>
                        <div class="card-info">
                            <p class="text-title">
                                ${l.address}
                            </p>
                            <p class="text-body">
                                ${l.description}
                            </p>
                            <p class="text-body">area available: ${l.area}
                            </p>
                        </div>
                        <div class="card-footer">
                            <span class="text-title">$ ${l.price}</span>
                        </div>
                    </div>  
                        `
                        listingscontainer.appendChild(listingref)
                }
            }
        }
    }
    })
}

function filtervolume(){
    var f = document.getElementById("volumeRange").value
    var filterval = document.getElementById("filter_volume")
    filterval.innerHTML = `Filtering Listings with volume less than or equal to ${f}`
    var listingscontainer = document.getElementById("listings")
    listingscontainer.innerHTML = ""
    $.ajax({
        url: "http://localhost:7777/getalllistings",
        type: "GET",
        data: "json",
        success: function (res) {
            for (let l of res) {
                if (l.available) {
                    if (l.volume <= f) {
                        const listingref = document.createElement("a");
                        listingref.setAttribute("href", l.link)
                        listingref.style.textDecoration = "none";
                        listingref.innerHTML =
                            `
                        <div class="card">
                            <div class="card-img">
                                <img src="/images/${l.picture}" alt="image" width="100%" height="100%">
                            </div>
                        <div class="card-info">
                            <p class="text-title">
                                ${l.address}
                            </p>
                            <p class="text-body">
                                ${l.description}
                            </p>
                            <p class="text-body">area available: ${l.area}
                            </p>
                        </div>
                        <div class="card-footer">
                            <span class="text-title">$ ${l.price}</span>
                        </div>
                    </div>  
                        `
                        listingscontainer.appendChild(listingref)
                }
            }
        }
    }
    })
}

function showselectedfilter(){
    loadlistings()
    var filterval = document.getElementById("filter").value
    var pricefilterdiv = document.getElementById("pricefilterdiv")
    var areafilterdiv = document.getElementById("areafilterdiv")
    var volumefilterdiv = document.getElementById("volumefilterdiv")
    if (filterval === "price"){
        pricefilterdiv.style.display = "block"
        areafilterdiv.style.display = "none"
        volumefilterdiv.style.display = "none"
    } 
    if (filterval === "area"){
        areafilterdiv.style.display = "block"
        volumefilterdiv.style.display = "none"
        pricefilterdiv.style.display = "none"
    } 
    if (filterval === "volume"){
        pricefilterdiv.style.display = "none"
        areafilterdiv.style.display = "none"
        volumefilterdiv.style.display = "block"
    } 
}

function reset(){
    window.location.reload()
}

function searchbyaddress(){
    var addresstosearch = document.getElementById("search").value
    if (addresstosearch === "") reset()
    var ddiv = document.getElementById("showsearchvalue")
    ddiv.style.display = ""
    ddiv.innerHTML = "Searching for " + addresstosearch
    var listingscontainer = document.getElementById("listings")
    listingscontainer.innerHTML = ""
    $.ajax({
        url: "http://localhost:7777/getalllistings",
        type: "GET",
        data: "json",
        success: function (res) {
            for (let l of res) {
                if (l.available) {
                    if (l.address.toLowerCase().indexOf(addresstosearch.toLowerCase()) > -1) {
                        const listingref = document.createElement("a");
                        listingref.setAttribute("href", l.link)
                        listingref.style.textDecoration = "none";
                        listingref.innerHTML =
                            `
                        <div class="card">
                            <div class="card-img">
                                <img src="/images/${l.picture}" alt="image" width="100%" height="100%">
                            </div>
                        <div class="card-info">
                            <p class="text-title">
                                ${l.address}
                            </p>
                            <p class="text-body">
                                ${l.description}
                            </p>
                            <p class="text-body">area available: ${l.area}
                            </p>
                        </div>
                        <div class="card-footer">
                            <span class="text-title">$ ${l.price}</span>
                        </div>
                    </div>  
                        `
                        listingscontainer.appendChild(listingref)
                }
            }
        }
    }
    })
}

function showpopup() {
    document.getElementById('popup-form').style.display = 'flex';
  }
  
  function hidePopup() {
    document.getElementById('popup-form').style.display = 'none';
  }

window.onload = loadlistings
hidePopup()