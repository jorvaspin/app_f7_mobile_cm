<template>
<div class="grid grid-cols-1 place-content-center" style="--f7-card-expandable-margin-vertical:10px">
<f7-card backdrop class="card-news" expandable v-for="item in listAppNews" :key="item.uuid">
  <f7-card-content :padding="false">
    <div :style="`background: url('${item.image_main}') no-repeat center; background-size: cover; height: 10rem;`" class="relative">
      <f7-link @click.prevent="tapClick()" card-close color="white" class="absolute p-1 text-black bg-white rounded-full bg-opacity-70 right-3 top-8 lg:right-5 lg:top-5 card-opened-fade-in" icon-f7="fa-regular fa-xmark"></f7-link>
    </div>
    <f7-card-header>
        <div class="flex flex-col items-start justify-start leading-none">
          <div class="flex items-center justify-start w-full gap-3 mb-2">
          <span v-if="isNew(item.created_at)" class="inline-flex"><badge-chromatic>Nuevo</badge-chromatic></span>
          <span class="text-xs opacity-80">{{ $dayjs(item.created_at).fromNow() }}</span>
          </div>
          <h4>
            <span>{{ item.title }}</span>
          </h4>
          <span class="card-text-preview" v-text="item.short_description"></span>
        </div>
      </f7-card-header>
    <div class="card-content-padding">
      <div class="prose prose-img:rounded prose-img:shadow prose-img:p-2 prose-img:rotate-1 lg:prose-img:mx-auto prose-table:table-auto prose-table:border-collapse dark:prose-invert prose-blue lg:prose-md" v-html="item.description"></div>
      <button @click="tapClick()" class="flex justify-center w-48 mx-auto my-10 text-center btn btn-default card-close" >Cerrar ventana</button>
    </div>
  </f7-card-content>
</f7-card>
</div>
<vue-loading
  :active="!listAppNews.length"
  color="#fff"
  background-color="#222"
  :blur="'40px'"
  :opacity="0.8"
/>
</template>
<script lang="ts">
import { defineComponent } from "vue";
// import { VueReactionEmoji } from "vue-feedback-reaction";
import { mapGetters, mapState } from "vuex";
import dayjs from '@/js/plugins/daysjs';

export default defineComponent({
  components: {
    // VueReactionEmoji,
  },
  data() {
    return {
      feedbackUser: null
    }
  },
  mounted() {
  },
  methods: {
    isNew(value: Date){
      let diff = dayjs().diff(dayjs(value), 'day');
      return (diff > 14) ? false : true;
    }
  },
  computed: {
    ...mapState(["user"]),
    ...mapGetters(['listAppNews']),
  },
});
</script>
