import firebase from "firebase/app";
//const env = process.env;

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//ideally this would be hidden behind a gitignore but need to get .env file working, there is a value parsing error (known error for firebase). Not sure how to resolve it at this time.
//source : https://github.com/mortezasabihi/vue-firebase-auth/blob/master/src/firebase.js 
const firebaseConfig = {
  apiKey: "AIzaSyCKv8JlZisXPsuu3RMIpY3o13OCZ8h65A8",
  authDomain: "bbbs-applicant-portal.firebaseapp.com",
  databaseURL: "https://bbbs-applicant-portal.firebaseio.com",
  projectId: "bbbs-applicant-portal",
  storageBucket: "bbbs-applicant-portal.appspot.com",
  messagingSenderId: "4468871993",
  appId: "1:4468871993:web:97201aa3c2304e07080ee8",
  measurementId: "G-PERE0FG5PD"
};

firebase.initializeApp(firebaseConfig);
