import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC64nETen8OS9n24EqW2vLM9y1fwrOREnA",
  authDomain: "apple-notes-1d4f3.firebaseapp.com",
  projectId: "apple-notes-1d4f3",
  storageBucket: "apple-notes-1d4f3.appspot.com",
  messagingSenderId: "50673743958",
  appId: "1:50673743958:web:c713798f729128d716a3f7"
};

const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp);