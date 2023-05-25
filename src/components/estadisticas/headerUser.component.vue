<template>
  <div
    class="relative flex flex-none bg-gray-900 bg-center bg-no-repeat bg-cover border-0 xl:h-32 bg-opacity-10 lg:pt-20 xl:pt-0"
    :style="
      userTheme != null
        ? 'background: url(' + userTheme.background.navbar + ');background-size: cover;'
        : 'background: url(https://res.cloudinary.com/admsys-storage/image/upload/v1614810211/smarteducation/masterbrain/civicamente-v2/backgrounds/background-login.jpg)'
    "
  >
    <div class="w-full">
      <div
        class="absolute z-10 hidden w-24 p-1 rounded-full shadow-lg lg:flex top-3 xl:top-auto xl:bottom-5 left-5 xl:left-16 bg-gray-50"
      >
        <user-avatar></user-avatar>
      </div>
      <div
        class="absolute hidden py-2 text-white lg:flex top-5 xl:top-auto xl:bottom-16 left-32 xl:left-52 font-display"
      >
        <h3 class="text-xl leading-none xl:text-2xl xl:leading-tight">
          {{ userName }}, estas son tus estadísticas...
        </h3>
      </div>
      <stats-bar
        class="relative px-4 pt-6 pb-6 lg:pt-14 xl:pt-0 xl:pb-0 xl:px-0 xl:absolute xl:left-0 xl:bottom-0 xl:h-16 xl:pl-52 xl:border-t xl:border-gray-50 xl:border-opacity-10"
      ></stats-bar>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import statsBar from "@components/user/statsBar.component.vue";
import { useStore } from "@/store/store";
export default defineComponent({
  name: "headerUser",
  setup() {
    const store = useStore();
    return {
      userTheme: computed(() => store.state.temaActivo),
      userName: computed(() => store.state.user.name),
    };
  },
  components: {
    statsBar,
  },
});
</script>
