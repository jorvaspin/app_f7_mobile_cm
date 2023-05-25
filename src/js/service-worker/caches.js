// VALIDAMOS SI ES QUE EL CHROME O NAVEGADOR ACEPTAR EL WINDOW CACHES PARA TRABAJAR
// EN MODO OFFLINE Y DIFERENTES TACTICAS
if(window.caches){
    // caches.open('cache-v1.1').then( cache => {
    //   // podemos añadir imagenes, urls, css, pages, etc
    //   // añadimos de a uno
    //   // cache.add('../index.html');
    //   // añadimos de varios
    //   // cache.addAll([
    //   //   '/',
    //   //   '/index.html',
    //   //   '../assets/images/background-login.jpg'
    //   // ]).then(() => {
    //   //   // para borrar
    //   //   // cache.delete('url')
    //   //   // para reemplazar
    //   //   // cache.put('/index.html', new Response('soy una page'));
    //   //
    //   // });
    //
    //   // si queremos leer archivos que se encuentra en el cache desde consola
    //   // cache.match('/index.html')
    //   // .then(res => {
    //   //   // imprimimos el archivo a la consola
    //   //   // res.text().then(console.log);
    //   // });
    // });

    // Como podemos obtener todos los caches que existen en nuestra app
    // caches.keys().then(keys =>{
      //   console.log(keys);
      // });

  }