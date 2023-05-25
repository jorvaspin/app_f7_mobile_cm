<template>
  <div class="relative lessons-flex-cards">
    <span
      class="absolute inset-y-0 right-0 z-20 block w-6 h-full my-0 bg-gradient-to-l from-palette-light-bg dark:from-palette-dark-bg"
    ></span>
    <ul>
      <li
        v-for="(lesson, index) in elements"
        v-bind:key="`${lesson.id}-${index}`"
      >
        <tematica-web-card-small
          :tematica="lesson"
          :number-mini="true"
          :page="page"
          :sectionName="sectionName"
          :showStats="showStats"
        ></tematica-web-card-small>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { defineAsyncComponent, defineComponent } from "vue";
export default defineComponent({
  name: "lessons-table-list",
  props: {
    elements: { type: Array, required: true },
    showStats: { type: Boolean, required: false, default: false },
    page: { type: String, required: false, default: "biblioteca" },
    sectionName: { type: String, required: false, default: "Biblioteca" },
  },
  components: {
    TematicaWebCardSmall: defineAsyncComponent(
      () => import("./lesson-card-small.component.vue")
    ),
  },
});
</script>
<style lang="less">
.lessons-flex-cards {
  ul {
    flex-grow: 0;
    display: flex;
    flex-direction: column;
    align-content: flex-start;
    gap: 8px;
    height: (96px * 3) + (8px * 3);
    flex-wrap: wrap;
    overflow-y: visible;
    overflow-x: auto;
    padding-left: calc(
      var(--f7-safe-area-left) + var(--f7-list-item-padding-horizontal)
    );
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
      opacity: 0;
    }
    &::after {
      content: "";
      width: calc(
        var(--f7-block-padding-horizontal) + var(--f7-safe-area-right)
      );
      height: 1px;
      height: (96px * 3) + (8px * 3);
      flex-shrink: 0;
    }
    @media (min-width: 768px) {
      scroll-padding-left: calc(20px + var(--f7-safe-area-left));
      height: (96px * 2) + (8px * 2);

      &::after {
        height: (96px * 2) + (8px * 2);
      }
    }
    @media (min-width: 1024px) {
      scroll-padding-left: calc(20px + var(--f7-safe-area-left));
      height: (112px * 2) + (8px * 2);

      &::after {
        height: (112px * 2) + (8px * 2);
      }
    }
  }
  li {
    width: calc(100% - 30px);
    scroll-snap-align: center center;
    scroll-snap-stop: always;
    @media (min-width: 768px) {
      width: calc(50% - 20px);
      scroll-snap-align: start start;
    }
    @media (min-width: 1024px) {
      width: calc(33.33% - 20px);
      scroll-snap-align: start start;
    }
  }
}
</style>