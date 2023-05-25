<template>
    <form @submit.prevent="updateUser(), buttonClick()">
  <div class="h-full pb-0 lg:overflow-y-auto lg:pb-28">
      <div
        class="flex flex-col gap-2"
        :class="device.desktop ? 'pb-32' : 'pb-2'"
      >
        <div class="card-form-group">
          <div class="space-y-1">
            <h5 class="mb-2 text-base font-display text-primary-100">
              Mis datos personales
            </h5>
            <h3 class="uppercase font-display">
              {{ store.state.user.full_name }}
            </h3>
            <h4 class="text-sm font-display">
              {{ store.state.user.uID }}
            </h4>
            <div class="flex flex-col">
              <div class="flex items-center w-full gap-4 mt-2 text-xs font-display text-secondary-100 dark:text-gray-300">
                <user-info-curso></user-info-curso>
                <user-info-establecimiento></user-info-establecimiento>
              </div>
            </div>
          </div>
        </div>
        <div class="card-form-group">
          <h5>
            Mi fecha de nacimiento
          </h5>
          <p class="description">Ingresa el día, mes y año que naciste</p>
          <div class="flex flex-row gap-1">
            <div class="flex-1">
              <select
                id="birthday.day"
                placeholder="Día"
                class="form-select"
                v-model="store.state.formUser.birthday.day"
              >
                <option selected value="0">Día</option>
                <option
                  :value="number"
                  v-for="(number, index) in 31"
                  :key="index"
                >
                  {{ number }}
                </option>
              </select>
            </div>
            <div class="flex-1">
              <select
                class="form-select"
                placeholder="Mes"
                v-model="store.state.formUser.birthday.month"
              >
                <option selected value="0">Mes</option>
                <option
                  :value="month[0]"
                  v-for="(month, index) in months"
                  :key="index"
                >
                  {{ month[1] }}
                </option>
              </select>
            </div>
            <div class="flex-1">
              <select
                class="form-select"
                placeholder="Año"
                v-model="store.state.formUser.birthday.year"
              >
                <option selected value="0">Año</option>
                <option
                  :value="year"
                  v-for="(year, index) in years"
                  :key="index"
                >
                  {{ year }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div>
          <div class="card-form-group">
            <h5>
              Mi email
            </h5>
            <p class="description">
              Podríamos enviarte información sobre tu avance en Cívicamente.
            </p>

            <input
              type="email"
              class="form-control"
              v-model="store.state.formUser.email"
              placeholder="Ingresa tu email.."
            />
          </div>
        </div>
        <div>
          <div class="card-form-group">
            <h5>
              Mi apodo
            </h5>
            <p class="description">¿Cómo quieres que te recuerden?</p>
            <input
              type="text"
              class="form-control"
              v-model="store.state.formUser.nickname"
              placeholder="Ingrese su apodo"
            />
          </div>
        </div>
        <div>
          <div class="card-form-group">
            <h5>Vengo de...</h5>
            <p class="description">¡Cuéntale al mundo tu país de origen!</p>
            <select
              class="form-select"
              placeholder="País"
              v-model="store.state.formUser.pais.id"
            >
              <option selected value="">Selecciona un país..</option>
              <option
                :value="country.id"
                v-for="(country, index) in store.state.listPaises"
                :key="index"
              >
                {{ country.text }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <div
        v-if="device.desktop"
        class="absolute inset-x-0 bottom-0 flex items-center py-5 text-center justify-content-center h-30 bg-gradient-to-t from-yellow-100"
      >
        <button type="submit" class="w-3/4 btn btn-success">
          Guardar mis cambios
        </button>
      </div>
      <div
        v-else
        class="sticky inset-x-0 bottom-0 bg-gradient-to-t from-panel dark:from-palette-dark-bg"
      >
      <div class="flex items-center text-center h-26 justify-content-center ">
        <button type="submit" class="w-full btn btn-success btn-lg">
          Guardar mis cambios
        </button>
      </div>
      </div>
  </div>
    </form>
</template>

<script lang="ts">
import { axiosApiInstance } from "@/js/axios";
import { computed, defineComponent } from "vue";
import {
  UserInfoCurso,
  UserInfoEstablecimiento,
} from "@components/GlobalComponents";
import { getDevice } from "framework7/lite-bundle";
import { f7 } from "framework7-vue";
import { showToast } from "@/composables/useHelpersFunctions";
import { getPaises } from "@/composables/useAppFunctions";
import store, { useStore } from "@/store/store";
export default defineComponent({
  setup() {
    const device = getDevice();
    const store = useStore();
    return {
      f7,
      store,
      device,
      years: computed(() => {
        const year = new Date().getFullYear() - 5;
        return Array.from(
          { length: year - 1979 },
          (value, index) => 1980 + index
        );
      }),
    };
  },
  components: {
    UserInfoCurso,
    UserInfoEstablecimiento,
  },
  data() {
    return {
      months: [
        ["01", "Enero"],
        ["02", "Febrero"],
        ["03", "Marzo"],
        ["04", "Abril"],
        ["05", "Mayo"],
        ["06", "Junio"],
        ["07", "Julio"],
        ["08", "Agosto"],
        ["09", "Septiembre"],
        ["10", "Octubre"],
        ["11", "Noviembre"],
        ["12", "Diciembre"],
      ],
    };
  },
  mounted() {
    const vm = this;
    getPaises();
    store.commit("setLoadDataProfile");
    // vm.methodLoadDataProfile();
  },
  methods: {
    updateUser() {
      const vm = this;
      f7.dialog.preloader("Actualizando tus datos personales.");
      var birthday = `${store.state.formUser?.birthday?.year}-${store.state.formUser?.birthday?.month}-${store.state.formUser?.birthday?.day}`;

      axiosApiInstance({
        method: "post",
        url: "/api/auth/students/v3/user/profile/user_update",
        data: {
          birthday: birthday,
          email: store.state.formUser.email,
          nickname: store.state.formUser.nickname,
          pais_id: store.state.formUser?.pais?.id,
        },
      })
        .then((response) => {
          if (response.data.badWord == 1) {
            // $("body").removeClass("overlaybg");
            f7.dialog.close();
            f7.dialog.alert(
              'El apodo que deseas usar contiene palabras inapropiadas 😧. Debes ingresar otro apodo o continuar con el mismo.', 'Apodo inapropiado'
            );
            //SE RESETEA EL NICKNAME CON EL VALOR ORIGINAL DEL USUARIO
            store.state.formUser.nickname = store.state.user.nickname;
          } else {
            store.dispatch('userLogged', response.data.user)

            f7.dialog.close();
            showToast({
              text: "Has actualizado tus datos correctamente.",
              closeTimeout: 4000,
            });
          }
        })
        .catch((error) => {
          console.log(error);
          f7.dialog.close();
          if (error.response.status == 422) {
            f7.dialog.alert(
              "El apodo que deseas usar contiene palabras inapropiadas. Debes ingresar otro apodo o continuar con el mismo."
            );
          } else {
            f7.dialog.close();
            f7.dialog.alert("El apodo ingresado ya existe! Intenta con otro.");
          }
        });
    },
  },
});
</script>
