<template>
  <f7-popup class="popup-trivia-finished" close-on-escape swipe-to-close push>
    <f7-navbar title="Resultados de la trivia">
      <f7-nav-right>
        <f7-link
          popup-close
          icon="fa-regular fa-xmark"
          icon-size="24"
          icon-color="white"
          icon-only
          class="z-10 flex items-center justify-center mx-auto bg-opacity-70"
        >
        </f7-link>
      </f7-nav-right>
    </f7-navbar>
    <f7-page>
      <f7-block
        class="text-align-center"
        id="modalTriviaTerminada"
        data-name="home"
        v-if="loadResultadoTrivia"
      >
        <f7-preloader color="multi"></f7-preloader>
      </f7-block>
      <f7-block
        id="modalTriviaTerminada"
        data-name="home"
        v-else
      >
        <h3 class="tituloResultado font-display">Resultados de la trivia</h3>
        <div
          class="grid items-center justify-center grid-cols-3 gap-5 mb-3  informacionResultado"
        >
          <div class="col">
            <div class="correctas d-flex align-items-center">
              <div class="detalle">Correctas</div>
              <div class="correctasNum">
                <span>
                  {{ triviaFinalizada.correctas }}
                </span>
              </div>
            </div>
          </div>
          <div class="col" style="padding: 0">
            <div class="erradas d-flex align-items-center">
              <div class="detalle">Incorrectas</div>
              <div class="correctasNum">
                <span>
                  {{ triviaFinalizada.incorrectas }}
                </span>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="puntaje d-flex align-items-center">
              <div class="detalle">Experiencia</div>
              <div class="correctasNum">
                <span>
                  {{
                    triviaFinalizada.trivia.puntaje_obtenido
                  }}
                  XP!
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="contenedorPreguntas">
          <div
            class="preguntas"
            v-for="pregunta in triviaFinalizada.preguntas"
            v-bind:key="pregunta.id"
          >
            <div class="grid justify-center grid-cols-3 gap-4">
              <div class="col-span-2">
                <p>{{ pregunta.preguntaNombre }}</p>
              </div>
              <div class="col-span-1">
                <div class="icono" v-if="pregunta.iscorrect == 1">
                  <img
                    src="https://res.cloudinary.com/dr3zgzxx0/image/upload/v1558043234/buena_qqlp38.png"
                    width="20"
                    alt=""
                  />
                </div>
                <div class="icono" v-else>
                  <img
                    src="https://res.cloudinary.com/dr3zgzxx0/image/upload/v1558043245/mala_s0jryk.png"
                    width="20"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div class="col-span-1">
              <div class="puntaje">
                <p>{{ pregunta.puntaje }} XP de experiencia</p>
              </div>
            </div>
            <f7-list media-list class="m-0">
              <f7-list-item accordion-item title="Mostrar respuestas">
                <f7-accordion-content>
                  <div class="p-2 respuestas">
                    <div class="grid justify-center grid-cols-2 gap-8">
                      <div class="col-6">
                        <p class="respuestasExpandidas">Respuesta correcta</p>
                        <span>{{ pregunta.correcta }}</span>
                      </div>
                      <div class="col-6">
                        <p class="respuestasExpandidas">Respuesta escogida</p>
                        <span>{{ pregunta.escogida }}</span>
                      </div>
                    </div>
                  </div>
                </f7-accordion-content>
              </f7-list-item>
            </f7-list>
          </div>
        </div>
      </f7-block>
    </f7-page>
  </f7-popup>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "vuex";
import { f7 } from "framework7-vue";

export default defineComponent({
  props: [],

  data() {
    return {
      localDataPreguntas: [],
      loadingStats: true,
      loadResultadoTrivia: true,
    };
  },

  mounted() {
    this.localDataPreguntas = this.triviaFinalizada.preguntas;
    this.loadResultadoTrivia = false;
  },
  created: function () {},
  updated: function () {
    this.localDataPreguntas = this.triviaFinalizada.preguntas;
  },
  methods: {},
  computed: {
    ...mapState(["triviaFinalizada"]),
  },
});
</script>
