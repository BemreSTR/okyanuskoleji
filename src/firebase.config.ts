import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDZdZ__Ugi1DfSPSbVKBmTPYJMkKeWDVW4",
    authDomain: "dinakademi-b7252.firebaseapp.com",
    projectId: "dinakademi-b7252",
    storageBucket: "dinakademi-b7252.firebasestorage.app",
    messagingSenderId: "378509939886",
    appId: "1:378509939886:web:6d55dcdab8a6960592c93f",
    measurementId: "G-QMR5WSX415"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const db = getFirestore(app);
export const auth = getAuth(app);
