import { f7 } from "framework7-vue";

import store from "../store/store";
import { axiosApiInstance, axiosInstance } from "../js/axios";
import { getMessaging , getToken} from "firebase/messaging";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

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
const analytics = getAnalytics(app);
// const messaging = getMessaging(app);


export default function notificationsFunctions() {

  // Permisos para las notificaciones
  async function permissionNotifications() {
      // verificamos si el navegador lo soporta
      if( !window.Notification ){
        console.log("este navegador no soporta notificaciones");
        return;
      }

      // tomamos el token
      // getToken(messaging, { vapidKey: 'BC_MLVl_3NxSuilMrBIwMCzH89G3FCQpDNkJVgEk6eZKvcah04X-FacXNZpa7Ihce1cEeU6U8PxmJjpG_XC6tzw' }).then((currentToken) => {
      //     console.log(currentToken);
      // }).catch((err) => {
      //     console.log(err);
      // });

      if( Notification.permission == 'granted' ){
        console.log("enviamos la notificación");

        new Notification('granted');
      }else if(Notification.permission == 'denied' || Notification.permission == 'default'){
        Notification.requestPermission(function(permission){
          console.log(permission);

          if(permission == 'granted'){
            console.log("entro acá");

            new Notification('granted confirmed');
          }
        });
      }
  };

  async function sendNotifications(title = 'Cívicamente', body = null , icon = null){
    const notificationOpts = {
      body: 'Cuerpo de la notificación',
      icon: '../assets/images/favicon-2.png'
    }

    new Notification(title, notificationOpts);
  };

  return {
      permissionNotifications
  };
};
