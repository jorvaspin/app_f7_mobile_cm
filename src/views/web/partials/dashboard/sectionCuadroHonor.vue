<template>
  <div>
    <div
      class="relative h-64 px-2 bg-white shadow dark:bg-slate-900 lg:shadow-2xl lg:py-2 lg:px-4 lg:rounded-md cuadroDeHonor lg:mb-20 md:h-80 lg:h-96"
    >
      <div class="flex h-full">
        <div class="relative flex-1">
          <div
            class="absolute flex flex-col left-2 sm:left-5 top-10 lg:top-10 lg:left-5 h-36"
          >
            <h5
              class="text-2xl leading-none uppercase w-52 text-indigo-cm dark:text-blue-100 md:text-5xl lg:text-5xl font-display"
            >
              Cuadro<br />de Honor
            </h5>
            <div class="text-xs text-primary-100 font-display md:text-lg">
              {{ user.curso_nombre }}
            </div>
            <div
              class="text-gray-800 dark:text-gray-300 text-xxs md:text-sm font-display"
            >
              {{ user.establecimiento_nombre }}
            </div>
          </div>
          <transition-group
            class="bottom-0 transform scale-75 contenedorPodio md:bottom-2 -right-9 md:right-3 xl:right-10 xl:bottom-3 md:scale-100"
            v-if="listCuadroDeHonor.length"
            name="slide-fade"
            tag="div"
            mode="in-out"
          >
            <div
              :class="'lugar_' + index"
              class="alumnoPodio animated fadeInUp"
              v-for="(place, index) in listCuadroDeHonor.slice(0, 3)"
              :key="'place-' + index"
            >
              <img
                :src="`https://res.cloudinary.com/admsys-storage/image/upload/w_50/smarteducation/masterbrain/civicamente-v2/cuadro_honor/t${
                  index + 1
                }.gif`"
                alt=""
                width="50"
                height="50"
                class="absolute inset-x-0 top-0 w-12 h-12 mx-auto"
              />

              <tematica-number class="mx-auto mb-4 number">{{
                index + 1
              }}</tematica-number>

              <transition name="slide-fade-top" mode="out-in">
                <img
                  :src="
                    user.id == place.user.id
                      ? user.user_avatar
                      : place.user.user_avatar
                  "
                  alt="Image avatar"
                  :key="
                    user.id == place.user.id
                      ? user.user_avatar
                      : place.user.user_avatar
                  "
                  class="border-4 border-white rounded-full user-avatar"
                />
              </transition>
              <div
                class="relative z-0 contenedorTitulo d-flex align-items-center"
              >
                <h3
                  class="w-16 mx-auto text-center truncate"
                  :title="
                    user.id == place.user.id
                      ? user.nick_or_name
                      : place.user.nick_or_name
                  "
                >
                  {{
                    user.id == place.user.id
                      ? user.nick_or_name
                      : place.user.nick_or_name
                  }}
                </h3>
              </div>
              <div
                class="
                  z-10
                  relative
                  bg-gradient-to-br
                  from-fuchsia-500
                  via-rose-500
                  to-orange-400
                  rounded
                  py-1
                  w-16
                  -mt-1
                  mx-auto
                  mb-0
                  flex flex-col
                  gap-0.5
                "
              >
                <h4
                  class="inline-flex justify-center leading-none tracking-tight text-white uppercase font-display text-xxs"
                >
                  {{ place.user.curso_nombre }}
                </h4>
                <h5
                  class="inline-flex justify-center leading-none tracking-tight text-yellow-200 uppercase font-display text-xxs"
                >
                  <span>
                    {{ $filters.formatNumber(place.puntaje_total) }} XP
                  </span>
                </h5>
              </div>
            </div>
          </transition-group>
          <div
            class="bottom-0 transform scale-75 contenedorPodio md:bottom-2 -right-9 md:right-3 xl:right-10 xl:bottom-3 md:scale-100"
            v-else-if="pendingRankingGanadores"
          >
            <vue-loading
              :active="pendingRankingGanadores"
              :width="40"
              :height="40"
              color="#72727f"
              class="z-10"
            >
            </vue-loading>
          </div>
          <div
            class="bottom-0 transform scale-75 contenedorPodio md:bottom-2 -right-9 md:right-3 xl:right-10 xl:bottom-3 md:scale-100"
            v-else
          >
            <span
              class="p-5 text-sm leading-tight border-2 border-yellow-100 rounded-lg noranking bg-yellow-50 bg-opacity-80 dark:bg-gray-800 dark:border-gray-900"
            >
              Aún no existen estudiantes destacados en los 3 primeros lugares.
              ¡Que estás esperando!
            </span>
          </div>
        </div>
        <div class="flex-grow-0 hidden w-64 lg:flex">
          <div class="w-full h-full rounded-xl inset-y-2 rankingCurso">
            <div
              v-if="pendingRankingGanadores"
              class="grid items-center justify-center w-full h-full grid-rows-6 overflow-y-auto divide-y place-content-center"
            >
              <div
                class="flex items-center justify-between w-full gap-4 py-2 skeleton-text skeleton-effect-blink"
                v-for="(item, index) in 6"
                :key="index"
              >
                <div>
                  <div
                    class="skeleton-block"
                    style="width: 40px; height: 40px; border-radius: 50%"
                  ></div>
                </div>
                <div>
                  <div>NOMBRE ESTUDIANTE</div>
                </div>
                <div class="ml-auto">PUNTOS</div>
              </div>
            </div>
            <div
              v-else
              class="grid items-center justify-start h-full overflow-y-auto place-content-center"
              :class="
                listCuadroDeHonor.slice(3, 9) == 0
                  ? 'grid-rows-1'
                  : 'grid-rows-6'
              "
            >
              <div
                class="flex items-center h-full px-2"
                v-show="listCuadroDeHonor.slice(3, 9) == 0"
              >
                <div
                  class="flex items-center justify-center gap-2 p-3 my-5 text-xs text-gray-600 border-2 border-yellow-100 bg-yellow-50 rounded-xl"
                >
                  <span class="flex justify-center w-24">
                    <i class="text-gray-900 fa-light fa-chart-user fa-xl"></i>
                  </span>
                  <span class="leading-tight text-left text-gray-900">
                    Aún no tenemos información recopilada sobre tu nivel para
                    mostrarte esta parte del ranking.
                  </span>
                </div>
              </div>
              <row-user
                :data="place"
                :index="index + 4"
                v-for="(place, index) in listCuadroDeHonor.slice(3, 9)"
                :key="index"
              ></row-user>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, mapState } from "vuex";
import { RowUser } from "@components/GlobalComponents";
import tematicaNumber from "@components/biblioteca/tematica/number.component.vue";
import { getCuadroDeHonor } from "@/composables/useStatsFunctions";
export default defineComponent({
  name: "sectionCuadroHonor",
  components: {
    RowUser,
    tematicaNumber,
  },
  async mounted() {
    await getCuadroDeHonor();
  },
  computed: {
    ...mapGetters(["listCuadroDeHonor"]),
    ...mapState(["pendingRankingGanadores", "user"]),
  },
});
</script>
<style lang="postcss">
.cuadroDeHonor {
  background-image: url(/assets/images/cuadro-honor/podium-serpentinas.png);
  background-size: contain;
  background-position: 0 0;
  background-repeat: no-repeat;
  overflow: hidden;

  & .conoceras {
    color: white;
    font-weight: bolder;
  }

  & h5.card-title {
    font-family: "Burbank Big";
    font-size: 27px;
    color: #ffffff;
    letter-spacing: 0;
    text-align: left;
    line-height: 31px;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    text-transform: uppercase;
    margin: 0;
  }

  & p.card-text {
    font-weight: 700;
    font-size: 16px;
    color: #eef3f7;
    letter-spacing: 0;
    text-align: left;
    margin: 0;
  }

  & p.card-text2 {
    font-weight: 900;
    font-size: 14px;
    color: #f8e71c;
    letter-spacing: 0;
    text-align: left;
    margin: 0;
  }

  .contenedorPodio {
    position: absolute;
    margin: 0 auto;
    width: 322px;
    height: 120px;
    background-image: url(/assets/images/cuadro-honor/podio-element.svg);
    background-size: contain;
    background-position: 0 0;
    background-repeat: no-repeat;
    z-index: 1;

    &:after {
      content: "";
      position: absolute;
      background-image: url(/assets/images/cuadro-honor/podium-rainbow.png);
      background-size: contain;
      background-position: right 0;
      background-repeat: no-repeat;
      width: 400px;
      height: 310px;
      bottom: 80px;
      left: -60%;
      z-index: -1;
    }

    & .noranking {
      position: absolute;
      bottom: 35%;
      right: 12%;
      width: 65%;
      text-align: center;
    }

    & .nocontent {
      position: absolute;
      bottom: 35%;
      right: 42%;
      width: 80px;
      display: flex;
      justify-content: center;
      text-align: center;
      font-size: 14px;
      color: white;
      background: #00000030;
      border-radius: 17px;
      padding: 10px;
      text-align: center;

      & .vue-content-placeholders-img {
        position: relative;
        overflow: hidden;
        background: #eee;
        width: 60px !important;
        height: 60px !important;
        border-radius: 50% !important;
      }
    }

    & .alumnoPodio {
      position: absolute;

      & img.user-avatar {
        width: 80px;
        height: 80px;
        z-index: 1;
      }

      & .contenedorTitulo {
        position: relative;
        background: #2c2c41;
        border-radius: 5px;
        height: 35px;
        z-index: 2;
        margin-top: -5px;

        & h3 {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-family: "Burbank Big";
          font-size: 12px;
          color: #ffffff;
          letter-spacing: 0;
          text-align: center;
          line-height: 11px;
        }
      }

      & .contenedorInfo {
        position: relative;
        background-image: linear-gradient(134deg, #ef14c5 0%, #ffc160 100%);
        border-radius: 5px;
        padding: 3px 0;
        z-index: 3;
        width: 85%;
        margin: -5px auto 0;

        & h4 {
          font-family: "Burbank Big";
          font-size: 8px;
          color: #ffffff;
          letter-spacing: 0;
          text-align: center;
          margin: 0;
          text-transform: uppercase;

          & span {
            font-size: 10px;
            line-height: 10px;
            color: #f8e71c;
            text-transform: uppercase;
          }
        }
      }

      &.lugar_0 {
        bottom: 70%;
        left: 39%;
      }

      &.lugar_1 {
        right: 6%;
        bottom: 46%;
      }

      &.lugar_2 {
        left: 7%;
        bottom: 16%;
      }
    }
  }
}
</style>
