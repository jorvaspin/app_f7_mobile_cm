<template>
  <f7-link
    no-link-class
    @click="tapClick()"
    href="/user-ranges/"
    class="w-full h-full px-4 py-4 box-rango"
  >
  <div class="absolute w-10 top-2 right-2">
    <span class="text-indigo-100 uppercase font-display">Más</span> <span class="text-indigo-100 fa-regular fa-chevron-right fill-indigo-100"></span>
  </div>
    <div class="flex flex-row justify-start w-full gap-3 md:flex-col">
      <div class="flex items-center self-center justify-center rounded-full w-26 h-26 bg-indigo-800/20">
        <img :src="rango.filename" alt="" class="flex w-20 mx-auto my-2" />
      </div>
      <div class="flex flex-col items-start justify-start flex-1 grow">
      <div class="w-full">
        <h4
          class="px-2 my-1 text-base text-left text-white uppercase md:text-center font-display"
        >
          {{ rango.value }}
        </h4>
        <div class="relative mt-1">
          <div
            class="flex h-4 overflow-hidden text-xs bg-white rounded-full shadow-inner bg-opacity-30"
          >
          <span class="absolute inset-0 w-10 mx-auto font-bold text-center text-gray-900/70">
            {{ $filters.formatNumber(progress) }}%
            </span>
            <div
              :style="`width: ${progress}%`"
              class="flex flex-col justify-center text-center text-white rounded-full shadow-none whitespace-nowrap bg-lime-300"
            ></div>
          </div>
        </div>
      </div>
      <div class="justify-center w-full mt-3 md:flex">
        <div class="flex items-center justify-start gap-2">
          <span
            class="w-8 h-8 p-3 text-xl text-white border-2 border-white border-opacity-50 bg-xp font-display text-shadow"
            >XP</span
          >
          <div class="text-left">
            <div class="text-sm leading-none font-display text-lime-400">
              {{ $filters.formatNumber(puntaje_general) }}
              XP
            </div>
            <div
              class="text-xs leading-none tracking-tight text-indigo-100 uppercase font-display"
            >
              a {{ thisMonth }} {{ thisYear }}
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  </f7-link>
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "@/store/store";

export default defineComponent({
  name: "global-student-rango",
  setup() {
    const store = useStore();
    return {
      rango: computed(() => store.state.user.rango),
      puntaje_general: computed(() => store.state.user.puntaje_general),
      progress: computed(() => store.getters.userRangoProgress),
      thisMonth: computed(() => store.state.thisMonth),
      thisYear: computed(() => store.state.thisYear),
    };
  },
  computed: {},
});
</script>
