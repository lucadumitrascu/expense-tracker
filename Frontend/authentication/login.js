let submitLoginForm = document.getElementById("form-login");
let email;

submitLoginForm.addEventListener("submit", async function(event) {
    // Prevent form from submitting normally
    event.preventDefault();

    email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    // Make POST request
    try {
        const response = await fetch(
            "http://localhost:8080/authentication/login",
            {
                credentials: "include",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: email, password: password }),
            }
        );
        if (response.status === 200) {
            // Send user email in index.html
            localStorage.setItem("userEmail", email);
            // Redirect to success page if authentication is successful
            window.location.href = "../index.html"; 
        } else {
            const errorData = await response.json();
            showError();   
        }
    } catch (error) {
        showError();  
    }
});

document.getElementById("btn-register").addEventListener("click", function(){
window.location.href = "register.html";
});

let spanError = document.createElement('span');
let divButtons = document.getElementById("div-buttons");

function showError() {
    spanError.classList.add('span-error'); 
    spanError.innerText = "Email or password are incorrect!"; 
    submitLoginForm.insertBefore(spanError, divButtons); 
    setTimeout(function () {
        spanError.remove(); 
    }, 5000);
}