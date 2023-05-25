<template>
  <f7-page class="relative navbar-dashboard bg-pages">
    <template #fixed>
      <appbar class="navbar-dashboard"></appbar>
    </template>
    <div
      class="absolute inset-x-0 top-0 h-52 bg-sidebar-color dark:bg-palette-dark-default"
    ></div>
    <f7-block class="container relative pt-1 mt-0"
              :style="
          userTheme != null
            ? 'background: url(' + userTheme.background.navbar + ');background-size: cover;padding-bottom: 15px;border-bottom-right-radius: 5%;border-bottom-left-radius: 5%;'
            : ''
        "
    >
      <f7-block-title class="container relative w-full py-3 my-0 truncate">
        <h2
          class="inline-flex items-center gap-2 m-0 text-xl text-white truncate md:text-3xl font-display"
        >
          <span class="relative w-8">
            <user-avatar></user-avatar>
          </span>
          <p>
            Hola

            <span
            :style="
              userNickname != null
                ? userNickname.nickname.style
                : ''
              "
            >
              {{
                user.nick_or_name
              }}
            </span>
          </p>
        </h2>
      </f7-block-title>
      <div class="container relative my-0 card-box md:py-3">
        <img
          :src="imgHeroes"
          class="absolute bottom-0 right-0 w-36 md:w-40 md:right-3"
          alt=""
        />
        <div class="w-3/5 px-1 py-4 md:w-3/4 md:px-3">
          <div class="flex flex-col">
            <h5
              v-if="user.last_game != 'Nunca ha jugado'"
              class="text-base font-semibold leading-none tracking-tight md:text-xl text-titles dark:text-gray-100"
            >
              {{
                $t("dashboard.user_messages.has_participated", {
                  last_game: user.last_game,
                })
              }}
            </h5>
            <h5
              v-else
              class="text-base font-semibold leading-none tracking-tight md:text-xl text-titles dark:text-gray-100"
            >
              {{ $t("dashboard.user_messages.has_not_participated") }}
            </h5>
            <div
              class="mt-2 text-sm leading-tight tracking-tight md:text-xl text-titles dark:text-gray-100"
            >
              {{ $tc("dashboard.user_messages.has_taken_lessons", user.trivias_tematicas) }}
            </div>
          </div>
        </div>
      </div>
    </f7-block>
    <f7-block>
    </f7-block>
    <f7-block class="container">
      <section-cuadro-honor
        class="overflow-hidden rounded-md shadow-md"
      ></section-cuadro-honor>
    </f7-block>
    <f7-block class="container">
      <div
        class="flex flex-col items-stretch justify-between gap-4 md:flex-row md:gap-4"
      >
        <div class="flex flex-col w-full gap-3 md:flex-row md:gap-4 md:w-2/3">
          <div class="flex-grow-0 w-full md:w-1/2">
            <QuizStartSheetWidget />
          </div>
          <div class="flex-grow-0 w-full md:w-1/2">
            <UserRangoWidget />
          </div>
        </div>
        <div class="w-full md:w-1/3">
          <cardDuelsDashboard />
        </div>
      </div>
    </f7-block>
    <!-- <f7-block class="container">
      <card-alert-news-home />
    </f7-block> -->

    <div class="container">
      <SectionLessons
        title="Clases de meses anteriores"
        :description="`Tienes ${listLessonsPending.lessonsCount} clases de meses anteriores que no has finalizado.`"
        href="/biblioteca/pending/"
        :lessons="listLessonsPending"
        :numberOfElements="9"
        :page="'dashboard'"
        :sectionName="'pendientes-biblioteca'"
        key="lessons-pending"
      />
    </div>
    <f7-block class="container mb-10">
      <card-achievement-home />
    </f7-block>
    <f7-block class="container py-5">
      <Awards />
    </f7-block>
    <!-- sheet modal para buscar oponente -->
    <SheetModalSearchOpponent />
    <!-- notificaciones en vivo de duelo -->
    <notificaciones-duelos></notificaciones-duelos>
  </f7-page>
</template>
<script lang="ts">
import { computed, defineAsyncComponent, defineComponent } from "vue";
import { showToast } from "@/composables/useHelpersFunctions";
import VueLoading from "vue-loading-overlay";
import { mapGetters, mapState } from "vuex";
import imgHeroes from "@assets/images/heroes-mobile.svg";
import store, { useStore } from "@/store/store";
// import cordovaApp from "@/js/cordova-app.js";

export default defineComponent({
  name: "dashboard",
    setup() {
    return {
      userTheme: computed(() => store.state.temaActivo),
      userNickname: computed(() => store.state.nickActivo),
    };
  },

  data() {
    return {
      imgHeroes,
      oponenteActivo: false,
    };
  },
  components: {
    SheetModalSearchOpponent: defineAsyncComponent(() => import("@/views/globals/duelos/dashboard/SheetModalSearchOpponent.vue")),
    Appbar: defineAsyncComponent(() => import("@components/navbar/appbar.vue")),
    Modal: defineAsyncComponent(() => import("@components/global/Modal.vue")),
    CardAchievementHome: defineAsyncComponent(
      () => import("@/components/achievements/CardBtnAchievementHome.vue")
    ),
    CardAlertNewsHome: defineAsyncComponent(() => import("@/components/news/CardAlertNewsHome.vue")),
    QuizStartSheetWidget: defineAsyncComponent(() => import("@/components/global/QuizStartSheetWidget.vue")),
    UserRangoWidget: defineAsyncComponent(() => import("@/components/global/UserRangoWidget.vue")),
    cardDuelsDashboard: defineAsyncComponent(() => import("@/components/duelos/dashboard/cardDashboard.vue")),
    logroDesbloqueado: defineAsyncComponent(() => import("@/views/web/partials/logroDesbloqueado.vue")),
    sectionCuadroHonor: defineAsyncComponent({
      loader: () =>
        import("@views/web/partials/dashboard/sectionCuadroHonor.vue"),
      loadingComponent: VueLoading,
    }),
    SectionLessons: defineAsyncComponent(
      () => import("@components/biblioteca/SectionLessons.vue")
    ),
    Awards: defineAsyncComponent(
      () => import("@/views/web/partials/dashboard/Awards.vue")
    ),

    NotificacionesDuelos: defineAsyncComponent({
      loader: () => import("@views/web/partials/notificacionesDuelos.vue"),
      loadingComponent: VueLoading,
    }),
  },
  methods: {
    //mensajes toasts
    completeTrivias() {
      showToast({
        text: "Felicidades! Ya has completado tus trivias de nivelación de hoy.",
      });
    },
    duelosCompletados() {
      showToast({
        text: "Ya has completado tus 2 duelos disponible del dia, vuelve mañana!",
        type: "info",
      });
      // this.$snotify.success('Ya has jugado tus 2 duelos disponible del dia, vuelve mañana!', 'Duelos Cívicos');
    },
    dueloIniciado() {
      showToast({
        text: "Ya has comenzado un duelo y debes terminarlo antes de iniciar otro.",
        type: "warning",
      });
    },
  },
  computed: {
    ...mapState(['user', 'settings']),
    ...mapGetters(["listLessonsPending"]),
  },
});
</script>
<style lang="less" scoped>
.navbar-dashboard {
  --f7-navbar-height: 60px !important;
}
</style>
