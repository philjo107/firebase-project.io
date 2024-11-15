// Import Firebase libraries
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC1tMX90FNlZRj4zggg9s_Z9FMi1Ip5Xvg",
    authDomain: "project-c04ea.firebaseapp.com",
    projectId: "project-c04ea",
    storageBucket: "project-c04ea.firebasestorage.app",
    messagingSenderId: "470236085516",
    appId: "1:470236085516:web:092b0c30ec755dd8a79d29",
    measurementId: "G-HEXKCGYR7F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// Register User
document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('registerName').value;
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;
  const message = document.getElementById('registerMessage');

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save user data locally
    localStorage.setItem('user', JSON.stringify({ name, email }));

    // Save user data to Firebase Realtime Database
    await set(ref(database, 'users/' + user.uid), { name, email });

    message.textContent = "Registration successful!";
    message.style.color = "green";
  } catch (error) {
    message.textContent = error.message;
    message.style.color = "red";
  }
});

// Login User
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  const message = document.getElementById('loginMessage');

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Retrieve user data locally
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.email === email) {
      message.textContent = `Welcome back, ${storedUser.name}!`;
    } else {
      message.textContent = "Login successful!";
    }
    message.style.color = "green";
  } catch (error) {
    message.textContent = error.message;
    message.style.color = "red";
  }
});
