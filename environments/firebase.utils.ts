// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBLxpwFMajfWVQZQ5GqPkDh2OlmKJwJizg",
    authDomain: "quester-io.firebaseapp.com",
    projectId: "quester-io",
    storageBucket: "quester-io.appspot.com",
    messagingSenderId: "881109029331",
    appId: "1:881109029331:web:c030f19f0249c5a27e1f26",
    measurementId: "G-J2ERWG0B90"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);