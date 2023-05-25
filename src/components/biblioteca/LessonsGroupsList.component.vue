<template>
  <f7-block class="pt-1 pb-3 featured-groups">
    <f7-link
      @click="tapClick()"
      no-link-class
      class="ripple card-box card-lessons-group featured-group"
      v-for="element in elements"
      :key="element.id"
      :href="`/biblioteca/groups/${element.id}/`"
    >
      <div class="relative w-full overflow-hidden rounded-t h-36 md:h-40">
        <div class="absolute inset-0">
          <span class="absolute z-20 w-auto bottom-2 right-2"
            ><badge-warning
              >{{ element.lessonsCount }} temáticas disponibles</badge-warning
            ></span
          >
          <div
            class="absolute inset-0 z-10 bg-indigo-400 opacity-50 mix-blend-multiply"
          ></div>
          <img
            class="object-cover w-full h-full"
            loading="lazy"
            :src="element.app_banner"
            :alt="element.nombre"
          />
        </div>
      </div>
      <div class="px-5 py-5">
        <h3 class="w-full text-lg font-bold tracking-tight truncate md:text-lg">
          {{ element.nombre }}
        </h3>
        <div
          class="text-sm leading-tight opacity-60 dark:opacity-80 line-clamp-2"
        >
          {{ element.short_description }}
        </div>
      </div>
    </f7-link>
  </f7-block>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "lessons-groups",
  props: {
    elements: { type: Array, required: false },
    useIcon: {
      type: Boolean,
      required: false,
      default: false,
    },
    backText: {
      type: String,
      require: false,
      default: "Atrás",
    },
    page: { type: String, required: false, default: "biblioteca" },
    sectionName: { type: String, required: false, default: "Biblioteca" },
  },
});
</script>

<style lang="postcss">
.featured-groups {
  overflow: auto;
  display: flex;
  gap:8px;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  margin-top: 0;
  &::-webkit-scrollbar {
    display: none;
    opacity: 0;
  }
  &::after {
    content: "";
    width: calc(var(--f7-block-padding-horizontal) + var(--f7-safe-area-right));
    height: 1px;
    flex-shrink: 0;
  }
  @media (min-width: 768px) {
    scroll-padding-left: calc(20px + var(--f7-safe-area-left));
  }
}
.featured-group {
  flex-shrink: 0;
  width: calc(100% - 15px);
  scroll-snap-align: center center;
  position: relative;
  @media (min-width: 768px) {
    width: calc(50% - 15px);
    margin-right: 10px;
    scroll-snap-align: start start;
  }
  @media (min-width: 1024px) {
    width: calc(45d% - 15px);
  }
  > a {
    color: inherit;
  }
  &-headline {
    text-transform: uppercase;
    color: var(--f7-theme-color);
    font-size: 11px;
    font-weight: 500;
  }
}
</style>
