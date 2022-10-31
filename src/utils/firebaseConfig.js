// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCVTADaHXrwtmEehBTsOl0kVfoqOqrKi5A",
  authDomain: "uprock-app-auth.firebaseapp.com",
  projectId: "uprock-app-auth",
  storageBucket: "uprock-app-auth.appspot.com",
  messagingSenderId: "313047677410",
  appId: "1:313047677410:web:fa646696f497d888f2a1bb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//initialize firebase auth
const auth = getAuth();

export { app, auth };
