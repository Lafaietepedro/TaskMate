import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyApQwb-dsF80o8qNeAjWh0zVu7VqPbxWPw",
  authDomain: "tarefas-907a8.firebaseapp.com",
  projectId: "tarefas-907a8",
  storageBucket: "tarefas-907a8.firebasestorage.app",
  messagingSenderId: "109735565340",
  appId: "1:109735565340:web:87ccfd9476081ff26967d9"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

export {db};