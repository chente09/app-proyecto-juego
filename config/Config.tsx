// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5vUKhquum97F1Prx0v5TXkHODLd6JdAA",
  authDomain: "aplasta-insectos.firebaseapp.com",
  projectId: "aplasta-insectos",
  storageBucket: "aplasta-insectos.appspot.com",
  messagingSenderId: "10832189466",
  appId: "1:10832189466:web:e070515aff3f4a3db8d9a3"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Realtime Database and get a reference to the service
export const db = getDatabase(app);
export const storage = getStorage(app)

// Initialize Firebase Authentication and get a reference to the service
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
