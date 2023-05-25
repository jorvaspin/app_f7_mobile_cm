<template>
  <div>
    <div class="relative ml-3">
      <div>
        <button
          type="button"
          class="relative group nav-link panel-open hover:opacity-100"
          :class="{ 'opacity-40': listNotifications.unread == 0 }"
          data-panel=".panel-notificaciones"
        >
          <span class="sr-only">Open notifications menu</span>
          <transition name="slide-fade-top" mode="out-in">
            <span
              class="absolute top-0 z-10 flex items-center justify-center w-4 h-4 text-xs text-white rounded-full font-display left-5 bg-gradient-to-br from-red-400 to-rose-600"
              v-if="listNotifications.unread > 0"
              :key="'notificaciones' + listNotifications.unread"
            >
              <span
                class="absolute inline-flex w-full h-full duration-700 delay-700 bg-red-400 rounded-full opacity-75 motion-safe:animate-ping"
              ></span>
              <span class="relative">{{
                listNotifications.unread
              }}</span>
            </span>
          </transition>
          <span
            v-if="listNotifications.unread > 0"
            class="z-0 transition-transform transform group-hover:-rotate-12"
          >
            <span class="w-6 fa-regular fa-bell-on"></span>
          </span>
          <span v-else>
            <span class="w-4 fa-regular fa-bell"></span>
          </span>
          <span class="relative hidden font-display lg:inline"
            >Notificaciones</span
          >
        </button>
      </div>
    </div>
    <f7-panel right cover class="panel-notificaciones">
      <f7-page>
        <div class="relative w-full h-full">
          <div
            class="absolute inset-x-0 bottom-0 z-10 h-16 bg-gradient-to-t from-white"
          ></div>
          <div class="flex flex-col h-full bg-white shadow-xl">
            <div class="flex-none p-6 bg-indigo-cm">
              <div class="flex items-center justify-start">
                <span class="w-12 text-white">
                  <span class="w-6 h-6 fa-regular fa-bell"></span>
                </span>
                <h2 class="text-xl text-white font-display">
                  Todas tus notificaciones
                </h2>
                <div class="flex items-center ml-auto h-7">
                  <button
                    type="button"
                    class="rounded-md text-gray-50 hover:text-opacity-70 focus:ring-2 focus:ring-yellow-400 panel-close"
                  >
                    <span class="sr-only">Close panel</span>
                    <svg
                      class="w-6 h-6"
                      x-description="Heroicon name: outline/x"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <list-notifications />
          </div>
        </div>
      </f7-page>
    </f7-panel>
  </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue';
import { mapGetters } from 'vuex';
import listNotifications from "@components/navbar/listNotifications.component.vue";

export default defineComponent({
  props: [],
  components: { listNotifications },

  data() {
    return {
      optionsNotificaciones: {
        wheelPropagation: false,
      },
    };
  },

  mounted() {
    const vm = this;
    vm.getUserNotifications();
    // iniciamos el channel para leer en timepo real lo que pasa en el kanban.. asi desactivamos o activamos las notificaciones
    setTimeout(function () {
      //listen si el profesor habre la tematica o no
      // var pusher = new Pusher('e57263c7af3fed9a84df', {
      //   cluster: 'us2',
      //   forceTLS: true
      // });
      // Pusher.logToConsole = true;
      // Bind a function to a Event (the full Laravel class)
      var channel = vm.$pusher.subscribe(
        "notifications-channel." + vm.$store.state.user.id
      );
      channel.bind("NotificacionesDuelosEvents", function (data: any) {
        vm.getUserNotifications();
      });
    }, 3800);
  },
  methods: {
    // reiniciarTour() {
    //   const vm = this;
    //   localStorage.removeItem("tourTerminate" + this.$store.state.user.id);
    //   this.$store.state.isTerminateTour = null;
    //   swal({
    //     title: "¿Reiniciar tour?",
    //     text: "Si procedes, se iniciara nuevamente el tour por la plataforma, deseas continuar?",
    //     icon: "info",
    //     dangerMode: false,
    //     type: "info",
    //     closeOnClickOutside: false,
    //     allowOutsideClick: false,
    //     buttons: ["Cancelar", "Ok, proceder"],
    //   }).then((willDelete: any) => {
    //     if (willDelete) {
    //       vm.$tours["myTour"].start();
    //     } else {
    //     }
    //   });
    // },

  },
  computed: {
    ...mapGetters(['listNotifications'])
  },
});
</script>
<style lang="css" scoped>
.notificacion {
  cursor: pointer;
}
</style>
