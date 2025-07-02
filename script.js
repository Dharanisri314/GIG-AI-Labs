// script.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// 🔁 Replace this with your own Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyArGYvELVRxlCQHVY-IAihp9Nr7ViUiWgk",
  authDomain: "gig-ai-labs.firebaseapp.com",
  projectId: "gig-ai-labs",
  storageBucket: "gig-ai-labs.appspot.com",
  messagingSenderId: "156913951857",
  appId: "1:156913951857:web:4aea5f6243f4e5d86127d0"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 🆕 Signup
window.signUp = function () {
  const name = document.getElementById("signupName").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Set display name
      return updateProfile(userCredential.user, {
        displayName: name,
      });
    })
    .then(() => {
      alert("Signup successful! Please login.");
      window.location.href = "login.html";
    })
    .catch((error) => {
      alert(error.message);
    });
};

// 🔐 Login
window.logIn = function () {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      alert("Welcome, " + user.displayName + "!");
      // Redirect to dashboard or main page
      // window.location.href = "dashboard.html";
    })
    .catch((error) => {
      alert(error.message);
    });
};

// 🔁 Header nav "Log In" click logic – auto check login status
window.addEventListener("DOMContentLoaded", () => {
  const loginNav = document.getElementById("loginRedirect");
  if (loginNav) {
    loginNav.addEventListener("click", (e) => {
      e.preventDefault();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User already logged in – go to login or dashboard
          window.location.href = "login.html"; // Or "dashboard.html"
        } else {
          // User not logged in – go to signup
          window.location.href = "index.html";
        }
      });
    });
  }
});
