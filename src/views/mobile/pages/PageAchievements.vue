<template>
  <f7-page no-toolbar no-swipeback class="bg-pages">
    <f7-navbar title="Todos los logros y recompensas" back-link>
      <f7-nav-right>
        <f7-link class="flex justify-center w-8" @click="openActions"
          ><i
            class="text-white fa-regular fa-info-circle dark:text-primary-100"
          ></i
        ></f7-link>
      </f7-nav-right>
    </f7-navbar>
    <f7-block class="container">
      <div class="relative flex flex-col flex-nowrap">
        <div class="flex items-center gap-3 mb-5 sm:gap-5">
          <span class="flex justify-center flex-shrink-0 w-20 md:w-36">
            <img
              src="/assets/images/achievements/300-achievements.png"
              class="w-20 h-20 mx-auto md:w-30 md:h-30"
              alt=""
            />
          </span>
          <div class="flex-1">
            <h3
              class="text-lg leading-none text-red-600 uppercase md:text-3xl dark:text-white font-display"
            >
              Logros y recompensas visibles y disponibles
            </h3>
            <div
              class="text-xs leading-none sm:text-lg sm:leading-tight lg:text-xl"
            >
              Existen logros ocultos que solo conocerás en el momento que los
              desbloquees.
            </div>
          </div>
        </div>
      </div>
    </f7-block>
    <list-achievements></list-achievements>
  </f7-page>
</template>
<script lang="ts">
import { f7 } from "framework7-vue";
import { defineAsyncComponent, defineComponent } from "vue";
import VueLoading from "vue-loading-overlay";

export default defineComponent({
  name: "page-achievements",
  components: {
    ListAchievements: defineAsyncComponent({
      loader: () =>
        import("@components/achievements/listAchievements.component.vue"),
      loadingComponent: VueLoading,
    }),
  },
  methods: {
    openActions() {
      const self = this;
      if (!self.actionsToPopover) {
        self.actionsToPopover = f7.actions.create({
          buttons: [
            [
              {
                text: "Encontrarás muchos y únicos logros que podrás desbloquear para obtener recompensas por diferentes motivos.",
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