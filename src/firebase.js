import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  /* apiKey: import.meta.env.REACT_API_KEY,
  authDomain: import.meta.env.REACT_AUTH_DOMAIN,
  projectId: import.meta.env.REACT_PROJECT_ID,
  storageBucket: import.meta.env.REACT_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.REACT_MESSAGING_SENDER_ID,
  appId: import.meta.env.REACT_APP_ID, */

  apiKey: process.env.REACT_API_KEY,
  authDomain: process.env.REACT_AUTH_DOMAIN,
  projectId: process.env.REACT_PROJECT_ID,
  storageBucket: process.env.REACT_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
