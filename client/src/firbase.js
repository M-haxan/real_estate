// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "realestae-6223c.firebaseapp.com",
  projectId: "realestae-6223c",
  storageBucket: "realestae-6223c.firebasestorage.app",
  messagingSenderId: "516258317952",
  appId: "1:516258317952:web:283b67e6f724a95ec1c865"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);