<template>
<div>
  <f7-swiper
    class="tematicas-swiper-biblioteca h-auto pb-6"
    pagination
    navigation
  >
    <f7-swiper-slide
      v-for="(tematica, index) in $store.state.lessonsKanban"
      :key="index"
    >
      <tematica-web-card
        :tematica="tematica"
        :sectionName="'Biblioteca'"
        :page="'Biblioteca'"
      ></tematica-web-card>
    </f7-swiper-slide>
  </f7-swiper>

</div>
</template>

<script>

export default {
    name:'userTematicasKanban',
    mounted() {
        const vm = this;
        // vm.loadPage();
    },
    methods: {

    },
};
</script>

<style lang="scss" scope>
// .tematicas-swiper-biblioteca {
//   margin: 0 0 2rem 0;
//   min-height: 16rem;
//   padding: 0 5rem;
//   padding-bottom: 3rem;

//   & .swiper-slide {
//     // display: flex;
//     // justify-content: center;
//     // align-items: center;
//     // color: #000;
//     // z-index: 0;
//     // display: flex;
//     // width: 85% !important;
//     max-width: 33%;
//   }

//   & .swiper-pagination {
//     bottom: 0;

//     & .swiper-pagination-bullet {
//       background: rgba(#2b2e2e, 0.7) !important;
//       transition: transform 0.2s ease-in-out !important;
//     }

//     & .swiper-pagination-bullet-active {
//       background: linear-gradient(134deg, #5f86ec 0%, #7c4cb0 100%) !important;
//       transform: scale(1.5) !important;
//       transition: transform ease-in-out 0.3 !important;
//     }
//   }

//   .swiper-button-prev {
//     background-image: url("https://res.cloudinary.com/admsys-storage/image/upload/smarteducation/masterbrain/civicamente-v2/icons/arrow-left.svg");
//     width: 40px;
//     background-repeat: no-repeat;
//     height: 70px;
//     top: 40%;
//     left: 0;
//     background-size: contain;
//     background-position: center;
//     display: flex;
//     z-index: 90;
//     position: absolute;

//     &:after {
//       content: none;
//     }
//   }
//   .swiper-button-next {
//     background-image: url("https://res.cloudinary.com/admsys-storage/image/upload/smarteducation/masterbrain/civicamente-v2/icons/arrow-right.svg");
//     width: 40px;
//     background-repeat: no-repeat;
//     height: 70px;
//     top: 40%;
//     right: 0;
//     background-size: contain;
//     background-position: center;
//     display: flex;
//     z-index: 90;
//     position: absolute;
//     &:after {
//       content: none;
//     }
//   }
// }
</style>
