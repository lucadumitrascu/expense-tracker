let submitRegisterForm = document.getElementById("form-register");
let email;
submitRegisterForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let username = document.getElementById("username").value;

    // Make POST request
    try {
        const response = await fetch(
            "http://localhost:8080/api/authentication/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: email, password: password, username: username }),
            }
        );

        if (response.ok) {
           // Send user email in index.html
           localStorage.setItem("userEmail", email);
           // Redirect to success page if authentication is successful
           window.location.href = "login.html"; 
        } else {
            showError();
        }
    } catch (error) {
        showError();
    }
});


document.getElementById("btn-login").addEventListener("click", function(){
    window.location.href = "login.html";
});


let spanError = document.createElement('span');
let divButtons = document.getElementById("div-buttons");

function showError() {
    spanError.classList.add('span-error'); 
    spanError.innerText = "Something went wrong!"; 
    submitRegisterForm.insertBefore(spanError, divButtons); 
    setTimeout(function () {
        spanError.remove(); 
    }, 5000);
}
