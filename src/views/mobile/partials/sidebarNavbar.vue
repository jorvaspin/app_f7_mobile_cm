<template>
  <f7-page class="bg-white">
    <div class="menu-lateral-mobile">
      <div class="header-background">
        <card-menu-lateral />
      </div>
      <f7-list simple-list>
        <f7-button
          panel-toggle="left"
          data-ignore-cache="false"
          tab-link
          href="/inicio/me"
          route-tab-id="tab-dashboard"
        >
          <i class="fad fa-home-lg-alt icon-tab"></i>
          <f7-list-item title="Inicio" after="inicio"></f7-list-item>
        </f7-button>
        <f7-button
          panel-toggle="left"
          tab-link
          href="/inicio/perfil"
          route-tab-id="tab-perfil"
        >
          <i class="fad fa-user icon-tab"></i>
          <f7-list-item title="Mi perfil" badge="5"></f7-list-item>
        </f7-button>
        <f7-button
          panel-toggle="left"
          tab-link
          href="/inicio/biblioteca"
          route-tab-id="tab-biblioteca"
        >
          <i class="fad fa-books icon-tab"></i>
          <f7-list-item title="Mi Biblioteca"></f7-list-item>
        </f7-button>
        <f7-button
          panel-toggle="left"
          tab-link
          href="/inicio/estadisticas"
          route-tab-id="tab-estadisticas"
        >
          <i class="fad fa-chart-bar icon-tab"></i>
          <f7-list-item title="Mis Estadisticas"></f7-list-item>
        </f7-button>
        <!-- <f7-button sheet-open=".modal-mis-logros-home"> -->
        <f7-button panel-toggle="left" @click="goToLogros()">
          <i class="fad fa-trophy icon-tab"></i>
          <f7-list-item title="Mis Logros"></f7-list-item>
        </f7-button>
        <f7-button
          panel-toggle="left"
          @click="goToInventary()"
          v-if="settings.ACTIVAR_INVENTARIO"
        >
          <i class="fad fa-gift icon-tab"></i>
          <f7-list-item title="Mi Inventario"></f7-list-item>
        </f7-button>
        <f7-button
          panel-toggle="left"
          @click="goToChests()"
          v-if="settings.ACTIVAR_CATALOGO"
        >
          <i class="fad fa-treasure-chest icon-tab"></i>
          <f7-list-item title="Catálogo"></f7-list-item>
        </f7-button>
        <f7-button
          panel-toggle="left"
          v-on:click="goToDuelosActivos()"
          v-if="settings.ACTIVAR_DUELOS"
        >
          <i class="fad fa-swords icon-tab"></i>
          <f7-list-item title="Duelos Activos">
            <div
              class="flex items-center justify-center p-0 text-sm text-center text-white bg-red-600 rounded-full  top-2 w-7 h-7"
            >
              {{ userListDuelsPending.length }}
            </div>
          </f7-list-item>
        </f7-button>
        <f7-button sheet-open=".modal-monedero-home">
          <img
            class="icon-tab"
            src="https://res.cloudinary.com/admsys-storage/image/upload/w_20,f_auto/smarteducation/masterbrain/civicamente-v2/icons/civipuntos-coin-svg"
          />
          <f7-list-item title="Mis CiviPuntos"> </f7-list-item>
        </f7-button>
      </f7-list>
      <f7-block-title>Música de fondo</f7-block-title>
      <f7-list simple-list>
        <f7-list-item>
          <span v-show="onMusicApp">Activada</span>
          <span v-show="!onMusicApp">Desactivada</span>
          <f7-toggle
            :checked="onMusicApp"
            @change="activarMusica($event.target.checked)"
          />
        </f7-list-item>
      </f7-list>
      <div class="contenedorDesconectar">
        <f7-button
          panel-toggle="left"
          class="btn btn-danger"
          v-on:click="logout()"
        >
          Salir de mi aula
        </f7-button>
      </div>
    </div>
  </f7-page>
</template>
<script>
export default {
  data() {
    return {
      drawer: true,
    };
  },
  methods: {
    //activar desactivar musica app
    activarMusica(value) {
      const vm = this;
      if (value) {
        localStorage.setItem("cm_onMusicApp", true);
        if (!vm.musicBackgroundApp.playing()) {
          vm.musicBackgroundApp.play();
        }
        vm.onMusicApp = true;
      } else {
        vm.musicBackgroundApp.stop();
        localStorage.setItem("cm_onMusicApp", false);
        vm.onMusicApp = false;
      }
    },
  },
};
</script>
<style lang="scss">
.icon-tab {
  position: absolute !important;
  margin: 0 auto;
  bottom: 15px;
}
.image-tab {
  width: 20px;
  display: inline-block;
}
</style>
