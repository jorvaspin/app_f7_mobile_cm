<template>
  <div
    class="relative p-1 bg-white rounded-xl"
    :class="device.dektop ? 'mb-20' : 'mb-10'"
  >
    <!-- <vue-loading
      :active="!listRankingNivelColegio.length"
      color="#fff"
      background-color="#000"
      :blur="'10px'"
    /> -->
    <div class="rounded-xl w-100 rankingCurso">
      <div class="h-full">
        <row-user
          :data="place"
          :index="index + 1"
          :section="section"
          v-for="(place, index) in this.sliceEnd == 0
            ? listRankingNivelColegio
            : listRankingNivelColegio.slice(
                this.sliceIn,
                this.sliceEnd
              )"
          :key="index"
        ></row-user>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import { getDevice } from "framework7/lite-bundle";
import { RowUser } from "@components/GlobalComponents";

export default defineComponent({
  name: "ListRankingColegio",
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
  computed: {
    ...mapGetters(["listRankingNivelColegio"]),
  },

});
</script>
