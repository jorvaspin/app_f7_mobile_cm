<template>
  <div class="relative">
    <vue-loading
      :active="!listAppPrizes.length"
      :width="40"
      :height="40"
      color="#72727f"
      :is-full-page="false"
      class="z-10"
    ></vue-loading>

    <div
      class="lg:bg-white lg:shadow-lg lg:rounded-md lg:px-6 lg:py-8"
      v-bind:class="{ 'waiting-premios': !listAppPrizes.length }"
    >
    <div class="relative flex items-center justify-between mb-2">
      <div class="relative flex items-center justify-start">
          <img :src="giftIcon" alt="giftIcon" class="object-contain object-center w-6 h-6 transform -translate-y-1.5">
          <span class="pl-1 text-2xl leading-none font-display"> Premio del mes </span>
      </div>
      <span class="w-10 md:w-30">
                <button class="w-9 h-9 md:w-auto btn-sm btn btn-rounded-full btn-default" @click.prevent="refreshPrizes(), buttonClick()"><i class="fa-regular fa-arrows-rotate"></i> <span class="hidden md:inline-block">Refrescar premios</span></button>
            </span>
    </div>

      <div>
        <div class="flex items-center text-sm leading-tight">
          <span class="flex-1">
              Selecciona el premio por el que estás participando este mes.
          </span>
        </div>
        <!-- <p class="max-w-2xl mt-1 text-sm text-gray-600 dark:text-gray-100">
          Los premios consideran la experiencia
          <span
            class="inline w-5 h-5 p-1 overflow-hidden text-sm text-white border-2 border-white border-opacity-50 bg-xp font-display text-shadow"
            >XP</span
          >
          obtenida del mes, no el acumulado hasta la fecha.
        </p> -->
        <div
          v-if="!userCurrentPrize"
          class="flex items-center justify-start gap-3 my-6 text-base font-bold leading-none text-center text-indigo-600 dark:text-yellow-400"
        ><i class="fa-regular fa-bell"></i> Aún no has seleccionado tu premio!
        </div>
      </div>

      <div class="flow-root px-6 py-6 my-4 rounded-md shadow-md lg:px-0 lg:shadow-none card-box lg:mt-8">
        <ul
          role="list"
          class="-my-5 divide-y divide-gray-100 lg:divide-x lg:divide-y-0 lg:grid lg:grid-cols-3 dark:divide-gray-700"
        >
          <li class="relative py-6 lg:py-1 lg:px-5" v-for="prize in listAppPrizes" :key="prize.id" v-bind:class="{ 'waiting-premios': loading }">
            <div class="flex items-start space-x-4">
                <f7-photo-browser
                :photos="[{
                    url: prize.imagen_url,
                    caption: prize.descripcion
                }]"
                theme="dark"
                :ref="`popupPrize${prize.id}`"
                :routable-modals="false"
                :toolbar="false"
                popup-close-link-text="Cerrar ventana"
                ></f7-photo-browser>

              <div class="flex-1 min-w-0">
                <XyzTransition appear duration="auto" xyz="fade in-down-25% out-down-25% duration-3">
                  <div
                  data-tooltip="Has seleccionado este premio"
                  class="absolute z-10 flex items-center justify-center w-10 h-10 p-2 rounded-full shadow-lg tooltip-init -right-2 top-2 bg-gradient-to-br from-purple-400 via-pink-500 to-red-500"
                  v-if="prize.id === userCurrentPrize.id"
                  >
                  <i class="text-white fa-solid fa-heart text-opacity-90"></i>
                  </div>
                  </XyzTransition>
                <h3 class="text-lg truncate font-display">{{ prize.value }}</h3>
                <badge-light class="inline-block mb-2 lg:hidden"
                  >{{ $filters.formatNumber(prize.puntos_requeridos) }} XP
                  requerida</badge-light
                >
                <div
                  class="text-xs opacity-80 md:text-base lg:text-sm line-clamp-2"
                  v-html="prize.descripcion"
                ></div>
              <div class="mt-5">
                  <XyzTransition appear duration="auto" mode="out-in" xyz="fade flip-down-25% duration-2">
                  <button
                    type="button"
                    v-if="prize.id != userCurrentPrize.id"
                    class="w-auto btn btn-primary lg:btn-sm button-participar"
                    @click.prevent="selectPrize(prize), buttonClick()"
                    key="1"
                  >
                    Seleccionar premio
                  </button>
                  <div v-else class="flex items-center justify-start gap-3 text-sm tracking-tight uppercase lg:text-xs font-display h-11 text-success-100">
                      <i class="fa-regular fa-check-circle" key="2"></i>
                      <span class="-mb-0.5">Actualmente seleccionado</span>
                  </div>
                  </XyzTransition>
              </div>
              </div>
              <div class="flex-shrink-0">
                <img
                 @click="showPrizeImage(prize.id)"
                  class="object-cover object-center w-16 h-20 rounded"
                  :src="prize.imagen_url"
                  :alt="prize.value"
                />
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  getPrizes,
  currentPrize,
  selectPrize,
} from "@/composables/usePrizesFunctions";
import { mapGetters, mapState } from "vuex";
import { f7 } from "framework7-vue";
import giftIcon from '@assets/images/icons/gift.svg'

export default defineComponent({
  data() {
    return {
      loading: true,
      loading_init: true,
      premio_selected: "",
      puntaje_mes: "",
      seleccionPremio: 0,
      selectPrize,
      giftIcon
    };
  },
  async mounted() {
      await currentPrize();
      await getPrizes();
  },
  ready: function () {
    this.loading = false;
    this.loading_init = false;
  },
  methods: {
      async refreshPrizes(){
          f7.dialog.preloader('Actualizando los premios...');
          await getPrizes();
      },

      showPrizeImage (id: any) {
        this.$refs['popupPrize' + id].open()
    }
  },
  computed:{
      ...mapGetters(['listAppPrizes']),
      ...mapState(['userCurrentPrize']),
  }
});
</script>