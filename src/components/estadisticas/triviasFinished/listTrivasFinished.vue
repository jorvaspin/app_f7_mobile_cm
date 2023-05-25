<template>
  <div>
    <f7-block-header>
      <p class="leading-none">
        En esta sección podrás conocer los resultados de tu participación.
      </p>
    </f7-block-header>
    <f7-list>
      <f7-list-item
          link="#"
          class="mb-1 tituloTrivia d-block"
          v-for="(trivia, index) in listItemTrivias"
          :key="index"
          v-on:click="goToResultados(trivia.trivia_hash)"
          :header="trivia.sb_preguntas_tipo_id == 1 ? 'Video y documento' : 'Nivelacion Ciudadana'"
          :title="trivia.sb_preguntas_tematica_id != null ? trivia.tematica.value : 'Trivia General'"
          after="Ver"
        >
        <template #media>
          <img :src="
          trivia.sb_preguntas_tipo_id == 1 ? trivia.tematica.imagen_cover :
          'https://res.cloudinary.com/admsys-storage/image/upload/v1597869373/smarteducation/masterbrain/civicamentecl/civicamente-2021-apaisado.svg'" width="40" alt="">
        </template>
        <template #footer>
          <div class="mb-2">
            <span class="label label-secondary font-display mr-2">
              <span>{{trivia.puntaje_obtenido}}XP</span>
            </span>

            <span class="label label-default font-display">
              <span>{{trivia.fecha_termino}}</span>
            </span>
          </div>
        </template>
      </f7-list-item>
    </f7-list>
  </div>

</template>

<script lang="ts">
import { f7 } from "framework7-vue";
import { defineAsyncComponent, defineComponent } from "vue";
import { store } from "@/store/store";
import { getDevice } from "framework7/lite-bundle";
import imgTofIcon from "@assets/images/tof-icon.svg";

export default defineComponent({
  props: ['listItemTrivias'],
  components: {

  },
  data() {
    return {
      imgTofIcon
    };
  },
  setup() {
    const device = getDevice();
    return {
      device
    };
  },
  mounted() {
    const vm = this;
  },
  methods: {

  },
  computed:{

  }
});
</script>
