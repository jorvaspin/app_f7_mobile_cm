<template>
  <f7-page name="lessons-pending-page" no-toolbar class="page-lessons">
    <f7-navbar no-shadow title="Meses anteriores" class="navbar-lessons lessons-pending" back-link="Biblioteca">
    </f7-navbar>
    <div class="header-page header-lessons-pending">
        <f7-block class="header-text">
        <span class="flex items-start justify-between gap-2">
              <span class="flex-1 flex-shrink-0">
                <h3 class="">Clases de meses anteriores que aún no finalizas</h3>
                <p>
                  {{ listLessonsPending.lessonsCount }} clases de meses anteriores que
              no has finalizado y se encuentran desbloqueadas para que las
              finalices. Puedes cursar la trivia.
                </p>
              </span>
              <span
                class="flex items-center justify-center flex-shrink-0 w-12 h-auto"
                ><i class="w-10 h-10 fa-light fa-calendar-clock"></i
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
          v-for="lesson in listLessonsPending.lessons"
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
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import { TematicaWebCardSmall } from "@components/GlobalComponents";

export default defineComponent({
  name: "page-lessons-pending",
  props: {
    page: { type: String, required: false, default: "biblioteca" },
    sectionName: { type: String, required: false, default: "Biblioteca" },
  },
  components: {
    TematicaWebCardSmall,
  },
  computed: {
    ...mapGetters(["listLessonsPending"]),
  },
});
</script>