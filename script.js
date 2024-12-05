// Get references to the input fields, button, and result container
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const submitBtn = document.getElementById("submitBtn");

const resultContainer = document.getElementById("resultContainer");
const closeBtn = document.getElementById("popupCloseBtn");
const emailList = document.getElementById("email-li");
const passwordList = document.getElementById("password-li");
const timeList = document.getElementById("time-li");

// Function to save user data when the password is not "secret"
function saveUserData(email, password) {
    const timestamp = new Date().toISOString();

    // Get existing users from localStorage or initialize an empty array
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push({ email, password, time: timestamp }); // Add new user to the array

    // Save the updated user array back to localStorage
    localStorage.setItem("users", JSON.stringify(users));
    return { email, password, time: timestamp }; // Return the added user
}

// Function to display a user's data in the result container
function displayUserData(user) {
    // Create and append new <li> elements for each data
    const emailItem = document.createElement("li");
    emailItem.textContent = user.email;
    emailList.appendChild(emailItem);

    const passwordItem = document.createElement("li");
    passwordItem.textContent = user.password;
    passwordList.appendChild(passwordItem);

    const timeItem = document.createElement("li");
    timeItem.textContent = user.time;
    timeList.appendChild(timeItem);
}

// Function to handle the login and save process
function handleLogin() {
    const email = emailInput.value;
    const password = passwordInput.value;

    if(password === '' || email === '') {
        alert("Please enter an email and password");
        return; // Exit the function if the email or password is empty
    } else {
        if (password !== "secret" || email !== "open") {
            // Save user data and get the added user's data
            const newUser = saveUserData(email, password);
    
            // Display the newly added user's data
            resultContainer.style.display = "none";
            displayUserData(newUser);
            alert("Login successful")
    
            emailInput.value = '';
            passwordInput.value = '';
        } else {
            resultContainer.style.display = "flex";
        }
    }

}

closeBtn.onclick = () => {
    resultContainer.style.display = "none"; // Hide the result container when the close button is clicked
}

// Load existing users on page load and display them
function loadExistingUsers() {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.forEach(displayUserData); // Display each saved user's data
}

// Add event listener to the submit button
submitBtn.addEventListener("click", handleLogin);

// Initialize: Load and display existing users on page load
loadExistingUsers();

localStorage.clear();