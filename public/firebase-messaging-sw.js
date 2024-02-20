/* eslint-disable no-undef */
importScripts("https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging.js"
);
const firebaseConfig = {
  apiKey: "AIzaSyB1xwlzbn9FBsahjufb5-puH_SGc8LwNtw",
  authDomain: "humanwater-pjt.firebaseapp.com",
  projectId: "humanwater-pjt",
  storageBucket: "humanwater-pjt.appspot.com",
  messagingSenderId: "348646425467",
  appId: "1:348646425467:web:210f8ea0827bd63fe9b3de",
  measurementId: "G-KEGN47D6L4",
};
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
console.log(messaging);
messaging.onBackgroundMessage(messaging, (payload) => {
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

  // eslint-disable-next-line no-restricted-globals
  self.registration.showNotification(notificationTitle, notificationOptions);
});
