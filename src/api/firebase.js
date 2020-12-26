import firebase from 'firebase/app'

import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDW7pup2ki-5f2s3Se5iIlLpIa2-dOgPqU",
  authDomain: "squarebook-dev.firebaseapp.com",
  projectId: "squarebook-dev",
  storageBucket: "squarebook-dev.appspot.com",
  messagingSenderId: "1058009780132",
  appId: "1:1058009780132:web:ef3677db00340d18ccfb31",
  measurementId: "G-P08WJYNFG8"
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const storage = firebase.storage();