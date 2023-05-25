<template>
  <f7-page class="bg-global-app">
    <vue-headful :title="'Escritorio ' + this.siteName" />
    <div class="flex">
      <sidebar-left></sidebar-left>
      <section
        class="flex-grow w-screen max-w-screen-xl mx-auto mainContent min-w-min"
      >
        <isconnected></isconnected>
        <menu-principal></menu-principal>
        <div class="grid grid-cols-8 gap-2 mt-10 mb-10">
          <div class="col-span-6">
            <div class="pb-3 pl-4">
              <contenido-principal></contenido-principal>
            </div>
          </div>
          <div class="relative col-span-2">
            <sidebar-right></sidebar-right>
          </div>
        </div>
      </section>
    </div>
  </f7-page>
</template>

<script>
import menuPrincipal from "../partials/menuPrincipal";
import contenidoPrincipal from "../partials/dashboard/contenidoPrincipal";
import sidebarLeft from "../partials/sidebarLeft";
import sidebarRight from "../partials/dashboard/sidebarRight";

export default {
  props: [],
  components: {
    menuPrincipal,
    contenidoPrincipal,
    sidebarLeft,
    sidebarRight,
  },
  mounted() {
    // this.$confetti.start();
  },

  created: function () {
    const vm = this;
    setTimeout(function () {
      vm.ciudadanoEjemplarLogro();
    }, 3000);
  },

  methods: {},
};
</script>
