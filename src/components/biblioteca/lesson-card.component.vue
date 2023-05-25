<template>
  <div class="w-full">
    <!-- <modal-consejo-mobile :tematicaObj="tematica" :page="page" :sectionName="sectionName" /> -->
    <div
      class="relative h-full border-none"
      :class="tematica.valido_tematica ? 'border-t-4 border-green-300' : ''"
    >
      <div
        v-if="tematica.valido_tematica"
        class="absolute z-10 inline-flex gap-2 -top-3 right-1"
      >
        <badge-warning
          >{{
            $filters.formatNumber(tematica.valido_tematica.puntaje_obtenido)
          }}
          XP</badge-warning
        >
        <badge-success>Completada</badge-success>
      </div>
      <div
        class="relative grid grid-flow-row grid-cols-6 bg-white rounded-md shadow-md "
      >
        <div
          :class="{ 'opacity-70': tematica.valido_tematica }"
          class="relative z-10 col-span-2 bg-gray-400 bg-center bg-no-repeat bg-cover  rounded-l-md"
          :style="'background-image: url(' + tematica.imagen_portada + ');'"
        >
          <div
            class="absolute inset-x-0 bottom-0 flex  h-3/6 bg-gradient-to-t from-gray-900 rounded-bl-md"
          ></div>
          <tematica-number class="absolute z-10 top-2 left-2">{{
            $filters.lessonOrder(tematica.order)
          }}</tematica-number>
          <div class="absolute inset-x-0 z-20 flex flex-col bottom-5">
            <div class="py-3">
              <likes-tematica
                :tematicaId="tematica.id"
                :cantidadlikes="tematica.cantidad_likes"
              ></likes-tematica>
            </div>
            <div>
              <cant-users-tematica
                :cantidad-respondida="tematica.la_han_terminado"
              ></cant-users-tematica>
            </div>
          </div>
          <check-completed v-if="tematica.valido_tematica"></check-completed>
        </div>
        <div class="h-full col-span-4">
          <div class="flex flex-col h-full pt-3">
            <div
              :class="{ 'opacity-70': tematica.valido_tematica }"
              class="relative flex items-center flex-grow h-16 px-4 py-2 overflow-hidden "
            >
              <div
                class="absolute inset-x-0 bottom-0 h-6  bg-gradient-to-t from-white"
              ></div>
              <h3
                class="m-0 text-lg leading-tight text-gray-800  line-clamp-2 font-display"
              >
                {{ tematica.value }}
              </h3>
            </div>
            <div
              :class="{ 'opacity-70': tematica.valido_tematica }"
              class="relative flex-grow-0 h-16 px-4 overflow-hidden text-xs text-gray-900  lg:text-sm lg:leading-tight"
            >
              <div
                class="absolute bottom-0 left-0 right-0 h-12  lg:h-full bg-gradient-to-t from-white"
              ></div>
              <p class="line-clamp-3">{{ tematica.breve_descripcion }}</p>
            </div>
            <div class="flex items-center justify-between flex-grow h-14">
              <div
                :class="{ 'opacity-70': tematica.valido_tematica }"
                class="flex-1 text-center"
              >
                <badge-light>
                  {{ tematica.dificultad_name }}
                </badge-light>
              </div>
              <div
                class="flex-1 px-4 py-4 text-right"
                v-if="tematica.active != 1"
              >
                <button
                  class="w-auto btn btn-primary"
                  disabled
                  title="No disponible"
                >
                  Iniciar
                </button>
              </div>
              <div class="flex-1 px-4 text-right" v-else>
                <span v-if="tematica.valido_tematica">
                  <button
                    class="w-auto btn btn-default"
                    v-on:click="
                      showLesson(tematica.slug, page, sectionName),
                        buttonClick()
                    "
                  >
                    Volver a ver
                  </button>
                </span>
                <span v-else-if="tematica.tematica_iniciada">
                  <button
                    class="w-auto btn btn-warning"
                    v-on:click="
                      showLesson(tematica.slug, page, sectionName),
                        buttonClick()
                    "
                  >
                    Seguir
                  </button>
                </span>
                <span v-else>
                  <button
                    class="w-auto btn btn-primary"
                    v-on:click="
                      tematica.active == 2 || tematica.active == 0
                        ? null
                        : verificoModal(tematica, page, sectionName),
                        buttonClick()
                    "
                  >
                    Iniciar
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import checkCompleted from "@components/biblioteca/tematica/check-completed.component.vue";
import LikesTematica from "@components/biblioteca/tematica/likes.component.vue";
import CantUsersTematica from "@components/biblioteca/tematica/cant-users.component.vue";
import TematicaNumber from "@components/biblioteca/tematica/number.component.vue";
import { showLesson } from "@/composables/useLessonsFunctions";

export default defineComponent({
  name: "componentTematicaCard",
  props: {
    tematica: { type: Object, required: true },
    page: { type: String, required: false, default: "biblioteca" },
    sectionName: { type: String, required: false, default: "Biblioteca" },
  },
  components: {
    checkCompleted,
    LikesTematica,
    CantUsersTematica,
    TematicaNumber,
  },
  data() {
    return {
        showLesson
    };
  },
});
</script>
