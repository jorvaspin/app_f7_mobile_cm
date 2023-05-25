<template>
  <f7-page no-toolbar no-navbar no-swipeback :page-content="false">
    <!-- <vue-headful :title="'Iniciar Sesión ' + $store.state.siteName" /> -->
    <div class="flex h-full login-bg">
      <div
        class="flex flex-col justify-center flex-1 px-6 lg:py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24"
      >
        <div class="w-full max-w-sm mx-auto lg:w-96">
          <div>
            <img
              src="/assets/images/civicamente-2021-apaisado.svg"
              class="w-auto h-20 mx-auto lg:h-20 lg:mx-0"
              width="250"
              alt="Cívicamente"
            />
            <h2 class="mt-6 text-3xl text-center font-display lg:text-left">
              <span
                class="flex justify-center my-2 text-sm text-indigo-500 uppercase lg:justify-start"
                >Acceder a mi cuenta</span
              >
              <span>Plataforma Estudiantes</span>
            </h2>
          </div>
          <div class="mt-6 lg:mt-12">
            <div class="relative">
              <form
                class="relative space-y-2 lg:space-y-6"
                id="FormLoginWeb"
                @submit.prevent="handleLogin"
              >
                <div>
                  <label for="uID" class="hidden text-sm font-bold lg:block">
                    Ingresa tu rut
                  </label>
                  <div class="mt-1">
                    <input
                      type="text"
                      id="uID"
                      required
                      v-model.trim="form.uID"
                      ref="inputFocus"
                      maxlength="18"
                      autocomplete="username"
                      placeholder="Ingresa tu rut"
                      class="form-control form-control-lg"
                    />
                  </div>
                </div>

                <div class="space-y-1">
                  <label
                    for="password"
                    class="hidden text-sm font-bold lg:block"
                  >
                    Ingresa tu contraseña
                  </label>
                  <div class="mt-1">
                    <input
                      id="password"
                      :type="showPass ? 'text' : 'password'"
                      v-model.trim="form.password"
                      required
                      maxlength="8"
                      autocomplete="current-password"
                      class="form-control form-control-lg"
                      placeholder="Ingresa tu contraseña"
                    />
                  </div>
                </div>

                <div class="flex items-center justify-between">
                  <div class="flex items-center my-4 lg:my-0">
                    <input
                      id="showPassLabel"
                      type="checkbox"
                      v-model="showPass"
                      class="hidden"
                    />
                    <f7-toggle v-model:checked="showPass" color="green" />
                    <!-- <f7-toggle name="showPass" id="showPassLabel" v-model:checked="showPass"></f7-toggle> -->
                    <label
                      @click="showPass != showPass"
                      for="showPassLabel"
                      class="relative px-1 my-2 ml-2 text-sm font-bold text-gray-700 dark:text-gray-200"
                    >
                      Mostrar contraseña
                    </label>
                  </div>
                </div>

                <div class="flex items-center justify-between">
                  <div class="text-sm">
                    <f7-link
                      no-link-class
                      tooltip
                      title="Ir al centro de ayuda"
                      @click.prevent="openActions"
                      class="text-xs font-bold text-blue-600 hover:text-blue-500 hover:underline"
                    >
                      ¿Olvidaste tu contraseña?
                    </f7-link>
                  </div>
                  <f7-button
                    large
                    preloader
                    v-on:click="clickButton"
                    :loading="isLoading"
                    type="submit"
                    class="flex items-center justify-center w-auto h-14 lg:w-full btn btn-success btn-lg"
                    :disabled="disabledSubmit"
                  >
                    <span class="-mb-0.5 leading-none">Acceder</span>
                    <i class="ml-2 fa-regular fa-arrow-right-long drop-shadow"></i>
                  </f7-button>
                </div>
              </form>
            </div>
            <div class="mt-5 lg:mt-12 lg:pt-5 lg:border-t lg:border-gray-300">
              <div class="hidden text-left lg:block">
                <p class="text-xs">
                  Te recomendamos utilizar Google Chrome (o algún otro navegador
                  moderno) para que tu experiencia sea óptima.<br />Si no lo
                  tienes
                  <f7-link
                    external
                    target="_blank"
                    class="text-blue-600 font-weight-bold"
                    href="https://www.google.com/intl/es-419/chrome/"
                    title="Descargar navegador Google Chrome"
                    >Descárgalo Aquí</f7-link
                  >
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="relative flex-1 hidden w-0 lg:block" v-if="device.desktop">
        <img
          class="absolute inset-0 object-cover w-full h-full"
          src="/assets/images/backgrounds/1541723568817-3bb3d2dd5505.jpeg"
          alt=""
        />
      </div>
    </div>
    <a
      class="absolute hidden w-32 bottom-3 right-3 lg:block"
      href="https://smarteducation.cl"
      target="_blank"
      ><img
        src="https://res.cloudinary.com/admsys-storage/image/upload/smarteducation/resources/images/smarteducation-alt.svg"
        class="w-full"
        width="200"
    /></a>
  </f7-page>
</template>
<script lang="ts">
import { defineComponent, nextTick, onMounted, ref, watchEffect } from "vue";
import { f7 } from "framework7-vue";
import { useStore } from "@/store/store";
import { getDevice } from "framework7/lite-bundle";
import authFunctions from "@/composables/useAuthFunctions";
import { AxiosError } from "axios";
import { format } from "rut.js";
import { Howl } from "howler";
import clickButtonBase64 from "@/assets/sounds/clickButtonBase64";

export default defineComponent({
  name: "login-cm-page",
  setup() {
    const store = useStore();
    const { login } = authFunctions();
    const showPass = ref(false);
    const device = getDevice();
    const inputFocus = ref();
    const isLoading = ref(false);
    const disabledSubmit = ref(false);
    const form = ref({
      uID: "",
      password: "",
    });
    function clickButton() {
      const sound = new Howl({
        src: [clickButtonBase64],
        volume: 0.5,
      });
      sound.play();
    }

    const handleLogin = async () => {
      try {
        isLoading.value = true;
        disabledSubmit.value = true;
        await login(form.value);
      } catch (err: any) {
        console.log(err);
        const error = err as AxiosError | undefined;
        isLoading.value = false;
        disabledSubmit.value = false;
        f7.dialog.close();
        f7.dialog.alert(error?.response?.data);
      }
    };

    watchEffect(() => {
      if (form.value.uID.length > 2) {
        form.value.uID = format(form.value.uID);
      }

      if (form.value.uID.length < 4 || form.value.password.length < 6) {
        disabledSubmit.value = true;
      } else {
        disabledSubmit.value = false;
      }
    });

    onMounted(() => {
      nextTick(() => {
        inputFocus.value.focus();
      });

      if (
        localStorage.name !== "undefined" &&
        localStorage.getItem("cm_formUID")
      ) {
        form.value.uID = localStorage.getItem("cm_formUID") || "";
      }
    });

    return {
      f7,
      device,
      inputFocus,
      isLoading,
      form,
      clickButton,
      handleLogin,
      store,
      showPass,
      disabledSubmit,
    };
  },
  methods: {
    openActions() {
      const self = this;
      const app = self.f7;

      if (!self.actionsToPopover) {
        self.actionsToPopover = app.actions.create({
          buttons: [
            [
              {
                text: "Si no recuerdas tu contraseña, envíanos una solicitud de asistencia.",
                label: true,
              },
              {
                text: "Enviar solicitud de asistencia",
                bold: true,
                color: "blue",

                onClick: function () {
                window.open('https://ayuda.civicamente.cl/forms/soporte', '_blank');
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
});
</script>
