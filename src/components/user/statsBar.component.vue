<template>
  <div
    class="flex items-center justify-start w-full bg-gray-800 bg-opacity-40"
  >
    <div class="grid grid-cols-2 gap-5 lg:grid-cols-5">
      <div class="flex items-center justify-start gap-3">
        <span
          class="w-10 h-10 p-3 text-2xl text-white border-2 border-white border-opacity-50 bg-xp font-display text-shadow"
          >XP</span
        >
        <span class="flex flex-col text-white font-display">
          <h4 class="text-2xl leading-none">
            {{ $filters.formatNumber(statsUser.puntaje_general) }}
          </h4>
          <h5 class="text-xs uppercase">Experiencia total</h5>
        </span>
      </div>
      <div class="flex items-center justify-start gap-3">
        <i class="text-3xl text-white fal fa-comments-alt"></i>
        <span class="flex flex-col text-white font-display">
          <h4 class="text-2xl leading-none">
            {{ statsUser.trivias_curso_actual }}
          </h4>
          <h5 class="text-xs uppercase">Trivias terminadas</h5>
        </span>
      </div>
      <div class="flex items-center justify-start gap-3 text-yellow-200">
        <i class="text-3xl fal fa-file-certificate"></i>
        <span class="flex flex-col font-display">
          <h4
            class="text-2xl leading-none"
            v-if="statsUser.nota_promedio != 0"
          >
            {{ statsUser.nota_promedio }}
          </h4>
          <h4 class="text-2xl leading-none" v-else>0</h4>
          <h5 class="text-xs uppercase">Nota promedio</h5>
        </span>
      </div>
      <div
        class="flex items-center justify-start gap-3 text-gray-500 opacity-20 disabled"
      >
        <i class="text-3xl fa-regular fa-swords"></i>
        <span class="flex flex-col font-display">
          <h4 class="text-2xl leading-none">
            {{ $filters.formatNumber(statsUser.duels.finished) }}
          </h4>
          <h5 class="text-xs uppercase">Duelos realizados</h5>
        </span>
      </div>
      <!-- <div
        class="flex items-center justify-start gap-3 text-gray-500 opacity-20 disabled"
      >
        <i class="text-3xl fa-regular fa-ball-pile"></i>
        <span class="flex flex-col font-display">
          <h4 class="text-2xl leading-none">0</h4>
          <h5 class="text-xs uppercase">Trivias grupales</h5>
        </span>
      </div> -->
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store/store';

export default defineComponent({
  setup() {
    const store = useStore();

    return{
      statsUser: computed(() => store.state.user)
    }
  },
})
</script>
