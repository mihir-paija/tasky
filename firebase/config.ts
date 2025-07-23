import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, initializeFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBiTuCSs1A5iW8vtuIx4CXl_ZDtSLWH3as",
  authDomain: "tasky-d0764.firebaseapp.com",
  projectId: "tasky-d0764",
  storageBucket: "tasky-d0764.firebasestorage.app",
  messagingSenderId: "366267328132",
  appId: "1:366267328132:web:482be6e1fa950d45c4c4d1",
  measurementId: "G-THPDEZRSRH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const db = getFirestore(app);

export { app, auth, db };