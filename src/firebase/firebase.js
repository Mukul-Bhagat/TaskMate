import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBnWY7dLQa3hQ9hRnultU_yr0ghL9K3uaY",
  authDomain: "taskmate-d6574.firebaseapp.com",
  projectId: "taskmate-d6574",
  storageBucket: "taskmate-d6574.firebasestorage.app",
  messagingSenderId: "1082557166600",
  appId: "1:1082557166600:web:06cfa721881911a0f5cdbd",
  measurementId: "G-5PS0NMHTZT",
  // --- THIS IS THE FIX ---
  // Adding the correct databaseURL tells Firebase where to connect.
  databaseURL: "https://taskmate-d6574-default-rtdb.asia-southeast1.firebasedatabase.app/",
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

