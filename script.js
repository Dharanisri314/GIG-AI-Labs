// const firebaseConfig = {
//   apiKey: "AIzaSyArGYvELVRxlCQHVY-IAihp9Nr7ViUiWgk",
//   authDomain: "gig-ai-labs.firebaseapp.com",
//   projectId: "gig-ai-labs",
//   storageBucket: "gig-ai-labs.appspot.com",
//   messagingSenderId: "156913951857",
//   appId: "1:156913951857:web:4aea5f6243f4e5d86127d0"
// };

// // Init Firebase
// firebase.initializeApp(firebaseConfig);
// const auth = firebase.auth();
// const db = firebase.firestore();

// // Helper to clear errors
// function clearErrors() {
//   document.querySelectorAll('.error').forEach(el => el.textContent = "");
// }

// // Initialize logout flag if not present
// if (!localStorage.getItem("logoutFlag")) {
//   localStorage.setItem("logoutFlag", "false");
// }

// // Block direct access to cosmo1.5.html if logged out or not logged in
// window.addEventListener("load", () => {
//   const page = window.location.pathname.split("/").pop();
//   auth.onAuthStateChanged(user => {
//     if (page === "cosmo1.5.html") {
//       if (!user || localStorage.getItem("logoutFlag") === "true") {
//         window.location.href = "index.html";
//       }
//     }
//   });
// });

// // ===== LOGIN FUNCTION =====
// // LOGIN FUNCTION
// function logIn() {
//   clearErrors();
//   const email = document.getElementById("loginEmail").value.trim();
//   const password = document.getElementById("loginPassword").value;

//   firebase.auth().signInWithEmailAndPassword(email, password)
//     .then(userCredential => {
//       const user = userCredential.user;
//       alert(`Welcome ${user.displayName || "User"}!`);
//       localStorage.setItem("logoutFlag", "false");
//       window.location.href = "cosmo1.5.html";
//     })
//     .catch(error => {
//       console.log("Login Error:", error.code, error.message);
//       if (error.code === "auth/user-not-found") {
//         document.getElementById("loginEmailError").textContent = "User not found. Signup first.";
//       } else if (error.code === "auth/wrong-password") {
//         document.getElementById("loginPasswordError").textContent = "Wrong password.";
//       } else if (error.code === "auth/invalid-email") {
//         document.getElementById("loginEmailError").textContent = "Enter a valid email.";
//       } else if (error.code === "auth/too-many-requests") {
//         document.getElementById("loginPasswordError").textContent = "Too many failed attempts. Try again later.";
//       } else {
//         document.getElementById("loginPasswordError").textContent = "Login failed. Try again.";
//       }
//     });
// }


// // SIGNUP FUNCTION
// function signUp() {
//   clearErrors();
//   const name = document.getElementById("signupName").value.trim();
//   const email = document.getElementById("signupEmail").value.trim();
//   const password = document.getElementById("signupPassword").value;

//   auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
//     .then(() => auth.createUserWithEmailAndPassword(email, password))
//     .then(userCredential => {
//       const user = userCredential.user;

//       // Update display name
//       return user.updateProfile({ displayName: name }).then(() => user);
//     })
//     .then(user => {
//       // Store user info in Firestore (without password for security)
//       return db.collection("users").doc(user.uid).set({
//         name: name,
//         email: email,
//         uid: user.uid,
//         createdAt: new Date().toISOString()
//       });
//     })
//     .then(() => {
//       localStorage.setItem("logoutFlag", "false");
//       alert("Account created successfully and stored in Firestore!");
//       window.location.href = "cosmo1.5.html";
//     })
//     .catch(error => {
//       if (error.code === "auth/email-already-in-use") {
//         document.getElementById("signupEmailError").textContent = "Email is already registered, please login instead.";
//       } else if (error.code === "auth/invalid-email") {
//         document.getElementById("signupEmailError").textContent = "Enter a valid email.";
//       } else if (error.code === "auth/weak-password") {
//         document.getElementById("signupPasswordError").textContent = "Password must be at least 6 characters.";
//       } else {
//         document.getElementById("signupPasswordError").textContent = "Signup failed. Try again.";
//       }
//     });
// }


// // LOGOUT FUNCTION
// function logOut() {
//   auth.signOut()
//     .then(() => {
//       localStorage.setItem("logoutFlag", "true"); // mark as logged out
//       alert("Logged out successfully!");
//       window.location.href = "index.html";
//     })
//     .catch(error => console.log("Logout Error:", error.message));
// }
// // BLOCK ACCESS TO PROTECTED PAGE
// window.addEventListener("load", () => {
//   const page = window.location.pathname.split("/").pop();
//   auth.onAuthStateChanged(user => {
//     if (page === "cosmo1.5.html" && (!user || localStorage.getItem("logoutFlag") === "true")) {
//       window.location.href = "index.html";
//     }
//   });
// });



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
const db = firebase.firestore(); // 🔥 Firestore initialized

// Helper to clear errors
function clearErrors() {
  document.querySelectorAll('.error').forEach(el => el.textContent = "");
}

// Initialize logout flag if not present
if (!localStorage.getItem("logoutFlag")) {
  localStorage.setItem("logoutFlag", "false");
}

// ===== LOGIN FUNCTION =====
function logIn() {
  clearErrors();
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      const user = userCredential.user;
      alert(`Welcome ${user.displayName || "User"}!`);
      localStorage.setItem("logoutFlag", "false");
      window.location.href = "cosmo1.5.html";
    })
    .catch(error => {
      console.log("Login Error:", error.code, error.message);
      if (error.code === "auth/user-not-found") {
        document.getElementById("loginEmailError").textContent = "User not found. Signup first.";
      } else if (error.code === "auth/wrong-password") {
        document.getElementById("loginPasswordError").textContent = "Wrong password.";
      } else if (error.code === "auth/invalid-email") {
        document.getElementById("loginEmailError").textContent = "Enter a valid email.";
      } else if (error.code === "auth/too-many-requests") {
        document.getElementById("loginPasswordError").textContent = "Too many failed attempts. Try again later.";
      } else {
        document.getElementById("loginPasswordError").textContent = "Login failed. Try again.";
      }
    });
}

// ===== SIGNUP FUNCTION =====
function signUp() {
  clearErrors();
  const name = document.getElementById("signupName").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value;

  auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => auth.createUserWithEmailAndPassword(email, password))
    .then(userCredential => {
      const user = userCredential.user;

      // Update display name
      return user.updateProfile({ displayName: name }).then(() => user);
    })
    .then(user => {
      // 🔥 Store user info in Firestore (safe)
      return db.collection("users").doc(user.uid).set({
        name: name,
        email: email,
        uid: user.uid,
        createdAt: new Date().toISOString()
      });
    })
    .then(() => {
      localStorage.setItem("logoutFlag", "false");
      alert("Account created successfully and stored in Firestore!");
      window.location.href = "cosmo1.5.html";
    })
    .catch(error => {
      if (error.code === "auth/email-already-in-use") {
        document.getElementById("signupEmailError").textContent = "Email is already registered, please login instead.";
      } else if (error.code === "auth/invalid-email") {
        document.getElementById("signupEmailError").textContent = "Enter a valid email.";
      } else if (error.code === "auth/weak-password") {
        document.getElementById("signupPasswordError").textContent = "Password must be at least 6 characters.";
      } else {
        document.getElementById("signupPasswordError").textContent = "Signup failed. Try again.";
      }
    });
}

// ===== LOGOUT FUNCTION =====
function logOut() {
  auth.signOut()
    .then(() => {
      localStorage.setItem("logoutFlag", "true");
      alert("Logged out successfully!");
      window.location.href = "index.html";
    })
    .catch(error => console.log("Logout Error:", error.message));
}

// ===== BLOCK ACCESS TO PROTECTED PAGE =====
window.addEventListener("load", () => {
  const page = window.location.pathname.split("/").pop();
  auth.onAuthStateChanged(user => {
    if (page === "cosmo1.5.html" && (!user || localStorage.getItem("logoutFlag") === "true")) {
      window.location.href = "index.html";
    }
  });
});
