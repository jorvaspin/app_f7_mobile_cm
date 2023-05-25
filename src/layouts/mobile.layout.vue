<template>
  <f7-app v-bind="f7params">
    <f7-views tabs class="safe-areas">
      <!-- componente de logro desbloqueado -->
      <logroDesbloqueado />
      <f7-toolbar tabbar labels bottom no-shadow class="menuBottom">
        <f7-link
          @click.prevent="onTabLinkClick('today')"
          tab-link="#view-today"
          tab-link-active
          class="font-display"
          icon="fa-regular fa-calendar-lines"
          icon-size="20"
          :text="$t('dashboard.tab_title')"
          ref="refToday"
        ></f7-link>
        <f7-link
          @click.prevent="onTabLinkClick('library')"
          tab-link="#view-library"
          icon="fa-regular fa-book-open"
          icon-size="20"
          :text="$t('library.tab_title')"
          ref="refLibrary"
        ></f7-link>
        <f7-link
          @click.prevent="onTabLinkClick('stats')"
          tab-link="#view-stats"
          icon="fa-regular fa-chart-column"
          icon-size="20"
          :text="$t('stats.tab_title')"
          ref="refStats"
        ></f7-link>
        <f7-link
          @click.prevent="onTabLinkClick('profile')"
          tab-link="#view-profile"
          icon="fa-regular fa-user"
          icon-size="20"
          :text="$t('profile.tab_title')"
          ref="refProfile"
        ></f7-link>
      </f7-toolbar>
      <f7-view
        class="safe-areas"
        id="view-today"
        @tab:show="activeTab = 'today'"
        name="today"
        main
        tab
        tab-active
        url="/dashboard/"
      ></f7-view>
      <f7-view
        id="view-library"
        class="safe-areas"
        @tab:show="activeTab = 'library'"
        name="library"
        tab
        url="/biblioteca/"
      ></f7-view>
      <f7-view
        id="view-stats"
        class="safe-areas"
        @tab:show="activeTab = 'stats'"
        tab
        url="/estadisticas/"
      ></f7-view>
      <f7-view
        id="view-profile"
        class="safe-areas"
        @tab:show="activeTab = 'profile'"
        tab
        url="/perfil/"
      ></f7-view>
    </f7-views>
  </f7-app>
</template>
<script lang="ts">
import { defineComponent, ref, watchEffect, onMounted, reactive, defineAsyncComponent } from "vue";
import { f7, f7ready } from "framework7-vue";
import { getDevice } from "framework7/lite-bundle";
import cordovaApp from "@/js/cordova-app.js";
import userAuth from "@/composables/useAuthFunctions";
import userNotifications from "@/composables/useNotificationsFunctions";
import routesMobile from "@/routes/routesMobile";
import { getMediaPreference, setTheme } from "@/composables/useAppFunctions";

export default defineComponent({
  name: "mobile-layout",
  props: {
    f7route: Object,
    f7router: Object,
  },
  setup() {
    const device = getDevice();
    const { isLoggedIn } = userAuth();
    const { permissionNotifications } = userNotifications();
    const activeTab = ref("today");
    const refToday = ref(null);
    const refLibrary = ref(null);
    const refStats = ref(null);
    const refProfile = ref(null);
    const refs = reactive({
      today: refToday,
      library: refLibrary,
      stats: refStats,
      profile: refProfile,
    });

    let previousTab = ref("");
    // var userTheme = "light-theme";

    function moveUp() {
      window.scrollTo(0, 0);
    }

    onMounted(() => {
      cordovaApp.init(f7);

      watchEffect(() => {
        previousTab = activeTab;
      });

      f7ready(() => {
        console.log(device.cordova);

        // Init cordova APIs (see cordova-app.js)
        if (device.cordova) {
          cordovaApp.init(f7);
        }

      });
    });

    // Framework7 Parameters
    const f7params = {
      id: "cl.civicamente.app", // App bundle ID
      name: "Civicamente", // App name
      routes: routesMobile,
      theme: "auto", // Automatic theme detection
      cache: true,
      iosTranslucentBars: false,
      // autoDarkTheme: true,
      touch: {
        tapHold: true,
        tapHoldDelay: 300,
        tapHoldPreventClicks: true,
        disableContextMenu: false,
      },
      dialog: {
        title: "Cívicamente",
        buttonOk: "Ok",
        buttonCancel: "Cancelar",
        verticalButtons: true,
        destroyOnClose: true,
        preloaderTitle: "Cargando...",
        progressTitle: "Cargando...",
      },
      popover: {
        closeByBackdropClick: true,
      },
      serviceWorker:
        process.env.NODE_ENV === "production"
          ? {
              path: "/sw.js",
            }
          : {
              path: "/sw.js",
            },
      input: {
        scrollIntoViewOnFocus: device.cordova && !device.electron,
        scrollIntoViewCentered: device.cordova && !device.electron,
      },
      // Cordova Statusbar settings
      statusbar: {
        iosOverlaysWebView: true,
        androidOverlaysWebView: false,
      },
    };

    function onTabLinkClick(tab: string) {
      if (previousTab.value !== activeTab.value) return;
      console.log("previousTab", previousTab.value);
      console.log("activeTab", activeTab.value);
      if (activeTab.value === tab) {
        console.log("Tab: ", tab);
        /** @todo need to update */
        // refs[tab].$f7.views.main.router.back();
        // (refs[tab] as any).f7.router.back();
        // $(`#view-${tab}`)[0].f7View.router.back();
      } else {
        console.log("no es la misma tab");
      }
    }

    return {
      f7,
      f7params,
      isLoggedIn,
      permissionNotifications,
      onTabLinkClick,
      previousTab,
      activeTab,
      refToday,
      refLibrary,
      refStats,
      refProfile,
      refs,
    };
  },
  components: {
    logroDesbloqueado: defineAsyncComponent(() => import("@/views/web/partials/logroDesbloqueado.vue")),
  },
  async mounted() {
    //ESTABLECEMOS EL THEME POR DEFECTO
    const initUserTheme = await getMediaPreference();
    setTheme(initUserTheme);

    //VALIDAMOS SI HAY UN TOKEN EN EL LOCALSTORAGE PARA ENVIAR AL LOGINSTATUS
    this.isLoggedIn();

    if (process.env.NODE_ENV === "production") {
      this.permissionNotifications();
    }
  },
});
</script>
