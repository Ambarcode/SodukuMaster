// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBKGMjqy7jYkQ0ia7wxkGJwgiqMJnoQorQ",
  authDomain: "elitmus-163bf.firebaseapp.com",
  projectId: "elitmus-163bf",
  storageBucket: "elitmus-163bf.appspot.com",
  messagingSenderId: "220699025846",
  appId: "1:220699025846:web:4b5dbc63c28fcb3355e117",
  measurementId: "G-01ZTRXZDYR"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const initFirebase = () => {
  return app;
};

export const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null);
export default app;
export const auth = getAuth(app);