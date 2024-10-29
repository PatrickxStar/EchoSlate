// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9w_PQS8HnG4q4PjW8fQN1isBzftDeZBE",
  authDomain: "testechoslate.firebaseapp.com",
  projectId: "testechoslate",
  storageBucket: "testechoslate.appspot.com",
  messagingSenderId: "987831629951",
  appId: "1:987831629951:web:f37aeba48e5fc10b6ce74a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Function to update the user information in the header
function updateUserHeader(email) {
  const userHeader = document.getElementById("userHeader");
  const userDropdown = document.getElementById("userDropdown");

  if (userHeader && userDropdown) {
    userHeader.textContent = email;
    userHeader.style.display = "block";
    localStorage.setItem("loggedInEmail", email); // Store email in localStorage for persistence
    console.log("Email set in header and localStorage:", email); // Debugging
  }
}

// Restore email from localStorage if user is logged in
document.addEventListener("DOMContentLoaded", () => {
  const savedEmail = localStorage.getItem("loggedInEmail");
  if (savedEmail) {
    updateUserHeader(savedEmail);
  } else {
    console.log("No email found in localStorage.");
  }
});

// Auth state listener to handle session persistence across all pages
onAuthStateChanged(auth, (user) => {
  if (user) {
    updateUserHeader(user.email);
  } else {
    const userHeader = document.getElementById("userHeader");
    if (userHeader) {
      userHeader.style.display = "none";
    }
    localStorage.removeItem("loggedInEmail"); // Clear email from localStorage if logged out
  }
});

// Handle login form submission
document.getElementById("loginForm")?.addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("Login successful!");
      location.reload(); // Reload to apply changes across all pages
    })
    .catch((error) => {
      alert(`Error: ${error.message}`);
    });
});

// Handle logout
document.getElementById("logoutButton")?.addEventListener("click", () => {
  signOut(auth).then(() => {
    alert("Logged out!");
    localStorage.removeItem("loggedInEmail"); // Clear email from localStorage
    location.reload(); // Refresh the page to clear the UI
  }).catch((error) => {
    alert(`Error: ${error.message}`);
  });
});