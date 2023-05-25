
<template>
<f7-list class="my-0 apps-table-list" noChevron no-hairlines >
  <f7-list-item
  :link="`/biblioteca/tematica/${element.slug}/`"
    v-for="element in elements"
    v-bind:key="element.id"
    :routeProps="{ backText }"
    >
    <!-- <tematica-web-card-small
                  :page="'completadas'"
                  :sectionName="'Biblioteca'"
                  :tematica="element"
                  ></tematica-web-card-small> -->
      <div class="apps-table-list-title font-display" slot="title">{{element.value}}</div>
      <div class="apps-table-list-subtitle item-text" slot="title">{{element.breve_descripcion}}</div>
      <img loading="lazy"
        class="mx-auto rounded apps-table-list-image" slot="media"
        :src="element.imagen_portada" :alt="element.title" />
      <!-- <div class="apps-table-list-button" slot="inner">
        <button class="btn btn-primary" type="button" round>Iniciar</button>
      </div> -->
  </f7-list-item>
</f7-list>
</template>
<script>
export default {
  name: 'tematica-table-list',
  props: {
    elements: { type: Array, required: false },
    backText: { type: String, required: false, default: '' },
    page: { type: String, required: false, default: 'biblioteca' },
    sectionName: { type: String, required: false, default: 'Biblioteca' },

  },
};
</script>
<style lang="scss">
.apps-table-list {
  --f7-list-bg-color: transparent;
  --f7-list-item-title-white-space: normal;
  --f7-list-item-text-max-lines: 1;
  --f7-list-item-text-font-size: 13px;
  --f7-list-link-pressed-bg-color: transparent;
  --f7-list-item-title-line-height: 1.2;
  .item-content .item-inner {
    padding-right: 0;
  }
  .item-content {
    padding-left: 0px;
  }
  ul {
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-content: flex-start;
    height: 234px;
    flex-wrap: wrap;
    overflow: auto;
    padding-left: calc(var(--f7-safe-area-left) + var(--f7-list-item-padding-horizontal));
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
      opacity: 0;
    }
    @media (min-width: 768px) {
      scroll-padding-left: calc(20px + var(--f7-safe-area-left));
    }
  }
  li {
    width: calc(100% - 40px);
    max-width: 365px;
    margin-right: 20px;
    scroll-snap-align: center center;
    @media (min-width: 768px) {
      margin-right: 24px;
      scroll-snap-align: start start;
    }
    &:nth-child(3n) .item-inner:after {
      display: none;
    }
  }
  &.list ul:after {
    content: '' !important;
    width: calc(var(--f7-safe-area-right) + var(--f7-list-item-padding-horizontal));
    height: 1px;
    display: block !important;
    position: static;
    transform: none;
    height: calc(78px * 3px);
    background: transparent;
  }
  &-title {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &-image {
    width: 50px;
    height: 62px;
    // border-radius: 21%;
    background: #ccc;
  }
  &-button {
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: var(--f7-list-item-padding-horizontal);
    --f7-button-bg-color: rgba(0,0,0,0.07);
    --f7-button-pressed-bg-color: rgba(0,0,0,0.4);
    .theme-dark & {
      --f7-button-bg-color: rgba(255,255,255,0.11);
      --f7-button-pressed-bg-color: rgba(255,255,255,0.075);
    }
    span {
      margin-top: 4px;
      font-size: 8px;
      display: block;
      color: var(--f7-list-item-text-text-color);
    }
  }
}
</style>
