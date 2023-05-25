import store from "@/store/store";
import userAuth from "@/composables/useAuthFunctions";
// import { sendDeviceTokenFCM } from "@/composables/userFunctions";

var cordovaApp = {
  f7: null,
  /*
  This method hides splashscreen after 3 seconds
  */
  handleSplashscreen: function () {
    var f7 = cordovaApp.f7;
    if (!window.navigator.splashscreen || f7.device.electron) return;
    setTimeout(() => {
      window.navigator.splashscreen.hide();
    }, 3000);
  },

  handleEventsButton: function () {
    var f7 = cordovaApp.f7;
    const $ = f7.$;
    const storage = window.localStorage;

    if (f7.device.electron) return;

    document.addEventListener("deviceready", function () {
      document.addEventListener(
        'resume',
        function () {

          const { isLoggedInResume } = userAuth();

          setTimeout(function () {
            if (storage.getItem("cm_onMusicApp") === 'true' && store.state.onMusicApp === true) {
              store.state.musicBackgroundApp.play();
            }
            isLoggedInResume();
          }, 0);
        },
        false,
      );

      document.addEventListener(
        'pause',
        function () {
          setTimeout(function () {
            if (storage.getItem("cm_onMusicApp") === 'true') {
              store.state.musicBackgroundApp.stop();
            }
          }, 600);
        },
        false,
      );
    }, false);

  },


  /*
  This method prevents back button tap to exit from app on android.
  In case there is an opened modal it will close that modal instead.
  In case there is a current view with navigation history, it will go back instead.
  */
  handleAndroidBackButton: function () {
    var f7 = cordovaApp.f7;
    const $ = f7.$;
    if (f7.device.electron) return;

    document.addEventListener(
      'backbutton',
      function (e) {
        if ($('.actions-modal.modal-in').length) {
          f7.actions.close('.actions-modal.modal-in');
          e.preventDefault();
          return false;
        }
        if ($('.dialog.modal-in').length) {
          f7.dialog.close('.dialog.modal-in');
          e.preventDefault();
          return false;
        }
        if ($('.sheet-modal.modal-in').length) {
          f7.sheet.close('.sheet-modal.modal-in');
          e.preventDefault();
          return false;
        }
        if ($('.popover.modal-in').length) {
          f7.popover.close('.popover.modal-in');
          e.preventDefault();
          return false;
        }
        if ($('.popup.modal-in').length) {
          if ($('.popup.modal-in>.view').length) {
            const currentView = f7.views.get('.popup.modal-in>.view');
            if (currentView && currentView.router && currentView.router.history.length > 1) {
              currentView.router.back();
              e.preventDefault();
              return false;
            }
          }
          f7.popup.close('.popup.modal-in');
          e.preventDefault();
          return false;
        }
        if ($('.login-screen.modal-in').length) {
          f7.loginScreen.close('.login-screen.modal-in');
          e.preventDefault();
          return false;
        }

        if ($('.page-current .searchbar-enabled').length) {
          f7.searchbar.disable('.page-current .searchbar-enabled');
          e.preventDefault();
          return false;
        }

        if ($('.page-current .card-expandable.card-opened').length) {
          f7.card.close('.page-current .card-expandable.card-opened');
          e.preventDefault();
          return false;
        }

        const currentView = f7.views.current;
        if (currentView && currentView.router && currentView.router.history.length > 1) {
          currentView.router.back();
          e.preventDefault();
          return false;
        }

        if ($('.panel.panel-in').length) {
          f7.panel.close('.panel.panel-in');
          e.preventDefault();
          return false;
        }
      },
      false,
    );
  },
  /*
  This method does the following:
    - provides cross-platform view "shrinking" on keyboard open/close
    - hides keyboard accessory bar for all inputs except where it required
  */
  handleKeyboard: function () {
    var f7 = cordovaApp.f7;
    if (!window.Keyboard || !window.Keyboard.shrinkView || f7.device.electron) return;
    var $ = f7.$;
    window.Keyboard.shrinkView(false);
    window.Keyboard.disableScrollingInShrinkView(true);
    window.Keyboard.hideFormAccessoryBar(true);
    window.addEventListener('keyboardWillShow', () => {
      f7.input.scrollIntoView(document.activeElement, 0, true, true);
    });
    window.addEventListener('keyboardDidShow', () => {
      f7.input.scrollIntoView(document.activeElement, 0, true, true);
    });
    window.addEventListener('keyboardDidHide', () => {
      if (document.activeElement && $(document.activeElement).parents('.messagebar').length) {
        return;
      }
      window.Keyboard.hideFormAccessoryBar(false);
    });
    window.addEventListener('keyboardHeightWillChange', (event) => {
      var keyboardHeight = event.keyboardHeight;
      if (keyboardHeight > 0) {
        // Keyboard is going to be opened
        document.body.style.height = `calc(100% - ${keyboardHeight}px)`;
        $('html').addClass('device-with-keyboard');
      } else {
        // Keyboard is going to be closed
        document.body.style.height = '';
        $('html').removeClass('device-with-keyboard');
      }
    });
    $(document).on(
      'touchstart',
      'input, textarea, select',
      function (e) {
        var nodeName = e.target.nodeName.toLowerCase();
        var type = e.target.type;
        var showForTypes = ['datetime-local', 'time', 'date', 'datetime'];
        if (nodeName === 'select' || showForTypes.indexOf(type) >= 0) {
          window.Keyboard.hideFormAccessoryBar(false);
        } else {
          window.Keyboard.hideFormAccessoryBar(true);
        }
      },
      true,
    );
  },

  // Este metodo permite abrir los enlaces "_blank" dentro de la app y sin salir de ella.
  inAppBrowser: function () {
    cordova.InAppBrowser.options = "closebuttoncaption='Cerrar', location='no', toolbar='no',";
    window.open = cordova.InAppBrowser.open;
    console.log('device ready');
  },

  firebaseMessaging: function () {
    //CONSULTAMOS POR LOS PERMISOS PARA ENVIAR NOTIFICACIONES
    const granted = cordova.plugins.firebase.messaging.requestPermission();
     if (granted) {
       //TOMAMOS EL TOKEN Y LO ENVIAMOS PARA GUARDAR EN LA TABLA USERS
       cordova.plugins.firebase.messaging.getToken().then(function (token) {
         // sendDeviceTokenFCM(token);
         console.log("Got device token: ", token);
       });
       // ACTIVAMOS EL RECIBIR MENSAJES
       cordova.plugins.firebase.messaging.onMessage(function (payload) {
         console.log("New foreground FCM message: ", payload);
       });
       // PARA RECIBIR MENSAJES EN SEGUNDO PLANO
       cordova.plugins.firebase.messaging.onBackgroundMessage(function (payload) {
         console.log("New background FCM message: ", payload);
       });

       // cordova.plugins.firebase.messaging.requestPermission({
       //   forceShow: true
       // }).then(function () {
       //   console.log("You'll get foreground notifications when a push message arrives");
       // });

       // cordova.plugins.firebase.messaging.getToken("apns-string").then(function (token) {
       //   console.log("APNS hex device token: ", token);
       // });
       //
       // cordova.plugins.firebase.messaging.onTokenRefresh(function () {
       //   console.log("Device token updated");
       // });
     }
  },

  init: function (f7) {
    // Save f7 instance
    cordovaApp.f7 = f7;

    document.addEventListener('deviceready', () => {
      // Handle Android back button
      cordovaApp.handleAndroidBackButton();
      cordovaApp.handleEventsButton();

      // Handle Splash Screen
      cordovaApp.handleSplashscreen();

      // Handle Keyboard
      cordovaApp.handleKeyboard();

      // Handle Open externallinks in app
      cordovaApp.inAppBrowser();

      if (f7.device.cordova) {
        // Handle Push notifications
        cordovaApp.firebaseMessaging();
      }

    });
  },
};

export default cordovaApp;
