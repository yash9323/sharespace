function loadbookings() {
    var bookingscontainer = document.getElementById("bookings-container")
    bookingscontainer.innerHTML = ""
    $.ajax({
        url: "http://localhost:7777/bookingdataofuser",
        type: "GET",
        data: "json",
        success: function (res) {
            for (let l of res) {
                if (l.status === "ongoing") {
                    const booking = document.createElement("div")
                    booking.className = "booking"
                    booking.innerHTML =
                        `
                <p>Start Date : ${l.start_date}</p>
                <p>End_Date : ${l.end_date}</p>
                <p>Payment_Mode : ${l.payment}</p>
                <p>Status of Booking : ${l.status}</p>
                <p>Space Booked : ${l.listing_details.address}</p>
                `
                    bookingscontainer.appendChild(booking)
                }
                if (l.status === "expired") {
                    if (l.reviewed === "na") {
                        const booking = document.createElement("div")
                        booking.className = "booking"
                        booking.innerHTML =
                            `
                <p>Start Date : ${l.start_date}</p>
                <p>End_Date : ${l.end_date}</p>
                <p>Payment_Mode : ${l.payment}</p>
                <p>Status of Booking : ${l.status}</p>
                <p>Space Booked : ${l.listing_details.address}</p>
                <div class="makecomment">
                <input type="text" id="review" placeholder="Your Review here">
                <select id="rate">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                </select>
                <input type="hidden" id="booking_id" value=${l._id}>
                <input type="hidden" id="listing_id" value=${l.listing_id}>
                <input type="hidden" id="postedby_user" value=${l.bookedby_user_id}>
                <button type="submit" onclick="postreview()">Post Review</button>
                </div>
                `
                        bookingscontainer.appendChild(booking)
                    }
                    else {
                        const booking = document.createElement("div")
                        booking.className = "booking"
                        booking.innerHTML =
                            `
                <p>Start Date : ${l.start_date}</p>
                <p>End_Date : ${l.end_date}</p>
                <p>Payment_Mode : ${l.payment}</p>
                <p>Status of Booking : ${l.status}</p>
                <p>Space Booked : ${l.listing_details.address}</p>
                <p>Your review Was sent to user</p>
                `
                        bookingscontainer.appendChild(booking)
                    }
                }
            }
        }
    })
}

function postreview() {
    const review = document.getElementById("review").value
    const rate = document.getElementById("rate").value
    try {
        if (review === undefined) throw "Error: review was not passed";
        if (typeof review !== "string") throw "Error: Review passed was not string";
        if (review.trim().length === 0) throw "Error: review cannot be just blank spaces!";
        if (/\d/.test(review)) throw "Error: you cannot have numbers in review!";
        if (review.length > 50 || review.length < 3) throw "Error: Your review should be between 3-50 characters";
        if (/<|>/.test(review)) throw "No injection of tags allowed!"
        if (rate === undefined) throw "Error: Rating was not passed";
        if (typeof rate !== "string") throw "Error: Rating passed was not string";
        if (rate.trim().length === 0) throw "Error: Rating cannot be just blank spaces!";
        if (rate.length > 1) throw "Error: your rating has to be a single number"
        if (/[A-Za-z]/.test(rate)) throw "Error: you cannot have alphabets in rating!";
        if (Number(rate) > 5 || Number(rate) < 1) throw "Error: Rating has to be between 1-5 nothing else;"
        if (/<|>/.test(rate)) throw "No injection of tags allowed!"
    }
    catch (e) {
        var error_div = document.getElementById('error')
        error_div.style.display = "block"
        error_div.textContent = e
        return 
    }
    const booking_id = document.getElementById("booking_id").value
    const listing_id = document.getElementById("listing_id").value
    const postedby_user = document.getElementById("postedby_user").value
    $.ajax({
        url: "http://localhost:7777/postreview",
        data: {
            review: review,
            rating: rate,
            booking_id: booking_id,
            listing_id: listing_id,
            postedby_user: postedby_user,
        },
        type: "POST",
        success: function (res) {
            loadbookings();
        }
    })
}

window.onload = loadbookings