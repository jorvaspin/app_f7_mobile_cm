<template>
  <div
    class="relative h-full px-3 py-2 overflow-hidden card-box"
  >
    <!-- <vue-loading
      :active="!listRankingNivelNacional"
      color="#fff"
      background-color="#222"
      :blur="'40px'"
      :opacity="0.8"
      :is-full-page="false"
    /> -->

    <div class="flex flex-row items-center justify-between w-full h-20 mb-3">
      <div class="flex-grow">
        <f7-block-title class="px-0 mx-0 font-display">Ranking Nacional</f7-block-title>
        <f7-block-header>
          <p class="leading-none">Participan todos los estudiantes del país que sean de tu mismo nivel.</p>
        </f7-block-header>
      </div>
      <div class="flex-none w-12 text-center">
        <span class="text-gray-500 fal fa-earth-americas fa-2xl"></span>
      </div>
    </div>

    <div
      class="overflow-auto scrol-ranking-nacional h-3/4"
      v-if="listRankingNivelNacional.length > 0"
    >
    <div
      class="absolute inset-x-0 bottom-0 z-50 flex items-center h-16 py-5 text-center justify-content-center bg-gradient-to-t from-white dark:from-palette-dark-tint"
    >
      <f7-link
        tag="button"
        class="btn btn-default btn-sm"
        name="button"
        href="/estadisticas/rankingnivelnacional/"
        >Ver todo el ranking nacional
      </f7-link>
    </div>
      <list-ranking-nacional
        :sliceIn="sliceIn"
        :sliceEnd="sliceEnd"
        :section="section"
      />
    </div>
    <div
      v-else
      class="my-5 card-yellow-info"
    >
      Aún no tenemos información recopilada sobre tu nivel para mostrarte el
      ranking 😭
    </div>
  </div>
</template>
<script lang="ts">
import { getDevice } from "framework7/lite-bundle";
import { ListRankingNacional } from "@components/GlobalComponents";
import { defineComponent } from "vue";
import { mapGetters } from "vuex";

export default defineComponent({
  name: "RankingNivelNacional",
  props: {
    sliceIn: { type: Number, required: true, default: 0 },
    sliceEnd: { type: Number, required: true, default: 0 },
    section: { type: String, required: false, default: "estadisticas" },
  },
  setup() {
    const device = getDevice();
    return {
      device,
    };
  },
  components: {
    ListRankingNacional,
  },
  computed:{
    ...mapGetters(['listRankingNivelNacional']),
  }
});
</script>
