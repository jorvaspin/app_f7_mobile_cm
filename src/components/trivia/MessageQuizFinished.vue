<template>
    <XyzTransition appear duration="auto" xyz="fade out-delay-5">
        <div
            class="resultadoTrivia-mobile z-[99998]"
            v-if="experienceGained"
        >
            <div class="contenedor-externo">
                <div class="contenedorInterno-trivia">
                    <lottie-player
                        autoplay
                        mode="normal"
                        :src="animateConfetti"
                        class="absolute inset-x-0 bottom-0 w-3/4 mx-10"
                    />
                            <h3
                                class="xyz-nested"
                                xyz="fade small stagger ease-out-back"
                            >
                                {{ motivationalMessage }}
                            </h3>
                    <div class="my-14">
                        <div class="flex flex-col">
                            <div
                                class="my-5 text-3xl leading-tight text-white font-display"
                                xyz="fade small stagger delay-4 ease-in-out"
                            >
                                <span v-if="questionsSummary.correct === 10"
                                    >¡Una puntuación perfecta!</span
                                >
                                <span v-else>Has obtenido</span>
                            </div>
                            <h4
                                class="relative inline-block text-6xl leading-none font-display"
                                xyz="fade small stagger delay-6 ease-in-out"
                            >
                                <span class="relative">
                                  {{ $filters.formatNumber(experienceGained)}}
                                  <span class="absolute text-lg leading-none -top-1 -right-5">XP</span>
                                </span>
                            </h4>
                        </div>
                    </div>
                    <f7-block xyz="fade small stagger delay-10 ease-in-out">
                        <f7-link back class="w-auto btn btn-default btn-lg">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="w-4 h-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                            <span class="-mb-1">Volver a mi aula virtual</span>
                        </f7-link>
                    </f7-block>
                </div>
            </div>
        </div>
    </XyzTransition>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import animateConfetti from "@/assets/animations/53513-confetti.json";
import {
    quizPlayEndingSound,
    quizStopAllSounds,
} from "@/composables/useAppFunctions";

export default defineComponent({
    props: {
        f7route: Object,
        f7router: Object,
        experienceGained: { type: Number, require: true, default: null },
        questionsSummary: { type: Object, require: true, default: null },
    },
    data() {
        return {
            animateConfetti,
        };
    },
    mounted() {
        quizStopAllSounds();
        quizPlayEndingSound();
    },
    computed: {
        motivationalMessage: function () {
            const answers = this.questionsSummary.correct;
            switch (true) {
                case answers <= 2:
                    return "¡Sigue mejorando!";
                    break;
                case answers <= 5:
                    return "Vas por buen camino";
                    break;
                case answers <= 8:
                    return "¡Bien hecho!";
                    break;
                case answers < 10:
                    return "¡Casi perfecto!";
                    break;
                case answers === 10:
                    return "¡Maravilloso!";
                    break;
                default:
                    break;
            }
        },
    },
});
</script>
