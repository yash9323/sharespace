let form = document.querySelector('form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    let fname = document.getElementById('fname')
    let lname = document.getElementById('lname')
    let email = document.getElementById('email')
    let password = document.getElementById('password')
    let confirmpassword = document.getElementById('confirmpassword')
    let phone_no = document.getElementById('phone_no')
    try {
        if (fname.value === undefined) throw "Error: First Name not passed";
        if (typeof fname.value !== "string") throw "Error: First Name passed is not String!"
        if (fname.value.trim().length === 0) throw "Error: First Name passed only has empty spaces"
        if (/\d/.test(fname.value)) throw "Error: First Name Passed had numbers not accepted"
        if (fname.value.length < 2 || fname.value.length > 25) throw "Error: First Name should be between 2-25 characters"
        if (lname.value === undefined) throw "Error: Last Name not passed";
        if (typeof lname.value !== "string") throw "Error: Last Name passed is not String!"
        if (lname.value.trim().length === 0) throw "Error: Last Name passed only has empty spaces"
        if (/\d/.test(lname.value)) throw "Error: Last Name Passed had numbers not accepted"
        if (lname.value.length < 2 || lname.value.length > 25) throw "Error: Last Name should be between 2-25 characters"
        if (email.value === undefined) throw "Error: Email Adress not passed";
        if (typeof email.value !== "string") throw "Error: Email Adress passed is not String!"
        if (email.value.trim().length === 0) throw "Error: Email Adress passed only has empty spaces"
        email.value = email.value.toLowerCase()
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) throw "Error: Incorrect format of Email Address"
        if (password.value === undefined) throw "Error: password not passed";
        if (typeof password.value !== "string") throw "Error: password passed is not String!"
        if (password.value.trim().length === 0) throw "Error: password passed only has empty spaces"
        if (/\s/.test(password.value)) throw "Error: Password cannot contain empty spaces"
        if (password.value.length < 8) throw "Error: the Password must have atleast 8 characters"
        if (!/[A-Z]/.test(password.value)) throw "Error: Password must contain 1 capital letter"
        if (!/\d/.test(password.value)) throw "Error: Password must contain 1 number"
        if (!/[!@{}|:";'<>#\$%\^&\*\(\),\?\.\\\+~\-=\[\]/]/.test(password.value)) throw "Error: Password must contain 1 special character"
        if (confirmpassword.value === undefined) throw "Error: password not passed";
        if (typeof confirmpassword.value !== "string") throw "Error: password passed is not String!"
        if (confirmpassword.value.trim().length === 0) throw "Error: password passed only has empty spaces"
        if (/\s/.test(confirmpassword.value)) throw "Error: Password cannot contain empty spaces"
        if (confirmpassword.value.length < 8) throw "Error: the Password must have atleast 8 characters"
        if (!/[A-Z]/.test(confirmpassword.value)) throw "Error: Password must contain 1 capital letter"
        if (!/\d/.test(confirmpassword.value)) throw "Error: Password must contain 1 number"
        if (!/[!@{}|:";'<>#\$%\^&\*\(\),\?\.\\\+~\-=\[\]/]/.test(confirmpassword.value)) throw "Error: Password must contain 1 special character"
        if (password.value !== confirmpassword.value) throw "Error: Confirm password and password do not match"
        if (phone_no.value === undefined) throw "Error: Phone number not passed";
        if (typeof phone_no.value !== "string") throw "Error: phone number not string"
        if (!/[0-9]{10}/.test(phone_no.value)) throw "Error: Phone number should have 10 digits and only numbers"
    }
    catch (e) {
        var error_div = document.getElementById('error')
        error_div.style.display = "block"
        error_div.textContent = e
        fname.focus()
        return
    }
    form.submit()
})