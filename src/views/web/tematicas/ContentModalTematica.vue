<template>
  <f7-popup
    name="cm.biblioteca.tematica"
    :tablet-fullscreen="true"
    :close-by-backdrop-click="false"
    class="tematica-popup"
  >
    <div class="fab-backdrop"></div>
    <div class="fab fab-right-bottom color-orange">
      <a href="#">
        <i class="icon f7-icons">
        <svg aria-hidden="true" focusable="false" data-prefix="fa-regular" data-icon="sliders-up" class="w-4 h-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M120 488V219.9C152.4 209.7 176 179.8 176 144S152.4 78.31 120 68.07V24C120 10.75 109.3 0 96 0S72 10.75 72 24v44.07C39.62 78.31 16 108.2 16 144s23.62 65.69 56 75.93V488C72 501.3 82.75 512 96 512S120 501.3 120 488zM64 144c0-17.64 14.36-32 32-32s32 14.36 32 32s-14.36 32-32 32S64 161.6 64 144zM280 488v-76.07C312.4 401.7 336 371.8 336 336s-23.62-65.69-56-75.93V24C280 10.75 269.3 0 256 0S232 10.75 232 24v236.1C199.6 270.3 176 300.2 176 336s23.62 65.69 56 75.93V488C232 501.3 242.7 512 256 512S280 501.3 280 488zM224 336c0-17.64 14.36-32 32-32s32 14.36 32 32s-14.36 32-32 32S224 353.6 224 336zM392 24v108.1C359.6 142.3 336 172.2 336 208s23.62 65.69 56 75.93V488c0 13.25 10.75 24 24 24s24-10.75 24-24V283.9C472.4 273.7 496 243.8 496 208s-23.62-65.69-56-75.93V24C440 10.75 429.3 0 416 0S392 10.75 392 24zM448 208c0 17.64-14.36 32-32 32s-32-14.36-32-32s14.36-32 32-32S448 190.4 448 208z"></path></svg>
        </i>
        <i class="icon f7-icons">
      <svg aria-hidden="true" focusable="false" data-prefix="fa-regular" data-icon="xmark" class="w-4 h-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M312.1 375c9.369 9.369 9.369 24.57 0 33.94s-24.57 9.369-33.94 0L160 289.9l-119 119c-9.369 9.369-24.57 9.369-33.94 0s-9.369-24.57 0-33.94L126.1 256L7.027 136.1c-9.369-9.369-9.369-24.57 0-33.94s24.57-9.369 33.94 0L160 222.1l119-119c9.369-9.369 24.57-9.369 33.94 0s9.369 24.57 0 33.94L193.9 256L312.1 375z"></path></svg>
        </i>
      </a>
      <div class="fab-buttons fab-buttons-top">
        <f7-fab-button
          label="Activar modo nocturno"
          v-on:click="isDarkMode = true"
          v-if="!isDarkMode"
          color="black"
          class="text-light"
        >
          <span class="fas fa-moon fa-lg"></span>
        </f7-fab-button>
        <f7-fab-button
          label="Activar modo día"
          v-on:click="isDarkMode = false"
          v-if="isDarkMode"
          color="white"
          class="text-warning-100"
        >
          <span class="fas fa-sun fa-lg"></span>
        </f7-fab-button>
        <f7-fab-button
          label="Activar música de fondo"
          v-on:click="blockMusicBackground('true')"
          v-show="musicBackgroundIsActive == false"
          color="green"
          class="text-white"
        >
          <span class="fas fa-volume-up fa-lg"></span>
        </f7-fab-button>
        <f7-fab-button
          label="Silenciar música de fondo"
          v-on:click="blockMusicBackground('false')"
          v-show="musicBackgroundIsActive == 'true'"
          color="red"
          class="text-white"
        >
          <span class="fas fa-volume-mute fa-lg"></span>
        </f7-fab-button>
      </div>
    </div>
  <f7-page class="bg-modal-tematica">
    <vue-headful :title="tematicaNombre+' '+ this.siteName" />
    <close-page-button></close-page-button>
    <div class="relative max-w-screen-lg mx-auto overflow-hidden fichaTematica2">
      <div class="mx-auto contenedorTematica" v-if="isLoading">
        <div class="p-5">
          <f7-card
            class="skeleton-text"
            title="Card Header"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis et massa ac interdum. Cras consequat felis at consequat hendrerit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis et massa ac interdum. Cras consequat felis at consequat hendrerit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis et massa ac interdum. Cras consequat felis at consequat hendrerit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis et massa ac interdum. Cras consequat felis at consequat hendrerit."
            footer="Card Footer"
          ></f7-card>
        </div>
      </div>
      <div
        class="mx-auto mt-4 contenedorTematica"
        :class="isDarkMode ? 'cmDarkMode' : ''"
        v-else
      >
        <div
          class="relative flex flex-wrap content-end px-10 py-5 bg-gray-300 bg-center bg-no-repeat bg-cover header-tematica h-60 rounded-t-xl"
          :style="
            'background-image: url(' + tematicaIndividual.imagen_cover + ');'
          "
        >
          <div class="z-10 flex flex-col content-end w-full mx-32">
            <div class="mb-4 text-white flex-0">
              <h2 class="text-4xl font-display">{{ tematicaIndividual.value }}</h2>
            </div>
            <div class="flex-0">
              <div class="flex flex-row">
                <div class="flex-none">
                  <likes-tematica
                    :tematicaId="tematicaIndividual.id"
                    :cantidadlikes="tematicaIndividual.cantidad_likes"
                  ></likes-tematica>
                </div>
                <div class="flex-none">
                  <cant-users-tematica
                    :cantidad-respondida="tematicaIndividual.la_han_terminado"
                  ></cant-users-tematica>
                </div>
                <div class="flex-grow pr-4 text-right">
                  <badge-multicolor>
                    Nivel {{ tematicaIndividual.dificultad_name }}
                  </badge-multicolor>
                </div>
              </div>
            </div>
          </div>
          <div
            class="absolute bottom-0 left-0 right-0 z-0 h-4/6 bg-gradient-to-t from-gray-800"
          ></div>
        </div>

        <div class="relative p-4 bg-blue-600 bg-opacity-10">
          <div
            class="relative w-1/2 px-10 py-5 mx-auto font-serif text-base leading-relaxed border-4 border-gray-200 border-dashed rounded-xl "
            :class="isDarkMode ? 'text-gray-100' : 'text-gray-800'"
          >
            {{ tematicaIndividual.breve_descripcion }}
          </div>
        </div>
        <div class="py-12 card-video-tematica">
          <tematica-badge-completed
            class="w-2/6 mb-10"
            v-if="this.validaTrivia != null"
          >
            {{ $filters.formatNumber(validaTrivia.puntaje_obtenido) }}
          </tematica-badge-completed>

          <div class="relative w-2/4 mx-auto">
            <tematica-paso class="absolute -left-1/4 top-3">
              <template v-slot:number>1</template>
              <template v-slot:action>Audiovisual</template>
            </tematica-paso>
            <div
              class="civitip"
            >
              <div class="flex-none w-16">
                <svg
                  class="w-10 h-10 mx-auto text-indigo-400 stroke-current"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <div class="flex-grow text-gray-800">
                Bienvenid@, haz dado tu primer paso. En este video podrás
                empezar a conocer algo sobre
                <strong>{{ tematicaIndividual.value }}</strong
                >, presta mucha atención ok? 👌
              </div>
            </div>
            <div class="inline-block w-auto p-4 bg-white shadow-lg rounded-xl">
              <vimeo-player
                :player-width="450"
                :player-height="250"
                ref="player"
                :video-id="tematicaIndividual.url_video"
              />
            </div>
          </div>
        </div>
        <div class="py-16 card-contenido-tematica">
          <div class="relative w-2/4 mx-auto">
            <tematica-paso class="absolute -left-1/4 top-3">
              <template v-slot:number>2</template>
              <template v-slot:action>Comprensión</template>
            </tematica-paso>
            <div
              class="civitip"
            >
              <div class="flex-none w-16">
                <svg
                  class="w-10 h-10 mx-auto text-indigo-400 stroke-current"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <div class="flex-grow text-gray-800">
                Vemos que avanzaste, ahora vamos a profundizar un poco más sobre
                el tema y aprovecharemos de practicar la lectura, te pedimos
                calma y concentración. Éxito !!!!
              </div>
            </div>
            <article
            class="font-serif prose prose-lg max-w-prose"
            :class="{'prose-dark' : isDarkMode}">
              <div v-html="tematicaIndividual.descripcion"></div>
            </article>
          </div>
        </div>
        <div class="bg-blue-600 bg-opacity-10 py-28">
          <div class="relative w-2/4 mx-auto">
            <tematica-paso class="absolute -left-1/4 top-3">
              <template v-slot:number>3</template>
              <template v-slot:action>Auditivo</template>
            </tematica-paso>
            <div
              class="civitip"
            >
              <div class="flex-none w-16">
                <svg
                  class="w-10 h-10 mx-auto text-indigo-400 stroke-current"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <div class="flex-grow text-gray-800">
                Hay varias formas de aprender y el texto no es algo fácil. Si no
                entendiste mucho lo que leíste o si no pudiste leer, te
                invitamos a poner play y a escuchar con mucha atención sobre
                <strong>{{ tematicaIndividual.value }}</strong
                >:
              </div>
            </div>
            <div v-if="tematicaIndividual.podcast_url">
              <vue-audio
                :audio-source="tematicaIndividual.podcast_url"
              ></vue-audio>
            </div>
            <div
            v-else
            class="p-4 my-5 text-sm text-gray-600 border-2 border-yellow-100 bg-yellow-50 rounded-xl"
            >
            Discúlpanos, pero aún no tenemos el podcast de esta temática 😭
            </div>
          </div>
        </div>
        <div class="py-24" v-if="!this.validaTrivia">
          <div class="relative w-2/4 mx-auto">
            <tematica-paso class="absolute -left-1/4 top-3">
              <template v-slot:number>4</template>
              <template v-slot:action>Kinestésico</template>
            </tematica-paso>
            <div
              class="civitip"
            >
              <div class="flex-none w-16">
                <svg
                  class="w-10 h-10 mx-auto text-indigo-400 stroke-current"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                  />
                </svg>
              </div>
              <div class="flex-grow text-gray-800">
                Felicitaciones, llegaste al último paso de este camino, ahora
                concéntrate y demuestra cuanto aprendiste! 🙌
              </div>
            </div>
            <div v-if="this.validaTrivia == null">
              <div v-if="IsTimeToPlay">
                <div v-if="TematicasPorJugar > 0">
                  <div v-if="tematica_mes >= 1">
                    <div
                      v-if="openTematica"
                      class="flex justify-center mt-5"
                    >
                      <input
                        type="image"
                        v-on:click="showAlert()"
                        id="play_"
                        name="play_"
                        class="m-auto img-fluid d-block"
                        src="https://res.cloudinary.com/admsys-storage/image/upload/f_auto,q_auto:best/smarteducation/masterbrain/civicamente-app/app-files/perfil-alumno/boton-iniciar-trivia.svg"
                      />
                    </div>
                    <div style="margin-top: 15px" v-else>
                        <div class="p-4 my-5 text-sm text-gray-600 border-2 border-yellow-100 bg-yellow-50 rounded-xl">
                        Aún no puedes responder esta trivia. Debes esperar a que tu docente la active 😔
                        </div>
                    </div>
                  </div>
                  <div class="flex justify-center mt-5" v-else>
                    <input
                      type="image"
                      v-on:click="showAlert()"
                      id="play_"
                      name="play_"
                      class="m-auto img-fluid d-block"
                      src="https://res.cloudinary.com/admsys-storage/image/upload/f_auto,q_auto:best/smarteducation/masterbrain/civicamente-app/app-files/perfil-alumno/boton-iniciar-trivia.svg"
                    />
                  </div>
                </div>
                <div v-else>
                  <div
                    class="relative flex flex-row items-center justify-around p-5 mx-auto my-5 text-sm text-gray-800 text-yellow-700 bg-yellow-100 rounded-md"
                  >
                    Lo sentimos pero no dispones de temáticas disponibles para
                    contestar por este mes. Aprovecha de estudiar y ven a jugar
                    la trivia el mes que viene.
                  </div>
                </div>
              </div>
              <div class="flex-grow-1" v-else>
                <div
                  class="relative flex flex-row items-center justify-around p-5 mx-auto my-5 text-sm text-gray-800 text-yellow-700 bg-yellow-100 rounded-xl"
                >
                  Lo sentimos pero estás fuera del horario informado por tu
                  establecimiento para contestar esta temática.
                </div>
              </div>
            </div>
            <div class="col align-self-center" v-else>
              <div class="contenidos-trivia-respondida">
                <i aria-hidden="true" class="fa fa-thumbs-up"></i>
                <h5>
                  Ya has contestado esta trivia y obtuviste
                  {{ validaTrivia.puntaje_obtenido }} XP
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </f7-page>
  </f7-popup>
</template>
<script>
import { axiosInstance, axiosApiInstance } from "@/js/axios";

export default {
  props: ["slug"],
  components:{
 
  },
  data() {
    return {
      isDarkMode: false,
      musicBackgroundIsActive: false,
      options: {
        wheelPropagation: false,
        suppressScrollX: true,
        suppressScrollY: false,
      },
      tematicaIndividual: {},
      dificultad: "",
      isLoading: true,
      validaTrivia: 0,
      IsTimeToPlay: false,
      TematicasPorJugar: 0,
      popup: false,
      showInside: false,
    };
  },
  mounted() {
    const vm = this;
    vm.getTematica();
    setTimeout(function () {
      vm.leerContenido = Vue.localStorage.get(
        "leerContenido" + vm.user.id + vm.tematicaIndividual.id
      );
      vm.mirarVideo = Vue.localStorage.get(
        "mirarVideo" + vm.user.id + vm.tematicaIndividual.id
      );
    }, 1200);
  },
  created: function () {
    const vm = this;
    // this.getTematica();
    this.$Progress.start();
    this.delay = "0.1s";

    //iniciamos el channel para leer en timepo real lo que pasa en el kanban.. asi desactivamos o activamos la tematica
    setTimeout(function () {
      vm.$pusher.logToConsole = true;
      // Bind a function to a Event (the full Laravel class)
      var channel = vm.$pusher.subscribe(
        "tematica-channel." +
          vm.user.curso_id
      );
      channel.bind("TematicasBlockUnBlockEvents", function (data) {
        vm.openTematica = data.open;
        console.log('eventPush', data);
      });
    }, 2500);
  },
  updated: function () {
 
  },
  methods: {
    //estado de la tematica desde el kanban, si es que esta abierta o cerrada por el profesor
    getStatusOpenTematica() {
      const vm = this;
      vm.loading = true;
      axiosApiInstance({
        method: "post",
        data: {

        },
      })
        .then((response) => {
        
        })
        .catch((error) => {
          console.log(error);
          $("body").removeClass("overlaybg");
        });
    },

    async getTematica() {
      const vm = this;
      console.log();
      try {
        const { data } = await axiosApiInstance({
          method: "get",
          url: "/api/auth/students/v3/user/library/lessons/content/" + vm.slug
        });

        vm.tematicaIndividual = data.tematica;
        vm.validaTrivia = data.validaTrivia;
        vm.likes = data.likes;
        vm.IsTimeToPlay = data.IsTimeToPlay;
        vm.$Progress.finish();
        vm.isLoading = false;
        vm.delay = "0s";
        vm.getStatusOpenTematica();
      } catch (e) {
        vm.data = null;
        vm.error = e;
        vm.$f7.toast.create({
            text: 'Ha ocurrido un error al traer el detalle de esta temática.',
                position: 'bottom',
                closeButton: true,
                closeButtonText: 'Cerrar',
                horizontalPosition:'center',
                closeTimeout: 6000,
                cssClass: 'alert-notification alert-notification-error',
                destroyOnClose:true,
            }).open();
      }
    },

    blockMusicBackground(data) {
      if (data == "true") {
        state.onMusicApp = true;
        state.musicBackgroundApp.load();
        this.musicBackgroundIsActive = "true";
      } else {
        state.onMusicApp = false;
        state.musicBackgroundApp.pause();
        this.musicBackgroundIsActive = "false";
      }
    },

    showAlert() {
      const vm = this;
      if (vm.$store.loginState) {
        this.$swal({
          title: vm.tematicaIndividual.value,
          text:
            "Iniciada la trivia no podrás cancelar hasta terminarla... \n ¿Realmente quieres iniciar?",
          icon:
            this.tematicaIndividual.imagen_portada,
          buttons: true,
          dangerMode: false,
          buttons: {
            cancel: {
              text: "No, no quiero iniciarla aún",
              visible: true,
              closeModal: true,
            },
            confirm: {
              text: "Vamos!",
              className: "bg-green-500 px-5 py-4",
              closeModal: false,
            },
          },
          closeOnClickOutside: false,
          allowOutsideClick: false,
          closeOnEsc: false,
        }).then((onCreate) => {
          if (onCreate) {
            swal({
              icon: "success",
              title: "Trivia creada...",
              allowOutsideClick: false,
              buttons: false,
              text: "Redirigiendo a la trivia...",
            });
            vm.$Progress.start();
            setTimeout(function () {
              axiosInstance({
                method: "post",
                url: "/api/auth/students/v3/user/trivias/create",
                data: {
                  tipo_trivia: 1,
                  asignatura: vm.tematicaIndividual.sb_asignatura_id,
                  language: 1,
                  tematica_id: vm.tematicaIndividual.id,
                },
                headers: {
                  "Content-Type": "application/json",
                  Authorization:
                    "Bearer " + Vue.localStorage.get("cm_access_token"),
                },
              })
                .then((response) => {
                  vm.$swal.close();
                  vm.$Progress.finish();
                  if (response.data.pendiente) {
                    vm.$snotify.info(
                      "Tienes una trivia activa de " +
                        response.data.nombreTematica +
                        ". Te invitamos a terminarla antes de comenzar otra trivia de temática.",
                      "Trivia activa",
                      {
                        timeout: "500000",
                        showProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        buttons: [
                          {
                            text: "Iniciar Trivia",
                            action: (toast) => {
                              console.log("Clicked: Later");
                              vm.$snotify.remove(toast.id);
                              vm.jugarTematicaPendiente(response.data.hash);
                            },
                          },
                          {
                            text: "Salir",
                            action: (toast) => {
                              console.log("Clicked: No");
                              vm.$snotify.remove(toast.id);
                            },
                            bold: true,
                          },
                        ],
                      }
                    );
                    // vm.$snotify.info('No puedes iniciar esta temática sin antes terminar la temática: '+ response.data.nombreTematica+'. Finalizala para comenzar a jugar otra.', 'Temática activa');
                  } else {
                    if (response.data.ok == "terminada") {
                      const vm = this;

                      this.$snotify.info('Ya has terminado esta temática.', 'Temática terminada');

                      return;
                    } else {

                      // SI SE CRE LA NUEVA TRIVIA;

                        vm.$f7.views.main.router.navigate({
                          name:'cm.trivia.jugar',
                          params: { hash:  response.data.jugartrivia }
                        });
                    }
                  }
                })
                .catch((error) => {
                  vm.$Progress.finish();
                  toastr.error(
                    "Ocurrió un error al iniciar la trivia: " + error
                  );
                  console.log(error);
                });
            }, 800);
          }
        });
      } else {
        vm.$snotify.info(
          "Solo usuarios registrados pueden acceder a participar en las trivias.",
          "Inicia Sesión"
        );
      }
    },
    jugarTematicaPendiente(hash) {
      const vm = this;
      this.$f7router.navigate({
        name:'cm.trivia.jugar',
        params: { hash: hash }
      });
      // this.$router.push({ name: "cm.trivia.hash", params: { hash: hash } });
    },
  },
  computed:{
    tematicaNombre(){
      return this.tematicaIndividual.value ? this.tematicaIndividual.value : 'Temática';
    }
  }
};
</script>
