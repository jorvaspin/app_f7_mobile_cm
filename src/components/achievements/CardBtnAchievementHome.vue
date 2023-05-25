<template>
  <f7-link
    @click.prevent="tapClick()"
    href="/achievements/"
    no-link-class
    class="card-achievement lg:grid lg:grid-cols-2 lg:gap-4 group"
  >
    <div
      class="relative px-4 pt-6 pb-14 md:pb-6 sm:pt-14 sm:px-10 lg:py-10 lg:pr-0 xl:py-20 xl:px-20"
    >
      <div class="">
          <div class="flex items-center">
            <div class="flex-shrink">
              <span
              class="inline-block mb-1 text-base text-white uppercase font-display md:text-xl opacity-60"
              >Descubre y gana</span
              >
              <h2
              class="text-4xl leading-none text-white uppercase drop-shadow font-display sm:text-6xl"
              >
              Logros y recompensas
              </h2>
            </div>
          <span class="flex-shrink-0 w-20 md:w-44">
            <img
            :src="imgAchievements"
            class="w-20 h-20 mx-auto md:w-30 md:h-30 lg:w-40 lg:h-40"
            alt=""
            />
          </span>
          </div>

          <div
            class="relative z-20 flex flex-col mt-2 mb-16 text-sm font-medium leading-4 text-white md:pr-5 lg:pr-2 md:leading-6 lg:leading-6 sm:text-xl lg:text-xl"
          >
            Accede a recompensas exclusivas creadas para ti, incluso si no
            formas parte del cuadro de honor.
            <div class="hidden mt-5 md:inline-block">
              <f7-link
                @click.prevent="tapClick()"
                href="/achievements/"
                no-link-class
                class="w-auto md:w-96 btn btn-primary md:btn-lg"
                >Conoce los logros y recompensas
                <i class="ml-3 fa-regular fa-chevron-right"></i
              ></f7-link>
            </div>
          </div>
      </div>
    </div>
    <div
      class="relative mr-0 overflow-hidden md:-mr-8 lg:-mr-0 -mt-36 aspect-w-4 aspect-h-3 md:aspect-w-5 md:-mt-48 md:aspect-h-2 lg:-mt-4"
    >
      <img
        class="object-contain object-center overflow-hidden transform translate-y-8 rounded-md md:object-right lg:object-bottom sm:translate-x-2 md:translate-y-2 lg:translate-y-2"
        :src="selected_bg"
        alt="Child winner"
      />
    </div>
  </f7-link>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import imgAchievements from '@assets/images/achievements/300-achievements.png';
import imgBg1 from '@assets/images/achievements/bg-dashboard-2022-1.png';
import imgBg2 from '@assets/images/achievements/bg-dashboard-2022-2.png';
import imgBg3 from '@assets/images/achievements/bg-dashboard-2022-3.png';

export default defineComponent({
  name: "card-achievement-home",
  data() {
    return {
        imgAchievements,
      bg_card_achievement: [
        imgBg1,
        imgBg2,
        imgBg3,
      ],
      selected_bg:'',
    };
  },
  created() {
      this.randomImage();
  },
  methods: {
    randomImage() {
        this.selected_bg = this.bg_card_achievement[
        Math.floor(Math.random() * this.bg_card_achievement.length)
      ];
    },
  },
});
</script>