<template>
  <div
    class="relative p-1 bg-white rounded-xl"
    :class="device.dektop ? 'mb-20' : 'mb-10'"
  >
    <div class="rounded-xl w-100 rankingCurso">
      <div class="h-full">
        <row-user
          :data="place"
          :index="index + 1"
          :section="section"
          v-for="(place, index) in this.sliceEnd == 0
            ? $store.state.listRankingNivelNacional
            : $store.state.listRankingNivelNacional.slice(
                this.sliceIn,
                this.sliceEnd
              )"
          :key="index"
        ></row-user>
      </div>
    </div>
  </div>
</template>
<script>
import { getDevice } from "framework7/lite-bundle";
import {RowUser} from "@components/GlobalComponents";
export default {
  name:'ListRankingNacional',
  props: {
    sliceIn: { type: Number, required: true, default: 0 },
    sliceEnd: { type: Number, required: true, default: 0 },
    section: { type: String, required: false, default: "estadisticas" },
  },
  components: {
    RowUser,
  },
  setup() {
    const device = getDevice();
    return {
      device,
    };
  },
  data() {
    return {};
  }
};
</script>
