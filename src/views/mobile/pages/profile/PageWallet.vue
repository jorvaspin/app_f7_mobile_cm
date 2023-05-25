<template>
  <f7-page hide-navbar-on-scroll no-toolbar class="bg-pages" ptr
    @ptr:refresh="handleRefreshPage">
    <f7-navbar title="Mis civipuntos" back-link>
      <f7-nav-right>
        <f7-link
          icon-only
          class="flex justify-center w-8"
          @click="openActions"
          ><i class="text-white fa-regular fa-info-circle dark:text-primary-100"></i
        ></f7-link>
      </f7-nav-right>
    </f7-navbar>
    <vue-loading
      :active="!listUserWalletTransactions.length"
      color="#fff"
      background-color="#000"
      :blur="'10px'"
    />
    <f7-block class="px-0 mx-0 my-0">
      <div
        class="relative h-auto py-4 text-center rounded-none bg-card-civipuntos no-borders"
      >
        <div class="flex items-center justify-center">
          <span class="w-16">
            <img
              class="mx-auto mb-3 w-14"
              :src="civipuntosCoin"
              alt="Civipunto"
            />
          </span>
          <div class="flex flex-col justify-start">
            <h4 class="text-5xl font-display text-orange-cm">
              {{ $filters.formatNumber(this.$store.state.user.wallet_amount) }}
            </h4>
            <div class="text-gray-800 uppercase font-display">
              Civipuntos disponibles
            </div>
          </div>
        </div>
      </div>
    </f7-block>
    <f7-block class="mt-10">
      <f7-block-title class="mb-8"
        >Mostrando tus últimas 20 transacciones</f7-block-title
      >
      <div class="timeline">
        <div
          class="timeline-item"
          v-for="(transaction, index) in listUserWalletTransactions"
          :key="index"
        >
          <div class="timeline-item-date">
            <div class="flex flex-col">
              <span>
                {{ $dayjs(transaction.created_at).format("DD") }}
                <small>{{
                  $dayjs(transaction.created_at).format("MMM")
                }}</small>
              </span>
              <small>{{ $dayjs(transaction.created_at).format("YYYY") }}</small>
            </div>
          </div>
          <div class="timeline-item-divider"></div>
          <div class="timeline-item-content">
            <div
              class="timeline-item-inner"
              style="padding: 10px 0px 10px 8px !important"
            >
              <div class="flex flex-col divide-y divide-gray-200">
                <div class="pb-3 space-y-2">
                  <div
                    class="flex justify-start gap-2 mx-3 font-bold text-left"
                  >
                    <span class="leading-none">{{
                      transaction.detail_transaction
                    }}</span>
                    <i
                      :class="'fa-xl fa-fw ' + transaction.action_icon"
                    ></i>
                  </div>
                  <div class="mx-3 text-xs text-left">
                    {{ transaction.description }}
                  </div>
                </div>
                <div
                  class="flex items-center gap-3 pt-3 mx-3 text-xs text-left"
                >
                  <span>Saldo:</span>
                  <span class="flex items-center">
                    <img
                      width="20"
                      height="20"
                      class="w-4 h-4 mr-1"
                      :src="civipuntosCoin"
                      alt="Civipunto"
                    />
                    {{ $filters.formatNumber(transaction.raw_balance) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </f7-block>
  </f7-page>
</template>
<script lang="ts">
import { getUserWalletTransactions } from "@/composables/userFunctions";
import { f7 } from "framework7-vue";
import { defineComponent, onMounted } from "vue";
import { mapGetters } from "vuex";
import civipuntosCoin from '@/assets/images/civipuntos/civipuntos-coin.png';

export default defineComponent({
  props: {
    backText: {
      type: String,
      require: false,
      default: "Mi Perfil",
    },
  },
  data() {
    return {
      civipuntosCoin
    };
  },
  setup() {
    const handleRefreshPage = async (done: () => void) => {
      try {
        f7.dialog.preloader("Actualizando información...");
        getUserWalletTransactions();
        setTimeout(() => {
          done();
          f7.dialog.close();
        }, 2500);
      } catch (error) {
        console.log(error);
      }
    };
    onMounted(() => {
      getUserWalletTransactions();
    });

    return {
      handleRefreshPage,
    };
  },
  methods: {
    openActions() {
      const self = this;
      if (!self.actionsToPopover) {
        self.actionsToPopover = f7.actions.create({
          buttons: [
            [
              {
                text: "Los civipuntos son el método de intercambio en el mundo de Cívicamente. Obtendrás civipuntos en diferentes acciones que realices, así que mucha suerte 🍀",
                label: true,
              },
              {
                text: "Más información",
                color: "blue",
                onClick: function () {
              }
              },
            ],
            [
              {
                text: "Cancelar",
                color: "blue",
              },
            ],
          ],
        });
      }

      // Open
      self.actionsToPopover.open();
    },
  },
  on: {
    pageBeforeRemove() {
      const self = this;
      if (self.actionsToPopover) {
        self.actionsToPopover.destroy();
      }
    },
  },
  computed: {
    ...mapGetters(["listUserWalletTransactions"]),
  },
});
</script>
