// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDlWh5B0M52Z5PIRbdcucfoamGQY9wn3Bc",
  authDomain: "attacker-af70c.firebaseapp.com",
  projectId: "attacker-af70c",
  storageBucket: "attacker-af70c.firebasestorage.app",
  messagingSenderId: "777825238839",
  appId: "1:777825238839:web:40a888d1b0f0ce610fe4b2",
  measurementId: "G-PESBET4PR3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);


const googleProvider = new GoogleAuthProvider();
export { app, auth, analytics,googleProvider };
