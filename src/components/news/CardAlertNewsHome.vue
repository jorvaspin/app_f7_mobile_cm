<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import announcementIcon from '@assets/images/announcement-icon.svg';

export default defineComponent({
  data() {
    return {
      announcementIcon
    }
  },
  computed: {
    ...mapGetters(['listAppNews']),
  },
});
</script>
<template>
<transition name="fadeUp" mode="in-out">
  <div v-show="listAppNews.length" :key="listAppNews.length">
    <f7-link
      no-link-class
      @click="tapClick()"
      href="/news/"
      class="btn-news"
    >
    <div class="w-10 shrink-0">
      <span class="flex items-center justify-center bg-white bg-opacity-50 rounded-full w-11 h-11">
      <img :src="announcementIcon" class="w-8" alt="Announcements Civicamente" />
      </span>
    </div>
      <div class="grow">
        <h3 class="text-xl uppercase text-news-100 font-display dark:text-white dark:drop-shadow">Civi-Novedades</h3>
        <span class="text-xs opacity-70 dark:opacity-100">Ingresa a nuestra sección de novedades y entérate de lo que está pasando.</span>
      </div>
      <span class="w-4 shrink-0 text-news-100 dark:text-white">
        <i class="fa-regular fa-lg fa-chevron-right"></i>
      </span>
    </f7-link>
  </div>
</transition>
</template>