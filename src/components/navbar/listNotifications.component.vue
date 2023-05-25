<template>
  <div v-if="listNotifications.notifications.length">
    <f7-list media-list class="mt-0">
      <f7-list-item
        swipeout
        @swipeout:deleted="deleteNotification(notification)"
        v-for="notification in listNotifications.notifications"
        :key="notification.uuid"
        link="#"
        @click="
          notification.type == 'duels'
            ? irAlReto(notification)
            : verResultadoDuelo(notification)
        "
        chevron-center
        :subtitle="notification.fecha_recibido"
        :class="
          !notification.read_at
            ? 'bg-yellow-100 hover:bg-opacity-70 dark:bg-stone-700'
            : 'hover:bg-indigo-50 dark:hover:bg-gray-800'
        "
      >
        <template #title>
          <span :class="(notification.read_at) ? 'font-normal': 'font-bold'">{{
            notification.title
          }}</span>
        </template>
        <template #media>
          <span
            class="flex items-center justify-center w-10 h-10 rounded-full bg-duels text-duels-green"
          >
            <span class="w-4 h-4 fa-regular fa-swords"></span>
          </span>
        </template>
        <template #text>
          <span v-html="notification.data"></span>
        </template>

        <f7-swipeout-actions right>
          <f7-swipeout-button
            v-if="!notification.read_at"
            close
            color="orange"
            @click.prevent="markAsRead(notification)"
            ><span class="w-20 leading-none text-center"
              >Dar como leído</span
            ></f7-swipeout-button
          >
          <f7-swipeout-button
            delete
            confirm-text="¿Estás segurx de eliminar este mensaje?"
            confirm-title="Eliminando mensaje..."
            >Eliminar</f7-swipeout-button
          >
        </f7-swipeout-actions>
      </f7-list-item>
    </f7-list>
  </div>
  <div v-else class="flex items-center justify-center h-full">
    <div
      class="flex items-center justify-center w-full h-full bg-white dark:bg-dark"
    >
      <div class="flex flex-col items-center justify-center px-4 py-10">
        <span class="mb-5 text-gray-300 transform -rotate-12">
          <span class="w-20 h-20 fal fa-envelope"></span>
        </span>
        <h5 class="text-base font-semibold text-gray-700">
          Aún no tienes ninguna notificación. <br />Te avisaremos cuando tengas
          una.
        </h5>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import store, { useStore } from "@/store/store";
import { f7 } from "framework7-vue";
import {
  getUserNotifications,
  markAsRead,
  deleteNotification,
} from "@/composables/userFunctions";
import {
  acceptDuels
} from "@/composables/useDuelsFunctions";

export default defineComponent({
  setup() {
    return {
      getUserNotifications,
      markAsRead,
      deleteNotification,
      acceptDuels
    };
  },
  async mounted() {
    await getUserNotifications();
  },
  methods: {
    verResultadoDuelo(notificacion: any) {
      const vm = this;
      f7.dialog.preloader("Generando Resultado duelo..");
      if(notificacion.read_at == null){
        markAsRead(notificacion);
      }
      setTimeout(() => {
        f7.views.main.router.navigate({
          name: "cm.notifications.dueloTerminado",
          params: { hash: notificacion.trivia_hash },
        });
        f7.dialog.close();
      }, 2500);
    },
    async irAlReto(notification){
      const vm = this;
      f7.dialog.preloader('Iniciando escenario..');
      try {
        const data = await acceptDuels(notification.trivia_hash);
        if(data.duel_finished){
          vm.verResultadoDuelo(notification);
        }else{
          store.dispatch('userDefiant', data.defiant)
          store.state.duels.defiantStatusPlay = false;
          f7.views.main.router.navigate({
            name: 'cm.triviaduelo.jugar',
            params: {
              hash: data.hash
            }
          });
        }

        f7.dialog.close();
      } catch (error) {
        console.log("Error al crear las preguntas tof:", error);
        f7.dialog.close()
      };
    }
  },
  computed: {
    ...mapGetters(["listNotifications"]),
  },
});
</script>
