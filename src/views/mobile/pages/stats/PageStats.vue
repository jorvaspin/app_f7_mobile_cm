<template>
  <f7-page
    id="sideEstadisticas-mobile"
    ptr
    @ptr:refresh="refreshStats"
    class="bg-pages cm-profile"
  >
  <vue-loading
    :active="isLoadPage"
    color="#42424f"
    :lock-scroll="true"
    :z-index="999992"
    background-color="#1f2937"
    :opacity="0.9"
  >
    <span slot="after" class="relative flex flex-col items-center gap-6">
      <lottie-player
        autoplay
        loop
        mode="normal"
        :src="animLoading"
        class="w-3/4 mx-10"
      />
      <span
        class="text-lg leading-6 text-center text-white uppercase mx-7 font-display bottom-3 text-shadow-lg animate-pulse"
        >{{ $t('stats.page_loading_message') }}</span
      >
    </span>
  </vue-loading>
    <f7-navbar>
      <f7-nav-left>
        <f7-block>
          <h4 class="font-display">{{ $t('stats.page_title') }}</h4>
        </f7-block>
      </f7-nav-left>
    </f7-navbar>
    <div class="overflow-hidden">
      <header-user></header-user>
    </div>
    <div class="relative pt-5">
      <img src="/assets/images/bg-confetti.svg" class="absolute top-0 object-cover w-full" alt="Background serpentinas">

    <f7-block class="mt-0 h-80">
      <ranking-nivel-colegio
        :slice-in="0"
        :slice-end="0"
        :section="'estadisticas'"
      />
    </f7-block>
    <f7-block class="mb-10 h-80">
      <ranking-nivel-nacional
        :slice-in="0"
        :slice-end="0"
        :section="'estadisticas'"
      />
    </f7-block>
    <hr />
    <f7-block class="mt-10">
      <f7-block-title class="font-display">
        Trivias respondidas
      </f7-block-title>
      <f7-block-header>
        <p class="leading-none">
          En esta sección podrás conocer los resultados de tu participación.
        </p>
      </f7-block-header>
      <div class="mt-5">
        <f7-segmented strong tag="p" class="btns-segmented">
          <f7-button
            v-on:click="triviasNivelacionTerminadas()"
            :active="isActiveMenu == 'nivelacion'"
            class="uppercase font-display text-xs"
            >Generales</f7-button
          >
          <f7-button
            v-on:click="triviasTematicasTerminadas()"
            :active="isActiveMenu == 'tematicas'"
            class="uppercase font-display text-xs"
            >Temáticas</f7-button
          >
          <f7-button
            v-on:click="triviasTofTerminadas()"
            :active="isActiveMenu == 'tof'"
            class="uppercase font-display text-xs"
            >Verdadero/Falso</f7-button
          >
        </f7-segmented>

        <div class="mt-5 mb-5 h-96" v-if="listTriviasFinished.length > 0">
          <div class="relative h-full px-3 py-2 overflow-hidden card-box">
            <list-trivias-finished
              :listItemTrivias="listTriviasFinished"
              v-show="isActiveMenu != 'tof'"
              />
            <list-tof-finished
              :listItemTrivias="listTofTerminadas"
              v-show="isActiveMenu == 'tof'"
              />
          </div>
          <div
            class="absolute inset-x-0 bottom-0 z-50 flex items-center h-16 py-5 text-center justify-content-center bg-gradient-to-t from-white dark:from-palette-dark-tint"
          >
            <f7-link
              tag="button"
              class="btn btn-default btn-sm"
              name="button"
              @click="goToFinishedTrivias()"
              >Ver todas
            </f7-link>
          </div>
        </div>
        <div class="mt-5 mb-5 h-96" v-else>
          <div
            class="mb-5 row no-gutters listaTrivias tipo"
          >
            <h6>Sin información</h6>
          </div>
        </div>

      </div>
    </f7-block>
        <hr />
    <f7-block class="mt-10">
      <f7-block-title class="font-display">
        Duelos Jugados
      </f7-block-title>
      <f7-block-header>
        <p class="leading-none">
          En esta sección podrás conocer los resultados de los duelos jugados.
        </p>
      </f7-block-header>
      <div class="mt-5">
        <div class="mt-5 mb-5 h-96" v-if="listDuelsFinished.length > 0">
          <div class="relative h-full px-3 py-2 overflow-hidden card-box">
            <list-duels-finished
              :listItemDuelsFinished="listDuelsFinished"
              />
          </div>
          <div
            class="absolute inset-x-0 bottom-0 z-50 flex items-center h-16 py-5 text-center justify-content-center bg-gradient-to-t from-white dark:from-palette-dark-tint"
          >
            <f7-link
              tag="button"
              class="btn btn-default btn-sm"
              name="button"
              @click="goToFinishedTrivias()"
              >Ver todas
            </f7-link>
          </div>
        </div>
        <div class="mt-5 mb-5 h-96" v-else>
          <div
            class="mb-5 row no-gutters listaTrivias tipo"
          >
            <h6>Sin información</h6>
          </div>
        </div>

      </div>
    </f7-block>
    </div>
    <!-- resultado trivia/tematica finalizada -->
    <pop-up-trivia-finished />
    <!-- resultado tof finalizada -->
    <pop-up-tof-finished />
        <!-- resultado duels finalizada -->
    <pop-up-duels-finished />
  </f7-page>
</template>
<script lang="ts">
import { f7 } from "framework7-vue";
import { defineAsyncComponent, defineComponent } from "vue";
import { rankingStats } from "@/composables/useStatsFunctions";
import animLoading from '@/assets/animations/95032-loading-ball-concept.json';
import store from "@/store/store";
import { getMisStatsTematicas, getMisStatsNivelacion, getMisStatsDuelos, getMisStatsTof } from "@/composables/userFunctions";
import { getDevice } from "framework7/lite-bundle";
import imgTofIcon from "@assets/images/tof-icon.svg";
import imgDuels from "@/assets/images/duels/logo_duelos_civicos.svg";
import { mapGetters, mapState } from "vuex";

export default defineComponent({
  props: [],
  components: {
    headerUser: defineAsyncComponent(() => import('@components/estadisticas/headerUser.component.vue') ),
    PopUpTriviaFinished: defineAsyncComponent(() => import('./popupFinished/PopUpTriviaFinished.vue') ),
    PopUpTofFinished: defineAsyncComponent(() => import('./popupFinished/PopUpTofFinished.vue') ),
    PopUpDuelsFinished: defineAsyncComponent(() => import('./popupFinished/PopUpDuelsFinished.vue') ),
    RankingNivelColegio: defineAsyncComponent(() => import('@components/estadisticas/views/RankingNivelColegio.vue') ),
    RankingNivelNacional: defineAsyncComponent(() => import('@components/estadisticas/views/RankingNivelNacional.vue') ),
    ListTriviasFinished: defineAsyncComponent(() => import('@components/estadisticas/triviasFinished/listTrivasFinished.vue') ),
    ListTofFinished: defineAsyncComponent(() => import('@components/estadisticas/triviasFinished/listTofFinished.vue') ),
    ListDuelsFinished: defineAsyncComponent(() => import('@components/estadisticas/duelsFinished/listDuelsFinished.vue') )
  },
  data() {
    return {
      animLoading,
      loadingCharts: false,
      delay: "0.2s",
      loadingStats: 1,
      loadingApex: 1,
      inDuelos: false,
      isActiveMenu: '',
      listTriviasTerminadas: [],
      listTofTerminadas: [],
      allTriviasShow: true,
      allTematicasShow: false,
      allNivelacionShow: false,
      paginationTerminated: [],
      showTypeTriviasFinished: '',
      arrayFinisheds: [],
      imgTofIcon,
      imgDuels,
      isActiveDuelsFinished: false
    };
  },
  setup() {
    const device = getDevice();
    return {
      device,
      getMisStatsTematicas,
      getMisStatsNivelacion,
      getMisStatsTof
    };
  },
  mounted() {
    const vm = this;
    vm.listTriviasTerminadas = vm.listTriviasFinished;
  },
  methods: {
    refreshStats(done: () => void) {
      const vm = this;
      f7.dialog.preloader("Actualizando Información.");
      rankingStats();

      setTimeout(() => {
        f7.dialog.close();
        done();
      }, 1000);
    },
    async triviasTematicasTerminadas() {
        const vm = this;
        try {
          const data = await getMisStatsTematicas();
          vm.isActiveMenu = 'tematicas'
          vm.isActiveDuelsFinished = true;
          store.commit('setTriviasFinished', data.trivias);
        } catch (error) {
          console.log("Error al traer las trivias tematicas terminadas:", error);
        }
    },
    async triviasNivelacionTerminadas() {
        const vm = this;
        try {
          const data = await getMisStatsNivelacion();
          vm.isActiveMenu = 'nivelacion'
          store.commit('setTriviasFinished', data.trivias);
        } catch (error) {
          console.log("Error al traer las trivias nivelacion terminadas:", error);
        }
    },
    async triviasTofTerminadas() {
        const vm = this;
        try {
          const data = await getMisStatsTof();
          vm.isActiveMenu = 'tof'
          vm.listTofTerminadas = data.trivias;

        } catch (error) {
          console.log("Error al traer las trivias tof terminadas:", error);
        }
    },
    goToFinishedTrivias(){
      f7.views.current.router.navigate('/estadisticas/triviasfinished/' + this.isActiveMenu + '/')
    }
  },
  computed:{
    isLoadPage() {
      return !store.state.statusLoadPageStats;
    },
    ...mapGetters(["listTriviasFinished",'listDuelsFinished']),
  }
});
</script>
