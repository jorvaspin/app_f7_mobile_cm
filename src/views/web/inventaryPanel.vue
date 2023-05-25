<template>
<f7-panel left cover>
  <f7-page name="cm.inventory" class="bg-global-site panel-inventory">
      <vue-headful
        :title="'Mi inventario ' + this.siteName"
      />
        <close-page-button></close-page-button>
        <div class="relative flex flex-col w-full">
          <div class="sticky top-0 flex w-full h-24 bg-gray-800">
          <div class="flex flex-row items-center w-full gap-5 px-4">
            <div class="w-46">
              <img
                src="https://assets-civicamente.us-east-1.linodeobjects.com/images/inventory.png"
                class="w-12 mx-auto"
                alt="Logros y recompensas"
              />
            </div>
            <div class="w-3/4">
              <h1 class="text-white font-display">Mi inventario</h1>
              <p class="text-sm text-white">Acá se listan todas las cosas que has desbloqueado o comprado</p>
            </div>
          </div>
        </div>
        </div>
    <div class="border-blue-500 rounded-md contenedorBackground">
      <div class="inventario">
        <div class="p-3 mb-4 categorias">
          <button class="px-4 py-2 font-bold text-white bg-blue-500 border-b-4 border-blue-700 rounded w15 hover:bg-blue-400 hover:border-blue-500" v-for="(category,index) in categoryInventary" v-on:click="getCategoryInventory(category.unique_code)" :key="index">{{category.name}}</button>
        </div>
        <div class="grid items-center justify-center grid-cols-4 gap-5" v-if="userListInventary.length > 0">
          <div class="overflow-hidden rounded-lg premio" v-for="(prize,index) in userListInventary" :key="index">
            <div class="flex items-center justify-center h-12 bg-orange-400 font-display">
               <h3 class="text-sm text-white">{{prize.name}} </h3>
            </div>
            <div class="imagenPremio">
              <img :src="prize.image" alt="">
            </div>
            <div class="botonUsar" v-if="!prize.is_used">
              <button type="button" name="button" class="btn btn-primary" v-if="prize.tipo_premio == 'tema' || prize.tipo_premio == 'nickname'" @click="prize.tipo_premio == 'tema' ? usarCartaTema(prize.id) : usarCartaNickname(prize.id)"> Usar </button>
            </div>
            <div class="botonUsar" v-else-if="prize.tipo_premio == 'tema' || prize.tipo_premio == 'nickname'">
              <button type="button" name="button" class="btn btn-warning"> en uso </button>
            </div>
            <div class="botonUsar" v-else>
              <button type="button" name="button" class="btn btn-warning"> Ver </button>
            </div>
          </div>
        </div>
        <div class="items-center justify-center text-white font-display" v-else>
            Inventario vacio, abre cofres para ganar fabulosos premios.
        </div>
      </div>
    </div>
  </f7-page>
</f7-panel>
</template>
<script>
const readingTime = require("reading-time-cm");
//init vue
import Vue from "vue";
// import Slick from 'vue-slick';
import { axiosInstance } from "@/js/axios";

export default {
  name: "chestsAvailable",
  props: [],
  data() {
    return {
      anim: "",
      tipo: "",
      optionsScrollPrincipal: {
        wheelPropagation: false,
        suppressScrollX: true,
        suppressScrollY: false,
      },
      optionsScrollInterno: {
        wheelPropagation: false,
        suppressScrollX: true,
      },
      options: {
        wheelPropagation: false,
      },
      slickOptions: {
        dots: true,
        infinite: false,
        speed: 400,
        slidesToShow: 3,
        slidesToScroll: 1,
      },
      categoryInventary: []
    };
  },
  mounted() {
    const vm = this;
    this.$Progress.start();
    this.$nextTick(function () {

      setTimeout(function () {
        vm.$f7.dialog.close();
      }, 2000);
    });
  },

  // components: { Slick },

  created: function () {
    this.delay = "0.1s";
    this.$f7.dialog.preloader('Cargando tu inventario...',{
      destroyOnClose:true,
    });
    this.getCategoryPrizes();
    this.getCategoryInventory('nickname')
  },
  updated: function () {

  },
  methods: {
    getCategoryPrizes(){
      const vm = this;
      axiosInstance({

      })
        .then((response) => {
          // success callback
          vm.categoryInventary = response.data
          vm.activeID = response.data[0].id;
          setTimeout(function () {
            vm.$f7.dialog.close();
          }, 100);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getCategoryInventory(valor){
      const vm = this;
      vm.$f7.dialog.preloader('Estamos filtrando tu inventario',{
        destroyOnClose:true,
      });
      console.log(valor);
      axiosInstance({
        method: "post",
        data: {
          'valor': valor
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer "
        },
      })
        .then((response) => {
          // success callback
          vm.userListInventary = response.data.userListInventary;
          vm.activeID = response.data.id_category.id;
          setTimeout(function () {
            vm.$f7.dialog.close();
          }, 100);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    next() {
      this.$refs.slick.next();
    },

    prev() {
      this.$refs.slick.prev();
    },

    reInit() {
      // Helpful if you have to deal with v-for to update dynamic lists
      this.$nextTick(() => {
        this.$refs.slick.reSlick();
      });
    },
  },
  computed: {
    // a computed getter
  },
};
</script>
<style lang="scss">
.panel {
    max-width: 95vw;
  box-shadow: 0 4px 27px 19px rgba(0, 0, 0, 0.3);
}
.ui.dropdown .menu .active.item {
  background: 0 0;
  font-weight: 100 !important;
  color: rgba(0, 0, 0, 0.95);
  box-shadow: none;
  z-index: 12;
  font-size: 13px !important;
}

.w15{
  width: 15%;
  margin: 5px;
}
</style>
