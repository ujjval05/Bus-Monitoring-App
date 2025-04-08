// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; 


// Your Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyBN8U7WlUX8C7Rrtmr26fmQP_vJDt5B3-w",
    authDomain: "busmonitoring-e3324.firebaseapp.com",
    projectId: "busmonitoring-e3324",
    storageBucket: "busmonitoring-e3324.firebasestorage.app",
    messagingSenderId: "504076261828",
    appId: "1:504076261828:web:e2f23f2aad7aa0e45eac91",
    //measurementId: "G-ENC8YYQXPE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

//Initialize Firebase Authentication
const auth = getAuth(app);


export { db,auth };
