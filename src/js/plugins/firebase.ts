import { initializeApp } from "firebase/app";
import { getMessaging, onMessage } from "firebase/messaging";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCJPsHVe_yaeOgQ4murLw-qdZfIRsVcmUk",
  authDomain: "cm-message-app.firebaseapp.com",
  projectId: "cm-message-app",
  storageBucket: "cm-message-app.appspot.com",
  messagingSenderId: "106830110355",
  appId: "1:106830110355:web:605ff3435032002f527766",
  measurementId: "G-KM79ZEF0GV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const messaging = getMessaging(app);

onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
});