import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBGswa2rIAqxeSUH-qS5snjhPM4VMFCTvU",
  authDomain: "esls-23c31.firebaseapp.com",
  projectId: "esls-23c31",
  storageBucket: "esls-23c31.appspot.com",
  messagingSenderId: "246777451962",
  appId: "1:246777451962:web:placeholder",
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
