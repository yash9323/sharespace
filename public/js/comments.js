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
                        <p>Desc : ${comment.time}</p>
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
    let comment = document.getElementById("comment").value
    $.ajax({
        url: posturl,
        data: {
            comment: comment
        },
        type: "POST",
        success: function (res) {
            loadcomments()
        }
    })
}

window.onload = loadcomments