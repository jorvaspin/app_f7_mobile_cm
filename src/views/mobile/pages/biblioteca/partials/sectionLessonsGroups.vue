<template>
  <div class="relative">
    <vue-loading
      :active="isLoading"
      :color="'#42424f'"
      :blur="'40px'"
      :width="40"
      :height="40"
      :opacity="0.6"
      :is-full-page="false"
    />
    <div class="relative py-7" v-if="!isLoading">
      <div v-if="!listLessonsKanban.lessonsCount">
        <f7-block class="m-0 mb-5">
          <div class="px-4 py-5 bg-green-500 rounded shadow dark:bg-green-600">
            <h3 class="mb-3 leading-none text-white font-display">
              ✌️ ¡No te quedes sin aprender!
            </h3>
            <p class="text-base leading-tight text-white">
              Así que mientras tú docente selecciona sus temáticas, te invitamos
              a conocer el contenido agrupado que hemos seleccionado para ti. !Buena suerte!
            </p>
          </div>
        </f7-block>
      </div>
      <f7-block-title
        class="text-lg leading-tight font-display md:text-2xl"
      >
        Contenido agrupado para que sigas aprendiendo por tu cuenta.
      </f7-block-title>
      <div class="my-5">
        <LessonsGroupsList
          backText="'Biblioteca'"
          :elements="listLessonsGroups.groups"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineAsyncComponent, defineComponent } from "vue";
import { mapGetters } from "vuex";
import VueLoading from "vue-loading-overlay";

export default defineComponent({
  name: "section-lessons-groups",
  props: {
    showStats: { type: Boolean, required: false, default: false },
    page: { type: String, required: false, default: "biblioteca" },
    sectionName: { type: String, required: false, default: "Biblioteca" },
  },
  components: {
    LessonsGroupsList: defineAsyncComponent({
      loader: () =>
        import("@/components/biblioteca/LessonsGroupsList.component.vue"),
      loadingComponent: VueLoading,
    }),
  },
  computed: {
    ...mapGetters(["listLessonsGroups", "listLessonsKanban"]),
    isLoading() {
      return !this.listLessonsGroups.groupsCount;
    },
  },
});
</script>
