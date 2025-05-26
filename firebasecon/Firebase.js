// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyAZwD4F-jTPCIkWWyMMCgpF9zMUQ90vqXk",
  authDomain: "emsdirectaid.firebaseapp.com",
  projectId: "emsdirectaid",
  storageBucket: "emsdirectaid.appspot.com",
  messagingSenderId: "262681042121",
  appId: "1:262681042121:web:379a9d9b9194d4cd6d0118",
  measurementId: "G-R4TS1QLBS2"
};


const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const firestore = getFirestore(app);
const db = getFirestore(app);


export { auth, firestore, db, collection, addDoc, Timestamp };