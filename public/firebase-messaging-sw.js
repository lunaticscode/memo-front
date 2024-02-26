/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
importScripts(
  "https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyB1xwlzbn9FBsahjufb5-puH_SGc8LwNtw",
  authDomain: "humanwater-pjt.firebaseapp.com",
  projectId: "humanwater-pjt",
  // storageBucket: "humanwater-pjt.appspot.com",
  messagingSenderId: "348646425467",
  appId: "1:348646425467:web:210f8ea0827bd63fe9b3de",
  measurementId: "G-KEGN47D6L4",
};

firebase.initializeApp(firebaseConfig);
let messaging;
try {
  messaging = firebase.messaging();
} catch (err) {
  console.log(err);
}

self.addEventListener("push", () => {
  console.log("push asdasd");
  console.log(self.registration);
});

if (messaging) {
  console.log(messaging);
  try {
    messaging.onBackgroundMessage((payload) => {
      console.log(
        "[firebase-messaging-sw.js] Received background message ",
        payload
      );

      // Customize notification here
      const notificationTitle = "Background Message Title";
      const notificationOptions = {
        body: payload,
        icon: "/firebase-logo.png",
      };

      return new Notification("hi there");

      self.navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification(notificationTitle, notificationOptions);
      });
    });
  } catch (err) {
    console.log({ err });
  }
}
