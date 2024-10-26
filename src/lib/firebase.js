import { initializeApp } from "firebase/app";
import { getAnalytics as initializeAnaiytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  // apiKey: import.meta.env.VITE_API_KEY,
  apiKey: "AIzaSyDtONE9xrB1_WHJZD2Z3JT2yhYBRLKotHw",
  authDomain: "reactchat-18af2.firebaseapp.com",
  projectId: "reactchat-18af2",
  storageBucket: "reactchat-18af2.appspot.com",
  messagingSenderId: "732363053389",
  appId: "1:732363053389:web:9a56a80a58bb1c4008ff04",
  measurementId: "G-PDYZ4ZVW58",
};

const app = initializeApp(firebaseConfig);
const getAnalytics = initializeAnaiytics(app);
export const auth = getAuth();
export const db = getFirestore();
export const Storage = getStorage();
