// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCqTvCVP-VZGoSwx0dI6JTv4QHERdfhK0o",
  authDomain: "bake-sale-d2719.firebaseapp.com",
  projectId: "bake-sale-d2719",
  storageBucket: "bake-sale-d2719.appspot.com",
  messagingSenderId: "458125989493",
  appId: "1:458125989493:web:43d9e47d746a51aa614a3c",
  measurementId: "G-TF2Y1J3HGG",
};

console.log(firebaseConfig);
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
