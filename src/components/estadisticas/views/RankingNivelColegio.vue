<template>
  <div
    class="relative h-full px-3 py-2 overflow-hidden card-box"
  >
    <!-- <vue-loading
      :active="!listRankingNivelColegio"
      color="#fff"
      background-color="#222"
      :blur="'40px'"
      :opacity="0.8"
      :is-full-page="false"
    /> -->

    <div class="flex flex-row items-center justify-between w-full h-20 gap-3 mb-3">
      <div class="flex-grow">
        <f7-block-title class="px-0 mx-0 font-display">Ranking Local</f7-block-title>
        <f7-block-header>
          <p class="leading-none">Participan todos los estudiantes de tu nivel
          <span class="font-bold">y de tu establecimiento</span>.</p>
        </f7-block-header>
      </div>
      <div class="flex-none w-12 text-center">
        <span class="text-gray-500 fal fa-school fa-2xl"></span>
      </div>
    </div>

    <div
      class="overflow-y-auto h-3/4"
      v-if="listRankingNivelColegio.length > 0"
    >
    <div
      class="absolute inset-x-0 bottom-0 z-50 flex items-center h-16 py-5 text-center justify-content-center bg-gradient-to-t from-white dark:from-palette-dark-tint"
    >
      <f7-link
        tag="button"
        class="btn btn-default btn-sm"
        name="button"
        href="/estadisticas/rankingnivelcolegio/"
        >Ver todo el ranking local
      </f7-link>
    </div>

      <list-ranking-colegio
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
import { defineComponent } from "vue";
import { getDevice } from "framework7/lite-bundle";
import { ListRankingColegio } from "@components/GlobalComponents";
import { mapGetters } from "vuex";

export default defineComponent({
  name: "RankingNivelColegio",
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
    ListRankingColegio,
  },
  computed:{
    ...mapGetters(['listRankingNivelColegio']),
  }
});
</script>
