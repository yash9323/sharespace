function loadcomments() {
    let listingid = document.getElementById("id").value
    let requesturl = "http://localhost:7777/getcomments/" + listingid
    $.ajax({
        url: requesturl,
        type: "GET",
        data: "json",
        success: function (res) {
            const commentContainer = document.getElementById("comments")
            commentContainer.innerHTML = ""
            for (let comment of res) {
                const commenttDiv = document.createElement("div");
                commenttDiv.className = "commentposted"
                commenttDiv.innerHTML =
                    `
                    <div>
                        <h2>${comment.comment}</h2>
                        <p>Time :${comment.time}</p>
                        <p>Comment Made By user ${comment.fname} ${comment.lname}
                    </div>
            `;
                commentContainer.appendChild(commenttDiv);
            }
        }
    })
}

function postcomment() {
    let listingid = document.getElementById("id").value
    let posturl = "http://localhost:7777/postcomment/" + listingid
    let comment = document.getElementById("comment")
    $.ajax({
        url: posturl,
        data: {
            comment: comment.value
        },
        type: "POST",
        success: function (res) {
            comment.value = ""
            loadcomments()
        }
    })
}

function loadreviews() {
    let listingid = document.getElementById("id").value
    let requesturl = "http://localhost:7777/getreviewsforlisting/" + listingid
    $.ajax({
        url: requesturl,
        type: "GET",
        data: "json",
        success: function (res) {
            const reviewContainer = document.getElementById("reviews")
            reviewContainer.innerHTML = ""
            for (let review of res){
                console.log(review)
                const reviewtDiv = document.createElement("div");
                reviewtDiv.className = "reviewposted"
                reviewtDiv.innerHTML =
                `
                <div>   
                <h2>Rating is Anonymous</h2>
                <h2>${review.review}</h2>
                <p>Rating : ${review.rating}</p>
                </div>
                `;
                reviewContainer.appendChild(reviewtDiv);
            }
        }
    })
}

window.onload = loadcomments
loadreviews()