<template>
  <f7-page class="bg-pages panel-biblioteca">
    <vue-headful
      :title="'Biblioteca del conocimiento ' + this.siteName"
    />
    <close-page-button></close-page-button>
    <div
      class="pt-4 bg-bottom bg-cover"
      style="
        background-image: url(https://res.cloudinary.com/admsys-storage/image/upload/f_auto,q_auto:best/smarteducation/masterbrain/civicamente-v2/backgrounds/background-login);
      "
    >
      <div
        class="flex items-center justify-center max-w-screen-xl gap-10 mx-auto"
      >
        <div>
          <img
            src="https://res.cloudinary.com/admsys-storage/image/upload/w_80/smarteducation/masterbrain/civicamente-v2/smarty.svg"
            alt="Smarty"
            class="w-24"
          />
        </div>
        <h1 class="text-4xl text-white font-display">
          Te damos la bienvenida <br />
          a tu
          <span class="relative inline-block text-indigo-700">
            <span class="title-section-biblioteca">Biblioteca</span>
            <span
              clas="absolute inset-0 bottom-0 bg-yellow-200 w-20 h-20"
            ></span>
          </span>
        </h1>
        <div class="max-w-sm text-base leading-tight text-white">
          Aquí encuentras las clases que debes desarrollar y contenido adicional para aprender por tu cuenta.
        </div>
      </div>
    </div>
    <!-- tematicas por kanban -->
    <div
      class="flex max-w-screen-xl mx-auto my-2"
      v-if="listLessonsKanban.lessonsCount  === 0"
    >
      <div class="w-full px-3 contenedorTematicas">
        <div class="flex flex-col tematica">
          <div class="grid grid-cols-6 mb-3">
            <div class="col-span-4">
              <div class="mb-4">
                <content-placeholders :rounded="true">
                  <content-placeholders-heading />
                </content-placeholders>
              </div>
              <p class="m-0">
                <content-placeholders :rounded="true">
                  <content-placeholders-text :lines="2" />
                </content-placeholders>
              </p>
            </div>
            <div class="col-span-2">
              <p class="mb-0 ml-auto mr-2">
                <strong>
                  <content-placeholders :rounded="true">
                    <content-placeholders-heading />
                  </content-placeholders>
                </strong>
              </p>
            </div>
          </div>
          <div class="grid grid-cols-3 pt-3">
            <div class="col-span-1" v-for="n in 3" :key="n">
              <div class="card placeholderTematica">
                <content-placeholders :rounded="true">
                  <content-placeholders-img />
                  <content-placeholders-heading />
                  <content-placeholders-heading />
                </content-placeholders>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-else-if="listLessonsKanban.lessonsCount  > 0"
      class="py-12 bg-blue-100"
    >
      <div class="max-w-screen-xl mx-auto">
        <div class="flex items-center justify-between px-5 mb-7">
          <div>
            <h2 class="font-display text-titles">
              {{
                  listLessonsKanban.lessonsCount
                }}
                clases agregadas por tu docente para <span class="text-primary-100">
                {{ this.thisMonth }}
                </span>
            </h2>
            <p class="text-base text-gray-700">
              Disponibles para cursar durante todo este mes.
            </p>
          </div>
          <div>
            <h4 class="text-base text-indigo-700 font-display">
              Periodo: {{ this.thisMonth }}
            </h4>
          </div>
        </div>
        <div
          class="grid grid-cols-1 gap-5 px-5 mb-5 sm:grid-cols-2"
          :class="[
            listLessonsKanban.lessonsCount > 6
              ? 'lg:grid-cols-4'
              : 'lg:grid-cols-3',
          ]"
        >
          <div
            v-for="(tematica, index) in listLessonsKanban.lessons"
            :key="index"
          >
            <tematica-web-card
              :tematica="tematica"
              :page="'web-biblioteca'"
              :sectionName="'Biblioteca'"
            ></tematica-web-card>
          </div>
        </div>
      </div>
    </div>
    <div
      class="max-w-screen-xl p-3 m-4 mx-auto my-5 text-lg text-center text-gray-800 bg-yellow-100 border-2 border-yellow-200 rounded-lg "
      v-else
    >
      <div class="mx-3 my-4">
        <span class="block m-0 text-xl font-display"
          >¡No queremos que te quedes sin aprender!</span
        >
        <span class="block my-0 text-base">
          Así que mientras tú docente selecciona sus temáticas, te invitamos a conocer el contenido agrupado que hemos seleccionado para ti para que sigas aprendiendo por tu cuenta. Buena suerte!</span
        >
      </div>
    </div>

    <!-- tematicas grupos -->
    <div
      class="max-w-screen-xl mx-auto"
      v-if="!this.lessonsGroups.length"
    >
      <div class="col-12">
        <div class="mx-3 contenedorTematicas">
          <div class="row">
            <div class="col">
              <div class="tematica">
                <div class="mb-3 row">
                  <div class="col">
                    <div class="mb-4">
                      <content-placeholders :rounded="true">
                        <content-placeholders-heading />
                      </content-placeholders>
                    </div>
                    <p class="m-0">
                      <content-placeholders :rounded="true">
                        <content-placeholders-text :lines="2" />
                      </content-placeholders>
                    </p>
                  </div>
                  <div class="col-3 d-flex align-items-center">
                    <p class="mb-0 ml-auto mr-2">
                      <strong>
                        <content-placeholders :rounded="true">
                          <content-placeholders-heading />
                        </content-placeholders>
                      </strong>
                    </p>
                    <button class="btn btn-default" v-if="isOpenTematicas">
                      Ver menos
                    </button>
                    <button class="btn btn-default" v-else>
                      Mostrar todas
                    </button>
                  </div>
                </div>
                <div class="pt-3 row">
                  <div class="col-4" v-for="n in 3" :key="n">
                    <div class="card placeholderTematica">
                      <content-placeholders :rounded="true">
                        <content-placeholders-img />
                        <content-placeholders-heading />
                        <content-placeholders-heading />
                      </content-placeholders>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-else-if="this.lessonsGroups.length > 0"
      class="p-5 bg-blue-50"
    >
      <div class="max-w-screen-xl mx-auto my-12">
        <div class="flex-1">
          <h2 class="p-3 mx-auto mb-5 text-center text-gray-800 font-display">
            Contenido agrupado para que aprendas por tu cuenta.
          </h2>
        </div>
        <div class="flex-1">
          <div
            v-for="(grupo, index) in this.lessonsGroups"
            :key="index"
          >
            <div
              class="mx-3 bg-white shadow-sm contenedorTematicas contenedorTematicasGrupos"
              :style="
                grupo.important && grupo.app_banner
                  ? 'background-image:url(' + grupo.app_banner + ')'
                  : ''
              "
            >
              <div class="tematica">
                <div
                  class="grid grid-cols-6 p-4 mb-3"
                  :style="grupo.important ? 'color:' + grupo.bg_color : ''"
                >
                  <div class="col-span-4">
                    <div class="flex gap-4">
                      <span class="w-12">
                        <i :class="grupo.icon" class="text-3xl"></i>
                      </span>
                      <div>
                        <h3 class="font-display">
                          {{ grupo.nombre }}
                        </h3>
                        <div class="text-sm">
                          {{ grupo.description }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-span-2">
                    <div class="flex items-center h-full">
                      <h5 class="m-0 ml-auto mr-4 font-display">
                        <strong>
                          {{ grupo.cantidadTematicas }} temáticas asociadas
                        </strong>
                      </h5>
                      <div v-if="grupo.cantidadTematicas > 3">
                        <span v-if="grupoTodas == grupo.id">
                          <button
                            class="btn btn-secondary"
                            v-on:click="verTodas(grupo.id)"
                          >
                            Ver menos
                          </button>
                        </span>
                        <span v-else>
                          <button
                            class="tooltip-init btn btn-success"
                            v-on:click="verTodas(grupo.id)"
                            data-tooltip="Mostrar todas las temáticas de este grupo"
                          >
                            Mostrar todas
                          </button>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="grid justify-start grid-cols-1 gap-5 pt-3 sm:grid-cols-2 xl:grid-cols-3"
                  v-if="grupo.tematicas.length > 0"
                  v-bind:class="{
                    'waiting-tematicas': loading_init == grupo.id,
                  }"
                >
                  <div
                    class="col-span-1"
                    v-for="(tematica, index) in grupo.tematicas"
                    :key="index"
                  >
                    <tematica-web-card
                      :tematica="tematica"
                      :page="'web-biblioteca'"
                      :sectionName="'Biblioteca'"
                    ></tematica-web-card>
                  </div>
                </div>
                <div class="flex" v-else>
                  <h6>No encontramos datos con los filtros añadidos.</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="this.lessonsFinished.length"
      class="py-12 bg-indigo-100 border-t border-indigo-200"
    >
      <div class="max-w-screen-xl mx-auto mb-2">
        <div class="px-5 my-0">
          <div class="row no-gutters">
            <div class="col">
              <div class="">
                <div class="col">
                  <h4 class="font-display">
                    Temáticas
                    <span class="text-indigo-700">ya realizadas</span> que
                    puedes volver a ver.
                  </h4>
                </div>
                <div
                  class="text-right col-3 d-block"
                  v-if="cantCompletadas >= tematicas_finalizadas.length"
                >
                  <button
                    class="btn btn-secondary"
                    v-on:click="verMenosCompletadas()"
                    v-if="mostrarTodasCompletadas"
                  >
                    Ver menos
                  </button>
                  <button
                    class="w-auto btn btn-success"
                    :class="tematicas_finalizadas.length < 8 ? 'disabled' : ''"
                    v-on:click="
                      tematicas_finalizadas.length < 8
                        ? disabled()
                        : verTodasCompletadas()
                    "
                    v-else
                  >
                    Mostrar todas
                  </button>
                </div>
                <div
                  class="col-12"
                  v-show="
                    this.lessonsFinished.length
                  "
                >
                  <h6>Aún no completas ninguna temática!</h6>
                </div>
                <div class="pt-3 row" v-if="mostrarTodasCompletadas == false">
                  <vue-loading
                    :active="overlay_show"
                    color="#fff"
                    background-color="#000"
                    blur="10px"
                  />
                  <!-- <b-overlay :show="overlay_show" no-wrap></b-overlay> -->
                  <!-- <slick class="row col-12" ref="slick" :options="slickOptions" v-if="cargamosKanban"> -->
                  <div
                    class="grid grid-cols-1 gap-5 mt-5 md:grid-cols-2 lg:grid-cols-3"
                    v-if="this.lessonsFinished.length > 0"
                  >
                    <tematica-web-card-small
                      :page="'web-biblioteca'"
                      :sectionName="'Biblioteca'"
                      :tematica="tematica"
                      v-for="(tematica, index) in $store.state
                        .lessonsFinished"
                      :key="'Biblioteca' + '.' + tematica.id + '.' + index"
                    ></tematica-web-card-small>
                  </div>
                  <div class="col-12" v-else>
                    Aún no tienes temáticas terminadas para volver a ver.
                  </div>
                  <!-- </slick> -->
                </div>
                <div class="pt-3 row" v-else>
                  <vue-loading
                    :active="overlay_show"
                    color="#fff"
                    background-color="#000"
                    blur="10px"
                  />
                  <!-- <b-overlay :show="overlay_show" no-wrap></b-overlay> -->
                  <div v-if="tematicas_finalizadas.length > 0">
                    <div
                      class="col-4"
                      v-for="(completada, index) in tematicas_finalizadas"
                      :key="index"
                    >
                      <div class="card completada">
                        <div class="row no-gutters">
                          <div
                            class="col-4 imagenTematica"
                            :style="
                              'background-image: url(https://app.civicamente.cl/storage/' +
                              completada.tematica.imagen_portada +
                              ');'
                            "
                          >
                            <span class="estatus label label-success">
                              completada
                            </span>
                          </div>
                          <div class="col-8">
                            <div class="card-body">
                              <div class="row">
                                <div class="col">
                                  <h5
                                    class="card-title d-flex align-items-center"
                                  >
                                    {{ completada.tematica.value }}
                                  </h5>
                                </div>
                              </div>
                              <div class="row">
                                <div class="col">
                                  <p class="card-text descripcionTematica">
                                    {{ completada.tematica.breve_descripcion }}
                                  </p>
                                </div>
                              </div>
                              <div class="row no-gutters">
                                <div class="text-right col-12">
                                  <button
                                    class="btn btn-default"
                                    v-on:click="
                                      showLesson(completada.tematica.slug)
                                    "
                                  >
                                    Volver a ver
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <span class="numeroTematica">
                            {{ $filters.numberAbreviate(completada.tematica.order) }}
                          </span>
                          <div class="checkCompletada">
                            <i class="fad fa-check"></i>
                          </div>
                        </div>
                        <div class="contenedorPuntajeEstatus">
                          <div class="m-0 row">
                            <div class="p-0 col">
                              <div class="puntajeObtenido">
                                {{ $filters.formatNumber(completada.puntaje_obtenido) }}
                                XP
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-4" v-else>
                    <h6>No encontramos datos con los filtros añadidos.</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </f7-page>
</template>
<script>
// const readingTime = require("reading-time-cm");
//init vue
import Vue from "vue";
import { mapGetters } from "vuex";
import { axiosInstance } from "@/js/axios";
export default {
  name: "bibliotecaPanel",
  props: [],
  on: {
    pageInit() {},
  },
  data() {
    return {
      anim: "",
      tipo: "",
      overlay_show: false,
      tematicas_finalizadas: [],
      optionsScrollPrincipal: {
        wheelPropagation: false,
        suppressScrollX: true,
        suppressScrollY: false,
      },
      optionsScrollInterno: {
        wheelPropagation: false,
        suppressScrollX: true,
      },
      activoLocales: true,
      isOpenTematicas: false,
      options: {
        wheelPropagation: false,
      },
      delay: "0.1s",
      activoGrupos: 0,
      loading_init: 0,
      porgrupo: 0,
      dificultadTematica: 0,
      openFiltro: 0,
      numeroTematicas: 0,
      cargamosKanban: 0,
      slickOptions: {
        dots: true,
        infinite: false,
        speed: 400,
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    };
  },

  mounted() {
    const vm = this;
    this.$Progress.start();
    vm.$f7.dialog.preloader("Estamos actualizando tu biblioteca", {
      destroyOnClose: true,
    });

    this.$nextTick(function () {
      vm.tematicasFinalizadas();
      vm.tematicasPendientes();
      vm.tematicasPorGrupo();

      setTimeout(function () {
        vm.$f7.dialog.close();
      }, 2000);

      setTimeout(function () {
        vm.loadSwiper();
      }, 4000);
    });
  },

  created: function () {
    const vm = this;
    vm.delay = "0.1s";
    vm.tematicasKanban();
  },
  methods: {
    loadSwiper() {
      const vm = this;

      console.log("entramos al log del SWIPER");
      vm.$f7.swiper.create(".tematicas-swiper-biblioteca", {
        preventClicks: false,
        preventClicksPropagation: false,
        allowSlideNext: true,
        allowSlidePrev: true,
        allowTouchMove: true,
        speed: 400,
        slidesPerView: 3,
        centeredSlides: false,
        spaceBetween: 10,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        pagination: {
          el: ".swiper-pagination",
          type: "bullets",
        },
        autoplay: {
          delay: 5000,
        },

        // dynamicBullets: true,
      });
    },
    async all(value) {
      const vm = this;
      try {
        const { data } = await axiosInstance({
          method: "post",
          url: "/api/auth/students/v3/user/library/lessons/show/all-general",
          data: {
            value: value,
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + Vue.localStorage.get("cm_access_token"),
          },
        });
        vm.lessonsKanban = data;
        vm.overlay_show = false;
        if (value == "todas") {
          vm.mostrarTodasGenerales = true;
        } else {
          vm.mostrarTodasGenerales = false;
        }
      } catch (e) {
        this.data = null;
        this.error = e;
      }
    },
    async all(value) {
      const vm = this;

      try {
        const { data } = await axiosInstance({
          method: "post",
          url: "/api/auth/students/v3/user/library/lessons/show/all-finished",
          data: {
            value: value,
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + Vue.localStorage.get("cm_access_token"),
          },
        });
        vm.tematicas_finalizadas = data.tematicas_finalizadas;
        vm.cantCompletadas = data.cantCompletadas;
        vm.overlay_show = false;
        if (value == "todas") {
          vm.mostrarTodasCompletadas = true;
        } else {
          vm.mostrarTodasCompletadas = false;
        }
      } catch (e) {
        this.data = null;
        this.error = e;
      }
    },
    async all(value) {
      const vm = this;
      try {
        const { data } = await axiosInstance({
          method: "post",
          data: {
            value: value,
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + Vue.localStorage.get("cm_access_token"),
          },
        });
        vm.tematicas_finalizadas = data.tematicas_finalizadas;
        vm.cantCompletadas = data.cantCompletadas;
      } catch (e) {
        this.data = null;
        this.error = e;
      }
    },

    async all(grupoid) {
      const vm = this;
      if (vm.grupoTodas == grupoid) {
        vm.grupoTodas = 0;
      } else {
        vm.loading_init = grupoid;
        vm.grupoTodas = grupoid;
      }
      try {
        const { data } = await axiosInstance({
          method: "post",
          data: {
            grupoid: vm.grupoTodas,
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + Vue.localStorage.get("cm_access_token"),
          },
        });
        let listOfObjects = Object.keys(data).map((key) => {
          return data[key];
        });
        vm.lessonsGroups = listOfObjects;
        vm.tematicasGrupo = data;
        vm.gruposFiltro = data;
        // vm.filtrarGrupo();
        vm.loading_init = 0;
      } catch (e) {
        console.log(e);
      }
    },
    // },
  },
  computed: {
    ...mapGetters(["listLessonsKanban"]),
  },
};
</script>
<style lang="scss">
.kandan-width {
  width: 400px !important;
}
.ui.dropdown .menu .active.item {
  background: 0 0;
  font-weight: 100 !important;
  color: rgba(0, 0, 0, 0.95);
  box-shadow: none;
  z-index: 12;
  font-size: 13px !important;
}

.tematicas-swiper-biblioteca {
  margin: 0 0 2rem 0;
  min-height: 16rem;
  padding-bottom: 3rem;

  & .swiper-pagination {
    bottom: 0;

    & .swiper-pagination-bullet {
      background: rgba(#2b2e2e, 0.7) !important;
      transition: transform 0.2s ease-in-out !important;
    }

    & .swiper-pagination-bullet-active {
      background: linear-gradient(134deg, #5f86ec 0%, #7c4cb0 100%) !important;
      transform: scale(1.5) !important;
      transition: transform ease-in-out 0.3 !important;
    }
  }

  .swiper-button-prev {
    background-image: url("https://res.cloudinary.com/admsys-storage/image/upload/smarteducation/masterbrain/civicamente-v2/icons/arrow-left.svg");
    width: 40px;
    background-repeat: no-repeat;
    height: 70px;
    top: 40%;
    left: 0;
    background-size: contain;
    background-position: center;
    z-index: 9999;

    &:after {
      content: none;
    }
  }
  .swiper-button-next {
    background-image: url("https://res.cloudinary.com/admsys-storage/image/upload/smarteducation/masterbrain/civicamente-v2/icons/arrow-right.svg");
    width: 40px;
    background-repeat: no-repeat;
    height: 70px;
    top: 40%;
    right: 0;
    background-size: contain;
    background-position: center;
    display: flex;
    z-index: 9999;
    position: absolute;
    &:after {
      content: none;
    }
  }
}
</style>
