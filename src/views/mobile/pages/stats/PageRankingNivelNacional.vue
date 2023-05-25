<template>
  <f7-page
    infinite
    :infinite-distance="50"
    :infinite-preloader="showPreloader"
    @infinite="loadMore"
    id="sideRankingNivelNacional-mobile"
  >
    <f7-navbar title="Ranking nacional" back-link> </f7-navbar>
    <div class="header-ranking-nivel-nacional">
      <div class="titulos">
        <h2 class="font-display">Ranking general nivel País</h2>
        <p>
          En este ranking, participan todos los estudiantes de tu nivel de
          cualquier establecimiento del país.
        </p>
      </div>
    </div>
    <div class="scrol ancho-maximo-mobile">
      <list-ranking-nacional
        :sliceIn="0"
        :sliceEnd="0"
        :section="'estadisticas'"
      />
    </div>
  </f7-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { axiosApiInstance } from "@/js/axios";
import { ListRankingNacional } from "@components/GlobalComponents";

export default defineComponent({
  name: 'page-ranking-nacional',
  props: [],
  components: {
    ListRankingNacional,
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
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.prevRoute = from;
      console.log(vm.prevRoute);
    });
  },
  mounted() {},
  created: function () {
    this.getRankingNivelNacional(false);
  },
  updated: function () {},

  methods: {
    loadMore() {
      const self = this;
      console.log("inicio");
      if (!self.allowInfinite) return;
      self.showPreloader = true;
      self.allowInfinite = false;
      console.log("entro a load more");
      setTimeout(() => {
        if (
          self.$store.state.listRankingNivelColegio.length >=
          self.$store.state.cantidadTematicas
        ) {
          console.log("entro al if de load more");
          self.showPreloader = false;
          return;
        }
        self.getRankingNivelNacional(true);
        console.log("paso abjo de get grupo");
        self.allowInfinite = true;
      }, 1000);
    },
    onLoad(index, done) {
      const vm = this;
      console.log("entro al onliad");
      setTimeout(() => {
        console.log("entro el setime");
      }, 2000);
    },
    getRankingNivelNacional(loadingPreloader) {
      const vm = this;
      vm.cantRanking = 10 + vm.cantRanking;
      axiosApiInstance({
        method: "post",
        url: "/api/auth/students/v3/general/stats/rankings/national",
        data: {
          cantRanking: vm.cantRanking,
        },
      })
        .then((response) => {
          vm.$store.state.listRankingNivelNacional = response.data.rankingNivel;
          if (loadingPreloader) {
            vm.showPreloader = false;
          }
          vm.overlay_show = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    cerrarVentana() {
      const vm = this;
      if (vm.prevRoute.name == "cm.estadisticas") {
        vm.$router.go(-1);
      } else {
        vm.$router.push({ name: "cm" }).catch((err) => {
          console.log(err);
        });
      }
    },
  },
});
</script>
