<template>
  <div class="relative">
    <!-- <vue-loading
      :active="isLoading"
      color="#fff"
      background-color="#000"
      :blur="'10px'"
    /> -->
    <vue-loading
    :active="isLoading"
    color="#42424f"
    :lock-scroll="true"
    :z-index="999992"
    background-color="#1f2937"
    :opacity="0.9"
  >
    <span slot="after" class="relative flex flex-col items-center gap-6">
      <img :src="logoSquare" alt="Achievements" class="w-1/2 h-auto animate-pulse" />
      <span
        class="text-lg leading-6 text-center text-white uppercase mx-7 font-display bottom-3 text-shadow-lg animate-pulse"
        >Estamos rescatando los logros y recompensas disponibles...</span
      >
    </span>
  </vue-loading>
    <f7-block class="container">
        <div
    class="grid grid-cols-1 gap-3 py-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    v-if="listAppAchievements.length"
  >
    <div
      class="flex flex-col items-start gap-3 p-0 overflow-hidden card-box lg:gap-5"

      v-for="(achievement, index) in listAppAchievements"
      :key="index"
    >
    <div class="flex flex-row items-start gap-3" :class="device.desktop ? 'p-4' : 'px-5 py-3'">
      <div
        :class="device.desktop ? 'w-14' : 'w-12'"
        class="flex items-center justify-center flex-grow-0"
      >
        <img
          :src="achievement.image"
          class="w-10 mx-auto tooltip-init lg:w-14 lg:h-14"
          alt="Logro"
        />
      </div>
      <div class="flex-1">
        <h4 class="text-lg md:text-xl font-display">
          {{ achievement.name }}
        </h4>
        <div
          v-html="achievement.description"
          class="mb-2 text-xs leading-tight md:text-sm"
        ></div>
        <div
          class="inline-flex items-center gap-2 px-1 py-1 text-xs leading-none uppercase bg-gray-100 rounded-lg dark:bg-transparent font-display text-orange-cm"
        >Obtendrás
          <civipunto-icon />
           {{ $filters.formatNumber(achievement.civipoints) }} civipuntos
        </div>
      </div>
    </div>
    </div>
  </div>
    </f7-block>
  </div>
</template>

<script lang="ts">
import { mapGetters } from "vuex";
import { defineComponent } from "vue";
import { getDevice } from "framework7/lite-bundle";
import { getAppAchievements } from "@/composables/useAppFunctions";
import logoSquare from '@assets/images/achievements/logo-square.svg';
export default defineComponent({
  name: "list-app-achievements",
  setup() {
    const device = getDevice();
    return {
      device,
      logoSquare
    };
  },
  async mounted() {
    await getAppAchievements();
  },
  computed: {
    ...mapGetters(["listAppAchievements"]),

    isLoading() {
      return !this.listAppAchievements.length;
    },
  },
});
</script>
