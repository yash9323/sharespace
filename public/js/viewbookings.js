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
                <p>Start Date :${l.start_date}</p>
                <p>End_Date :${l.end_date}</p>
                <p>Payment_Mode :${l.payment}</p>
                <p>Status of Booking :${l.status}</p>
                <p>Space Booked :${l.listing_details.address}</p>
                `
                    bookingscontainer.appendChild(booking)
                }
                if (l.status === "expired") {
                    if (l.reviewed === "na") {
                        const booking = document.createElement("div")
                        booking.className = "booking"
                        booking.innerHTML =
                            `
                <p>Start Date :${l.start_date}</p>
                <p>End_Date :${l.end_date}</p>
                <p>Payment_Mode :${l.payment}</p>
                <p>Status of Booking :${l.status}</p>
                <p>Space Booked :${l.listing_details.address}</p>
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
                <p>Start Date :${l.start_date}</p>
                <p>End_Date :${l.end_date}</p>
                <p>Payment_Mode :${l.payment}</p>
                <p>Status of Booking :${l.status}</p>
                <p>Space Booked :${l.listing_details.address}</p>
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
    const booking_id = document.getElementById("booking_id").value
    const listing_id = document.getElementById("listing_id").value
    const postedby_user = document.getElementById("postedby_user").value
    $.ajax({
        url: "http://localhost:7777/postreview",
        data: {
            review:review,
            rating:rate,
            booking_id:booking_id,
            listing_id:listing_id,
            postedby_user: postedby_user,
        },
        type: "POST",
        success: function (res) {
            loadbookings();
        }
    })
}

window.onload = loadbookings