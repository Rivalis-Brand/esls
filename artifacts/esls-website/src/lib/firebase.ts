import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBGswa2rIAqxeSUH-qS5snjhPM4VMFCTvU",
  authDomain: "esls-23c31.firebaseapp.com",
  projectId: "esls-23c31",
  storageBucket: "esls-23c31.firebasestorage.app",
  messagingSenderId: "27254969520",
  appId: "1:27254969520:web:24292264c011e9a83f9775",
  measurementId: "G-TGL98JC3W7"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
