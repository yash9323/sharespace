function loadcomments() {
    var error_div = document.getElementById('error')
    error_div.style.display = "none"
    error_div.textContent = ""
    let listingid = document.getElementById("id").value
    let requesturl = "http://localhost:7777/getcomments/" + listingid
    $.ajax({
        url: requesturl,
        type: "GET",
        data: "json",
        success: function (res) {
            const commentContainer = document.getElementById("comments")
            commentContainer.innerHTML = ""
            if(res.length === 0){
                commentContainer.innerText= "No Comments posted as of yet";
                return 
            }
            for (let comment of res) {
                const commenttDiv = document.createElement("div");
                commenttDiv.className = "commentposted"
                commenttDiv.innerHTML =
                    `
                    <div class="commentmade">
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
    var error_div = document.getElementById('error')
    error_div.style.display = "none";
    error_div.textContent = ""
    let listingid = document.getElementById("id").value
    let posturl = "http://localhost:7777/postcomment/" + listingid
    let comment = document.getElementById("comment")
    try{
        if (comment.value === undefined) throw "Error: comment was not passed";
        if (typeof comment.value !== "string") throw "Error: comment passed was not string";
        if (comment.value.trim().length === 0) throw "Error: comment cannot be just blank spaces!";
        if (/\d/.test(comment.value)) throw "Error: you cannot have numbers in comment!";
        if (comment.value.length > 50 || comment.value.length < 3) throw "Error: Your comment should be between 3-50 characters";
        if (/<|>/.test(comment.value)) throw "No injection of tags allowed!"
    }
    catch(e){
        var error_div = document.getElementById('error')
        error_div.style.display = "block"
        error_div.textContent = e
        comment.focus()
        return
    }
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
            if(res.length === 0){
                reviewContainer.innerText= "No reviews yet"
                return 
            }
            for (let review of res){
                const reviewtDiv = document.createElement("div");
                reviewtDiv.className = "reviewposted"
                reviewtDiv.innerHTML =
                `
                <div class="reviewaayahai">   
                <h3>Review is Anonymous</h3>
                <h4>review posoted: ${review.review}</h4>
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