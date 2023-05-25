<template>
  <f7-app :params="f7params" class="mx-auto antialiased shadow-3xl">
      <f7-view
        url="/"
        main
        id="dashboard"
      ></f7-view>
  </f7-app>
</template>
<script>
import Vue from "vue";
import routes from "@src/routesWeb";

export default {
  name:'webLayout',
  props: [],
  data() {
    return {
      f7params: {
        root: '#app',
        id:'cl.civicamente.app',
        name:'Civicamente',
        routes: routes,
        theme: "aurora",
        cache: true,
        componentCache: true,
        cacheDuration: 600000,
        view: {
          pushState: true,
          history: true,
          allowDuplicateUrls: false,
          pushStateAnimate: true,
          preloadPreviousPage: true,
          pushStateOnLoad: false,
          pushStateSeparator:'',
          reloadPages:true,
          passRouteParamsToRequest: true,
        },
        dialog: {
          title: "Cívicamente",
          buttonOk: "Ok",
          buttonCancel: "Cancelar",
        },
        popover: {
          closeByBackdropClick: true,
        },
        touch: {
          fastClicks: true,
          disableContextMenu: false,
          mdTouchRipple: false,
          tapHold: true,
          materialRipple:true,
          activeState: true,
        },
        // statusbar: {
        //   enabled: true,
        //   overlay: true,
        //   iosOverlaysWebView: true,
        //   scrollTopOnClick: true,
        //   materialBackgroundColor: "#0B2161",
        //   iosBackgroundColor: "#0B2161",
        //   androidTextColor: "#FFFFFF",
        //   iosTextColor: "#FFFFFF",
        // },
      },
      isTerminateTour: null,
    };
  },

  mounted() {
    const vm = this;
    window.$('body').addClass('overlaybg');
    this.$f7ready((f7) => {
      const app = vm.$f7;
      const $ = f7.$;
      vm.$store.state.appIsReady = true;
      console.log("appIsReady", vm.$store.state.appIsReady);
      // console.log("f7Ready", app);

      //VALIDAMOS cm_access_token
      console.log("Validamos cm_access_token");
      if (vm.$localStorage.get('cm_access_token') != null && vm.$localStorage.get('cm_access_token') != 'undefined') {
        console.log("SI existe cm_access_token. Aplicando logiStatus");
        vm.loginStatus();
        // window.$('body').removeClass('overlaybg');
      } else {
        console.log("NO existe cm_access_token");
        vm.goToLogin();
        window.$('body').removeClass('overlaybg');
      }

      if (vm.$localStorage.get("theme") === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
        vm.$localStorage.set("theme", "light");
      }

      if (f7.device.electron) {
        return;
      }
    });

    vm.onResume();
  },

  methods: {
    async onResume() {
      try {
        const vm = this;
        const result = await localStorage.getItem("cm_onMusicApp");
        const musicBgApp = await vm.$store.state.musicBackgroundApp;
        if (!result) {
          return;
        }
        if (result === true && musicBgApp.src) {
          musicBgApp.play();
        }
      } catch (e) {
        console.log(e);
      }
    },
  show: function () {
      const vm = this;
      this.$nextTick(() => {
        vm.onResume();
      })
    },
  },
};
</script>
