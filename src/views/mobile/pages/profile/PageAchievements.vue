<template>
  <f7-page
    name="user-achievements-page"
    hide-navbar-on-scroll
    no-toolbar
    class="bg-pages"
    ptr
    @ptr:refresh="refreshContentPage"
  >
    <f7-navbar
      title="Mis logros y recompensas"
      back-link
    >
    <f7-nav-right>
        <f7-link class="flex justify-center w-8" @click="openActions"><i class="text-white fa-regular fa-info-circle dark:text-primary-100"></i></f7-link>
      </f7-nav-right>
    </f7-navbar>
    <f7-block>
      <f7-block-title>Mis logros y recompensas</f7-block-title>
      <f7-block-footer class="leading-none">Volver a ver mis logros desbloqueados hasta la fecha sus recompensas obtenidas.</f7-block-footer>
      <list-achievements />
    </f7-block>
  </f7-page>
</template>

<script lang="ts">
import { f7 } from "framework7-vue";
import { defineComponent, defineAsyncComponent } from "vue";
import VueLoading from "vue-loading-overlay";

export default defineComponent({
  name:'user-achievements-page',
  props: [],
  components: {
    ListAchievements: defineAsyncComponent({
      loader: () => import("@components/user/listAchievements.component.vue"),
      loadingComponent: VueLoading,
    }),
  },
  data() {
    return {
      options: {
        wheelPropagation: false,
        suppressScrollX: true,
        suppressScrollY: false,
      }
    };
  },
  mounted() {},
  created: function () {},
  updated: function () {},
  methods: {
    refreshContentPage: function(){
      return true
    },
    openActions() {
      const self = this;
      if (!self.actionsToPopover) {
        self.actionsToPopover = f7.actions.create({
          buttons: [
            [
              {
                text: "Listamos todos tus logros desbloqueados y recompensas obtenidas.",
                label: true,
              },
              {
                text: "Más información",
                color: "blue",
                onClick: function () {
              }
              },
            ],
            [
              {
                text: "Cancelar",
                color: "blue",
              },
            ],
          ],
        });
      }

      // Open
      self.actionsToPopover.open();
    },
  },
  on: {
    pageBeforeRemove() {
      const self = this;
      if (self.actionsToPopover) {
        self.actionsToPopover.destroy();
      }
    },
  },
});
</script>

<style>
</style>
