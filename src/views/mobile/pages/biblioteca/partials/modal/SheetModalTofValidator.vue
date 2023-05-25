<template>
  <f7-sheet
    class="sheet-modal-validator-tof"
    v-model:opened="isOpenedSheetModalTOF"
    style="height:100vh; --f7-sheet-bg-color: #fff;"
    :close-by-backdrop-click="false"
    :close-by-outside-click="false"
    :close-on-escape="false"
    push
    :close="answerCompleted"
    @sheet:open="sheetOpenSound()"
  >
    <f7-page-content>
      <div class="flex flex-col items-center w-full px-0 py-0 space-y-4 text-center">
        <!-- Header -->
        <div
            :class="device.ios && device.webView ? 'h-18 pt-4' : 'h-14'"
            class="w-full p-8 header-quiz-tof"
        >
            <div
                class="relative flex items-center justify-start w-1/3 gap-1 shrink-0"
            >
                <span class="w-8 shrink-0">
                    <img
                        :src="imgTofIcon"
                        class="w-auto"
                        alt="Quiz Verdadero y Falso"
                    />
                </span>
                <h1
                    class="flex-1 leading-none uppercase grow font-display text-xxs xs:line-clamp-2 line-clamp-3"
                    v-text="'Quiz Verdadero o Falso'"
                ></h1>
            </div>
        </div>
        <div class="w-full text-center">
          <p class="w-3/4 text-sm m-auto">
            Antes de continuar con el contenido, pondremos tu conocimiento en
            juego con una pregunta de Verdadero o Falso.
          </p>
        </div>
        <section class="card-question">
            <div class="relative w-full h-full">
                <div class="bg-card">
                        <div
                            class="card-content xyz-absolute"
                        >
                            <div
                                class="relative flex flex-col items-center justify-center w-full h-full "
                            >
                                <div class="blocked">
                                    {{ content.question }}
                                    <div class="block bg-gray-200 px-2 py-1 mt-2 rounded text-gray-800 text-sm" v-if="answerIsFalse">
                                        <strong>¿Porqué es falsa?:</strong> {{content.observation}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    <div class="card-back-1"></div>
                    <div class="card-back-2"></div>
                </div>
            </div>
        </section>
        <div
          class="flex items-center justify-center w-auto gap-8 mb-10 text-center"
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
import { mapState } from "vuex";
import { getDevice } from "framework7/lite-bundle";
import { f7 } from "framework7-vue";

export default defineComponent({
  props: {
    step: { type: String, required: true, default: "" },
    content: { type: Object, required: false, default: null }
  },
  data() {
    return {
      imgTofIcon,
      answerIsFalse: false,
      //answer correct response
      iscorrectVideo: null,
      answerCompleted: false
    };
  },
  setup() {
    const device = getDevice();
    return {
      answerTofValidator,
      device
    };
  },
  computed: {
    ...mapState(["isOpenedSheetModalTOF"])
  },
  methods: {
    async answer_response(value: number) {
      const vm = this;
      try {
        // mostramos el porque es falso
        if (vm.content.is_true == 0) {
          vm.answerIsFalse = true;
        }
        // opcion respondida
        vm.answerCompleted = true;
        // validamos si respondio correctamente SIN IR AL SERVIDOR
        if (value == vm.content.is_true) {
          answerPlaySuccessSound();
        } else {
          answerPlayFailSound();
        }

        // guardamos la data respondida
        const data = await answerTofValidator(
          value,
          vm.content.lesson_id,
          vm.content.id,
          vm.content.step_id
        );

        f7.toast.create({
            text: 'Pregunta respondida correctamente.',
            position: 'bottom',
            closeTimeout: 3000,
            destroyOnClose: true,
        }).open();

        vm.iscorrectVideo = data.is_true;
        //confirmamos que el alumno respondio el step 1 o 2
        if(vm.step === 'video'){
          store.state.tofCompletedStepOne = true;
        }else{
          store.state.tofCompletedStepTwo = true;
        }

        // close sheet modal
        store.state.isOpenedSheetModalTOF = false;
        // update click
        vm.answerCompleted = false;
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
