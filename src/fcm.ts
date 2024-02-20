import { initializeApp, FirebaseOptions, FirebaseApp } from "firebase/app";
import {
  Messaging,
  getMessaging,
  getToken,
  onMessage,
} from "firebase/messaging";

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

export const app: FirebaseApp = initializeApp(firebaseConfig);
export const message: Messaging = getMessaging(app);

const getNotificationPermission = async () => {
  const permission = await Notification.requestPermission();
  console.log(permission);
};

export const getFcmToken = async () => {
  await getNotificationPermission();
  getToken(message, {
    vapidKey: process.env.REACT_APP_FIREBASE_VAPID_PUBLIC_KEY,
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log(currentToken);
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
        // ...
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      // ...
    });
};
onMessage(message, (payload) => {
  console.log("asdasd");
  console.log(payload);
});

// .getToken(message, {
//   vapidKey: process.env.REACT_APP_FIREBASE_VAPID_PUBLIC_KEY,
// });

// console.log(message);
