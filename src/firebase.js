// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLW04xPv0imCCmmEdCb68iWTPp4FzcDaQ",
  authDomain: "job-application-form-d2df3.firebaseapp.com",
  databaseURL: "https://job-application-form-d2df3-default-rtdb.firebaseio.com",
  projectId: "job-application-form-d2df3",
  storageBucket: "job-application-form-d2df3.appspot.com",
  messagingSenderId: "398155749866",
  appId: "1:398155749866:web:f51927087816564bcd3a93",
  measurementId: "G-76VTLTZF00"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

export default database;