<template>
  <f7-page name="lessons-kanban-page" no-toolbar class="page-lessons" ptr @ptr:refresh="handleRefreshPage">
    <f7-navbar
      no-shadow
      class="navbar-lessons lessons-kanban"
      back-link="Biblioteca"
    >
    </f7-navbar>
      <div class="header-page header-lessons-kanban">
        <f7-block class="header-text">
        <span class="flex items-start justify-between gap-2">
              <span class="flex-1 flex-shrink-0">
                <h3 class="">Planificación mensual de tu aprendizaje</h3>
                <p>
                  {{ listLessonsKanban.lessonsCount }} clases agregadas por tu
                  docente para cursar durante el mes de
                  <span class="font-bold">{{ listLessonsKanban.thisMonth }}</span>.
                </p>
              </span>
              <span
                class="flex items-center justify-center flex-shrink-0 w-12 h-auto"
                ><i class="w-10 h-10 fa-light fa-calendar-day"></i
              ></span>
            </span>
        </f7-block>
      </div>
    <div
      class="fixed inset-x-0 bottom-0 z-50 h-16 bg-gradient-to-t from-white dark:from-dark"
    ></div>
    <f7-block>
      <div class="space-y-3 md:grid-cols-2 md:grid md:space-y-0 md:gap-2 lg:grid-cols-3">
        <div v-for="lesson in listLessonsKanban.lessons" v-bind:key="lesson.id">
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
import { defineComponent } from "vue";
import { TematicaWebCardSmall } from "@components/GlobalComponents";
import { f7 } from "framework7-vue";
import { mapGetters } from "vuex";
import { lessonsKanban } from "@/composables/useLessonsFunctions";

export default defineComponent({
  name: "page-lessons-kanban",
  props: {
    backText: { type: String, required: false, default: 'Biblioteca' },
    page: { type: String, required: false, default: "biblioteca" },
    sectionName: { type: String, required: false, default: "Biblioteca" },
  },
  setup() {
    const handleRefreshPage = async (done: () => void) => {
      try {
        f7.dialog.preloader("Actualizando contenidos...");
        lessonsKanban();
        setTimeout(() => {
          done();
          f7.dialog.close();
          f7.toast
            .create({
              text: "Los contenidos se han actualizado",
              position: "top",
              closeTimeout: 2000,
              closeButton: true,
              closeButtonText: 'Ok',
            })
            .open();
        }, 2500);
      } catch (error) {
        console.log(error);
      }
    };
    return {
      handleRefreshPage,
    };
  },
  components: {
    TematicaWebCardSmall,
  },
  computed: {
    ...mapGetters(["listLessonsKanban"]),
  },
});
</script>
