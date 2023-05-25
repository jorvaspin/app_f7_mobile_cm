<template>
  <f7-sheet
  class="sheet-modal-validator-tof-lesson-texto"
  style="height:auto;"
  swipe-to-close
  backdrop
  push
  @sheet:open="sheetOpenSound()"
>
<f7-page-content>
      <f7-block class="flex flex-col items-center justify-center space-y-3 text-center">
        <div class="content-center contents">
          <img :src="imgTofIcon" class="w-20" alt="">
          <p class="w-10/12 text-sm">Antes de continuar con el conenido, pondremos tu conocmiento en juego con una pregunta de Verdadero o Falso.</p>
        </div>
        <div class="content-tof">
          <h2 class="font-bold font-display">{{tofValidatorsTexto.question}}</h2>
          <div class="block px-2 py-1 mt-2 text-sm text-gray-800 bg-gray-200 rounded" v-if="answerIsFalse">
              <strong>¿Porqué es falsa?:</strong> {{tofValidatorsTexto.observation}}
          </div>
          <div class="flex mb-10 text-center w-100">
            <f7-link class="w-3/5 m-2 btn btn-primary btn-lg" v-on:click="answerCompleted ? null : answer_response(0)" :class="0 == iscorrectTexto ? 'correct_answer' : ''">
              Falso
            </f7-link>
            <br class="mb-7">
            <f7-link class="w-3/5 m-2 btn btn-primary btn-lg" v-on:click="answerCompleted ? null : answer_response(1)" :class="1 == iscorrectTexto ? 'correct_answer' : ''">
              Verdadero
            </f7-link>
          </div>
        </div>
      </f7-block>
</f7-page-content>
</f7-sheet>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { answerTofValidator } from "@/composables/useQuizFunctions";
import { answerPlayFailSound, answerPlaySuccessSound } from "@/composables/useAppFunctions";
import store from "@/store/store";
import imgTofIcon from "@assets/images/tof-icon.svg";

export default defineComponent({
  props: [
    'tofValidatorsTexto'
  ],
  data() {
    return {
      imgTofIcon,
      sheetOpened: false,
      answerIsFalse: false,
      //answer correct response
      iscorrectTexto: null,
      answerCompleted: false
    };
  },
  setup() {
    return {
      answerTofValidator
    };
  },
  methods: {
    async answer_response(value) {
      const vm = this;
      try {

        // mostramos el porque es falso
        if(vm.tofValidatorsTexto.is_true == 0){
          vm.answerIsFalse = true;
        }

        // validamos si respondio correctamente SIN IR AL SERVIDOR
        if(value == vm.tofValidatorsTexto.is_true){
          answerPlaySuccessSound()
        }else{
          answerPlayFailSound()
        }

        // guardamos la data respondida
        const data = await answerTofValidator(value, vm.tofValidatorsTexto.lesson_id, vm.tofValidatorsTexto.id, vm.tofValidatorsTexto.step_id);

        console.log(data);
        vm.iscorrectTexto = data.is_true
        vm.answerCompleted = true;
        //confirmamos que el alumno respondio el step 1
        store.state.completedStepTwo = true;
      } catch (error) {
        console.log("Error al crear la trivia:", error);
      }
    },
  },
});
</script>
<style media="screen">
  .correct_answer{
    background: green !important;
  }
  .error_answer{
    background: red !important;
  }
</style>
