// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore } from "firebase/firestore";
import {getAuth} from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3ddCzVOwkvhs98ttRNP7ckH0h4lhcNns",
  authDomain: "finance-tracker-96a97.firebaseapp.com",
  projectId: "finance-tracker-96a97",
  storageBucket: "finance-tracker-96a97.appspot.com",
  messagingSenderId: "473536351854",
  appId: "1:473536351854:web:a29844922dba92edea607f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth(app)

export {db, auth};
