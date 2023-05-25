<template>
    <f7-page
    no-toolbar
    no-swipeback
    ptr @ptr:refresh="handleRefreshPage"
    class="bg-pages page-news"
    >
      <f7-navbar class="navbar-news">
        <f7-nav-left>
          <f7-block>
          <h4 class="leading-none font-display">¿Qué hay de nuevo?</h4>
        </f7-block>
        </f7-nav-left>
        <f7-nav-right>
          <f7-link
            icon-size="24"
            icon="fa-regular fa-xmark"
            icon-only
            back
            class="z-10 flex items-center justify-center mx-auto"
          >
          </f7-link>
        </f7-nav-right>
      </f7-navbar>
      <list-news />
    </f7-page>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from "vue";
import { getNews } from "@/composables/useAppFunctions";
import VueLoading from "vue-loading-overlay";
import { mapState } from "vuex";
import { f7 } from "framework7-vue";

export default defineComponent({
  name: "page-news",
  setup() {
    const handleRefreshPage = async (done: () => void) => {
      try {
        f7.dialog.preloader("Actualizando contenidos...");
        await getNews();
        done();
      } catch (error) {
        console.log(error);
      }
    };
    return {
      handleRefreshPage,
    };
  },
  // async mounted() {
  //   await getNews();
  // },
  props: [],
  components: {
    listNews: defineAsyncComponent({
      loader: () => import("@components/news/listNews.component.vue"),
      loadingComponent: VueLoading,
    }),
  },
  mounted() {
    this.handleRefreshPage;
  },
  computed: {
    ...mapState(["user"]),
  },
});
</script>
