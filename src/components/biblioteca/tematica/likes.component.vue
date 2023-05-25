<template>
  <div v-if="isOk" class="flex items-center justify-start px-4">
    <div
      v-if="animateLottie"
      class="fixed inset-0 min-h-screen min-w-screen"
      style="z-index: 9998"
    >
      <lottie-player
        autoplay
        speed="1.8"
        mode="normal"
        :src="animateLoading"
        class="w-full h-full"
      />
    </div>
    <div v-if="isLiked" class="w-8">
      <a
        class="relative"
        title="Te gusta esta temática"
        @click.prevent="clickLike ? '' : unLikeTematica(tematicaId)"
      >
        <span
          class="heart"
          :class="[{ actived: isLiked && !isUnliked }]"
        ></span>
      </a>
    </div>
    <div v-else class="relative w-8">
      <a
        class="relative"
        title="Has click para indicar que te gusta"
        @click.prevent="clickLike ? '' : addLikeTematica(tematicaId)"
      >
        <span class="heart" :class="{ 'is-active': heartAnimation }"></span>
      </a>
    </div>
    <transition name="scale-down" mode="out-in">
      <div class="text-base text-white font-display" :key="likesCount">
        {{ $filters.numberAbreviate(likesCount) }}
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { axiosApiInstance } from "@/js/axios";
import store from "@/store/store";
import animateLoading from "@/assets/animations/81755-hearts-feedback.json";
import { mapState } from "vuex";

export default defineComponent({
  props: ["tematicaId", "cantidadlikes"],
  components: {},
  data() {
    return {
      animateLoading,
      likesCount: 0,
      isOk: false,
      clickLike: false,
      heartAnimation: false,
      isUnliked: false,
      animateLottie: false,
    };
  },

  mounted: function () {
    const vm = this;
    vm.likesCount = vm.cantidadlikes;
    vm.isOk = true;
  },

  updated: function () {},

  methods: {
    addLikeTematica(tematica_id: number) {
      const vm = this;
      vm.appSounds.tapClick2.play();
      vm.clickLike = true;
      vm.heartAnimation = true;
      vm.isUnliked = false;
      axiosApiInstance({
        method: "post",
        url: "/api/auth/students/v3/user/library/lessons/like",
        data: {
          tematica_id: tematica_id,
        },
      })
        .then((response) => {
          console.log(response);
          vm.animateLottie = true;
          setTimeout(function () {
            vm.heartAnimation = false;
            vm.animateLottie = false;
          }, 5000);
          store.state.userLessonsLikes = response.data.tematicasLikes;
          vm.clickLike = false;
          vm.likesCount++;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    unLikeTematica(tematica_id: number) {
      const vm = this;
      vm.appSounds.tapClick2.play();
      vm.clickLike = true;
      vm.heartAnimation = false;
      vm.animateLottie = false;
      vm.isUnliked = true;
      axiosApiInstance({
        method: "post",
        url: "/api/auth/students/v3/user/library/lessons/dislike",
        data: {
          tematica_id: tematica_id,
        },
      })
        .then((response) => {
          console.log(response);
          vm.$store.state.userLessonsLikes = response.data.tematicasLikes;
          vm.likesCount--;
          vm.clickLike = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  computed: {
    ...mapState(["appSounds"]),
    isLiked() {
      const vm = this;
      let likesArray = store.state.userLessonsLikes;
      return likesArray.includes(vm.tematicaId);
    },
  },
});
</script>
<style lang="postcss">
.heart {
  @apply absolute left-0 inset-y-0;
  width: 65px;
  height: 65px;
  transform: translate(-20px, -34px);
  background: url("/assets/images/web_heart_animation.png") no-repeat;
  background-position: 0 0;
  cursor: pointer;
  transition: background-position 1s steps(28);
  transition-duration: 0s;

  &.actived {
    background-position: -1820px 0;
  }
  &.is-active {
    transition-duration: 1s;
    background-position: -1820px 0;
  }
}
</style>
