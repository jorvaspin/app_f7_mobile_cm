<template>
  <f7-sheet
    class="sheet-modal-validator-tof-lesson-video"
    style="height: auto"
    :close-by-backdrop-click="false"
    :close-by-outside-click="false"
    :close-on-escape="false"
    push
    :close="answerCompleted"
    @sheet:open="sheetOpenSound()"
  >
    <f7-page-content>
      <div class="flex flex-col items-center w-full px-5 py-10 space-y-4">
        <div class="flex items-center justify-start gap-4">
          <img :src="imgTofIcon" class="w-12" alt="" />
          <div class="text-base grow">Antes de continuar, ...</div>
        </div>
        <div>
          <p class="w-10/12 text-sm">
            Antes de continuar con el contenido, pondremos tu conocimiento en
            juego con una pregunta de Verdadero o Falso.
          </p>
        </div>
      <div class="content-tof">
        <h3 class="font-normal">{{ tofValidatorsVideo.question }}</h3>
        <div class="mb-4">
          <div
            class="block px-2 py-1 mt-2 text-sm text-gray-800 bg-gray-200 rounded "
            v-if="answerIsFalse"
          >
            <strong>¿Por qué es falsa?:</strong>
            {{ tofValidatorsVideo.observation }}
          </div>
        </div>
        <div
          class="flex items-center justify-center w-auto gap-8 mb-10 text-center "
        >
          <button
            class="flex flex-col w-24 h-24 gap-0 text-4xl leading-none btn btn-success btn-rounded-full"
            @click="answerCompleted ? null : answer_response(1)"
            :class="1 == iscorrectVideo ? 'correct_answer' : ''"
          >
            V
            <span class="text-sm">Verdadero</span>
          </button>
          <button
            class="flex flex-col w-24 h-24 gap-0 text-4xl leading-none btn btn-danger btn-rounded-full"
            @click="answerCompleted ? null : answer_response(0)"
            :class="0 == iscorrectVideo ? 'correct_answer' : ''"
          >
            F
            <span class="text-sm">Falso</span>
          </button>
        </div>
      </div>
      </div>

    </f7-page-content>
  </f7-sheet>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { answerTofValidator } from "@/composables/useQuizFunctions";
import {
  answerPlayFailSound,
  answerPlaySuccessSound,
} from "@/composables/useAppFunctions";
import store from "@/store/store";
import imgTofIcon from "@assets/images/tof-icon.svg";

export default defineComponent({
  props: ["tofValidatorsVideo"],
  data() {
    return {
      imgTofIcon,
      answerIsFalse: false,
      //answer correct response
      iscorrectVideo: null,
      answerCompleted: false,
    };
  },
  setup() {
    return {
      answerTofValidator,
    };
  },
  methods: {
    async answer_response(value: number) {
      const vm = this;
      try {
        // mostramos el porque es falso
        if (vm.tofValidatorsVideo.is_true == 0) {
          vm.answerIsFalse = true;
        }

        // validamos si respondio correctamente SIN IR AL SERVIDOR
        if (value == vm.tofValidatorsVideo.is_true) {
          answerPlaySuccessSound();
        } else {
          answerPlayFailSound();
        }

        // guardamos la data respondida
        const data = await answerTofValidator(
          value,
          vm.tofValidatorsVideo.lesson_id,
          vm.tofValidatorsVideo.id,
          vm.tofValidatorsVideo.step_id
        );

        vm.iscorrectVideo = data.is_true;
        vm.answerCompleted = true;
        //confirmamos que el alumno respondio el step 1
        store.state.completedStepOne = true;
      } catch (error) {
        console.log("Error al crear la trivia:", error);
      }
    },
  },
});
</script>
<style media="screen">
.correct_answer {
  background: green !important;
}
.error_answer {
  background: red !important;
}
</style>
