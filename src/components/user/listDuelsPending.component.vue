<template>
  <div class="flex flex-col px-0 py-3 divide-y divide-gray-100">
    <div
      class="flex flex-row items-start gap-5 my-2 mt-0 mb-2 rounded-lg mtdis10"
      :class="device.desktop ? 'p-4' : 'p-2'"
      v-for="(duelUser, index) in userListDuelsPending"
      :key="index">
      <div id="modalNotificacionDuelo" class="rowDuels mt-8">
        <div class="grid grid-cols-2 gap-5 relative" id="bg-grecia-duels">
          <div>
            <div class="m-2">
              <div class="bg-duelomini-left">
                <div class="avatar-name">
                  <img :src="duelUser.duelo.defiant.user_avatar" alt="" />
                  <div
                    class="text-base cinta-retador"
                    v-if="device.desktop"
                  >
                    <badge-primary class="text-xs truncate transform rotate-90">
                      Retador
                    </badge-primary>
                  </div>
                  <div class="text-base cinta-retador" v-else>
                    <div
                      class="w-auto p-1 px-2 py-1 text-xs leading-none text-center text-white uppercase rounded-full cinta-retador font-display bg-gradient-to-r from-indigo-400 to-indigo-400"
                    >
                      Retador
                    </div>
                  </div>

                  <p
                    class="inline-flex items-center gap-2 uppercase font-display text-black-cm"
                    :class="device.desktop ? 'text-xs' : 'text-xs'"
                  >
                    {{ duelUser.duelo.defiant.nick_or_name }}
                  </p>
                  <br />
                  <strong
                    class="inline-flex items-center gap-2 uppercase font-display text-black-cm"
                    :class="device.desktop ? 'text-sm' : 'text-sm'"
                    >{{ duelUser.duelo.defiant.name }}</strong
                  >
                </div>
                <div class="info-mini">
                  <div
                    class="flex flex-row items-center content-center gap-3 pl-2 flex-nowrap"
                  >
                    <div
                      class="self-end leading-none font-display text-purple-cm"
                      :class="device.desktop ? 'text-sm' : 'text-sm'"
                    >
                      {{ duelUser.duelo.defiant.curso_name }}
                    </div>
                  </div>
                  <div
                    class="flex flex-row items-center content-center gap-3 pl-2 flex-nowrap"
                  >
                    <div
                      class="self-end leading-none font-display text-purple-cm w80-duelo"
                      :class="device.desktop ? 'text-sm' : 'text-sm'"
                    >
                      {{ duelUser.duelo.defiant.establecimiento_name }}
                    </div>
                  </div>
                </div>
                <div
                  class="inline-flex items-center gap-2 text-2xl puntaje font-display text-black-cm"
                >
                  <p>{{ duelUser.trivia.puntaje_obtenido }}</p>
                </div>
                <div
                  class="inline-flex items-center gap-2 text-base pts font-display text-black-cm"
                >
                  <p>XP</p>
                </div>
              </div>
            </div>
            <div class="versus-duelo">
              <img
                src="https://res.cloudinary.com/admsys-storage/image/upload/v1622845492/smarteducation/masterbrain/civicamente-v2/duelos/duelos_vs.png"
                alt=""
              />
            </div>
          </div>
          <div :class="device.desktop ? 'col-5' : 'col-6'" class="z-10">
            <!-- <div class="contenido-disabled">
                  <img width="50" style="margin: 0 auto;" src="https://res.cloudinary.com/admsys-storage/image/upload/v1622834140/smarteducation/masterbrain/civicamente-v2/duelos/icon_clock.png" alt="">
                  <p class="font-display">Esperando al contrincante</p>
                </div> -->
            <div class="m-2 disabled">
              <div class="bg-duelomini-right">
                <div class="avatar-name">
                  <img :src="duelUser.duelo.opponent.user_avatar" alt="" />
                  <div class="cinta-contrincante" v-if="device.desktop">
                    <badge-warning
                      class="text-xs uppercase transform rotate-90"
                    >
                      Contrincante
                    </badge-warning>
                  </div>
                  <div
                    v-else
                    class="w-auto p-1 px-2 py-1 text-xs leading-none text-center text-white uppercase rounded-full cinta-contrincante font-display bg-gradient-to-r from-yellow-500 to-yellow-200"
                  >
                    Contrincante
                  </div>
                  <p
                    class="inline-flex items-center gap-2 uppercase font-display text-black-cm"
                    :class="device.desktop ? 'text-xs' : 'text-xs'"
                  >
                    {{ duelUser.duelo.opponent.nick_or_name.substring(0,10)+'...' }}
                  </p>
                  <br />
                  <strong
                    class="inline-flex items-center gap-2 uppercase font-display text-black-cm"
                    :class="device.desktop ? 'text-sm' : 'text-xs'"
                    >{{ duelUser.duelo.opponent.name.substring(0,10)+'...' }}</strong
                  >
                </div>

                <div class="info-mini">
                  <div
                    class="flex flex-row items-center content-center gap-3 pl-0 flex-nowrap"
                  >
                    <div
                      class="self-end leading-none font-display text-purple-cm"
                      :class="device.desktop ? 'text-sm' : 'text-xs'"
                    >
                      {{ duelUser.duelo.opponent.curso_name }}
                    </div>
                  </div>
                  <div
                    class="flex flex-row items-center content-center gap-3 pl-0 flex-nowrap"
                  >
                    <div
                      class="self-end leading-none font-display text-purple-cm w80-duelo"
                      :class="device.desktop ? 'text-sm' : 'text-sm'"
                    >
                      {{ duelUser.duelo.opponent.establecimiento_name }}
                    </div>
                  </div>
                </div>
                <div
                  class="inline-flex items-center gap-2 text-xl puntaje font-display text-black-cm"
                >
                  SIN PUNTAJE
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="p-3 text-base text-center"
      v-show="isLoading"
    >
      Actualmente no tienes duelos activos.
      <br>
      <span class="font-bold">¡Es tu momento para desafiar a alguien!</span>
    <div class="flex justify-center w-full my-3">
      <button
          @click.prevent="startDuels()"
          class="w-3/5 btn-lg btn btn-success"
          :class="
            settings.ACTIVAR_DUELOS ? '' : 'cursor-not-allowed'
          "
          :disabled="settings.ACTIVAR_DUELOS ? false : true"
          v-if="!duels.dueloActivo"
        >
          Iniciar duelo
        </button>
    </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { defineAsyncComponent, defineComponent, ref } from "vue";
import { f7, theme } from "framework7-vue";
import { store } from "@/store/store";
import { getDevice } from "framework7/lite-bundle";
import { getUserDuelsPending } from "@/composables/useDuelsFunctions";
import { searchOpponent, initDuels } from "@/composables/useDuelsFunctions";

export default {
  setup() {
    const device = getDevice();
    return {
      device
    };
  },
  data() {
      return {
          getUserDuelsPending,
          searchOpponent,
          initDuels,
      };
  },
  mounted() {

  },
  components: {
    Modal: defineAsyncComponent(() => import("@components/global/Modal.vue")),
    SheetModalSearchOpponent: defineAsyncComponent(() => import("@/views/globals/duelos/dashboard/SheetModalSearchOpponent.vue")),
  },
  methods: {
    async startDuels() {
      const vm = this;
      f7.dialog.preloader("Creando escenario...");
      try {
        const data = await searchOpponent();
        store.dispatch('userDefiant', data.defiant)
        const createOrContinueDuels = await initDuels();
        setTimeout(() => {
          store.state.openedSearhOpponent = true;
          vm.openSheet();
          f7.dialog.close();
        }, 500);

      } catch (error) {
        showAlertError('No se pudo crear las preguntas tof, intentelo nuevamente');
        console.log("Error al crear las preguntas tof:", error);
      }
    },
    openSheet(){
     const vm = this;
     console.log(f7.sheet);
     f7.sheet.stepToggle('.sheet-modal-searchOpponent');
     console.log(f7.sheet.open('.sheet-modal-searchOpponent'));
    },
    iniciarDuelo(){
      this.cerrarVentana()
    },
  },
  computed: {
    ...mapState(['userListDuelsPending', 'settings','duelosPorjugar', 'duels','openedSearhOpponent']),

    isLoading() {
      return !this.userListDuelsPending.length;
    },

    localDuelsPending() {
      return this.userListDuelsPending.length > 0
        ? this.userListDuelsPending.slice(0, 10)
        : null;
    },
  },
};
</script>
<style lang="scss">
.cinta-trivia-finalizada {
  position: absolute;
  left: 5px;
  top: -20px;
  border-radius: 50px;
  padding: 2px 10px 2px 10px;
  background-image: linear-gradient(134deg, #4b61e6 0%, #7e41ef 100%);
  font-family: "Burbank Big", Arial, Helvetica, sans-serif;
  color: #ffffff;
  letter-spacing: 0;
  text-align: center;
}

.fecha-duelo {
  position: absolute;
  right: -25%;
  bottom: -20%;
  background: #a78d8d;
  color: white;
  border-radius: 10%;
  width: 100px;
  height: 60px;
  text-align: center;
  z-index: 1;

  span {
    position: absolute;
    bottom: 0;
    width: 100%;
    right: 0;
  }
}

.mtdis10 {
  margin-top: -35px !important;
  margin-bottom: 55px !important;
}

.rowDuels {
  background: #fff !important;
  display: block;
  width: 100%;
  border-radius: 15px;

  .contenido-disabled {
    position: absolute;
    width: 70%;
    z-index: 99;
    text-align: center;
    justify-content: center;
    margin: 0 auto;
    height: auto;
    top: 29%;

    p {
      font-size: 15px;
      color: #4b61e6;
      letter-spacing: 0;
      text-align: center;
      line-height: 14px;
      width: 95px;
      margin: 0 auto;
    }
  }
}

#bg-grecia-duels {
  background-image: url("https://res.cloudinary.com/admsys-storage/image/upload/v1622833438/smarteducation/masterbrain/civicamente-v2/duelos/bg-grecia.png");
  background-position: left;
  background-repeat: repeat;
  background-size: cover;

  .bg-duelomini-left {
    position: relative;
  }
  .bg-duelomini-right {
    position: relative;
  }
}
</style>
