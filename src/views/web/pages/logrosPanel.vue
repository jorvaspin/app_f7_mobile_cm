<template>
  <f7-panel left cover class="panel-logros" style="--f7-panel-left-width:50vw">
    <f7-page name="cm.perfil" class="bg-gray-200">
      <vue-headful :title="'Logros y recompensas ' + $store.state.siteName" />
      <close-page-button></close-page-button>
      <div class="flex flex-col w-full relative">
        <div
          class="
            flex
            w-full
            h-24
            sticky
            top-0
            bg-gradient-to-br
            from-indigo-600
            to-blue-600
          "
        >
          <div class="flex flex-row items-center gap-5 px-4 w-full">
            <div class="w-46">
              <img
                src="https://res.cloudinary.com/admsys-storage/image/upload/w_100/smarteducation/masterbrain/civicamente-v2/icons/logros-recompensas.png"
                class="w-16 mx-auto"
                alt="Logros y recompensas"
              />
            </div>
            <div class="w-3/4">
              <h2 class="text-white font-display">Logros y recompensas</h2>
              <p class="text-sm text-white">
                Acá se listan tus logros y recompensas obtenidas 👏
              </p>
            </div>
          </div>
        </div>
        <div class="flex-grow px-2">
          <div class="w-full">
            <user-list-achievements />
          </div>
        </div>
      </div>
    </f7-page>
  </f7-panel>
</template>

<script>
export default {
  data() {
    return {};
  },

  mounted() {},

  created: function () {
    this.$Progress.start();
    this.delay = "0.2s";
  },

  updated: function () {},

  methods: {},
};
</script>
<style>
/* .panel-logros {
  max-width: 50vw !important;
} */
</style>
