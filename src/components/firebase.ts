import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBdaQ5XLsDYkG7Q5ZpJJjSc933Mbw4UqXc",
  authDomain: "jaybirthday-57a38.firebaseapp.com",
  projectId: "jaybirthday-57a38",
  storageBucket: "jaybirthday-57a38.firebasestorage.app",
  messagingSenderId: "4454770202",
  appId: "1:4454770202:web:d8dccf090611cd834313a3",
  measurementId: "G-G0PEE6BG0G",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);