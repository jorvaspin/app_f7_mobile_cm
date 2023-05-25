<template>
<div class="grid grid-cols-1 gap-3 place-content-center">
<div
    class="w-full h-full px-4 py-1 box-rango" v-for="(rango, index) in listAppUserRanges" :key="index"
    :class="[{
      'saturate-20': (rango.pointsRequired > user.puntaje_general),
      'grayscale opacity-80': ((rango.pointsRequired < user.puntaje_general) && (user.rango.id != rango.id))
    }]"
  >
    <div class="flex flex-row justify-start w-full gap-3">
      <div class="flex items-center self-center justify-center w-20 h-20 rounded-full bg-indigo-800/20">
        <img :src="rango.filename" alt="" class="flex w-16 mx-auto my-2" />
      </div>
      <div class="flex flex-col items-start justify-start flex-1 grow">
      <div class="w-full">
        <h4
          class="px-2 my-1 text-xl text-left text-white uppercase font-display"
        >
          {{ rango.value }}
        </h4>
        <!-- <div class="relative mt-1">
          <div
            class="flex h-4 overflow-hidden text-xs bg-white rounded-full shadow-inner bg-opacity-30"
          >
          <span class="absolute inset-0 w-10 mx-auto font-bold text-gray-900/70">
            {{ $filters.formatNumber(pointsRequired) }}%
            </span>
            <div
              :style="`width: ${pointsRequired}%`"
              class="flex flex-col justify-center text-center text-white rounded-full shadow-none whitespace-nowrap bg-lime-300"
            ></div>
          </div>
        </div> -->
      </div>
      <div class="w-full">
        <div class="flex items-center justify-start gap-2">
          <span
            class="w-8 h-8 p-3 text-xl text-white border-2 border-white border-opacity-50 bg-xp font-display text-shadow"
            >XP</span
          >
          <div class="text-left">
            <div class="text-sm leading-none uppercase font-display text-lime-400">
              {{ $filters.formatNumber(rango.pointsRequired) }}
              XP
            </div>
            <div
              class="text-xs leading-none tracking-tight text-indigo-100 uppercase font-display"
            >
              <span v-if="rango.pointsRequired > user.puntaje_general" class="blocked">
                Te faltan {{ $filters.formatNumber(rango.pointsRequired - user.puntaje_general) }} xp</span>

            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
    <span v-if="user.rango.id == rango.id" class="absolute inset-y-auto my-auto right-4">
      <img :src="placeFlag" class="w-6" alt="Stay here">
    </span>
  </div>
</div>
<vue-loading
  :active="!listAppUserRanges.length"
  color="#fff"
  background-color="#222"
  :blur="'40px'"
  :opacity="0.8"
/>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, mapState } from "vuex";
import { listUserRanges } from "@/composables/useAppFunctions";
import placeFlag from '@/assets/images/place-flag.svg';

export default defineComponent({
  data() {
    return {
      placeFlag
    }
  },
  mounted() {
    listUserRanges();
  },
  methods: {
  },
  computed: {
    ...mapState(["user"]),
    ...mapGetters(['listAppUserRanges']),
  },
});
</script>
