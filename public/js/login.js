let form = document.querySelector('form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    let email = document.getElementById('email')
    let password = document.getElementById('password')
    try{
        email.value = email.value.toLowerCase()
        if (email.value === undefined) throw "Error: Email Adress not passed";
        if (typeof email.value !== "string") throw "Error: Email Adress passed is not String!"
        if (email.value.trim().length === 0) throw "Error: Email Adress passed only has empty spaces"
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) throw "Error: Incorrect format of Email Address"
        if (/<|>/.test(email.value)) throw "No injection of tags allowed!"
        if (password.value === undefined) throw "Error: password not passed";
        if (typeof password.value !== "string") throw "Error: password passed is not String!"
        if (password.value.trim().length === 0) throw "Error: password passed only has empty spaces"
        if (/\s/.test(password.value)) throw "Error: Password cannot contain empty spaces"
        if (password.value.length < 8) throw "Error: the Password must have atleast 8 characters"
        if (!/[A-Z]/.test(password.value)) throw "Error: Password must contain 1 capital letter"
        if (!/\d/.test(password.value)) throw "Error: Password must contain 1 number"
        if (!/[!@{}|:";'<>#\$%\^&\*\(\),\?\.\\\+~\-=\[\]/]/.test(password.value)) throw "Error: Password must contain 1 special character";
    }
    catch(e){
        var error_div = document.getElementById('error')
        error_div.style.display = "block"
        error_div.textContent = e
        email.focus()
        return 
    }
    email.value = email.value.trim()
    password.value = password.value.trim()
    form.submit()
})