<template>
  <f7-page no-toolbar no-swipeback class="bg-pages">
    <template #fixed>
      <f7-navbar>
        <f7-nav-left>
          <f7-block>
            <h4 class="leading-none font-display">Notificaciones</h4>
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
    </template>
    <div
      class="fixed inset-x-0 bottom-0 z-10 h-16 bg-gradient-to-t from-white dark:from-dark"
    ></div>
    <list-notifications />
  </f7-page>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import listNotifications from "@components/navbar/listNotifications.component.vue";

export default defineComponent({
  components: {
    listNotifications,
  },
});
</script>
