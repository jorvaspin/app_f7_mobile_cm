<template>
  <f7-page name="library-page" class="bg-pages" ptr @ptr:refresh="handleRefreshPage">
  <vue-loading
    :active="isLoadPage"
    color="#42424f"
    :lock-scroll="true"
    background-color="#1f2937"
    :opacity="0.9"
  >
    <span slot="after" class="relative flex flex-col items-center gap-6">
      <lottie-player
        autoplay
        loop
        mode="normal"
        :src="animateLoading"
        class="w-3/4 mx-10"
      />
      <span
        class="text-lg leading-6 text-center text-white uppercase mx-7 font-display bottom-3 text-shadow-lg animate-pulse"
        >{{ $t('library.page_loading_message') }}</span
      >
    </span>
  </vue-loading>
    <f7-navbar>
      <f7-nav-left>
        <f7-block>
          <h4 class="leading-none font-display">{{ $t('library.page_title') }}</h4>
        </f7-block>
      </f7-nav-left>
    </f7-navbar>
    <f7-block class="relative my-0 overflow-hidden bg-bottom bg-cover h-44 md:h-52">
      <img
        src="/assets/images/background-login.jpg"
        class="absolute inset-0 object-cover object-center"
        alt=""
      />
      <div
        class="container relative flex items-center justify-start h-full pt-4 mx-auto"
      >
        <div class="absolute w-40 top-2 -right-3 md:right-4 md:w-44">
          <img src="/assets/images/smarty-new.svg" alt="Smarty" class="w-full" />
        </div>
        <div class="relative w-full h-full pt-4 pb-5">
          <h1 class="w-3/4 text-3xl leading-none text-white md:w-3/5 md:text-4xl font-display">
            {{ $t('library.main.welcome.title') }}
            <span class="relative inline-block text-indigo-700">
              <span class="title-section-biblioteca">{{ $t('library.main.welcome.title_color') }}</span>
            </span>
          </h1>
          <div class="w-3/5 mt-2 text-sm leading-4 text-white md:text-lg md:leading-tight">
           {{ $t('library.main.welcome.subtitle') }}
          </div>
        </div>
      </div>
    </f7-block>
<div class="container w-full dark:bg-transparent">
      <SectionLessons
        title="Planificación mensual"
        :description="`${listLessonsKanban.lessonsCount} clases agregadas por tu docente para cursar durante el mes de <span class=&quot;font-bold&quot;>${listLessonsKanban.thisMonth}</span>.`"
        href="/biblioteca/kanban/"
        :lessons="listLessonsKanban"
        :numberOfElements="6"
        forceViewLink
        :page="'biblioteca'"
        :sectionName="'mes-biblioteca'"
        key="lessons-kanban"
      />
    </div>
    <div class="container w-full">
      <section-lessons-groups
        :page="'biblioteca'"
        :sectionName="'groups-biblioteca'"
        key="lessons-groups"
      ></section-lessons-groups>
    </div>

    <div
      class="container w-full"
    >
      <SectionLessons
        title="Clases de meses anteriores"
        :description="`Tienes ${listLessonsPending.lessonsCount} clases de meses anteriores que no has finalizado.`"
        href="/biblioteca/pending/"
        :lessons="listLessonsPending"
        :numberOfElements="9"
        :page="'biblioteca'"
        :sectionName="'pendientes-biblioteca'"
        key="lessons-pending"
      />
    </div>
    <div class="container w-full">
      <SectionLessons
        title="Clases finalizadas"
        description="Puedes acceder nuevamente al contenido finalizado si quieres seguir aprendiendo."
        href="/biblioteca/finished/"
        :lessons="listLessonsFinished"
        :numberOfElements="9"
        :page="'biblioteca'"
        :sectionName="'terminadas-biblioteca'"
        key="lessons-finished"
      />
    </div>
  </f7-page>
</template>
<script lang="ts">
import { f7, theme } from "framework7-vue";
import { defineAsyncComponent, defineComponent } from "vue";
import { getLessons } from "@/composables/useLessonsFunctions";
import { mapGetters } from "vuex";
import { store } from "@/store/store";
import animateLoading from '@/assets/animations/92419-ui-loader-library.json';
export default defineComponent({
  name: "page-library",
  components: {
    Appbar: defineAsyncComponent(() => import("@components/navbar/appbar.vue")),
    SectionLessons: defineAsyncComponent(
      () => import("@components/biblioteca/SectionLessons.vue")
    ),
    sectionLessonsGroups: defineAsyncComponent(
      () => import("./partials/sectionLessonsGroups.vue")
    ),
  },
  setup() {
    const handleRefreshPage = async (done: () => void) => {
      try {
        f7.dialog.preloader("Refrescando...");
        getLessons();
        setTimeout(() => {
          done();
          f7.dialog.close();
        }, 500);
      } catch (error) {
        console.log(error);
      }
    };
    return {
      animateLoading,
      handleRefreshPage,
      theme,
    };
  },
  data() {
    return {
      tabs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    };
  },
  computed: {
    ...mapGetters([
      "listLessonsKanban",
      "listLessonsPending",
      "listLessonsFinished",
    ]),

    isLoadPage() {
      return !store.state.statusLoadPageLibrary;
    },
  },
});
</script>
