<template>
  <div class="h-full px-1">
    <div class="flex flex-col gap-5 mx-3 flex-nowrap">
      <f7-link no-link-class href="/news" v-if="listNews.length" class="flex items-center justify-between px-5 py-5 card-box bg-gradient-to-br from-pink-500 to-red-500 group">
        <i class="text-4xl text-white transition-transform transform fa-light fa-monkey group-hover:scale-110"></i>
        <div class="flex flex-col gap-2">
        <h3 class="text-lg leading-none text-white font-display text-shadow-md">Conoce las novedades</h3>
        <!-- <button @click.prevent="$f7router.navigate({ name: 'cm.news' }), buttonClick()" class="w-40 btn btn-danger btn-lg">Ver todas</button> -->
        </div>
      </f7-link>

      <div
        class="relative px-4 py-5 overflow-hidden rounded shadow-md bg-card-biblioteca-rightbar bg-gradient-to-br from-rose-400 via-orange-300 to-teal-300"
      >
        <div class="absolute inset-0">
          <img
            class="object-cover w-full h-full"
            alt="People working on laptops"
          />
          <div class="absolute inset-0 mix-blend-overlay"></div>
        </div>
        <div
          class="relative mx-2 mt-2 text-2xl leading-tight text-white title font-display"
        >
          Descubre lo nuevo <br />de tu
          <span class="title-section-biblioteca">Biblioteca</span>
        </div>
        <p class="relative w-3/5 mx-2 my-3 text-sm leading-none text-white">
          Encuentra aquí las temáticas que debes desarrollar.
        </p>
        <button
          @click.prevent="
            $f7router.navigate({ name: 'cm.biblioteca' }), buttonClick()
          "
          class="w-auto mt-4 btn btn-warning btn-lg"
        >
          Ingresar
        </button>
        <img
          class="absolute bottom-0 w-6/12 -right-5"
          alt="Smarty"
        />
      </div>
      <card-home-duelos />
      <f7-link
        @click.prevent="
          $f7router.navigate({
            name: 'cm.duelosactivos',
            clearPreviousHistory: true,
          })
        "
        v-if="
          userListDuelsPending.length > 1 &&
          settings.ACTIVAR_DUELOS
        "
      >
        <div
          class="relative p-4 mr-3 overflow-hidden rounded shadow-md bg-card-duelos-rightbar"
          :class="
            settings.ACTIVAR_DUELOS
              ? ''
              : 'opacity-60 cursor-not-allowed'
          "
        >
          <div class="flex -mx-2">
            <div class="w-1/3 logo">
              <div
                class="absolute flex items-center justify-center p-0 text-sm text-center text-white bg-red-600 rounded-full left-12 top-2 w-7 h-7"
              >
                {{ userListDuelsPending.length }}
              </div>
              <img
                width="45"
                alt=""
              />
            </div>
            <div
              class="z-30 mx-2 text-xl leading-none text-white uppercase w-3/3 font-display"
            >
              Tienes duelos
              <span class="text-white">Pendientes de terminar</span>
            </div>
          </div>
        </div>
      </f7-link>

      <div
        class="relative flex flex-col gap-5 px-4 py-4 mt-4 bg-white rounded shadow-md flex-nowrap"
      >
        <img
          class="absolute w-24 -top-5 -right-2"
          alt=""
        />
        <div class="w-full pt-2">
          <h2
            class="w-3/4 text-xl leading-none text-red-600 uppercase font-display"
          >
            Logros y recompensas disponibles
          </h2>
          <p class="mt-2 leading-tight text-gray-600">
            Accede a recompensas exclusivas, incluso si no formas parte del
            cuadro de honor.
          </p>
        </div>
        <list-achievements :key="update"></list-achievements>
      </div>
    </div>
  </div>
</template>
<script>
import cardHomeDuelos from "@components/duelos/cardHomeDuelos.vue";
import { ListAchievements } from '@components/GlobalComponents';
export default {
  props: [],
  components: {
    cardHomeDuelos,
    ListAchievements
  },
  data() {
    return {
      usuario: [],
      options: {
        wheelPropagation: false,
      },
      update: false,
      url: "",
    };
  },
  created: function () {},
  updated: function () {},
  methods: {
    duelosDiariosCompletados() {
      toastr.warning(
        "<h6>Duelos Completados</h6> Haz completado los duelos diarios permitidos. Vuelve mañana :D"
      );
    },
  },
};
</script>
