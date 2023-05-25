<template>
    <f7-page
    no-toolbar
    no-swipeback
    class="bg-pages"
    >
      <f7-navbar>
        <f7-nav-left>
          <f7-block>
          <h4 class="leading-none font-display">Conociendo todos los rangos</h4>
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
      <f7-block>
      <list-ranges />
      </f7-block>
    </f7-page>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from "vue";
import VueLoading from "vue-loading-overlay";
import { mapState } from "vuex";

export default defineComponent({
  name: "page-user-ranges",
  props: [],
  components: {
    listRanges: defineAsyncComponent({
      loader: () => import("@components/ranges/listRanges.component.vue"),
      loadingComponent: VueLoading,
    }),
  },
  computed: {
    ...mapState(["user"]),
  },
});
</script>
