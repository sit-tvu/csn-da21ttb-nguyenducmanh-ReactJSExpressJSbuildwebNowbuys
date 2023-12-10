// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtdnOX5h83hAnyPEeYp9YXQcTZz7r8jBo",
  authDomain: "nowbuys-bc642.firebaseapp.com",
  projectId: "nowbuys-bc642",
  storageBucket: "nowbuys-bc642.appspot.com",
  messagingSenderId: "8686083752",
  appId: "1:8686083752:web:1f8e525f42da4f3b3f2c9d",
  measurementId: "G-GZKH3WP0WH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app)