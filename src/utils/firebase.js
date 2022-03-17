// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCqjzd66n-r-ylFYNbeXdhEukXW2TmPhYM",
  authDomain: "study-space-finder-a5968.firebaseapp.com",
  databaseURL: "https://study-space-finder-a5968-default-rtdb.firebaseio.com",
  projectId: "study-space-finder-a5968",
  storageBucket: "study-space-finder-a5968.appspot.com",
  messagingSenderId: "231336110671",
  appId: "1:231336110671:web:9844641d4e6545a775983a",
  measurementId: "G-GFBY64PEGM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app