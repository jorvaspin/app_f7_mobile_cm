<template>
  <section class="sticky top-0 flex-shrink-0 w-full h-screen bg-center bg-cover leftSidePanel bg-indigo-cm dark:bg-dark"
  :style="temaActivo != null ? 'background-image: url('+temaActivo.background.leftbar+');' : ''
  ">
    <div class="justify-between workspaces">
      <a href="#">
        <div class="w-full p-1 workspace-logo">
          <img
            src="https://res.cloudinary.com/admsys-storage/image/upload/smarteducation/masterbrain/civicamente-app/public-images/favicon.png" alt="Logo"
          />
        </div>
      </a>
      <div class="flex flex-col gap-2 pb-5">
      <button
        data-tooltip="Cambiar de tema"
        class="flex items-center justify-center w-10 h-10 p-3 mx-auto font-semibold text-white uppercase bg-teal-500 rounded-full shadow-md popover-open tooltip-init hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75"
        data-popover=".popover-menu-themes"
        >
        <i class="fa-solid fa-palette fa-lg"></i>
      </button>
      <button
        type="button"
        @click="(onMusicApp == true) ? activarMusica(false) : activarMusica(true)"
        data-tooltip="Música de fondo"
        class="flex items-center justify-center w-10 h-10 p-3 mx-auto font-semibold text-white uppercase bg-gray-700 rounded-full shadow-md tooltip-init hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75"
      >
        <span v-if="onMusicApp == 'true'">
          <i class="fa-solid fa-volume"></i>
          </span>
          <span v-else>
            <i class="fa-solid fa-volume-slash"></i>
          </span>
      </button>
      <button
        type="button"
        v-on:click="logout(), buttonClick()"
        data-tooltip="Salir de mi aula"
        class="flex items-center justify-center w-10 h-10 p-3 mx-auto font-semibold leading-snug text-white uppercase bg-red-600 rounded-full shadow-md tooltip-init font-display hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75"
      >
        <i class="fas fa-sign-out"></i>
      </button>
      </div>
      <f7-popover class="popover-menu-themes">
        <f7-list>
        <f7-list-item
        @click="activarTema(prize.id)"
        popover-close
        link="#"
        :title="prize.name"
        v-for="(prize, index) in listThemes"
        :key="index"
        >

        <template #media>
          <img :src="prize.image" class="w-6 h-6" alt="">
        </template>
        </f7-list-item>
        <f7-list-item link="#" @click="temaActivo = null" popover-close title="Tema por defecto"></f7-list-item>
        </f7-list>
      </f7-popover>
    </div>
    <div class="sidebar-view" id="sidebar-view">
      <div class="absolute inset-x-0 bottom-0 top-auto z-10 h-8 bg-gradient-to-t from-sidebar-color"></div>
      <div class="bg-transparent page channels-page">
        <div class="page-content">
          <div id="contenedorSidebar" class="relative h-full">
            <div class="sticky top-0 z-30 py-1 bg-black bg-opacity-50">
              <img
                src="https://res.cloudinary.com/admsys-storage/image/upload/smarteducation/masterbrain/civicamentecl/civicamente-2021-apaisado.svg"
                alt=""
                class="px-4 py-1 mx-auto w-36"
              />
            </div>
            <div
              class="px-1 py-3 mx-2 shadow card-box cardUsuario bg-gradient-to-b from-white to-blue-50"
            >
              <div
                class="absolute inset-x-0 left-0 right-0 inline-block w-24 mx-auto bg-white border-4 border-white border-solid rounded-full -top-10"
                id="v-step-2"
              >
                <user-avatar></user-avatar>
              </div>
              <div class="flex flex-col px-2 mt-10">
                <div
                  class="w-full mt-2 text-sm text-center font-display text-primary-100"
                >
                  <span v-if="!user.nick_or_name">
                    <content-placeholders :rounded="true">
                      <content-placeholders-heading />
                    </content-placeholders>
                  </span>
                  <span v-else>
                    <span >{{ this.user.nick_or_name }}</span>
                  </span>
                </div>
                <div class="w-full text-center font-display">
                  <h4 v-if="!user.full_name">
                    <content-placeholders :rounded="true">
                      <content-placeholders-heading />
                    </content-placeholders>
                  </h4>
                  <h4 class="text-lg leading-none text-gray-800 uppercase" v-else>
                    {{ this.user.full_name }}
                  </h4>
                </div>
                <div class="w-full mt-2 space-y-1 text-xs text-left text-gray-600">
                  <user-info-curso></user-info-curso>
                  <user-info-establecimiento></user-info-establecimiento>
                </div>

                <div class="flex flex-row items-center justify-center w-full mt-3 space-x-1">
                  <button
                    @click.prevent="$f7router.navigate({ name: 'cm.perfil' }), buttonClick()"
                    data-tooltip="Editar perfil"
                    class="flex-1 w-full tooltip-init btn btn-warning"
                  >
                    <span class="flex items-center justify-center text-xs uppercase">Perfil</span>
                  </button>
                  <button
                    v-show="settings.ACTIVAR_INVENTARIO"
                    @click.prevent="goToInventary(), buttonClick()"
                    data-tooltip="Ver inventario"
                    class="flex-1 w-full tooltip-init btn btn-secondary">
                    <span class="flex items-center justify-center text-xs uppercase">Inventario</span>
                  </button>
                </div>
              </div>
            </div>
            <div
              class="relative h-auto pb-5 mx-2 mt-10 mb-5 text-center rounded-sm bg-card-civipuntos pt-9"
            >
              <img
                class="absolute w-16 mx-auto -top-8 -inset-x-0"
                src="https://res.cloudinary.com/admsys-storage/image/upload/c_scale,f_auto,w_70/smarteducation/masterbrain/civicamente-v2/icons/civipuntos-coin.png"
                alt=""
              />
              <h4 class="m-0 text-3xl font-display text-orange-cm">
                {{ $filters.formatNumber(this.user.wallet_amount) }}
              </h4>
              <div class="text-xs text-gray-800 uppercase font-display">
                Civipuntos disponibles
              </div>
              <button
                :disabled="!settings.ACTIVAR_CATALOGO"
                class="w-auto mt-2 btn btn-success"
                @click="goToChests(), buttonClick()"
              >
               Ver catálogo
              </button>
              <div v-show="!settings.ACTIVAR_CATALOGO" class="px-2 mt-3 text-xs leading-none text-center text-red-800">Próximamente podrás ingresar al catálogo</div>
            </div>

            <div class="mb-3 row" v-if="this.encuesta.length != 0">
              <div class="col">
                <a
                  v-on:click="continuarEncuesta()"
                  tag="div"
                  class="pt-2 pb-3 card-box contenedorEncuesta"
                >
                  <img
                    id="v-step-4"
                    alt=""
                    class="mx-auto mt-4 mb-3 img-fluid d-block"
                  />
                  <h3>Encuestas <br />Civicamente</h3>
                </a>
              </div>
            </div>
            <div class="pb-5 mx-2">
              <global-alumno-rango />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { axiosInstance } from "@/js/axios";
import {UserInfoCurso, UserInfoEstablecimiento} from '@components/GlobalComponents';
export default {
  props: [],
  components:{
    UserInfoCurso, UserInfoEstablecimiento
  },
  data() {
    return {
      listThemes:{}
    };
  },

  created: function () {
    this.getCategoryInventory("tema");
  },
  methods: {
      //activar desactivar musica app
      activarMusica(value){
        const vm = this;
        if(value){
          localStorage.setItem('cm_onMusicApp', 'true');
          if(!vm.musicBackgroundApp.playing()){
            vm.musicBackgroundApp.play();
          }
          vm.onMusicApp = true;
        }else{
          vm.musicBackgroundApp.stop();
          localStorage.setItem('cm_onMusicApp', 'false');
          vm.onMusicApp = false;
        }
      },
      activarTema(id) {
      const vm = this;
      if (vm.temaActivo_id != id) {
        axiosInstance({
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + Vue.localStorage.get("cm_access_token"),
          },
          data: {
            prize_id: id,
            prize_activo: vm.prize_activo,
          },
        })
          .then((response) => {
            // success callback
            vm.userListInventary = response.data.inventories;
            vm.temaActivo = JSON.parse(
              response.data.tema_activo.value
            );
            vm.temaActivo_id = response.data.tema_activo.id;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    getCategoryInventory(valor) {
      const vm = this;
      axiosInstance({
        method: "post",
        data: {
          valor: valor,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Vue.localStorage.get("cm_access_token"),
        },
      })
        .then((response) => {
          // success callback
          vm.listThemes = response.data.userListInventary;
          vm.activeID = response.data.id_category.id;
          setTimeout(function () {
            vm.$f7.dialog.close();
          }, 100);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    }
};
</script>
<style style="css" scoped>
.workspaces {
  width: 58px;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: #212121;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding-top: 15px;
}
.workspaces a {
  width: 30px;
  margin-bottom: 15px;
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
  font-size: 12px;
}

.workspace-logo {
  width: 30px;
  height: 30px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  position: relative;
}
.workspace-logo:before {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 0px solid rgba(255, 255, 255, 0.3);
  transition: 200ms;
  width: 100%;
  height: 100%;
  border-radius: 12px;
}
.workspaces a:hover .workspace-logo:before {
  border-width: 4px;
}
.workspace-logo img {
  max-width: 100%;
  max-height: 100%;
}
.workspaces + .sidebar-view {
  position: relative;
  height: 100%;
  z-index: 5000;
  overflow: hidden;
  box-sizing: border-box;
  left: 58px;
  width: calc(100% - 58px);
}

.channels-page {
  --f7-bars-bg-color: #32323f !important;
  --f7-page-bg-color: #32323f !important;
  --f7-bars-border-color: transparent;
  --f7-bars-text-color: #fff;
  --f7-navbar-font-size: 18px;
  --f7-navbar-title-font-weight: bold;
  --f7-navbar-link-color: #fff;
  --f7-searchbar-inner-padding-left: 15px;
  --f7-searchbar-inner-padding-right: 15px;
  --f7-searchbar-input-height: 32px;
  --f7-searchbar-input-bg-color: rgba(0, 0, 0, 0.4);
  --f7-searchbar-input-text-color: rgba(255, 255, 255, 0.8);
  --f7-searchbar-input-border-radius: 6px;
  --f7-searchbar-input-font-size: 16px;
  --f7-list-bg-color: transparent;
  --f7-list-border-color: transparent;
  --f7-list-item-border-color: transparent;
  --f7-list-item-min-height: 32px;
  --f7-list-item-padding-vertical: 4px;
  --f7-block-title-font-size: 16px;
  --f7-block-title-text-color: rgba(255, 255, 255, 0.7);
  --f7-block-title-font-weight-color: 500;
  --f7-list-item-title-text-color: rgba(255, 255, 255, 0.7);
  --f7-list-item-title-font-size: 16px;
  --f7-list-link-pressed-bg-color: rgba(0, 0, 0, 0.2);
  --f7-list-link-hover-bg-color: rgba(0, 0, 0, 0.1);
  color: rgba(255, 255, 255, 0.7);
}
.channels-page .block-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.channels-page .block-title .link {
  color: inherit;
}
.channels-page .block-title .link:hover {
  color: #fff;
}
.channels-page .list .item-media {
  width: 12px;
}
.channels-page .list .icon {
  font-size: 12px;
  width: 12px;
  height: 12px;
  color: rgba(255, 255, 255, 0.7);
}
.channels-page .list .icon-add {
  font-size: 14px;
  width: 14px;
  height: 14px;
}
</style>
