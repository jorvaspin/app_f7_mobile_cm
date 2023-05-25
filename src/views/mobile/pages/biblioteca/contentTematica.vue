<template>
  <f7-page
    name="content-lesson-page"
    hide-navbar-on-scroll
    no-toolbar
    no-swipeback
    class="content-lesson"
  >
    <f7-navbar :title="lesson.value" transparent no-shadow>
      <f7-nav-right>
          <f7-link icon-only @click.prevent="tapClick()" back color="white" class="p-0.5 bg-black rounded-full bg-opacity-70" icon-size="24" icon="fa-light fa-xmark"></f7-link>
        </f7-nav-right>
    </f7-navbar>
    <div class="container h-full" v-if="isLoading">
      <div
        class="relative z-0 flex flex-wrap content-end h-48 py-3 bg-gray-300 md:px-20 md:h-56"

      >
      <div class="absolute bottom-0 left-0 right-0 z-20 h-full bg-gradient-to-t from-gray-900"></div>
      <img
          src="https://res.cloudinary.com/admsys-storage/image/upload/f_auto,w_auto/smarteducation/masterbrain/civicamente-app/app-files/static/banner-temporal-cm-tematicas"
          class="absolute inset-0 z-10 object-cover object-center w-full h-48 mx-auto opacity-50 md:h-56"
          alt=""
        />
        <f7-block class="z-20 flex flex-col content-end w-full mx-0 ">
          <div class="mb-2 text-white flex-0">
            <div class="mb-4 flex-0">
              <f7-skeleton-block
                class="h-4 rounded-full skeleton-effect-fade w-80"
              ></f7-skeleton-block>
            </div>
          </div>
          <div class="flex-0">
            <div class="flex flex-row items-center gap-4">
              <div class="flex-none w-auto">
                <div
                    class="flex items-center gap-2 text-gray-300 skeleton-text skeleton-effect-fade"
                  >
                    <f7-skeleton-block
                      class="w-5 h-5 rounded-full "
                    ></f7-skeleton-block>
                    <f7-skeleton-block
                      class="h-3 rounded-full w-9 skeleton-effect-fade"
                    />
                  </div>
              </div>
              <div class="flex-none w-auto skeleton-effect-fade">
                <div
                    class="flex items-center gap-2 text-gray-300 rounded "
                  >
                    <f7-skeleton-block
                      class="w-5 h-5 rounded-full "
                    ></f7-skeleton-block>
                    <f7-skeleton-block
                      class="h-3 rounded-full w-9 skeleton-effect-fade"
                    />
                  </div>
              </div>
              <div class="flex justify-end flex-grow w-10">
                <f7-skeleton-block
                    class="w-20 h-5 ml-auto text-right rounded-full skeleton-effect-fade"
                  />
              </div>
            </div>
          </div>
        </f7-block>

      </div>
      <div class="relative p-4 bg-gray-500 md:px-20">
        <div
          class="w-full px-5 py-3 mx-auto font-serif text-xs leading-relaxed border-4 border-gray-200 border-dotted rounded border-opacity-80 dark:border-opacity-20 skeleton-text skeleton-effect-fade"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
          lobortis et massa ac interdum. Cras consequat felis at
        </div>
      </div>
      <div class="h-full p-5 bg-gray-100 md:px-20">
        <f7-skeleton-text class="skeleton-effect-fade">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
          lobortis et massa ac interdum. Cras consequat felis at consequat
          hendrerit.<br />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
          lobortis et massa ac interdum. Cras consequat felis at consequat
          hendrerit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Morbi lobortis et massa ac interdum. Cras consequat felis at consequat
          hendrerit.
        </f7-skeleton-text>
        <br>
        <br>
        <f7-skeleton-text class="skeleton-effect-fade">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
          lobortis et massa ac interdum. Cras consequat felis at consequat
          hendrerit.<br />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
          lobortis et massa ac interdum. Cras consequat felis at consequat
          hendrerit. Lorem ipsum dolor sit amet.
        </f7-skeleton-text>
      </div>
    </div>
    <div
      class="container mx-auto"
      v-else
    >
      <div
        class="relative z-0 flex flex-wrap content-end h-48 py-3 bg-gray-300 md:h-56"
      >
      <div class="absolute bottom-0 left-0 right-0 z-20 h-full bg-gradient-to-t from-gray-900"></div>
      <img class="absolute inset-0 z-10 object-cover object-center w-full h-48 mx-auto md:h-56" :src="lesson.imagen_cover" :alt="lesson.value" />
      </div>
      <f7-block class="container absolute z-20 flex flex-col justify-start w-full h-20 mx-0 -mt-20">
          <div class="flex items-end justify-start mb-4 text-white flex-0">
            <h2 class="text-xl leading-none font-display line-clamp-1">
              {{ lesson.value }}
            </h2>
          </div>
          <div class="flex-0">
            <div class="flex flex-row items-center">
              <div class="flex-none w-auto">
                <likes-tematica
                    :tematicaId="lesson.id"
                    :cantidadlikes="lesson.cantidad_likes"
                  ></likes-tematica>
              </div>
              <div class="flex-none w-auto">
                <cant-users-tematica
                  :cantidad-respondida="lesson.la_han_terminado"
                ></cant-users-tematica>
              </div>
              <div class="flex justify-end flex-grow w-10">
                <badge-multicolor>
                  Nivel {{ lesson.dificultad_name }}
                </badge-multicolor>
              </div>
            </div>
          </div>
        </f7-block>

      <div class="p-4 bg-slate-300 dark:bg-black">
        <div
          class="w-full px-5 py-3 mx-auto font-serif text-xs leading-relaxed border-4 border-gray-200 border-dotted rounded border-opacity-80 dark:border-opacity-20"
        >
          {{ lesson.breve_descripcion }}
        </div>
      </div>
      <f7-block class="py-10 mt-0 card-video-tematica bg-zinc-300 dark:bg-zinc-800">
        <tematica-badge-completed
          class="w-5/6 mb-10"
          v-if="this.validaTrivia != null"
        >
          {{ $filters.formatNumber(validaTrivia.puntaje_obtenido) }}
        </tematica-badge-completed>

          <div class="civitip">
            <div class="step-tip">
              <tematica-paso
                class="step"
              >
                <template v-slot:number>1</template>
                <template v-slot:action
                  ><i class="fa-regular fa-video"></i> Audiovisual</template
                >
              </tematica-paso>
            </div>
              <div class="text-tip">
                  En este video podrás empezar a conocer algo sobre {{ lesson.value }}. <strong>Presta mucha atención.</strong>
              </div>
          </div>

          <div v-if="lessonVideo.link" class="inline-block w-full my-5 overflow-hidden bg-white rounded shadow-lg shadow-gray-400/30 dark:shadow-black/50">
            <video controls preload="auto" v-bind:poster="lessonVideo.image" class="w-full bg-center bg-no-repeat bg-cover rounded" controlsList="nodownload" :onended="endVideo">
              <source :src="lessonVideo.link" :type="lessonVideo.type">
            </video>
          </div>
          <div v-else>
              <div class="relative mt-3 duration-75 animate-pulse">
                  <i class="absolute inset-0 w-20 h-20 m-auto fa-light fa-circle-play text-slate-200"></i>
                  <div class="w-full h-48 rounded bg-slate-200"></div>
              </div>
          </div>

          <div class="mb-5 button-completed" v-show="!tofCompletedStepOne">
            <div class="mt-5 md:block">
              <f7-link v-on:click="openTofValidatorValue('video')" class="btn btn-success">
                <i class="fa-regular fa-check"></i> Marcar este paso como completado
              </f7-link>
            </div>
          </div>
      </f7-block>
      <f7-block class="relative w-auto py-10">
        <div class="civitip">
            <div class="step-tip">
              <tematica-paso
                class="step"
              >
                <template v-slot:number>2</template>
              <template v-slot:action
                ><i class="fa-regular fa-book-open-reader"></i>
                Comprensión</template
              >
              </tematica-paso>
            </div>
              <div class="text-tip">
                  Ahora vamos a profundizar un poco más sobre el tema y
                aprovecharemos de practicar la lectura, te pedimos calma y
                concentración.
              </div>
          </div>
        <div class="relative w-auto">
          <div class="blocking" v-show="!tofCompletedStepOne">
            <div class="text-center contenido">
                <button class="font-bold btn btn-primary font-display">
                  <i class="fas fa-info-circle"></i> Contenido Bloqueado
                </button>
            </div>
          </div>
          <article
            class="mx-2 font-serif prose lg:prose-xl max-w-prose dark:prose-invert prose-img:rounded prose-img:shadow"
          >
            <div v-html="lesson.descripcion"></div>
          </article>

          <div class="mb-5 button-completed" v-show="!tofCompletedStepTwo">
            <div class="mt-5 md:block">
              <f7-link v-on:click="openTofValidatorValue('texto')" class="font-bold btn btn-success font-display">
                <i class="fa-regular fa-check"></i> Marcar este paso como completado
              </f7-link>
            </div>
          </div>
        </div>
      </f7-block>
      <f7-block
        class="relative w-auto px-3 py-10 bg-blue-600 bg-opacity-10 dark:bg-zinc-800"
      >
        <div class="civitip">
          <div class="step-tip">
            <tematica-paso
              class="step"
            >
              <template v-slot:number>3</template>
            <template v-slot:action
              ><i class="fa-regular fa-ear-listen"></i> Auditivo</template
            >
            </tematica-paso>
          </div>
            <div class="text-tip">
                Si no entendiste mucho lo que leíste o si no pudiste leer, te
              invitamos a poner play y a escuchar con mucha atención sobre
              <strong>{{ lesson.value }}</strong>.
            </div>
        </div>
        <div class="relative mx-auto">
          <div v-if="lesson.podcast_url">
            <audio-player
              class="mt-5"
              :url="lesson.podcast_url"
              playerid="audio-player"
            >
            </audio-player>
          </div>
          <div
            v-else
            class="info-messages"
          >
            Lo sentimos, pero aún no tenemos el podcast de esta temática.
          </div>
        </div>
      </f7-block>
      <f7-block class="relative w-auto px-3 py-5" v-if="!this.validaTrivia">
        <div class="civitip">
          <div class="step-tip">
            <tematica-paso
              class="step"
            >
              <template v-slot:number>4</template>
              <template v-slot:action
                ><i class="fa-regular fa-messages"></i> Kinestésico</template
              >
            </tematica-paso>
          </div>
            <div class="text-tip">
                Felicitaciones, llegaste al último paso de este camino, ahora
                concéntrate y demuestra cuanto aprendiste! 👌.
            </div>
        </div>
        <div class="relative mx-auto">
          <div class="blocking" v-show="!tofCompletedStepTwo">
            <div class="text-center contenido">
                <button class="font-bold btn btn-primary font-display">
                  <i class="fas fa-info-circle"></i> Contenido Bloqueado
                </button>
            </div>
          </div>
          <div v-if="this.validaTrivia == null && tematica_completed != lesson.id">
            <div v-if="IsTimeToPlay">
              <div v-if="TematicasPorJugar > 0">
                <div v-if="tematica_mes >= 1">
                  <div v-if="openTematica" class="flex justify-center mt-5">
                    <f7-link no-link-class sheet-open=".sheet-modal-quiz-lesson" v-if="tofCompletedStepTwo">
                        <img
                        :src="imgBtnIniciarTrivia"
                        alt=""
                        class="w-48 m-auto active:transition-transform active:scale-95"
                        />
                    </f7-link>
                    <f7-link no-link-class v-on:click="notStepCompleted()" v-else>
                        <img
                        :src="imgBtnIniciarTrivia"
                        alt=""
                        class="w-48 m-auto active:transition-transform active:scale-95"
                        />
                    </f7-link>
                  </div>
                  <div style="margin-top: 15px" v-else>
                    <div
                      class="info-messages"
                    >
                      Aún no puedes responder la trivia de esta temática. Debes
                      esperar a que tu docente la active.
                    </div>
                  </div>
                </div>
                <div class="flex justify-center mt-5" v-else>
                  <f7-link no-link-class sheet-open=".sheet-modal-quiz-lesson">
                    <img
                    :src="imgBtnIniciarTrivia"
                    alt=""
                    class="w-48 m-auto active:transition-transform active:scale-95"
                    />
                  </f7-link>
                </div>
              </div>
              <div v-else>
                <div
                  class="info-messages"
                >
                  Lo sentimos pero no dispones de temáticas disponibles para
                  contestar por este mes. Aprovecha de estudiar y ven a
                  responder la trivia el mes que viene.
                </div>
              </div>
            </div>
            <div class="flex-grow-1" v-else>
              <div
                class="info-messages"
              >
                Lo sentimos pero estás fuera del horario informado por tu
                establecimiento para contestar esta temática.
              </div>
            </div>
          </div>
          <div class="col align-self-center" v-else>
            <div class="contenidos-trivia-respondida">
              <i aria-hidden="true" class="fa fa-thumbs-up"></i>
              <tematica-badge-completed
                class="w-5/6 mb-10"
              >
                {{ $filters.formatNumber(tematica_completed_puntaje) }}
              </tematica-badge-completed>
            </div>
          </div>
        </div>
      </f7-block>
    </div>


    <Modal v-model="modalStepValidators">
          <div class="flex flex-col mb-4">
              <div class="flex flex-col items-center w-full px-0 py-0 space-y-4 text-center">
                <!-- Header -->
                <div class="absolute w-full p-3 top-0 text-left text-white font-display bg-indigo-cm z-0">
                  Pregunta sobre el Video
                </div>

                <div
                    :class="device.ios && device.webView ? 'h-18 pt-4' : 'h-14'"
                    class="w-full header-quiz-tof"
                >
                    <div
                        class="flex items-center justify-start w-full text-center"
                    >
                        <span class="w-14 shrink-0" style="margin: 0 auto;">
                            <img
                                :src="imgTofIcon"
                                class="w-auto"
                            />
                        </span>
                    </div>
                </div>
                <div class="w-full text-center">
                  <p class="w-4/5 text-xs m-auto font-display">
                    Antes de continuar con el contenido, pondremos tu conocimiento en
                    juego con una pregunta de Verdadero o Falso.
                  </p>
                </div>
                <br>
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
                                            {{ content_tof.question }}
                                            <div class="block bg-gray-200 px-2 py-1 mt-2 rounded text-gray-800 text-sm" v-if="answerIsFalse">
                                                <strong>¿Porqué es falsa?:</strong> {{content_tof.observation}}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            <div class="card-back-1 bg-slate-300"></div>
                            <div class="card-back-2 bg-slate-300"></div>
                        </div>
                    </div>
                </section>
                <div
                  class="flex items-center justify-center w-auto gap-8 mb-10 text-center"
                >
                  <button
                    class="flex flex-col w-24 h-24 gap-0 text-4xl leading-none btn bg-success-100 btn-rounded-full"
                    @click="answerCompleted ? null : answer_response(1)"
                    :class="1 == iscorrectVideo ? 'correct_answer' : ''"
                  >
                    V
                    <span class="text-sm">Verdadero</span>
                  </button>
                  <button
                    class="flex flex-col w-24 h-24 gap-0 text-4xl leading-none btn bg-danger-100 btn-rounded-full"
                    @click="answerCompleted ? null : answer_response(0)"
                    :class="0 == iscorrectVideo ? 'correct_answer' : ''"
                  >
                    F
                    <span class="text-sm">Falso</span>
                  </button>
                </div>
                <!-- <div
                  class="flex items-center justify-center w-automb-10 text-center"
                  v-show="continueContentTematica"
                >
                  <button type="button" class="mt-5 btn btn-warning" @click="closeTofValidatorValue()" name="button">Continuar ></button>
                </div> -->
              </div>
          </div>
    </Modal>
    <sheet-modal-quiz-lesson
      v-if="isLoading == false"
      :lessonId="lesson.id"
      :lessonImage="lesson.imagen_portada"
      :lessonValue="lesson.value"
    />

    <!-- modal tof validador Video -->
    <!-- <sheet-modal-tof-validator-video
      v-if="tof_validators_video != null"
      :tofValidatorsVideo="tof_validators_video"
    /> -->
    <!-- modal tof validador texto -->
    <!-- <sheet-modal-tof-validator-texto
      v-if="tof_validators_texto != null"
      :tofValidatorsTexto="tof_validators_texto"
    /> -->

    <!-- modal tof validador video or texto -->
    <!-- <sheet-modal-tof-validator
        v-if="isLoading == false"
        :step="step_tof"
        :content="content_tof"
    /> -->
  </f7-page>
</template>
<script lang="ts">
import { f7 } from "framework7-vue";
import { defineAsyncComponent, defineComponent, computed } from "vue";
import { axiosApiInstance } from "@/js/axios";
import store, { useStore } from "@/store/store";
import { VueAudio, AudioPlayer } from "@components/GlobalComponents";
import { getVideoApiVimeo, pusher } from "@/composables/useAppFunctions";
import imgBtnIniciarTrivia from '@assets/images/boton-iniciar-trivia.svg';
import { mapState } from "vuex";
import { showAlertError, showToast } from "./useHelpersFunctions";
import { f7 } from "framework7-vue";
import imgTofIcon from "@assets/images/tof-icon.svg";
import { getDevice } from "framework7/lite-bundle";
import { answerTofValidator } from "@/composables/useQuizFunctions";
import {
  answerPlayFailSound,
  answerPlaySuccessSound,
} from "@/composables/useAppFunctions";

export default defineComponent({
  name:'content-lesson-page',
  props: {
    f7route: Object,
    f7router: Object,
    slug: String,
  },
  setup() {
    const store = useStore();
    const device = getDevice();
    return {
      answerTofValidator,
      store,
      device
    };
  },
  components: {
    Modal: defineAsyncComponent(() => import("@components/global/Modal.vue")),
    SheetModalQuizLesson: defineAsyncComponent(() => import("@/views/mobile/partials/SheetModalQuizLesson.vue")),
    LikesTematica: defineAsyncComponent(() => import("@components/biblioteca/tematica/likes.component.vue")),
    CantUsersTematica: defineAsyncComponent(() => import("@components/biblioteca/tematica/cant-users.component.vue")),
    TematicaPaso: defineAsyncComponent(() => import("@components/biblioteca/tematica/paso-number.component.vue")),
    TematicaBadgeCompleted: defineAsyncComponent(() => import("@components/biblioteca/tematica/badge-completed.component.vue")),
    VueAudio,
    AudioPlayer,
    // SheetModalTofValidatorVideo: defineAsyncComponent(() => import("@/views/mobile/pages/biblioteca/partials/modal/SheetModalTofValidatorVideo.vue")),
    // SheetModalTofValidatorTexto: defineAsyncComponent(() => import("@/views/mobile/pages/biblioteca/partials/modal/SheetModalTofValidatorTexto.vue")),
    SheetModalTofValidator: defineAsyncComponent(() => import("@/views/mobile/pages/biblioteca/partials/modal/SheetModalTofValidator.vue")),
  },
  data() {
    return {
      imgTofIcon,
      imgBtnIniciarTrivia,
      musicBackgroundIsActive: false,
      lesson: {
        url_video: "",
        id: 0,
      },
      lessonVideo:{
        link: '',
        type:'',
        image: '',
        stats:{}
      },
      dificultad: "",
      isLoading: true,
      validaTrivia: 0,
      IsTimeToPlay: false,
      TematicasPorJugar: 0,
      popup: false,
      delay: "0.1s",
      likes: 0,
      terminadas: 0,
      dilike: 0,
      availableTematica: false,
      openTematica: false,
      tematica_mes: 0,
      tof_validators_texto: {},
      tof_validators_video: {},
      tof_validators_completed_texto: {},
      tof_validators_completed_video: {},
      step_tof: '',
      content_tof: {},
      modalStepValidators: false,
      stepValidators: '',
      answerIsFalse: false,
      iscorrectVideo: null,
      answerCompleted: false,
      tofCompletedStepOne: false,
      tofCompletedStepTwo: false,
      continueContentTematica: false
    };
  },
  async mounted() {
    const vm = this;
    console.log("F7 ROuter", this.f7route?.params);
    // console.log(this.f7route);
    await vm.getTematica();

    //iniciamos el channel para leer en timepo real lo que pasa en el kanban.. asi desactivamos o activamos la tematica
    setTimeout(() => {
      var channel = pusher.subscribe(
        "tematica-channel." +
          store.state.user.curso_id +
          "." +
          vm.lesson.id
      );
      channel.bind("TematicasBlockUnBlockEvents", function (data: { open: boolean }) {
          console.log(data);
          vm.openTematica = data.open;
          f7.toast.create({
          icon: data.open ? '<i class="f7-icons">text_bubble</i>' : '<i class="f7-icons">rectangle_badge_xmark</i>',
          text: (data.open) ? 'La temática se encuentra desbloqueada y puedes iniciar su trivia' : 'Ya no puedes responder esta temática. Debes esperar a que la vuelvan a desbloquear',
          closeTimeout: 3000,
          position: 'center',
        }).open();

        });
    }, 2500);
  },

  methods: {

    endVideo() {
      // this.isPlaying = false;
      // this.listenerActive = false;
      console.log('Ended');
      f7.toast.create({
          icon: '<i class="fa-regular fa-check fa-4x text-success-100"></i>',
          text: '¡Excelente!<br> Te felicitamos por haber visto todo el video.',
          position: 'center',
          closeTimeout: 5000,
        }).open();
      // this.cleanupListeners();
    },

    blockMusicBackground(data: string) {
      if (data == "true") {
        // store.state.onMusicApp = true;
        localStorage.setItem("cm_onMusicApp", "true");
        store.state.musicBackgroundApp.load();
        this.musicBackgroundIsActive = true;
      } else {
        // store.state.onMusicApp = false;
        localStorage.setItem("cm_onMusicApp", "false");
        store.state.musicBackgroundApp.pause();
        this.musicBackgroundIsActive = false;
      }
    },

    //estado de la tematica desde el kanban, si es que esta abierta o cerrada por el profesor
    getStatusOpenTematica() {
      const vm = this;
      // vm.loading = true;
      axiosApiInstance({
        method: "post",
        url: "/api/auth/students/v3/general/library/status-thematic",
        data: {
          curso_id: store.state.user.curso_id,
          tematica_id: vm.lesson.id,
        },
      })
        .then((response: { data: boolean }) => {
          vm.openTematica = response.data;
        })
        .catch((error: any) => {
          console.log(error);
        });
    },

    async getTematica() {
      const vm = this;
      try {
        const { data } = await axiosApiInstance({
          method: "get",
          url:
            "/api/auth/students/v3/user/library/lessons/content/" + vm.slug,
        });

        // setTimeout(async function () {
          vm.lesson = data.lesson;
          vm.validaTrivia = data.validaTrivia;
          vm.IsTimeToPlay = data.IsTimeToPlay;
          vm.TematicasPorJugar = data.tematicasPorJugar;
          vm.tematica_mes = data.tematica_mes;
          //preguntas validadoras
          vm.tof_validators_texto = data.tof_validators_texto;
          vm.tof_validators_video = data.tof_validators_video;
          // si alguna pregunta de texto o video viene NULL entonces no se puede realiar el TOF en la tematica
          //si o si deben venir las 2 preguntas con contenido
          if(vm.tof_validators_texto != null && vm.tof_validators_video != null){
            //preguntas completadas validadoras
            vm.tof_validators_completed_texto = data.tof_validators_completed_texto;
            vm.tof_validators_completed_video = data.tof_validators_completed_video;
            //validamos si ya respondio alguna preguntas tof validadora
            if(vm.tof_validators_completed_video != null){
              vm.tofCompletedStepOne = true;
            }

            if(vm.tof_validators_completed_texto != null){
              vm.tofCompletedStepTwo = true;
            }

          }else{
            vm.tofCompletedStepOne = true;
            vm.tofCompletedStepTwo = true;
          }
          // vm.$Progress.finish();
          vm.isLoading = false;
          vm.delay = "0s";
          // store.state.routeNombre = data.tematica.value
          vm.getStatusOpenTematica();
          console.log("CODIGO VIDEO:", data.tematica.url_video);
          vm.lessonVideo = await getVideoApiVimeo(data.tematica.url_video);

          console.log('lessonVideo: ', vm.lessonVideo);

          // store.state.asignaturaTriviaTematica = data.tematica.sb_asignatura_id
          setTimeout(function () {
            vm.availableTematica = true;
          }, 1000);
        // }, 100);
      } catch (error) {
        console.log(error);
        f7.toast
          .create({
            text: "Hey, no hemos podido traer el detalle de esta temática.",
            position: "bottom",
            closeButton: true,
            closeButtonText: "Cerrar",
            horizontalPosition: "center",
            closeTimeout: 4000,
            cssClass: "alert-notification alert-notification-error",
            destroyOnClose: true,
          })
          .open();
        vm.errorNetwork();
        f7.views.current.router.back();
      }
    },
    // not step completed trivia play
    notStepCompleted(){
      f7.toast.create({
          text: 'Debes completar todos los pasos para jugar la trivia',
          position: 'bottom',
          closeTimeout: 3000,
          destroyOnClose: true,
      }).open();
    },
    // open sheet content model tof
    openTofValidatorValue(value){
      const vm = this;
      vm.stepValidators = value;
      vm.modalStepValidators = true;
      vm.continueContentTematica = false;
      if(value == 'video'){
        vm.content_tof = vm.tof_validators_video;
      }else{
        vm.content_tof = vm.tof_validators_texto;
      }
    },
    closeTofValidatorValue(){
      const vm = this;
      vm.modalStepValidators = false;
      vm.content_tof = {};
    },
    async answer_response(value: number) {
      const vm = this;
      try {
        // resetamos variable
        vm.answerIsFalse = false;
        // opcion respondida
        vm.answerCompleted = true;
        // mostramos el porque es falso
        if (vm.content_tof.is_true == 0) {
          vm.answerIsFalse = true;
        }
        // mostramos boton continuar
        vm.continueContentTematica = true;
        //confirmamos que el alumno respondio el step 1 o 2
        if(vm.stepValidators == 'video'){
          vm.tofCompletedStepOne = true;
        }

        if(vm.stepValidators === 'texto'){
          vm.tofCompletedStepTwo = true;
        }
        // validamos si respondio correctamente SIN IR AL SERVIDOR
        if (value == vm.content_tof.is_true) {
          answerPlaySuccessSound();
        } else {
          answerPlayFailSound();
        }

        // guardamos la data respondida
        const data = await answerTofValidator(
          value,
          vm.content_tof.lesson_id,
          vm.content_tof.id,
          vm.content_tof.step_id
        );
        // si es correcto
        vm.iscorrectVideo = data.is_true;

        //cerramos modal
        vm.closeTofValidatorValue();
        // update click
        vm.answerCompleted = false;
      } catch (error) {
        console.log("Error al crear la trivia:", error);
      }
    }
  },
  computed: {
    ...mapState(["tematica_completed","tematica_completed_puntaje"])
  },
});
</script>
<style lang="less">
.content-lesson{
    --f7-block-margin-vertical:0;
    --f7-page-navbar-offset: 0 !important;
   & .page-content{
        padding-top: 0 !important;
    }
}

.blocking {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: #80808054;
  z-index: 10;
}

.contenido{
  position: absolute;
  top: 2rem;
  width: 100%;
  height: 100%;
  text-align: center;
  display: ruby;
}

.correct_answer {
  background: green !important;
}
.error_answer {
  background: red !important;
}
</style>
