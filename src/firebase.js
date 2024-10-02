/* src/firebase.js */
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyApZiKEbUw4vH_WQmLehAgkpB7p_KodKDg",
    authDomain: "book-nest-d79e9.firebaseapp.com",
    projectId: "book-nest-d79e9",
    storageBucket: "book-nest-d79e9.appspot.com",
    messagingSenderId: "69091942571",
    appId: "1:69091942571:web:b9e56349d32f5d3c9217ee",
    measurementId: "G-72PF1E9396"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
