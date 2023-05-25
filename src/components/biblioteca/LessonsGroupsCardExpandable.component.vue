<template>
  <div class="featured-groups">
    <div class="featured-group" v-for="element in elements" :key="element.id">
      <f7-card expandable class="">
        <f7-card-content :padding="false">
          <div class="shadow-lg bg-color-blue shadow-indigo-700/40" :style="{ height: '300px' }" >
            <f7-card-header text-color="white">
              <h3 class="font-display">{{ element.nombre }}</h3>
              <p class="text-sm font-normal text-opacity-60">{{ element.short_description }}</p>
            </f7-card-header>
            <f7-link
              card-close
              color="white"
              class="card-opened-fade-in"
              :style="{ position: 'absolute', right: '15px', top: '15px' }"
              icon-f7="xmark_circle_fill"
            ></f7-link>
          </div>
          <div class="card-content-padding">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam
              dolor mollitia quam ratione reiciendis ducimus eius natus, alias
              neque, voluptatibus perferendis eaque voluptas repudiandae tenetur
              voluptatum porro sit, similique cumque.
            </p>
            <hr />
            <f7-block-title>Songs</f7-block-title>
            <f7-list media-list>
              <f7-list-item
                link="#"
                title="Yellow Submarine"
                after="$15"
                subtitle="Beatles"
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
              >
                <template #media>
                  <img
                    src="https://cdn.framework7.io/placeholder/people-160x160-1.jpg"
                    width="80"
                  />
                </template>
              </f7-list-item>
            </f7-list>
          </div>
        </f7-card-content>
      </f7-card>
    </div>
  </div>
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

<style lang="less">
:root{
    --f7-card-expandable-margin-horizontal:0;
    --f7-card-expandable-margin-vertical:0;
    --f7-card-header-padding-vertical:40px;
    --f7-card-expandable-border-radius:5px;
    --f7-card-expandable-box-shadow:none;

}
.featured-groups {
  overflow: auto;
  display: flex;
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

card-expandable {
    overflow: hidden;
    height: 300px;
    background: var(--f7-card-expandable-bg-color);
    position: relative;
    transform-origin: center center;
    transition-property: transform, border-radius;
    border-radius: var(--f7-card-expandable-border-radius);
    z-index: 2;
    transition-duration: 200ms;
    margin-left: calc(var(--f7-card-expandable-margin-horizontal) + var(--f7-safe-area-left));
    margin-right: calc(var(--f7-card-expandable-margin-horizontal) + var(--f7-safe-area-right));
    margin-top: var(--f7-card-expandable-margin-vertical);
    margin-bottom: var(--f7-card-expandable-margin-vertical);
    box-shadow: var(--f7-card-expandable-box-shadow);
    font-size: var(--f7-card-expandable-font-size);
}

.featured-group {
  flex-shrink: 0;
  width: 100%;
  max-width: 350px;
  scroll-snap-align: center center;
  padding: 5px 0px 0px;
  position: relative;
  margin-right: 10px;
  @media (min-width: 768px) {
    margin-right: 24px;
    scroll-snap-align: start start;
  }
  > a {
    color: inherit;
  }
  .card-header{
      flex-direction: column;
      align-items: flex-start;
  }
  &-headline {
    text-transform: uppercase;
    color: var(--f7-theme-color);
    font-size: 11px;
    font-weight: 500;
  }
  &-title {
    font-size: 21px;
    line-height: 1.25;
  }
  &-subtitle {
    opacity: 0.54;
    font-size: 1rem;
    &:after {
      content: " ";
      display: inline-block;
    }
  }
  &-image {
    width: 100%;
    margin-top: 5px;
    height: 220px;
    border-radius: 5px;
    background: #ccc;
    object-fit: cover;
  }
}
</style>