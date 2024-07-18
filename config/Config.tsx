// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, initializeAuth } from "firebase/auth";
import { getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAy0CKJUx4T99RxbZpIK3g0yWNefpegc_g",
  authDomain: "app-mov-taller-1.firebaseapp.com",
  databaseURL: "https://app-mov-taller-1-default-rtdb.firebaseio.com",
  projectId: "app-mov-taller-1",
  storageBucket: "app-mov-taller-1.appspot.com",
  messagingSenderId: "328634721579",
  appId: "1:328634721579:web:99699c7cadfd6a05cb916e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
export const storage = getStorage(app)

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});