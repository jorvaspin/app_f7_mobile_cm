<template>
<vue-loading
      :active="!listUserAchievements.length"
      color="#fff"
      background-color="#000"
      :blur="'10px'"
    />
  <div
    class="flex flex-col py-3 space-y-2"
    v-if="listUserAchievements.length"
  >
    <div
      class="flex flex-col items-start gap-3 p-0 overflow-hidden card-box lg:gap-5"

      v-for="(achievement, index) in listUserAchievements"
      :key="index"
    >
    <div class="flex flex-row items-start gap-3" :class="device.desktop ? 'p-4' : 'px-5 py-3'">
      <div
        :class="device.desktop ? 'w-14' : 'w-12'"
        class="flex items-center justify-center flex-grow-0"
      >
        <img
          :src="achievement.details.image"
          class="tooltip-init"
          alt="Logro"
          :class="device.desktop ? 'w-12 h-12 ' : 'w-10 mx-auto'"
        />
      </div>
      <div class="flex-1">
        <h4 class="text-lg font-display">
          {{ achievement.details.name }}
        </h4>
        <div
          v-html="achievement.details.description"
          class="mb-2 text-xs lg:text-sm"
        ></div>
        <div
          class="inline-flex items-center gap-2 px-1 py-1 text-xs leading-none uppercase bg-gray-100 rounded-lg dark:bg-transparent font-display text-orange-cm"
        >
          <civipunto-icon />
          <span class="-mb-1">{{ $filters.formatNumber(achievement.details.civipoints) }} civipuntos de recompensa</span>
        </div>
      </div>
    </div>
      <div class="flex-1 w-full px-4 py-2 text-xs font-bold text-center uppercase dark:text-shadow bg-default dark:bg-orange-cm">
          Desbloqueado {{ $dayjs().to(achievement.unlocked_at) }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getUserAchievements } from "@/composables/userFunctions";
import { getDevice } from "framework7/lite-bundle";
import { defineComponent } from "vue";
import { mapGetters } from "vuex";

export default defineComponent({
  name: "list-user-achievements",
  setup() {
    const device = getDevice();
    return {
      device,
    };
  },
  mounted() {
      getUserAchievements();
  },
  computed: {
    ...mapGetters(["listUserAchievements"]),
  },
});
</script>
