<template>
  <div class="card cardUsuarioMenuLateral">
    <div class="card-body">
      <img :src="this.user.rango.filename" alt="" class="img-fluid medalla">
      <div class="infoUser">
        <div class="row">
          <div class="col">
            <small>
              {{this.user.nick_or_name}}
            </small>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <h4>
              {{this.user.full_name}}
            </h4>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="contenedorCardAvatar">
            <user-avatar></user-avatar>
          </div>
        </div>
      </div>
      <div class="row">
          <div class="contenedorCardInformacion">
            <div class="row">
              <div class="col d-flex align-items-center">
                <img src="https://res.cloudinary.com/admsys-storage/image/upload/smarteducation/masterbrain/civicamente-v2/sidebar/usuario/curso.svg" alt="" class="img-fluid">
                <p>
                  {{this.user.curso.nombre}}
                </p>
              </div>
            </div>
            <div class="row">
              <div class="col d-flex align-items-center">
                <img src="https://res.cloudinary.com/admsys-storage/image/upload/smarteducation/masterbrain/civicamente-v2/sidebar/usuario/colegio.svg" alt="" class="img-fluid">
                <p>
                  {{this.user.curso.colegio.nombre}}
                </p>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>
