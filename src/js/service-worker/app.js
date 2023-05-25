// registramos el sw
if(navigator.serviceWorker){
  // el reg es la función general para lanzar enventos y mantener activo el SW
  navigator.serviceWorker.register('/sw.js');
  navigator.serviceWorker.register("/firebase-messaging-sw.js");
  // .then( reg => {
  //   // para mostrar una notifiacion (ejemplo ilustrativo)
  //   // debemos tomar el permiso, ya que no podemos enviar notificaciones
  //   // sin el permiso del usuario
  //   // EJEMPLO ilustrativo
  //   Notification.requestPermission().then( result =>{
  //     // si el usuario acepta puedo enviar, si no no podría enviar nada
  //     console.log(result);
  //     reg.showNotification("Bienvenido a Cívicamente");
  //   });
  // });
}
