<template>
  <f7-page no-toolbar class="bg-pages cm-profile" style="--f7-page-toolbar-bottom-offset:0">
    <!-- <f7-navbar title="Información personal" back-link="Perfil" no-shadow no-hairline class="shadow-md"></f7-navbar> -->
    <f7-navbar title="Editar información personal" back-link>
    </f7-navbar>
     <div
      class="flex flex-row items-center justify-start gap-2 px-3 py-5 header-perfil"
    >
      <f7-link
        no-link-class
        href="./avatares/"
        class="relative flex items-center justify-center flex-shrink-0 h-20 w-26"
      >
        <span class="relative w-20 h-20 p-1 bg-white rounded-full user-avatar">
          <user-avatar :show-country="false"></user-avatar>
          <button
            type="button"
            class="absolute w-8 h-8 gap-1 rounded-full right-1 -bottom-2 btn-change-avatar btn btn-sm btn-primary"
          >
            <i class="fa-regular fa-pencil"></i>
          </button>
        </span>
      </f7-link>
      <div
        class="flex flex-col items-start justify-start flex-1 overflow-hidden text-left user-info text-ellipsis"
      >
        <h3 class="name">{{ user.full_name }}</h3>
        <h5 class="nickname">{{ user.nick_or_name }}</h5>
      </div>
    </div>
    <f7-block class="relative mb-0 bg-info-perfil">
      <div class="container relative max-w-lg">
        <formProfile></formProfile>
      </div>
    </f7-block>
  </f7-page>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import formProfile from "@components/user/profile/form.profile.vue";
import { mapState } from 'vuex';

export default defineComponent({
  props: [],
  components: {
    formProfile: formProfile
  },
  computed:{
    ...mapState(['user']),
  }
})
</script>
