// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSSzH3Sizp3CCFbJ7ssUzO4bps6wwabl8",
  authDomain: "menuwise-ed7be.firebaseapp.com",
  databaseURL: "https://menuwise-ed7be-default-rtdb.firebaseio.com",
  projectId: "menuwise-ed7be",
  storageBucket: "menuwise-ed7be.appspot.com",
  messagingSenderId: "786090779059",
  appId: "1:786090779059:web:e7fffbd4b4487e50106bc6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//auth
export const auth = getAuth(app);

//db
export const db = getFirestore(app);