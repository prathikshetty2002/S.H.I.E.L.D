import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCgBmgG8xuQkIa9rvynRBN40MZiYJPFJ-g",
  authDomain: "shield-4bb39.firebaseapp.com",
  projectId: "shield-4bb39",
  storageBucket: "shield-4bb39.appspot.com",
  messagingSenderId: "871641303352",
  appId: "1:871641303352:web:173d8e2f05c537f70619cd",
  measurementId: "G-FJ9CL387R6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
export {auth}