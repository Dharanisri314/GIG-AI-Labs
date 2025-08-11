// // script.js
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   updateProfile,
//   onAuthStateChanged
// } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// // 🔁 Replace this with your own Firebase config
// const firebaseConfig = {
//   apiKey: "AIzaSyArGYvELVRxlCQHVY-IAihp9Nr7ViUiWgk",
//   authDomain: "gig-ai-labs.firebaseapp.com",
//   projectId: "gig-ai-labs",
//   storageBucket: "gig-ai-labs.appspot.com",
//   messagingSenderId: "156913951857",
//   appId: "1:156913951857:web:4aea5f6243f4e5d86127d0"
// };

// // ✅ Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// // 🆕 Signup
// window.signUp = function () {
//   const name = document.getElementById("signupName").value;
//   const email = document.getElementById("signupEmail").value;
//   const password = document.getElementById("signupPassword").value;

//   createUserWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       // Set display name
//       return updateProfile(userCredential.user, {
//         displayName: name,
//       });
//     })
//     .then(() => {
//       alert("Signup successful! Please login.");
//       window.location.href = "login.html";
//     })
//     .catch((error) => {
//       alert(error.message);
//     });
// };

// // 🔐 Login
// window.logIn = function () {
//   const email = document.getElementById("loginEmail").value;
//   const password = document.getElementById("loginPassword").value;

//   signInWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       const user = userCredential.user;
//       alert("Welcome, " + user.displayName + "!");
//       // Redirect to dashboard or main page
//       // window.location.href = "dashboard.html";
//     })
//     .catch((error) => {
//       alert(error.message);
//     });
// };

// // 🔁 Header nav "Log In" click logic – auto check login status
// window.addEventListener("DOMContentLoaded", () => {
//   const loginNav = document.getElementById("loginRedirect");
//   if (loginNav) {
//     loginNav.addEventListener("click", (e) => {
//       e.preventDefault();
//       onAuthStateChanged(auth, (user) => {
//         if (user) {
//           // User already logged in – go to login or dashboard
//           window.location.href = "login.html"; // Or "dashboard.html"
//         } else {
//           // User not logged in – go to signup
//           window.location.href = "index.html";
//         }
//       });
//     });
//   }
// });

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyArGYvELVRxlCQHVY-IAihp9Nr7ViUiWgk",
  authDomain: "gig-ai-labs.firebaseapp.com",
  projectId: "gig-ai-labs",
  storageBucket: "gig-ai-labs.appspot.com",
  messagingSenderId: "156913951857",
  appId: "1:156913951857:web:4aea5f6243f4e5d86127d0"
};

// Init Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Helper to clear all error messages
function clearErrors() {
  const errors = document.querySelectorAll('.error');
  errors.forEach(el => el.textContent = "");
}

function logIn() {
  clearErrors();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  // Bypass fetchSignInMethodsForEmail
  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      alert(`Welcome ${user.displayName || "User"}!`);
      window.location.href = "https://cosmo1-5.vercel.app/";
    })
    .catch((error) => {
      console.log("Login Error:", error.code, error.message);
      if (error.code === "auth/user-not-found") {
        document.getElementById("loginEmailError").textContent =
          "You don't have an account yet. Please sign up first.";
      } else if (error.code === "auth/wrong-password") {
        document.getElementById("loginPasswordError").textContent =
          "Wrong password. Try again.";
      } else if (error.code === "auth/invalid-email") {
        document.getElementById("loginEmailError").textContent =
          "Invalid email format.";
      } else if (error.code === "auth/too-many-requests") {
        document.getElementById("loginPasswordError").textContent =
          "Too many failed attempts. Try again later.";
      } else {
        document.getElementById("loginPasswordError").textContent =
          error.message || "Login failed. Please try again.";
      }
    });
}

// 🆕 Signup function
function signUp() {
  clearErrors();

  const name = document.getElementById("signupName").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      return userCredential.user.updateProfile({
        displayName: name
      });
    })
    .then(() => {
      alert("Account created successfully!");
      window.location.href = "https://cosmo1-5.vercel.app/"; // Redirect to website
    })
    .catch((error) => {
      console.log("Signup Error:", error.code);
      if (error.code === "auth/email-already-in-use") {
        document.getElementById("signupEmailError").textContent =
          "Email is already registered.";
      } else if (error.code === "auth/invalid-email") {
        document.getElementById("signupEmailError").textContent =
          "Enter a valid email.";
      } else if (error.code === "auth/weak-password") {
        document.getElementById("signupPasswordError").textContent =
          "Password must be at least 6 characters.";
      } else {
        document.getElementById("signupPasswordError").textContent =
          "Signup failed. Please try again.";
      }
    });
}
