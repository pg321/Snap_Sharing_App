import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyALdhV9SThXj4n7IQWcqxCtk7cpIAf9FNw",
    authDomain: "snapchat-app-a00ab.firebaseapp.com",
    projectId: "snapchat-app-a00ab",
    storageBucket: "snapchat-app-a00ab.appspot.com",
    messagingSenderId: "654904148267",
    appId: "1:654904148267:web:4b13518f5b505a7c7d456e",
    measurementId: "G-2Q71XLT0RY"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const storage = getStorage(app);

export {db, auth, provider, storage};
