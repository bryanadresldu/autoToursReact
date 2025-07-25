// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPHrTt2mGY-kzWj2zVrJUZ5RwfZFP5Lxg",
  authDomain: "autotours-76e41.firebaseapp.com",
  projectId: "autotours-76e41",
  storageBucket: "autotours-76e41.firebasestorage.app",
  messagingSenderId: "957817547943",
  appId: "1:957817547943:web:5dddab512add8677263f82",
  measurementId: "G-Z2WQBV5NCB"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig)

export const authFirebase= getAuth();
export const dbFirebase= getFirestore();

export default appFirebase;
