// /iniciamos el serviceWorker
// instalación SW
self.addEventListener('install', event => {

  // Ejemplo
  // Creamos cache
  // Descargar assets, etc
    console.log("Instalando el service SW");

  // simulamos la instalacion (ilustrativo)
  const install = new Promise( (resolve, reject) =>{
    // tema ilustrativo
    setTimeout(() => {
      console.log("SW: Instalanciones terminadas.");
      self.skipWaiting();
      resolve();
    }, 1000);
  });
  // evento para esperar que termine la instalacion antes de pasar al siguiente envento
  event.waitUntil(install);

  // update navegador instant
  // self.skipWaiting();
});

// CUANDO EL SW TOMA EL CONTROL DE LA APP
self.addEventListener('activate', event => {

  // LO USAMOS PARA BORRAR CACHE VIEJO
  console.log("SW: Activo y listo para usar la App");

});

// SYNC O SYNCMANAGER: ES UTIL CUANDO RECUPERAMOS LA CONEXIÓN A INTERNET
// SOLO CHROME SOPORTA ESTA FUNCIONALIDAD
// SI UN USUARIO NO SOPORTA SYNC DEBEREMOS HACERLO MANUALMENTE SIN EL SYNC EN CASO DE QUE EL USUARIO
// HICIERA ALGO SIN CONEXION A INTERNET
self.addEventListener('sync', event => {
  console.log("Tenemos conexión");
  console.log(event);
  console.log(event.tag);

});

// PUSH: MANEJAMOS LAS PUSH NOTIFICACIONS
self.addEventListener('push', evento => {
  // probamos directo desde inspeccionador : aplications : push
  console.log('Notificación recibida');
});

// FETCH MANEJO DE PETICIONES HTTP
// dentro del fetch podemos leer apis
// también aplicar estrategias para el cache
// ejemplo: determinar si vale la pena copiar x cosa en el cache, o que el usuario alcance la web sin tener x cosa.

// primera función MODO OFFLINE
self.addEventListener('fetch', event => {
    const offlineResp = new Response(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta http-equiv="Content-Security-Policy" content="default-src * 'self' 'unsafe-inline' 'unsafe-eval' data: gap: content:">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, viewport-fit=cover">
        <meta name="theme-color" content="#000">
        <meta name="color-scheme" content="light dark" />
        <meta name="format-detection" content="telephone=no">
        <meta name="msapplication-tap-highlight" content="no">
        <title>Cívicamente</title>
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
        <link rel="apple-touch-icon" href="icons/apple-touch-icon.png">
        <link rel="icon" href="icons/favicon.png">
        <link rel="manifest" href="/manifest.json">
      </head>
      <body>
        <div id="app" class="">
          <h1>Estamos Offline</h1>
        </div>

      </body>
      </html>

    `, {
      headers: {
        'Content-Type':'text/html'
      }
    });

    const resp = fetch(event.request)
          .catch( () => offlineResp);

    event.respondWith( resp );
});
