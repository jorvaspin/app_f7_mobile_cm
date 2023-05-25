<template>
  <f7-sheet
    class="sheet-modal-trivia-nivelacion"
    style="height: auto"
    swipe-to-close
    backdrop
    push
    @sheet:open="sheetOpenSound()"
  >
    <div class="sheet-modal-swipe-step">
      <f7-block class="mt-6">
        <h2 class="text-xl font-semibold tracking-tight opacity-80">Iniciar una trivia de...</h2>
        <div class="flex flex-col py-4">
          <f7-link class="justify-between w-full h-20 py-1 mb-4 btn btn-warning sheet-close" @click="startQuiz(), buttonClick()">
          <span class="flex flex-col items-start justify-start -mb-1 text-2xl leading-none">
              Modalidad Clásica
              <span class="text-xs font-semibold tracking-tight text-left normal-case truncate text-shadow-none blocked font-body">
                10 preguntas, 4 respuestas posibles.
              </span>
          </span>
          <span class="flex justify-center w-14 shrink-0">
            <img
            :src="imgRuleta"
            class="w-auto h-auto"
            alt="Trivias de nivelación"
          />
          </span>
          </f7-link>
          <!-- disabled -->
          <f7-link class="justify-between w-full h-20 py-1 mb-8 btn btn-tof sheet-close" @click="startQuizTof(), buttonClick()">
            <!-- <span class="absolute z-10 top-1 right-1 px-2 pt-1 pb-0.5 rounded-full text-white bg-blue-600 text-shadow-none text-xxs">Próximamente</span> -->
          <span class="flex flex-col items-start justify-start -mb-1 text-2xl leading-none">
              Verdadero/falso
              <span class="text-xs font-semibold tracking-tight text-left normal-case truncate text-shadow-none font-body">
                10 preguntas, 2 respuestas posibles.
              </span>
          </span>
          <span class="flex justify-center w-14 shrink-0">
            <img
            :src="imgTofIcon"
            class="w-12 h-auto"
            alt="Trivias de verdadero/falso"
          />
          </span>
          </f7-link>
          <f7-link
              class="text-base"
                sheet-close
                >Cancelar</f7-link>

        </div>
      </f7-block>
    </div>
  </f7-sheet>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { f7 } from "framework7-vue";
import { createQuiz, createQuizTof } from "@/composables/useQuizFunctions";
import { showAlertError } from "@/composables/useHelpersFunctions";
import imgRuleta from "@assets/images/ruleta.svg";
import imgTofIcon from "@assets/images/tof-icon.svg";

export default defineComponent({
  name: 'modal-trivia-nivelacion',
  props: {
    f7route: Object,
    f7router: Object,
  },
  data() {
    return {
      imgRuleta,
      imgTofIcon,
    }
  },
  methods: {
    async startQuiz() {
      f7.dialog.preloader("Creando escenario...");
      try {
        const data = await createQuiz();
        f7.views.current.router.navigate({
          name: "cm.biblioteca.trivia",
          params: {
            hash: data.quizHash,
          },
        });
        f7.dialog.close();
        console.log('Creamos la trivia con el hash:', data.quizHash);
      } catch (error) {
        showAlertError('No se pudo crear la trivia');
        console.log("Error al crear la trivia:", error);
      }
    },
    async startQuizTof() {
      const vm = this;
      f7.dialog.preloader("Creando escenario...");
      try {
        const data = await createQuizTof();
        console.log(data);
        f7.views.current.router.navigate({
          name: "cm.quiz.tof",
          params: {
            hash: data.quizTofHash,
          },
        });
        f7.dialog.close();
        console.log('Creamos las preguntas TOF con el hash:', data.quizHash);
      } catch (error) {
        showAlertError('No se pudo crear las preguntas tof, intentelo nuevamente');
        console.log("Error al crear las preguntas tof:", error);
      }
    }
  },
  computed:{

  }
});
</script>
