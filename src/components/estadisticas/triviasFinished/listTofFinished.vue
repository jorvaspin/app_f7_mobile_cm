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
          v-on:click="goToResultadosTof(trivia.tof_trivia_hash)"
          header="Contenido"
          title="Verdadero o Falso"
          after="Ver"
        >
        <template #media>
          <img :src="imgTofIcon" width="40" alt="">
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
