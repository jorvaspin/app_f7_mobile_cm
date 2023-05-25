<template>
  <div>
    <div
      name="Nuevatrivia"
      id="Nuevatrivia"
      v-if="
        this.$store.state.user.trivias_por_jugar == 0 ||
        this.$store.state.user.trivias_por_jugar < 0
      "
    >
      <input
        name="_token"
        type="hidden"
        value="3i4f1flmlNvIvEFEjDvSXodzmdWHkuCqdYfqBURl"
      />
      <input
        type="image"
        id="play_"
        @click="completeTrivias"
        name="play_"
        src="https://res.cloudinary.com/admsys-storage/image/upload/f_auto,q_auto:best/smarteducation/masterbrain/civicamente-app/app-files/perfil-alumno/boton-trivias-diarias-completadas.svg"
        class="inline-block w-full"
      />
      <input name="tipo_trivia" type="hidden" value="2" />
      <input name="asignatura" type="hidden" value="1" />
      <input name="language" type="hidden" value="1" />
    </div>
    <div name="Nuevatrivia" id="Nuevatrivia" v-else>
      <input
        name="_token"
        type="hidden"
        value="3i4f1flmlNvIvEFEjDvSXodzmdWHkuCqdYfqBURl"
      />
      <input
        type="image"
        id="play_"
        @click="createTriviaGeneral"
        name="play_"
        src="https://res.cloudinary.com/admsys-storage/image/upload/f_auto,q_auto:best/smarteducation/masterbrain/civicamente-app/app-files/perfil-alumno/boton-iniciar-trivia.svg"
        class="inline-block w-full"
      />
      <input name="tipo_trivia" type="hidden" value="2" />
      <input name="asignatura" type="hidden" value="1" />
      <input name="language" type="hidden" value="1" />
    </div>
  </div>
</template>
<script>
import { axiosInstance } from "@/js/axios";
export default {
  methods: {
    completeTrivias() {
      this.$snotify.success(
        "Ya has completado tus trivias generales.",
        "Felicidades"
      );
    },
    createTriviaGeneral() {
      const vm = this;
      if (Vue.localStorage.get("cm_access_token") != null) {
        this.$swal({
          title: "¿Cuánto sabes de Formación Ciudadana?",
          text: "Participa fuera de clases, sigue aprendiendo y acumula experiencia. ¿Comenzamos?",
          icon: "https://res.cloudinary.com/admsys-storage/image/upload/v1585130524/smarteducation/masterbrain/civicamente-v2/ruleta.svg",
          buttons: true,
          dangerMode: false,
          buttons: {
            cancel: {
              text: "Nooo, tengo miedo!",
              visible: true,
              closeModal: true,
            },
            confirm: {
              text: "Siii, comencemos!",
              className: "bg-green-500 hover:bg-green-600 px-5 py-4",
              closeModal: false,
            },
          },
          closeOnClickOutside: false,
          allowOutsideClick: false,
          closeOnEsc: false,
        }).then((onCreate) => {
          if (onCreate) {
            swal({
              icon: "success",
              title: "Trivia creada...",
              allowOutsideClick: false,
              buttons: false,
              text: "Redirigiendo a la trivia...",
            });

            setTimeout(function () {
              axiosInstance({
                method: "post",
                url: "/api/auth/students/v3/user/trivias/create",
                data: {
                  tipo_trivia: 2,
                  asignatura: 1,
                  language: 1,
                },
                headers: {
                  "Content-Type": "application/json",
                  Authorization:
                    "Bearer " + Vue.localStorage.get("cm_access_token"),
                },
              })
                .then((response) => {
                  // const vm = this;
                  vm.$swal.close();
                  // vm.$router.push({
                  //   name: "cm.trivia.hash",
                  //   params: { hash: response.data.jugartrivia }
                  // });
                  vm.$f7.views.main.router.navigate({
                    name: "cm.trivia.jugar",
                    params: { hash: response.data.jugartrivia },
                  });
                  console.log("redirigiendo a la trivia");
                })
                .catch((error) => {
                  console.log(error);
                });
            }, 800);
          }
        });
      } else {
        vm.$snotify.info(
          "Solo usuarios registrados pueden acceder a participar en las trivias.",
          "Inicia Sesión"
        );
      }
    },
  },
};
</script>
