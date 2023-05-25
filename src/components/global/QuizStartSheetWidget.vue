<template>
    <div
        class="flex flex-row items-center justify-between h-full pt-5 pb-6 md:flex-col card-box card-trivias-box"
    >
        <div>
            <div class="flex flex-row items-center gap-1 md:gap-2 md:pt-0">
                <div class="flex-shrink-0 w-11 md:w-12">
                    <img :src="imgRuleta" alt="Trivias de nivelación" />
                </div>
                <h5
                    class="font-extrabold leading-none uppercase text-purple-cm dark:text-gray-100 font-display"
                >
                    Aprende a tu propio ritmo
                </h5>
            </div>
            <div
                class="mt-2 text-sm leading-none text-left lg:text-base text-titles dark:text-gray-100"
            >
                <!-- <p v-if="!user.trivias_por_jugar">
                    <strong>Muy bien!</strong> has completado tus trivias
                    disponibles de hoy.
                  </p> -->
                <!-- <p v-else> -->
                <p>
                    Dispones de
                    <span class="font-bold"
                        >{{ user.trivias_por_jugar }} trivias</span
                    >
                    y
                    <span class="font-bold"
                        >{{ user.quiz_tof_por_jugar }} Quiz Verdero o
                        Falso</span
                    >
                    para responder hoy.
                </p>
            </div>
        </div>
        <div class="w-1/2 px-3 md:w-full md:py-2 shrink-0">
            <!-- <div
                  name="Nuevatrivia"
                  id="Nuevatrivia"
                  @click="completeTrivias, buttonClick()"
                  v-if="!user.trivias_por_jugar"
                >
                  <img
                    :src="imgBtnTriviasCompletadas"
                    alt=""
                    class="w-full sm:w-3/4"
                  />
                </div> -->
            <!-- <div name="Nuevatrivia" id="Nuevatrivia" v-else> -->
            <div name="Nuevatrivia" id="Nuevatrivia">
                <f7-link
                    no-link-class
                    class="w-full overflow-hidden sm:w-3/4 md:w-2/4 active:transition-transform active:scale-95"
                    sheet-open=".sheet-modal-trivia-nivelacion"
                >
                    <img :src="imgBtnIniciarTrivia" alt="" class="w-full mx-auto md:w-3/4 md:mt-3" />
                </f7-link>
            </div>
        </div>
    </div>
    <sheet-modal-trivia-nivelacion />
</template>
<script lang="ts">
import { defineAsyncComponent, defineComponent } from "vue";
import imgRuleta from "@assets/images/ruleta.svg";
import imgBtnIniciarTrivia from "@assets/images/boton-iniciar-trivia.svg";
import imgBtnTriviasCompletadas from "@assets/images/boton-trivias-diarias-completadas.svg";
import { mapState } from "vuex";

export default defineComponent({
    setup() {
        return {
            imgRuleta,
            imgBtnIniciarTrivia,
            imgBtnTriviasCompletadas
        };
    },
    components: {
        SheetModalTriviaNivelacion: defineAsyncComponent(
            () =>
                import("@/views/mobile/partials/SheetModalTriviaNivelacion.vue")
        ),
    },
    computed: {
    ...mapState(['user']),
  },
});
</script>
