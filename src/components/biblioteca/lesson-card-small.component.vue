<template>
  <div
    class="card-lesson"
    :class="{'border-l-4 border-green-300' : tematica.valido_tematica, 'hover:opacity-80' : !device.desktop }"
    @click.prevent="(!device.desktop) ? (showLesson(tematica.slug, page, sectionName), tapClick()) : null"
  >
    <div class="relative flex items-center justify-center flex-shrink-0 w-20">
      <check-completed
        class="z-20"
        v-if="tematica.valido_tematica"
      ></check-completed>
      <img class="object-cover object-center w-16 h-20 mx-auto rounded-sm lg:h-24" :class="[{'grayscale-[80%]': tematica.valido_tematica }]" :src="tematica.imagen_portada" :data-src="tematica.imagen_portada" :alt="tematica.value" />
      <number class="absolute z-20 top-1 left-1" :mini="numberMini">{{ $filters.lessonOrder(tematica.order) }}</number>
      <div
        class="absolute inset-x-0 flex justify-center w-20 mx-auto truncate bottom-1"
        v-if="tematica.kanban_mes"
      >
        <badge-light>{{ tematica.kanban_mes }}</badge-light>
      </div>
    </div>
    <div class="flex flex-1 h-full">
      <div
        v-if="tematica.valido_tematica && (device.desktop || showStats)"
        class="absolute inline-flex gap-2 -top-3 right-1"
      >
        <badge-warning
          >{{
            $filters.formatNumber(tematica.valido_tematica.puntaje_obtenido)
          }}
          XP</badge-warning
        >
        <badge-success>Completada</badge-success>
      </div>
      <div class="flex flex-col items-center h-full pt-2">
        <div
          class="relative flex items-center flex-1 flex-grow w-full overflow-hidden h-2/5"
        >
          <h3 class="m-0 text-base font-bold leading-none text-gray-700 dark:text-gray-100 line-clamp-2">
            {{ tematica.value }}
          </h3>
        </div>
        <div
          class="relative flex-1 flex-shrink h-full text-xs text-gray-600 dark:text-gray-200"
        >
          <!-- <div
            class="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white"
          ></div> -->
         <p class="leading-tight line-clamp-2">{{ tematica.breve_descripcion }}</p>
        </div>
      </div>
    </div>
    <div
      class="flex items-center justify-center flex-shrink w-24"
      v-if="device.desktop"
    >
      <div class="flex-1 px-4 py-4 text-right" v-if="tematica.active != 1">
        <button class="w-auto btn btn-primary" disabled>No disponible</button>
      </div>
      <div class="flex-1 px-4 py-4 text-right" v-else>
        <button
          class="w-auto btn btn-default"
          v-if="tematica.valido_tematica"
          @click="showLesson(tematica.slug, page, sectionName), buttonClick()"
        >
          Volver a ver
        </button>
        <button
          class="w-auto btn btn-warning"
          v-else-if="tematica.tematica_iniciada"
          @click="
            showLesson(tematica.slug, page, sectionName), buttonClick()
          "
        >
          Seguir
        </button>
        <button
          class="w-auto btn btn-primary"
          v-else
          @click="
            tematica.active == 2 || tematica.active == 0
              ? null
              : verificoModal(tematica, page, sectionName),
              buttonClick()
          "
        >
          Iniciar
        </button>
      </div>
    </div>
    <div class="flex items-center justify-center w-16" v-else>
        <f7-button>
        <span class="text-gray-400 fa-light fa-chevron-right fa-lg"></span>
        </f7-button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { getDevice } from "framework7/lite-bundle";
import checkCompleted from "@components/biblioteca/tematica/check-completed.component.vue";
import Number from '@components/biblioteca/tematica/number.component.vue';
import { showLesson } from "@/composables/useLessonsFunctions";

export default defineComponent({
  name: "tematica-card-small",
  props: {
    tematica: { type: Object, required: true },
    showStats: { type: Boolean, required: false, default: false },
    numberMini: { type: Boolean, required: false, default: false },
    page: { type: String, required: false, default: "biblioteca" },
    sectionName: { type: String, required: false, default: "Biblioteca" },
  },
  setup() {
    const device = getDevice();
    return {
      device
    }
  },
  components: {
    checkCompleted,
    Number
  },
  data() {
    return {
      showLesson
    }
  },
});
</script>
