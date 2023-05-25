<template>
<f7-popup
    :tablet-fullscreen="true"
    :close-by-backdrop-click="false"
    class="bg-modal-tematica tematica-popup"
  >
    <vue-headful :title="'Temáticas pendientes ' + $store.state.siteName" />
    <f7-page class="bg-gray-200">
      <close-page-button></close-page-button>
      <div class="flex flex-col">
        <div class="flex-grow px-2">
          <div class="max-w-screen-xl mx-auto my-5">
            <section-tematicas-pendientes
              :page="'panel-tematicas-pendientes'"
              :sectionName="'mes-dashboard'"
              modalWebCols="true"
            ></section-tematicas-pendientes>
          </div>
        </div>
      </div>
    </f7-page>
</f7-popup>
</template>

<script>
import sectionTematicasPendientes from "./partials/dashboard/sectionTematicasPendientes";
export default {
  components: {
    "section-tematicas-pendientes": sectionTematicasPendientes,
  },
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
