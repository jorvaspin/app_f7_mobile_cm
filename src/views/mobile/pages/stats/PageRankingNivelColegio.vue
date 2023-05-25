<template>
    <f7-page
    name=""
    no-toolbar
    infinite
    :infinite-distance="50"
    :infinite-preloader="showPreloader"
    @infinite="loadMore"
    id="sideRankingNivelNacional-mobile"
    >
        <f7-navbar title="Ranking local" back-link> </f7-navbar>
        <div class="header-ranking-nivel-nacional">
          <div class="titulos">
            <h2 class="font-display">Ranking {{ user.curso.colegio.nombre }}</h2>
            <p>En este ranking, participan todos los estudiantes de tu nivel y de tu establecimiento.</p>
          </div>
        </div>
        <div class="scrol ancho-maximo-mobile">
            <list-ranking-colegio :sliceIn="0" :sliceEnd="0" />
        </div>
    </f7-page>
</template>
<script lang="ts">
import {defineComponent} from 'vue';
import { axiosApiInstance } from '@/js/axios';
import {ListRankingColegio} from '@components/GlobalComponents';

export default defineComponent({
  name: 'page-ranking-colegio',
  props: [],
  components:{
    ListRankingColegio
  },
  data() {
    return {
      rankingNivel: [],
      cantRanking: 0,
      loadingDataRankingNacional: false,
      loadingPage: false,
      overlay_show: true,
      allowInfinite: true,
      showPreloader: false,
    }
  },
  mounted() {
    this.routeNombre = 'Ranking curso';
    this.getRankingNivelColegio(false);
  },
  updated: function() {

  },

  methods: {
    loadMore() {
        const self = this;
        console.log("inicio");
        if (!self.allowInfinite) return;
        self.showPreloader = true;
        self.allowInfinite = false;
        console.log("entro a load more");
        setTimeout(() => {
            if (self.listRankingNivelColegio.length >= self.cantidadTematicas) {
              console.log("entro al if de load more");
                self.showPreloader = false;
                return;
            }
            self.getRankingNivelColegio(true)
            console.log("paso abjo de get grupo");
            self.allowInfinite = true;
        }, 1000);
     },
    onLoad (index, done) {
      const vm = this;
      console.log('entro al onliad');
      setTimeout(() => {
        console.log('entro el setime');
      }, 2000)
    },
    getRankingNivelColegio(loadingPreloader){
      const vm = this;
      vm.cantRanking = 10 + vm.cantRanking
      axiosApiInstance({
        method: 'post',
        url: '/api/auth/students/v3/general/stats/rankings/school',
        data: {
          'cantRanking': vm.cantRanking
        }
      }).then(response => {
        vm.listRankingNivelColegio = response.data.listRankingNivelColegio;
        if(loadingPreloader){
          vm.showPreloader = false;
        }
        vm.overlay_show = false;
      }).catch((error) => {
        console.log(error)
      })
    },
    cerrarVentana() {
      const vm = this;
      if(vm.prevRoute.name == 'cm.estadisticas'){
        vm.$router.go(-1);
      }else{
        vm.$router.push({name: 'cm'}).catch(err => {console.log(err);});
      }
    },
  }
})
</script>
