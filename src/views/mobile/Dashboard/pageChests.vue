<template>
  <f7-page hide-navbar-on-scroll no-toolbar class="bg-pages">
  <f7-navbar title="Catálogo de productos" back-link></f7-navbar>
    <div class="chestCatalog">
      <div class="relative z-20 px-4 py-4 shadow-lg bg-gradient-to-br from-purple-700 via-pink-600 to-indigo-700" v-if="listUntilChests.length">
        <div class="relative mb-2">
          <div class="relative flex items-center justify-start text-left">
            <span class="text-lg uppercase font-display text-indigo-50">
              ¡Oportunidades!
            </span>
          </div>
        </div>
        <div class="grid items-center justify-center grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
          <div class="flex flex-col overflow-hidden rounded shadow-md bg-slate-800 cofre" v-for="(chest,index) in listUntilChests" :key="index">
            <img src="https://www.nicepng.com/png/full/28-285336_discount-ribbon.png" class="absolute right-0 w-11" alt="">
            <div class="flex items-center p-3 text-sm text-left text-white border-b border-orange-500 bg-gradient-to-br from-amber-500 to-orange-600 font-display text-shadow">
            <span class="-mb-1 leading-none">{{chest.name}}</span>
            </div>
            <div class="flex items-center">
            <div class="flex items-center justify-center flex-1 gap-4 py-4 grow">
              <img :src="chest.imageUrl" class="w-20 md:w-16" alt="{{ chest.name }}">
              <div class="flex items-center justify-center py-4 puntos font-display">
               <img
                      width="40"
                      height="40"
                      class="mr-1 w-7 h-7"
                      :src="civipuntosCoin"
                      alt="Civipunto"
                    /> <span class="text-4xl text-white">{{chest.amount}}</span>
              </div>

            </div>
            <div class="w-30 shrink-0">
              <button class="mx-auto btn btn-primary sheet-open" data-sheet=".premios-ganados" @click="buyChestUser(chest)">Canjear</button>
            </div>
            </div>
            <div class="flex items-center justify-between px-4 py-2 bg-black time-countdown">
              <span class="inline-flex text-xs font-bold leading-none text-indigo-100">Finaliza en</span>
              <countdown :time="chest.timeUntil" v-slot="{ days, hours, minutes, seconds }">
                <span class="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-indigo-400 rounded-full">
                  {{ days }} días, {{ hours }} horas, {{ minutes }} minutos, {{ seconds }} segundos
                </span>
              </countdown>
            </div>
          </div>
        </div>
      </div>
      <div class="z-10 px-4 py-8">
      <div class="grid items-center justify-center grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-4">
        <div class="flex flex-col items-center justify-center overflow-hidden bg-white rounded shadow cofre" v-for="(chest,index) in listChests" :key="index">
          <div class="flex items-center w-full p-3 text-sm text-left text-white border-b border-orange-500 bg-gradient-to-br from-amber-500 to-orange-600 font-display text-shadow">
            <span class="-mb-1 leading-none">{{chest.name}}</span>
            </div>
          <div class="w-full py-2 imagenCofre">
            <img :src="chest.imageUrl" class="w-20 mx-auto" alt="">
          </div>
          <div>
            <div class="flex items-center justify-center py-4 puntos font-display">
            <img
              width="20"
              height="20"
              class="w-4 h-4 mr-1"
              :src="civipuntosCoin"
              alt="Civipunto"
                    /> <span class="-mb-1">{{$filters.formatNumber(chest.amount)}}</span>
            </div>
          </div>
          <div class="w-full px-8 py-2">
            <button class="w-full mx-auto btn btn-primary sheet-open" data-sheet=".premios-ganados" @click="buyChestUser(chest)">Canjear</button>
          </div>
        </div>
      </div>
      </div>

      <!-- sheet premios ganados -->
      <modal-premios-ganados />
    </div>
  </f7-page>
</template>

<script lang="ts">
//init vue
import {defineComponent} from 'vue';
import {f7} from 'framework7-vue';
import ModalPremiosGanados from '@views/mobile/partials/ModalPremiosGanados.vue';
import { buyChest } from "@/composables/useAppFunctions";
import { getDevice } from "framework7/lite-bundle";
import store from "@/store/store";
import { getFleetingChests, getChests } from "@/composables/useAppFunctions";
import civipuntosCoin from '@/assets/images/civipuntos/civipuntos-coin.png';

export default defineComponent({
  props: [],
  components:{
    ModalPremiosGanados
  },
  data() {
    return {
      civipuntosCoin,
      anim: "",
      tipo: "",
      showCofre: false,
      premiosGanados: [],
      showPremios: false,
      listUntilChests: [],
      listChests: []
    }
  },
  setup() {
    const device = getDevice();
    return {
      buyChest,
      device
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.prevRoute = from;
    })
  },
  mounted() {
    const vm = this;
    vm.getChests();
    vm.getUntilChest();
  },
  created: function() {
    this.delay = "0.1s";
  },
  updated: function() {

  },
  computed: {

  },
  methods: {
    async buyChestUser(chest) {
      const vm = this;
      console.log(chest);
      store.state.premiosGanados = [];
      try {
        // guardamos la data
        const data = await buyChest(
          chest.id,
          chest.amount,
          chest.name
        );

        // validamos si el cofre tiene los premios suficientes o no
        if(data.premios_insuficientes){
          vm.$snotify.info('De momento no tenemos suficientes premios para este cofre.', 'Sin premios');
        }else{
          // success callback
          if(data.error){
            f7.toast.create({
                icon: '<i class="fa-regular fa-times fa-4x text-success-100"></i>',
                text: 'Civipuntos!<br> No tienes los Civipuntos suficientes para comprar este cofre.',
                position: 'center',
                closeTimeout: 3000,
              }).open();
            f7.sheet.close('.premios-ganados');
          }else{
            vm.showCofre = true;
            // vm.play();
            store.state.user.wallet_amount = data.wallet.balance;
            // inventary update
            store.state.premiosGanados = data.premiosGanados
            setTimeout(function(){
              vm.showPremios = true;
            }, 900);
          }
        }
      } catch (error) {
        console.log("Error:", error);
      }
    },
    //traemos los cofre no fugazes
    async getChests() {
        const vm = this;
        try {
          const data = await getChests();
          vm.listChests = data;
        } catch (error) {
          console.log("Error al traer los cofres:", error);
        }
    },
    //traemos los cofres fugazes
    async getUntilChest() {
        const vm = this;
        try {
          const data = await getFleetingChests();
          vm.listUntilChests = data;
        } catch (error) {
          console.log("Error al traer los cofres:", error);
        }
    },
  }
})
</script>

<style lang="scss">
.panel {
  box-shadow: 0 4px 27px 19px rgba(0, 0, 0, 0.3);
}
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

.chestCatalog{

  .cofre{
    position: relative;

    .punto-amarillo{
      width: 10px;
      height: 10px;
      display: inline-block;
      background: #fff700;
      border-radius: 50%;
      padding: 5px;
    }

    // .titulo{
    //   color: white;
    //   padding: 10px;
    //   background: #e49621;
    //   font-size: 13px;
    // }

    .puntos{
      text-align: center;
      font-size: 15px;
      padding: 0px;
      color: #084275;
    }
  }
}
</style>
