import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6pOf-Ioyl1Fd0c5eS1B49WyxzV4j9iSM",
  authDomain: "house-marketplace-fampiyush.firebaseapp.com",
  projectId: "house-marketplace-fampiyush",
  storageBucket: "house-marketplace-fampiyush.appspot.com",
  messagingSenderId: "390287029863",
  appId: "1:390287029863:web:9fe3720bb1de700f3a06c2"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()