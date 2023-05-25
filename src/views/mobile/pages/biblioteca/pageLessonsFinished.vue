<template>
  <f7-page
    name="lessons-finished-page"
    no-toolbar
    infinite
    :infinite-distance="50"
    :infinite-preloader="showPreloader"
    @infinite="loadMore"
    class="page-lessons"
  >
  <f7-navbar no-shadow title="Clases finalizadas" class="navbar-lessons lessons-finished" back-link="Biblioteca" />
    <div class="header-page header-lessons-pending">
        <f7-block class="header-text">
        <span class="flex items-start justify-between gap-2">
              <span class="flex-1 flex-shrink-0">
                <h3 class="">Clases finalizadas</h3>
                <p>
                  {{ listLessonsFinished.lessonsCount }} clases finalizadas que
              puedes ver nuevamente si quieres seguir aprendiendo.
                </p>
              </span>
              <span
                class="flex items-center justify-center flex-shrink-0 w-12 h-auto"
                ><i class="w-10 h-10 fa-light fa-calendar-check"></i
              ></span>
            </span>
        </f7-block>
      </div>

    <div
      class="fixed inset-x-0 bottom-0 z-10 h-16 bg-gradient-to-t from-white dark:from-dark"
    ></div>
    <f7-block>
      <div class="space-y-3 md:grid-cols-2 md:grid md:space-y-0 md:gap-2 lg:grid-cols-3">
        <div
          v-for="lesson in listLessonsFinished.lessons"
          v-bind:key="lesson.id"
        >
          <tematica-web-card-small
            :number-mini="true"
            :tematica="lesson"
            :page="page"
            :sectionName="sectionName"
          ></tematica-web-card-small>
        </div>
      </div>
    </f7-block>
  </f7-page>
</template>
<script lang="ts">
import { f7 } from "framework7-vue";
import { defineComponent } from "vue";
import { axiosInstance } from "@/js/axios";
import { mapGetters } from "vuex";
import { TematicaWebCardSmall } from "@components/GlobalComponents";

export default defineComponent({
  name:'lessons-finished-page',
  props: {
    page: { type: String, required: false, default: "biblioteca" },
    sectionName: { type: String, required: false, default: "Biblioteca" },
  },
  components: {
    TematicaWebCardSmall,
  },
  data() {
    return {
      tematicasGrupoCompletadas: [],
      showTematica: false,
      numeroTematicas: 0,
      allowInfinite: true,
      showPreloader: true,
      overlay_show: true,
    };
  },

  created: function () {},
  updated: function () {},
  methods: {
    loadMore() {
      const self = this;
      console.log("inivio");
      if (!self.allowInfinite) return;
      self.allowInfinite = false;
      console.log("entro a load more");
      setTimeout(() => {
        if (
          self.$store.state.lessonsFinished.length >
          self.$store.state.cantTematicasCompletadas
        ) {
          console.log("entro al if de load more");
          self.showPreloader = false;
          return;
        }
        self.getMoreTematicasCompletadas();
        console.log("paso abjo de get grupo");
        self.allowInfinite = true;
      }, 1000);
    },
    getMoreTematicas() {
      const vm = this;
      f7.dialog.preloader("Cargando más información...");
      vm.getMoreTematicasCompletadas();
    },
    async getMoreTematicasCompletadas() {
      const vm = this;
      vm.$store.state.routeNombre = "Volver a la biblioteca";
      vm.numeroTematicas = 10 + vm.numeroTematicas;
      try {
        const { data } = await axiosInstance({
          method: "post",
          url: "/api/auth/getMoreTematicasCompletadas/",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("cm_access_token"),
          },
          data: {
            numeroTematicas: vm.numeroTematicas,
          },
        });
        f7.dialog.close();
        vm.$store.state.lessonsFinished = data.lessonsFinished;
        vm.$store.state.cantTematicasCompletadas =
          data.cantTematicasCompletadas;
      } catch (error) {
        console.log(error);
      }
    },
  },
  computed: {
    ...mapGetters(["listLessonsFinished"]),
  },
});
</script>
