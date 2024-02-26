import { initializeApp, FirebaseOptions, FirebaseApp } from "firebase/app";
import {
  Messaging,
  getMessaging,
  getToken,
  onMessage,
  isSupported,
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
  try {
    const permission = await Notification.requestPermission().catch((err) =>
      console.log(err)
    );
  } catch (err) {
    console.log({ err });
  }
};
export const getOrRegisterServiceWorker = () => {
  if (
    "serviceWorker" in navigator &&
    typeof window.navigator.serviceWorker !== "undefined"
  ) {
    return window.navigator.serviceWorker
      .getRegistration("/firebase-push-notification-scope")
      .then((serviceWorker) => {
        if (serviceWorker) return serviceWorker;
        return window.navigator.serviceWorker.register(
          "/firebase-messaging-sw.js",
          {
            scope: "/firebase-push-notification-scope",
          }
        );
      });
  }
  throw new Error("The browser doesn`t support service worker.");
};

export const getFcmToken = async () => {
  const supported = await isSupported();
  if (!supported) {
    return;
  }
  await getNotificationPermission();
  new Notification("asdasd");
  getOrRegisterServiceWorker().then(async (serviceWorkerRegistration) => {
    return Promise.resolve(
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
          }
        })
        .catch((err) => {
          console.log("An error occurred while retrieving token. ", err);
        })
    );
  });
};
onMessage(message, (payload) => {
  return new Notification(payload.notification?.title || "title", {
    body: payload.notification?.body,
    data: "asdasd",
  });
});
