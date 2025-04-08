import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB8tDSL7z6k9HK8Rp0pbs2ro9ZPcMxRwwA",
  authDomain: "nextauthassignment.firebaseapp.com",
  projectId: "nextauthassignment",
  storageBucket: "nextauthassignment.firebasestorage.app",
  messagingSenderId: "813864008071",
  appId: "1:813864008071:web:c76afe404ee6d62fb57b22",
  measurementId: "G-LE9Y88V023",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };
