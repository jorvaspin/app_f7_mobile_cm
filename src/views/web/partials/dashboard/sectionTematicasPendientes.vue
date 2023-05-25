<template>
  <div v-if="lessonsPending.length">
    <div class="xl:mx-4 px-4 relative w-50">
      <div
        class="hidden xl:block w-1 h-8 inset-y-0 my-auto absolute rounded-xl left-0 bg-orange-400"
      ></div>
      <h3 class="font-display leading-none text-titles">
        Clases de meses anteriores <br />
        <span class="text-orange-400"
          >que aún no terminas</span
        >
      </h3>
    </div>
    <f7-block-footer class="text-titles my-2 ml-4">{{ lessonsPending.length }} clases que se encuentran desbloqueadas para cursar directamente.</f7-block-footer>
    <div class="py-5 xl:mx-4 xl:px-4">
      <div class="wrapper-tematicas cardBibliotecaTematicasMes">
        <div
        class="descripcion grid gap-5 grid-cols-1"
        :class="[modalWebCols ? 'lg:grid-cols-3' : 'lg:grid-cols-2']"
        >
          <tematica-web-card-small
              class="col-span-1"
              :tematica="tematica"
              :sectionName="sectionName"
              :page="page"
              v-for="(tematica,index) in (cantTematicasPendientes > 4 && (page == 'web-dashboard' || page == 'mobile-biblioteca')) ? lessonsPending.slice(0,4) : lessonsPending"
              :key="sectionName+'.'+tematica.id+'.'+index"
          ></tematica-web-card-small>
        </div>
        <div class="text-center" v-if="(page == 'web-dashboard'  || page == 'mobile-biblioteca') && cantTematicasPendientes > 4">
          <button
            class="btn btn-warning btn-lg w-auto mx-auto mt-3"
            @click="$f7router.navigate({ name: 'cm.tematicasPendientes' }), buttonClick()"
          >
            Ver todas mis temáticas pendientes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "cardTematicasMes",
  props: ['page', 'sectionName','modalWebCols'],
};
</script>
<style lang="scss" scoped>
.wrapper-tematicas {
    border-radius: 0px !important;
    position: relative;
    margin: 0;
    box-shadow: none;
    // &>* {
    //     z-index: 100;
    // }
    &> .descripcion {
        padding: 2rem 0 3rem !important;
       &> h3 {
            font-family: inherit !important;
            color: #32323F;
            letter-spacing: 0;
            text-align: left;
            line-height: 1.7rem;
            font-size: 1.7rem;
            max-width: 90%;
            margin-left: auto;
            margin-right: auto;
            padding: 2rem 0 2rem 2rem;

            & span {
                color: #4B61E6;
            }

            &:before {
                content: '';
                height: 50%;
                width: .5rem;
                border-radius: 5rem;
                position: absolute;
                left: 0;
                top: auto;
                background: #4B61E6;
                bottom: auto;
            }

        }
    }

    .btn-biblioteca {
        width: 80%;
        max-width: 20rem;
        margin: 0 auto;
        display: block;
    }

    .tematicas-swiper {
        margin: 0 0 2rem 0;
        min-height: 22rem;
        padding: 0 5rem;

        & .swiper-slide {
            z-index: 0;
            width: 85% !important;
            max-width: 36rem;
        }

        & .swiper-pagination {
            bottom: 0;

            & .swiper-pagination-bullet {
                background: rgba(#2B2E2E, .7);
                transition: transform .2s ease-in-out;
            }

            & .swiper-pagination-bullet-active {
                background: linear-gradient(134deg, #5F86EC 0%, #7C4CB0 100%);
                transform: scale(1.5);
                transition: transform ease-in-out .3;
            }
        }

        .swiper-button-prev{
          width: 40px;
          background-repeat: no-repeat;
          height: 70px;
          top: 40%;
          left: 0;
          background-size: contain;
          background-position: center;
          display: flex;
          z-index: 90;
          position: absolute;

          &:after{
            content: none;

          }
        }
        .swiper-button-next{
          width: 40px;
          background-repeat: no-repeat;
          height: 70px;
          top: 40%;
          right: 0;
          background-size: contain;
          background-position: center;
          display: flex;
          z-index: 90;
          position: absolute;
          &:after{
            content: none;

          }
        }

    }

    .slick-next:before {
        right: -15px;
        top: 0;
        position: absolute;
    }

    .slick-prev:before {
        left: -15px;
        top: 0;
        position: absolute;
    }

    .slick-next {
        right: -5px;
        z-index: 1;
        color: transparent !important;
        background: transparent !important;
        border-radius: 50%;
    }

    h2 {
        width: 100%;
        text-align: center;
        color: white;
        margin: 0;
        padding: 0px 10px 10px 10px;
    }

    &.cardBibliotecaTematicasFinalizadas {
        min-height: 45rem;

        .tematicas-swiper {
            margin: 0 0 1rem 0;
            min-height: 13rem;
        }
    }
}
</style>
