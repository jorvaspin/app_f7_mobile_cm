<template>
  <f7-navbar no-shadow no-hairline>
    <f7-nav-left>
      <img
        :src="imgBrand"
        class="w-24 h-10 mx-auto"
      />
    </f7-nav-left>
    <f7-nav-title><span class="sr-only">Civicamente</span></f7-nav-title>
    <f7-nav-right>
      <f7-link
        href="/notifications/"
        class="relative flex items-center mx-auto mr-5 group hover:opacity-100"
        :class="{ 'opacity-40': listNotifications.unread === 0}"
      >
        <span class="sr-only">Open notifications menu</span>
        <transition name="bounce" mode="out-in">
          <span
            class="absolute right-0 z-10 flex items-center justify-center w-4 h-4 text-xs text-white rounded-full font-display top-2 bg-gradient-to-br from-red-400 to-rose-600"
            v-if="listNotifications.unread > 0"
            :key="'notificaciones' + listNotifications.unread"
          >
            <span
              class="absolute inline-flex w-full h-full duration-700 delay-700 bg-red-400 rounded-full opacity-75 motion-safe:animate-ping"
            ></span>
            <span class="relative m-0" style="margin-left: 0">{{
              listNotifications.unread
            }}</span>
          </span>
        </transition>
        <span
          v-if="listNotifications.unread > 0"
          class="z-0 transition-transform transform -rotate-12"
        >
          <span class="fa-lg fa-regular fa-bell-on"></span>
        </span>
        <span v-else>
          <span class="fa-lg fa-regular fa-bell"></span>
        </span>
      </f7-link>
    </f7-nav-right>
  </f7-navbar>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import imgBrand from '@assets/images/civicamente-2021-apaisado.svg';
export default defineComponent({
  name: "appBar",
  props: ["titleNav"],
  data() {
    return {
      imgBrand
    }
  },
  computed: {
    ...mapGetters(["listNotifications"]),
  },
});
</script>
<style lang="scss" scoped>
.avatar-menu {
  border-radius: 50%;
  background-color: white;
  width: 4rem;
  height: 4rem;
  position: relative;

  .img-avatar {
    padding: 0.2rem;
    border-radius: 50%;

    img {
      width: 100%;
    }
  }
}
</style>
