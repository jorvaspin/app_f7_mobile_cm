<template>
  <f7-page class="cm-profile bg-pages">
    <f7-navbar>
      <f7-nav-left>
        <f7-block>
          <h4 class="font-display">{{ $t("profile.page_title") }}</h4>
        </f7-block>
      </f7-nav-left>
    </f7-navbar>

    <f7-list media-list class="mt-0 mb-4 account-page">
      <f7-list-item
        :title="full_name"
        :subtitle="$t('profile.main.list_menu.user_data.description')"
        chevron-center
        class="overflow-hidden bg-opacity-50"
        :style="
          userTheme != null
            ? 'background: url(' + userTheme.background.navbar + ');background-size: cover;color: white;'
            : ''
        "
        link="./datos-personales/"
      >
        <template #media>
          <div
            class="relative w-16 p-1 bg-white rounded-full"
          >
            <user-avatar></user-avatar>
          </div>
        </template>
      </f7-list-item>
    </f7-list>
    <!-- <f7-block-title>Más información</f7-block-title> -->
    <f7-list media-list inset class="my-0">
      <!-- <f7-list-item
          link="./datos-personales"
          title="Editar perfil"
          footer="Edita tu fecha de nacimiento, email, apodo y más."
        >
          <template #media>
            <span class="text-center w-9">
              <span class="text-center fal fa-user-circle fa-xl"></span>
            </span>
          </template>
        </f7-list-item> -->
      <f7-list-item
        chevron-center
        link="./wallet/"
        :title="$t('profile.main.list_menu.my_civipoints.title')"
        :footer="$t('profile.main.list_menu.my_civipoints.description')"
      >
        <template #media>
          <span class="text-center w-9">
            <civipunto-icon width="20"
                      height="20" class="w-8 h-8" />
          </span>
        </template>
      </f7-list-item>
      <f7-list-item
        chevron-center
        link="./inventario/"
        :title="$t('profile.main.list_menu.my_inventary.title')"
        :footer="$t('profile.main.list_menu.my_inventary.description')"
      >
        <template #media>
          <span class="text-center w-9">
            <span class="text-center fal fa-boxes-stacked fa-xl"></span>
          </span>
        </template>
      </f7-list-item>
      <f7-list-item
        chevron-center
        link="./achievements/"
        :title="$t('profile.main.list_menu.my_achievements.title')"
        :footer="$t('profile.main.list_menu.my_achievements.description')"
      >
        <template #media>
          <span class="text-center w-9">
            <img
              width="30"
              :src="iconAchievements"
              :alt="$t('profile.main.list_menu.my_achievements.title')"
              class="mx-auto"
            />
          </span>
        </template>
      </f7-list-item>
      <f7-list-item
        chevron-center
        :disabled="!settings.ACTIVAR_DUELOS"
        link="./duelosActivos/"
        :title="$t('profile.main.list_menu.my_duels.title')"
        :footer="$t('profile.main.list_menu.my_duels.description')"
      >
        <template #media>
          <span class="text-center w-9">
            <img
              width="40"
              :src="iconDuels"
              :alt="$t('profile.main.list_menu.my_duels.title')"
              class="mx-auto"
            />
          </span>
        </template>
        <div slot="after-title" v-if="!settings.ACTIVAR_DUELOS"><badge-primary>Próximamente</badge-primary></div>
      </f7-list-item>
    </f7-list>
    <div>
      <!-- <f7-block-title>Tienda</f7-block-title> -->
      <f7-list inset media-list class="my-4">
        <f7-list-item
          chevron-center
          link="./catalogo/"
          :title="$t('profile.main.list_menu.product_catalog.title')"
          :footer="$t('profile.main.list_menu.product_catalog.description')"
        >
          <template #media>
            <span class="text-center w-9">
              <span class="text-center fal fa-store fa-xl"></span>
            </span>
          </template>
        </f7-list-item>
      </f7-list>
    </div>
    <div>
      <!-- <f7-block-title>Configuración</f7-block-title> -->
      <f7-list inset chevron-center class="mt-0 mb-3">
        <f7-list-item
          link="./configuracion/"
          :title="$t('profile.main.list_menu.general_configuration.title')"
          :footer="
            $t('profile.main.list_menu.general_configuration.description')
          "
        >
          <template #media>
            <span class="text-center w-9">
              <span class="text-center fal fa-cog fa-xl"></span>
            </span>
          </template>
        </f7-list-item>
      </f7-list>
    </div>
    <f7-block class="my-10">
      <div class="flex justify-center max-w-lg mx-auto">
        <f7-link
          @click.prevent="handleLogout(), buttonClick()"
          class="flex items-center justify-center w-full gap-5 mx-12 btn btn-danger btn-lg"
          :text="$t('profile.main.logout_btn')"
        />
      </div>
    </f7-block>
  </f7-page>
</template>
<script lang="ts">
import { f7 } from "framework7-vue";
import { computed, defineComponent } from "vue";
import userAvatar from "@components/user/avatar.vue";
import authFunctions from "@/composables/useAuthFunctions";
import iconAchievements from '@assets/images/achievements/50-achievements.png';
import iconDuels from '@assets/images/duels/logo_duelos_civicos.svg';
import { useStore } from "@/store/store";
import { AxiosError } from "axios";
import { mapState } from "vuex";
export default defineComponent({
  name: "page-profile",
  components: {
    userAvatar,
  },
  setup() {
    const { logout } = authFunctions();
    const store = useStore();

    async function handleLogout() {
      try {
        await logout();
      } catch (err: any) {
        console.log(err);
        const error = err as AxiosError | undefined;
        f7.dialog.alert(error?.response?.data);
      }
    }

    return {
      f7,
      iconAchievements,
      iconDuels,
      handleLogout,
      showLogout: computed(() => store.state.loginState),
      userTheme: computed(() => store.state.temaActivo),
      nick_or_name: computed(() => store.state.user.nick_or_name),
      full_name: computed(() => store.state.user.full_name),
    };
  },

  data() {
    return {
      loadingPage: false,
      overlay_show: true,
    };
  },
  mounted() {
    console.log("Profile mounted");
    const vm = this;
    vm.loadingPage = true;
    vm.overlay_show = false;
  },

  created: function () {},

  updated: function () {
    const vm = this;
    this.$store.state.routeNombre = "Mi perfil";
  },

  methods: {},
  computed: {
    ...mapState(['settings']),
    comp_user_birthday() {
      let user_birthday = { day: Number, month: Number, year: Number };
      if (this.$store.state.user.birthday != null) {
        var cumpleSplit = this.$store.state.user.birthday.split("-");
        user_birthday.day = cumpleSplit[0];
        user_birthday.month = cumpleSplit[1];
        user_birthday.year = cumpleSplit[2];
      }
      return user_birthday;
    },
  },
});
</script>
<style lang="postcss">
.account-page {
  li.media-item {
    & .item-title {
      @apply text-xl font-bold tracking-tight;
    }
    & .item-inner {
      align-self: center;
    }
  }
}
</style>
