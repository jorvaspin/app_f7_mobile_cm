<template>
  <f7-page>
    <f7-popover
      class="popover-menu"
      data-close-on-escape="true"
      data-backdrop="false"
    >
      <div class="extrasNavbar">
        <div class="notificaciones">
          <div class="p-1 cabeceraNotificaciones">
            <div class="titulo d-inline-block">Avisos</div>
            <div class="float-right" v-if="1 == 0">
              <a> Marcar todo como leído </a>
            </div>
          </div>
          <!-- <div class="separador"></div> -->
          <div v-if="listNotifications.notifications.length != 0">
            <div class="contenidoNotificaciones">
              <div
                class="notificacion d-flex align-items-center"
                popover-close
                v-for="notificacion in listNotifications.notifications"
                v-bind:key="notificacion.id"
                :class="notificacion.read_at == null ? '' : 'visto'"
                v-on:click="
                  notificacion.type == 'duels'
                    ? irAlReto(notificacion)
                    : verResultadoDuelo(notificacion)
                "
                style="cursor: pointer"
              >
                <f7-link popover-close>
                  <div class="icono duelo"></div>
                  <div class="contenido">
                    <h3>
                      {{ notificacion.title }}
                    </h3>
                    <p v-html="notificacion.data"></p>
                    <br />
                    <p>
                      <strong>Hace {{ notificacion.fecha_recibido }}</strong>
                    </p>
                  </div>
                  <div
                    class="ml-auto estado"
                    v-if="notificacion.status"
                    v-on:click="marcarLeido(notificacion)"
                    title="Marcar como leído"
                  ></div>
                  <div
                    class="ml-auto estado"
                    v-else
                    title="notificación leída"
                  ></div>
                </f7-link>
              </div>
            </div>
          </div>
          <div class="inicioNotificaciones" v-else>
            <div
              class="p-2 text-center sinNotificacion"
              style="background: #ffffff !important"
            >
              <h5 style="width: 100%; text-align: center">
                Aún no tienes ningún aviso!
              </h5>
              <i class="fad fa-exclamation-square" style="font-size: 40px"></i>
            </div>
          </div>
        </div>
      </div>
    </f7-popover>
  </f7-page>
</template>
<script lang="ts">
import {defineComponent} from 'vue';
import { mapGetters } from 'vuex';

export default defineComponent({
  props: [],

  data() {
    return {
      optionsNotificaciones: {
        wheelPropagation: false,
      },
    };
  },
  mounted() {
    if (this.$store.state.statusLoadPageDashboard) {
      // this.getUserNotifications();
    }
  },
  methods: {
    irAlPerfil() {
      this.$f7router.navigate({ name: "cm.perfil" });
    },

    verResultadoDuelo(notificacion: { trivia_hash: any; }) {
      const vm = this;
      console.log(notificacion);
      vm.$f7.dialog.preloader("Generando Resultado duelo..");
      vm.marcarLeido(notificacion);
      setTimeout(() => {
        vm.$f7.views.main.router.navigate({
          name: "cm.duelofinalizado.terminado",
          params: { hash: notificacion.trivia_hash },
        });
        vm.$f7.dialog.close();
      }, 2500);
    },
  },
  computed: {
    ...mapGetters(['listNotifications'])
  },
});
</script>
<style lang="scss" scoped>
.notificacion {
  cursor: pointer;
}
</style>
