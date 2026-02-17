import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAI0TSK17tim2OtnE9uHjL6vMf3yICZigs",
  authDomain: "velovibe.firebaseapp.com",
  projectId: "velovibe",
  storageBucket: "velovibe.firebasestorage.app",
  messagingSenderId: "650068594728",
  appId: "1:650068594728:web:b3995784025371b9f5a51d"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);