<template>
    <img v-if="!store.state.user.user_avatar" class="relative img-rounded" src="https://res.cloudinary.com/admsys-storage/image/upload/smarteducation/masterbrain/civicamente-app/app-files/static/loader.gif" alt="Avatar" />
    <div v-else class="rounded-full">
    <transition name="slide-fade-top" mode="out-in">
      <img :key="store.state.user.user_avatar" class="rounded-full lazy lazy-fade-in" :src="this.store.state.user.user_avatar" alt="Avatar" />
    </transition>
    <div class="w-1/3 absolute right-0 bottom-0 bg-gray-50 p-0.5 lg:p-1 rounded-full overflow-hidden" v-show="showCountry">
      <transition name="slide-fade" mode="out-in">
      <img :src="
          'https://res.cloudinary.com/admsys-storage/image/upload/f_auto,q_auto:best/smarteducation/masterbrain/civicamente-app/app-files/flags-v2/' +
            store.state.user.pais.filename"
            alt=""
            class="w-full"
            :key="store.state.user.pais.filename"
      />
      </transition>
    </div>
    </div>
</template>
<script lang="ts">
import { useStore } from "@/store/store";
import { defineComponent } from "vue";

export default defineComponent({
  name:'global-alumno-avatar',
  props:{
    showCountry: {
      type: Boolean,
      default: true
    },
  },
  setup() {
    const store = useStore();
    return {
      store
    }
  },
})
</script>
