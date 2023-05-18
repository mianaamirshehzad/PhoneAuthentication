// the below Firebase configuration keys belong to ERMAD Project

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyADIAo1mJt1ryhVffgqA2ivxyPsbTp-vBg",
  authDomain: "ermad-c9b9d.firebaseapp.com",
  projectId: "ermad-c9b9d",
  storageBucket: "ermad-c9b9d.appspot.com",
  messagingSenderId: "643964762893",
  appId: "1:643964762893:web:d6018a2d5a90fc856fce44",
  measurementId: "G-HEQCFGELFC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default app;