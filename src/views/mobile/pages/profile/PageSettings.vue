<template>
  <f7-page no-toolbar class="bg-pages">
    <f7-navbar
      title="Configuración general"
      back-link
    ></f7-navbar>
    <f7-block-title>Sonidos de la aplicación</f7-block-title>
    <f7-list simple-list inset>
      <f7-list-item>
        <!-- <span v-show="$store.state.onMusicApp">Activada</span>
        <span v-show="!$store.state.onMusicApp">Desactivada</span> -->
        <span>Música de fondo</span>
        <f7-toggle
          :checked="backgroundMusic"
          color="orange"
          @change="toggleBackgroundSound($event.target.checked)"
        />
      </f7-list-item>
      <!-- <f7-list-item>
        <span>Click de los botones</span>
        <f7-toggle
          :checked="$store.state.onMusicApp"
          color="orange"
          @change="activarMusica($event.target.checked)"
        />
      </f7-list-item>
      <f7-list-item>
        <span>Elementos flotantes</span>
        <f7-toggle
          :checked="$store.state.onMusicApp"
          color="orange"
          @change="activarMusica($event.target.checked)"
        />
      </f7-list-item> -->
    </f7-list>
    <f7-block-title>Notificaciones</f7-block-title>
    <f7-list simple-list inset>
      <f7-list-item>
        <!-- <span v-show="$store.state.onMusicApp">Activada</span>
        <span v-show="!$store.state.onMusicApp">Desactivada</span> -->
        <span>Activar notificaciones</span>
        <f7-toggle
          :checked="activeNotifications"
          color="orange"
          @change="toggleActiveNotifications($event.target.checked)"
        />
      </f7-list-item>
    </f7-list>

    <f7-block-title class="flex items-center gap-3 text-titles"
      ><img :src="imgNinjaMode" class="w-8" alt="Modo ninja"> Modo ninja</f7-block-title
    >
    <f7-block>
    <f7-block-footer class="leading-none">
      Además de evitar que la visión del usuario se canse en menos tiempo, el
      modo ninja ofrece varias otras ventajas, como la reducción del consumo de
      la batería del dispositivo.
    </f7-block-footer>
    </f7-block>
    <f7-list simple-list inset>
      <f7-list-item>
        <span>{{ darkModeText }}</span>
        <f7-toggle
          :checked="darkMode"
          color="orange"
          @change="toggleTheme($event.target.checked)"
        />
      </f7-list-item>
    </f7-list>

    <f7-block-title class="text-titles disabled">
      <i class="mr-1 fa-fw fa-regular fa-language"></i>
      Idioma
    </f7-block-title>
    <f7-block class="disabled">
    <f7-block-footer class="leading-none">
      Cambiar el idioma predeterminado de la platforma.
    </f7-block-footer>
    </f7-block>
    <f7-list inset>
      <f7-list-item
        disabled
        title="Idioma por defecto"
        smart-select
        :smart-select-params="{
          openIn: 'popup',
          popupPush: true,
          closeOnSelect: true,
          popupCloseLinkText: 'Cancelar',
        }"
      >
        <select name="locale" v-model="$i18n.locale">
          <option
            v-for="locale in I18N_LOCALES"
            :key="`locale-${locale.code}`"
            :value="locale.code"
          >
            {{ locale.name }}
          </option>
        </select>
      </f7-list-item>
    </f7-list>

    <div class="disabled">
      <f7-block-title>Temas de usuario</f7-block-title>
      <f7-block-footer class="leading-none">
        Los temas permiten modificar parte del diseño de la aplicación,
        incorporando colores y estilos propios en algunas secciones.
      </f7-block-footer>
      <f7-list inset>
        <f7-list-item
          disabled
          title="Selecciona un tema"
          class="font-burbank"
          smart-select
          :smart-select-params="{
            openIn: 'popup',
            popupPush: true,
            searchbar: true,
            searchbarPlaceholder: 'Buscar por nombre del tema',
            popupCloseLinkText: 'Cerrar',
          }"
        >
          <select name="temas">
            <option
              v-for="(prize, index) in $store.state.userListInventary"
              :key="index"
              :value="prize.id"
              :selected="prize.is_used ? true : false"
            >
              <f7-link v-on:click="activarTema(prize.id)">
                {{ prize.name }}
              </f7-link>
            </option>
          </select>
        </f7-list-item>
      </f7-list>
      <!-- <f7-list simple-list>
                <f7-list-item v-for="(prize,index) in $store.state.userListInventary" :key="index">
                  <span>{{prize.name}}</span>
                  <f7-toggle :checked="prize.is_used ? true : false" :disabled="prize.is_used ? true : false" @change.stop.prevent="activarTema($event.target.checked, prize.id)" />
                </f7-list-item>
              </f7-list> -->
    </div>
  </f7-page>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import { axiosApiInstance } from "@/js/axios";
import { f7 } from "framework7-vue";
import {
  toggleTheme,
  toggleBackgroundSound,
} from "@/composables/useAppFunctions";
import store, { useStore } from "@/store/store";
import imgNinjaMode from '@/assets/images/icons/ninja-mode.svg'
import cordovaApp from "@/js/cordova-app.js";

export default defineComponent({
  props: {
    backText: {
      type: String,
      require: false,
      default: "Mi Perfil",
    },
  },
  data() {
    return {
      activeNotifications: false,
      imgNinjaMode,
      I18N_LOCALES: [
        {
          code: "en-US",
          name: "English",
        },
        {
          code: "es-CL",
          name: "Español",
        },
        {
          code: "fr",
          name: "Français",
        },
      ],
    };
  },
  setup() {
    const store = useStore();
    return {
      cordovaApp,
      darkMode: computed(() =>
        store.state.appDarkTheme === "dark-theme" ? true : false
      ),
      darkModeText: computed(() =>
        store.state.appDarkTheme === "dark-theme"
          ? "Modo ninja habilitado"
          : "Habilitar Modo ninja"
      ),
      backgroundMusic: computed(() =>
        store.state.onMusicApp === true ? true : false
      ),
      store,
      toggleTheme,
      toggleBackgroundSound,
    };
  },
  created: function () {
    this.getCategoryInventory("tema");
  },
  methods: {
    activarTema(id: number | string) {
      const vm = this;
      if (store.state.temaActivo_id != id) {
        axiosApiInstance({
          method: "post",
          url: "/api/auth/students/v3/user/inventary/used-theme",
          data: {
            prize_id: id,
            prize_activo: store.state.temaActivo_id,
          },
        })
          .then((response) => {
            // success callback
            store.state.userListInventary = response.data.inventories;
            store.state.temaActivo = JSON.parse(
              response.data.tema_activo.value
            );
            store.state.temaActivo_id = response.data.tema_activo.id;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    toggleActiveNotifications() {
      const vm = this;
      vm.cordovaApp.firebaseMessaging();

    },
    getCategoryInventory(valor: string) {
      const vm = this;
      axiosApiInstance({
        method: "post",
        url: "/api/auth/students/v3/user/inventary/prizes-category",
        data: {
          valor: valor,
        },
      })
        .then((response) => {
          // success callback
          store.state.userListInventary = response.data.userListInventary;
          store.state.activeID = response.data.id_category.id;
          setTimeout(function () {
            f7.dialog.close();
          }, 100);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
</script>
