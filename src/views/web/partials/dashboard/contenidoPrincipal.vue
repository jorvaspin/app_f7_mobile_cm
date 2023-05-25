<template>
  <div>
    <div class="grid content-center grid-cols-12 gap-5 pl-3 xl:gap-1">
      <div class="col-span-12 xl:col-span-5">
        <div class="flex items-center content-center justify-start h-full gap-2">
          <div>
            <span class="text-3xl">👋</span>
          </div>
          <div>
            <h4 class="m-0 text-xl text-gray-700 font-display">
              ¡Hola <span class="nickname-">{{ this.$store.state.user.nick_or_name }}</span>!
            </h4>
            <div
              class="text-gray-700"
              v-if="this.$store.state.user.last_game != 'Nunca ha jugado'"
            >
              Tu última participación fue
              <strong>{{ this.$store.state.user.last_game }}</strong>
            </div>
            <div v-else class="font-bold text-gray-700">
              Aún no has participado en las trivias... ¿Qué estás esperando?
            </div>
            <!--<h6 v-if="this.$store.state.user.trivias_tematicas > 0">Has jugado {{this.$store.state.user.trivias_tematicas}} temática/s de la Biblioteca del Conocimiento este mes.</h6>
              <h6 v-else>No has jugado Temáticas aún en {{this.$store.state.thisMonth}}, te invitamos a completarlas para lograr un gran puntaje!</h6>-->
          </div>
        </div>
      </div>
      <div class="col-span-12 xl:col-span-7">
        <div class="px-2 py-2 bg-white rounded shadow-md">
          <div class="flex flex-wrap items-center content-center h-full">
            <div class="self-center w-20">
              <img
                alt=""
                class="img-fluid"
              />
            </div>
            <div class="self-center w-2/5 px-2">
              <h5 class="mb-2 text-base leading-none text-left font-display text-purple-cm">
                ¿Cuánto sabes de Formación Ciudadana?
              </h5>
              <div v-if="$store.state.user.trivias_por_jugar" class="text-sm text-gray-600">Tienes <strong>{{ $store.state.user.trivias_por_jugar }} trivias</strong> por contestar.</div>
              <div v-else class="text-sm text-gray-600"><strong>¡Felicidades!</strong> has completado tus trivias diarias.</div>
            </div>
            <div class="self-center w-2/5">
              <div class="ml-auto">
                <btn-trivia-general  />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-1 mt-4">
      <section-cuadro-honor></section-cuadro-honor>
    </div>
    <div class="flex">
      <section-tematicas-pendientes :page="'web-dashboard'" :sectionName="'mes-dashboard'"></section-tematicas-pendientes>
    </div>
    <div class="mt-10">
      <alumno-premios></alumno-premios>
    </div>

    <!-- noficiaciones de duelos via pusher -->
    <notificaciones-duelos></notificaciones-duelos>
    <!-- modal buscando oponente -->
    <!-- <buscar-oponente /> -->
    <f7-popup class="inicio-diagnostico" style="--f7-popup-tablet-height: 520px;" close-on-escape push>
      <div class="relative flex w-full h-full bg-white page">
        <div class="flex flex-col w-full h-full overflow-hidden page-content">
              <!-- <close-popup-button></close-popup-button> -->
              <div class="flex flex-col flex-1 h-full overflow-hidden rounded-lg">
                <popup-diagnostico-inicio />
              </div>
        </div>
      </div>
      </f7-popup>
  </div>
</template>
<script lang="ts">
//animated loader css
import { axiosInstance } from "@/js/axios";
import sectionCuadroHonor from "./sectionCuadroHonor";
import btnTriviaGeneral from "@components/buttons/btnTriviaGeneral.component";
import sectionTematicasPendientes from "./sectionTematicasPendientes";
import Awards from "@/views/web/partials/dashboard/Awards.vue";
import PopupDiagnosticoInicio from '@views/mobile/Dashboard/diagnostico/popupIniciarDiagnostico.vue';
import NotificacionesDuelos from '@views/web/partials/notificacionesDuelos.vue';

export default {
  props: [],
  components: {
    sectionCuadroHonor,
    sectionTematicasPendientes,
    btnTriviaGeneral,
    Awards,
    PopupDiagnosticoInicio,
    NotificacionesDuelos
  },
  data() {
    return {
      miuserid: 0,
      oponenteActivo: false,
      showDueloCivico: false,
      options: {
        wheelPropagation: false
      },
      optionsScrollPrincipal: {
        wheelPropagation: false
      }
    };
  },

  mounted() {},

  created: function() {

  },

  updated: function() {},

  methods: {
    duelosCompletados() {
      this.$snotify.success(
        "Ya has jugado tus 2 duelos disponible del dia, vuelve mañana!",
        "Duelos Cívicos"
      );
    },
    dueloIniciado() {
      this.$snotify.info(
        "Ya has comenzado un duelo, terminalo antes de empezar otro.",
        "Duelos Iniciado"
      );
    },
    async buscarOponente() {
      const vm = this;
      try {
        const { data } = await axiosInstance({
          method: "get",
          url: "/api/auth/students/v3/user/duels/search-opponent",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + Vue.localStorage.get("cm_access_token")
          }
        });
        if (data.duelosPorjugar == 0) {
          vm.$snotify.success(
            "Ya has jugado tus 2 duelos disponible del dia, vuelve mañana!",
            "Duelos Cívicos"
          );
        } else {
          vm.$bvModal.show("buscandoOponente");
          vm.$store.state.oponenteActivo = false;
          setTimeout(function() {
            vm.iniciandoDuelo();
          }, 5000);
        }
      } catch (e) {
        vm.data = null;
        vm.error = e;
      }
    },
    iniciandoDuelo() {
      const vm = this;
      $("body").addClass("overlaybg");
      vm.$bvModal.hide("buscandoOponente");
      axiosInstance({
        method: "post",
        data: {

        },
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Vue.localStorage.get("cm_access_token")
        }
      })
        .then(response => {
          vm.$store.state.hashAnfitrion =
            response.data.trivia_anfitrion.trivia_hash;
          vm.$router.push({
            name: "cm.triviaDuelo.hash",
            params: { hash: response.data.trivia_anfitrion.trivia_hash }
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    continuarDuelo() {
      const vm = this;
      $("body").addClass("overlaybg");
      vm.$router.push({
        name: "cm.triviaDuelo.hash",
        params: { hash: vm.$store.state.hashAnfitrion }
      });
    },
    cerrarNoticia() {
      const vm = this;
      setTimeout(function() {
        $("#sideNoticia").removeClass("slideInRight");
        $("#sideNoticia").addClass("slideOutRight");
        setTimeout(function() {
          $("#sideNoticia").removeClass("slideOutRight");
          $("#sideNoticia").addClass("slideInRight");
        }, 500);
      }, 200);
    },
    abrirDuelos() {
      if (this.showDueloCivico) {
        this.showDueloCivico = false;
        // this.optionsScrollPrincipal.suppressScrollY = false;
      } else {
        this.showDueloCivico = true;
        // this.optionsScrollPrincipal.suppressScrollY = true;
      }
    },
    respuestaCorrecta() {
      $(".acciones").append(
        '<div class="checkCorrecta"><i class="fad fa-check"></i></div>'
      );
      $(".acciones")
        .addClass("correcta")
        .children("button")
        .removeClass("btn-default")
        .addClass("btn-success")
        .text("Continuar");
    },
    respuestaErrada() {
      $(".acciones").append(
        '<div class="checkIncorrecta"><i class="fad fa-times"></i></div>'
      );
      $(".acciones")
        .addClass("errada")
        .children("button")
        .removeClass("btn-default")
        .addClass("btn-danger")
        .text("Continuar");
    },
    reiniciar() {
      $("div.checkCorrecta").remove();
      $("div.checkIncorrecta").remove();
      $(".acciones")
        .removeClass("correcta errada")
        .children("button")
        .removeClass("btn-success btn-danger")
        .addClass("btn-default")
        .text("Enviar Respuesta");
    },
    mostrarResultadosDinamico() {
      if ($(".acciones").hasClass("correcta")) {
        $(".resultadoTrivia.dueloGanado")
          .removeClass("d-none")
          .addClass("animated slideInUp");
      } else if ($(".acciones").hasClass("errada")) {
        $(".resultadoTrivia.dueloPerdido")
          .removeClass("d-none")
          .addClass("animated slideInUp");
      }
    },
    mostrarResultados() {
      $(".resultadoTrivia.dueloGanado")
        .removeClass("d-none")
        .addClass("animated slideInUp");
    },
    mostrarResultadosDerrota() {
      $(".resultadoTrivia.dueloPerdido")
        .removeClass("d-none")
        .addClass("animated slideInUp");
    },
    iniciandoDuelo() {
      const vm = this;
      axiosInstance({
        method: "post",
        data: {
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Vue.localStorage.get("cm_access_token")
        }
      })
        .then(response => {
          vm.$store.state.hashAnfitrion =
            response.data.trivia_anfitrion.trivia_hash;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
