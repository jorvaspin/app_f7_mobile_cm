<template>
  <f7-panel right cover class="panel-logros">
    <f7-page name="cm.perfil" class="bg-gray-200">
      <vue-headful :title="'Logros y recompensas ' + siteName" />
      <close-x-button></close-x-button>
      <div class="flex flex-col">
        <div class="flex h-44 bg-blue-100 border-b border-blue-200 bg-morado-duelo">
          <div class="flex flex-row items-center gap-5 px-4">
            <div class="w-1/5">
              <img
                src="/assets/images/duels/logo_duelos_civicos.svg"
                class="w-32 mx-auto"
                alt=""
              />
            </div>
            <div class="w-2/4">
              <h2 class="text-white-800 text-3xl font-display">Duelos Cívicos activos</h2>
              <p class="m-0">Acá se listan los duelos activos, una vez el rival finalice el duelo se mostrarán los resultados.</p>
            </div>
          </div>
        </div>
        <div class="flex-grow px-2 duelsInfoActivo">
            <div class="w-full">
                <user-list-duels-pending />
            </div>
        </div>
      </div>
    </f7-page>
  </f7-panel>
</template>

<script>

export default {
  data() {
    return {
    };
  },

  mounted() {
  },

  created: function () {
    this.$Progress.start();
    this.delay = "0.2s";
  },

  updated: function () {},

  methods: {
  },
};
</script>
