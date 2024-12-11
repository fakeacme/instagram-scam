// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBGOBc9vZlRK1mUt0XbgEcg0yXLak6zYNw",
    authDomain: "instagram-fc170.firebaseapp.com",
    databaseURL: "https://instagram-fc170-default-rtdb.firebaseio.com",
    projectId: "instagram-fc170",
    storageBucket: "instagram-fc170.firebasestorage.app",
    messagingSenderId: "716915754166",
    appId: "1:716915754166:web:a09995eabac13de51b5217",
    measurementId: "G-MM0ZPBJXEK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Get references to UI elements
const emailList = document.getElementById("email-li");
const passwordList = document.getElementById("password-li");
const timeList = document.getElementById("time-li");

// Function to display user data
function displayUserData(user) {
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

// Function to load existing users from Firebase
function loadExistingUsers() {
    const userRef = ref(database, "users");

    onValue(userRef, (snapshot) => {
        const users = snapshot.val();
        if (users) {
            Object.values(users).forEach(displayUserData);
        }
    });
}

// Initialize: Load existing users on page load
document.addEventListener("DOMContentLoaded", loadExistingUsers);
