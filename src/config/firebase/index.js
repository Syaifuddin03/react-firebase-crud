import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
// import "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCjyA3QabFb2MwlT2rbe6tuxbA35WWT1YA",
  authDomain: "simple-notes-fb.firebaseapp.com",
  databaseURL: "https://simple-notes-fb.firebaseio.com",
  projectId: "simple-notes-fb",
  storageBucket: "simple-notes-fb.appspot.com",
  messagingSenderId: "157573519145",
  appId: "1:157573519145:web:95a11b4c5f393fe78c8938",
  measurementId: "G-0NMVXS4YZT",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
export const database = firebase.database();

export default firebase;
