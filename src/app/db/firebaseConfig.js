
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCCJuxUPXRdRiu-ZxF0qGs512IvO4YLxFA",
    authDomain: "next-auth-apps-3d018.firebaseapp.com",
    projectId: "next-auth-apps-3d018",
    storageBucket: "next-auth-apps-3d018.firebasestorage.app",
    messagingSenderId: "282394053151",
    appId: "1:282394053151:web:6d81778792f5ce758e632a"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);