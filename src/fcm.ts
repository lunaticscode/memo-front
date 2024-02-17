import { initializeApp, FirebaseOptions, FirebaseApp } from "firebase/app";
import { Messaging, getMessaging } from "firebase/messaging";

const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyB1xwlzbn9FBsahjufb5-puH_SGc8LwNtw",
  authDomain: "humanwater-pjt.firebaseapp.com",
  projectId: "humanwater-pjt",
  storageBucket: "humanwater-pjt.appspot.com",
  messagingSenderId: "348646425467",
  appId: "1:348646425467:web:210f8ea0827bd63fe9b3de",
  measurementId: "G-KEGN47D6L4",
};

const app: FirebaseApp = initializeApp(firebaseConfig);
export const message: Messaging = getMessaging(app);
// console.log(message);
