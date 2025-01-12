// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // Untuk Firebase Authentication
import { getFirestore } from "firebase/firestore"; // Opsional, jika Anda menggunakan Firestore
import { getDatabase } from "firebase/database"; // Opsional, jika Anda menggunakan Realtime Database
import { getStorage } from "firebase/storage"; // Opsional, jika Anda menggunakan Cloud Storage

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5sS0ReZZYCO8A15hhXwMc4j4ALAkNO1A",
  authDomain: "projek-29933.firebaseapp.com",
  databaseURL: "https://projek-29933-default-rtdb.firebaseio.com",
  projectId: "projek-29933",
  storageBucket: "projek-29933.firebasestorage.app",
  messagingSenderId: "804526422995",
  appId: "1:804526422995:web:774f929bba56c9120e8d26",
  measurementId: "G-6P08B1EK49"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Analytics
const analytics = getAnalytics(app);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize Firestore (Jika dibutuhkan)
const firestore = getFirestore(app);

// Initialize Firebase Realtime Database (Jika dibutuhkan)
const database = getDatabase(app);

// Initialize Firebase Storage (Jika dibutuhkan)
const storage = getStorage(app);

// Export semua yang diinisialisasi untuk digunakan di aplikasi
export { app, auth, firestore, database, storage, analytics };
