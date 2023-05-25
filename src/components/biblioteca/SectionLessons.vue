<template>
  <div class="relative section-lesson">
    <!-- <vue-loading
      :active="isLoading"
      color="#42424f"
      :blur="'40px'"
      :width="30"
      :height="30"
      :opacity="0"
      :is-full-page="false"
    /> -->
    <div class="relative py-4" v-if="!isLoading">
      <f7-block>
        <div class="relative mb-2">
          <div class="absolute inset-0 flex items-center" aria-hidden="true">
            <div
              class="w-full border-t-2 border-gray-300 dark:border-gray-800"
            ></div>
          </div>
          <div class="relative flex items-center justify-between lesson-header">
            <span class="pr-3 text-lg font-display bg-pages">
              {{ title }}
            </span>
            <span
              class="lesson-link"
              v-if="
                listLessons.lessonsCount > numberOfElements || forceViewLink
              "
            >
              <f7-link
                no-link-class
                @click="tapClick()"
                :routeProps="{ backText }"
                :href="href"
                class="view-more"
                fill
                small
                round
                >{{ viewLinkText }}
                <span class="fa-regular fa-chevron-right"></span
              ></f7-link>
            </span>
          </div>
        </div>
        <div class="lesson-description" v-html="description"></div>
      </f7-block>
      <LessonsRowsList
        :showStats="showStats"
        :elements="
          listLessons.lessonsCount > numberOfElements
            ? listLessons.lessons.slice(0, numberOfElements)
            : listLessons.lessons
        "
      />
    </div>
    <div v-if="isLoading && lessons.lessonsCount === null" class="py-3">
        <f7-block>
            <f7-skeleton-block
                class="w-3/4 h-5 rounded skeleton-effect-blink"
              ></f7-skeleton-block>
        </f7-block>

        <f7-list media-list class="my-2">
            <f7-list-item
                v-for="n in 3"
                :key="n"
                class="skeleton-text skeleton-effect-blink"
                title="Full Name"
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis et massa ac interdum. Cras consequat felis at consequat hendrerit. Aliquam vestibulum vitae lorem ac iaculis."
            >
                <template #media>
                <f7-skeleton-block
                    style="width: 50px; height: 70px; border-radius: 10%"
                ></f7-skeleton-block>
                </template>
            </f7-list-item>
        </f7-list>
    </div>
  </div>
</template>
<script lang="ts">
import { defineAsyncComponent, defineComponent } from "vue";
import VueLoading from "vue-loading-overlay";

export default defineComponent({
  name: "section-lessons",
  props: {
    title: { type: String, required: false, default: "Sección" },
    description: { type: String, required: false, default: "Contenido" },
    href: { type: String, required: false, default: "/" },
    lessons: { type: Object, required: false, default: null },
    numberOfElements: { type: Number, required: false, default: 6 },
    viewLinkText: { type: String, required: false, default: "Todas" },
    forceViewLink: { type: Boolean, required: false, default: false },
    showStats: { type: Boolean, required: false, default: false },
    page: { type: String, required: false, default: "biblioteca" },
    backText: { type: String, required: false, default: "Biblioteca" },
    sectionName: { type: String, required: false, default: "Biblioteca" },
  },
  components: {
    LessonsRowsList: defineAsyncComponent({
      loader: () =>
        import("@/components/biblioteca/LessonsRowsList.component.vue"),
      loadingComponent: VueLoading,
    }),
  },
  computed: {
    listLessons() {
      return this.lessons;
    },

    isLoading() {
      return !this.lessons.lessonsCount;
    },
  },
});
</script>
