import { initializeApp } from "firebase/app";

// Firebase is used for phone-number OTP authentication only. No Firebase
// database is used -- all application data is served by JSON Server from
// db.json.
//
// These values are read from .env, which is not committed. See .env.example
// for the required keys and the README for how to create your own Firebase
// project. Create React App reads .env only at startup, so restart the dev
// server after changing it.
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

if (!firebaseConfig.apiKey) {
  console.error(
    "Firebase configuration is missing. Copy .env.example to .env, fill in " +
      "the values from your Firebase project, then restart the dev server."
  );
}

const firebase_app = initializeApp(firebaseConfig);

export default firebase_app;
