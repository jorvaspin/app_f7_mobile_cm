<template>
    <f7-sheet
        class="sheet-modal-quiz-lesson"
        style="height: auto"
        swipe-to-close
        backdrop
        push
        @sheet:open="sheetOpenSound()"
    >
        <div class="sheet-modal-swipe-step">
            <f7-block
                class="flex flex-col items-center justify-center pt-3 space-y-3 text-center "
            >
                <img
                    :src="lessonImage"
                    class="rounded-md shadow-md w-28"
                    alt=""
                />
                <h3 class="mb-4 text-xl uppercase font-display">
                    {{ lessonValue }}
                </h3>
                <p class="px-6 text-sm leading-tight">
                    Estás a punto de iniciar la trivia de esta temática y no
                    podrás cancelarla hasta que finalices...
                </p>
                <div class="w-full p-4">
                    <button
                        class="w-full btn btn-primary btn-lg sheet-close"
                        @click="startLessonQuiz(lessonId), buttonClick()"
                    >
                        Ok, comencemos!
                    </button>
                    <div class="mt-5 mb-3 text-center">
                        <f7-link class="text-lg" sheet-close
                            >No todavía</f7-link
                        >
                    </div>
                </div>
            </f7-block>
        </div>
    </f7-sheet>
</template>
<script lang="ts">
import { showAlertError, showToast } from "@/composables/useHelpersFunctions";
import { createLessonQuiz } from "@/composables/useQuizFunctions";
import { axiosApiInstance } from "@/js/axios";
import store from "@/store/store";
import { f7 } from "framework7-vue";
import { defineComponent } from "vue";

export default defineComponent({
    props: ["lessonId", "lessonImage", "lessonValue", "page"],
    data() {
        return {
            sheetOpened: false,
        };
    },
    methods: {
        async startLessonQuiz(lessonId: number) {
            const vm = this;
            f7.dialog.preloader("Creando escenario...");
            try {
                const data = await createLessonQuiz(lessonId);
                // console.log();
                // return data;
                f7.dialog.close();

                if (data.pendiente) {
                        f7.dialog
                            .create({
                                title: "Temática pendiente",
                                text:
                                    "Tienes una trivia activa para la temática " +
                                    data.nombreTematica +
                                    ".<br><br> ¿Qué deseas hacer?.",
                                buttons: [
                                    {
                                        text: "Terminar trivia pendiente",
                                        color: "blue",
                                        onClick: function () {
                                            f7.views.current.router.navigate({
                                                name: "cm.biblioteca.trivia",
                                                params: {
                                                    hash: data.quizHash,
                                                },
                                            });
                                        },
                                    },
                                    {
                                        text: "Cancelar por ahora",
                                        color: "red",
                                    },
                                ],
                                verticalButtons: true,
                            })
                            .open();
                    } else {
                        if (data.ok == "terminada") {
                            showToast({
                                text: "Ya has completado esta trivia.",
                                closeTimeout: 3000,
                                closeButton: true,
                                position: "bottom",
                                type: "success",
                            });

                        } else {
                            f7.views.current.router.navigate({
                                name: "cm.biblioteca.trivia",
                                params: {
                                    hash: data.quizHash,
                                },
                            });
                        console.log("Creamos la trivia con el hash:", data.quizHash);
                        }
                    }
            } catch (error) {
                // showAlertError("No se pudo crear la trivia");
                console.log("Error al crear la trivia:", error);
            }
        },
    },
});
</script>
