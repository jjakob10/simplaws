import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9L48U-0tVlsadnVr8setXrbDhGnTugv0",
  authDomain: "simplaws.firebaseapp.com",
  projectId: "simplaws",
  storageBucket: "simplaws.appspot.com",
  messagingSenderId: "572060891413",
  appId: "1:572060891413:web:b8338886d8fa98b44cd11c",
  measurementId: "G-PG4SW31XLG"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth };