import { f7 }
  from 'framework7-vue';
import { mapState } from 'vuex';
import {
  axiosInstance,
  axiosApiInstance
} from '../js/axios';
import store from '../store/store';
import { showLesson } from "@/composables/useLessonsFunctions";

export default {
  setup() {
    return {
    }
  },
  data() {
    return {
    }
  },
  methods: {
    buttonClick: function () {
      appSounds.buttonSound.play();
      // navigator.vibrate(100);
    },

    tapClick: function () {
      appSounds.tapClick.play();
      // navigator.vibrate(100);
    },

    tapClick2: function () {
      appSounds.tapClick2.play();
      // navigator.vibrate(100);
    },

    sheetOpenSound: function () {
      appSounds.soundSheetModal.play();
    },

    modalOpenSound: function () {
      appSounds.soundModal.play();
    },

    errorNetwork: function () {
      appSounds.errorNetwork.play();
      navigator.vibrate(100);
    },

    strip_tags: function(input: string, allowed: string | string[]) {

      allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join(''); // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
      var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
        commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
      return input.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {
        return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
      });
    },

    // prueba de diagnosticoStatus
    diagnosticsStatus() {
      const vm = this;
      axiosApiInstance({
        method: 'post',
        url: '/api/auth/students/v3/user/diagnostics/status',
        data: {
          'tipo_trivia': 2,
          'asignatura': 1,
          'language': 1
        }
      }).then((response) => {

        showDiagnosticTest = true
        if (response.data) {
          if (response.data.trivia.trivia_hash) {
            pruebaDiagnostico = response.data.trivia.trivia_hash
          } else {
            pruebaDiagnostico = response.data.trivia
          }
        }
        if (f7.device.desktop) {
          f7.popup.open('.inicio-diagnostico');
        } else {
          f7.views.main.router.navigate('/IniciarDiagnostico');
        }

      }).catch((error) => {
        console.log(error)
      })
    },


    //METODOS ALUMNO

    async methodGetAvatar(): Promise<undefined> {
      const vm = this;
      try {
        const {
          data
        } = await axiosApiInstance({
          method: 'get',
          url: '/api/auth/students/v3/user/profile/avatar'
        })
        return data;
      } catch (error: any) {
        return error;
      }
    },


    //rutas menu
    goBack() {
      const vm = this;
      f7router.back()
      // triviaCompletada = false
      soundTriviaTimeOver.stop();
      soundTriviaBackground.stop();
      soundDueloBackground.stop();
      if (localStorage.getItem('cm_onMusicApp') === 'true' || localStorage.getItem('cm_onMusicApp') === 'true') {
        onMusicApp = true;
        localStorage.setItem("cm_onMusicApp", 'true');
        if (!musicBackgroundApp.playing()) {
          musicBackgroundApp.play();
          onMusicApp = true;
          localStorage.setItem("cm_onMusicApp", 'true');
        }
      } else {
        musicBackgroundApp.stop();
        onMusicApp = false;
        localStorage.setItem("cm_onMusicApp", 'false');
      }
    },

    goToLogin() {
      const vm = this;
      f7.views.current.router.navigate('/login/', {
        clearPreviousHistory: true
      })
    },

    // COFRES Y PREMIOS
    goToChests() {
      routeNombre = 'CatÃ¡logo de Cofres';
      f7.views.main.router.navigate({
        name: 'cm.chestsAvailable'
      });
    },
    goToInventary() {
      routeNombre = 'Mi inventario';
      f7.views.main.router.navigate({
        name: 'cm.inventaryPanel'
      });
    },

    //tabs menu lateral
    tabHome() {
      f7.tab.show('#tab-home');
    },
    tabBiblioteca() {
      f7.tab.show('#tab-biblioteca');
    },
    tabPerfil() {
      f7.tab.show('#tab-perfil');
    },
    tabEstadisticas() {
      f7.tab.show('#tab-estadisticas');
    },

    //grupos de tematicas
    async lessonsGroup(id: string) {
      try {
        const {
          data
        } = await axiosInstance({
          method: 'post',
          url: '/api/auth/students/v3/general/library/lessons/group',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('cm_access_token')
          },
          data: {
            'grupoid': id
          }
        })

      } catch (error) {
        console.log(error);
      }
    },

    async methodGetCountries() {
      try {
        const {
          data
        } = await axiosInstance({
          method: 'get',
          url: '/api/auth/students/v3/general/profile/countries',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('cm_access_token')
          }
        })
        return data;
      } catch (e) {
        return e;
      }
    },

    async profileShowAvatar(avatar: { id: string; }) {
      const vm = this;
      loadingDesc = true;
      htmlcontent = '';
      try {
        const {
          data
        } = await axiosInstance({
          method: 'get',
          url: '/api/auth/students/v3/user/profile/show-avatar/' + avatar.id,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('cm_access_token')
          }
        })
        avatarSelected = data;
        htmlcontent = "<div class='d-flex align-items-start'><img src=" + avatarSeleccionado.filename + " class='img-fluid'/><h3>" + avatarSeleccionado.nombre + "</h3></div>";
        loadingDesc = false;
      } catch (error) {
        console.log(error);
        this.showToast({
          text: 'Ha ocurrido un error al traer los datos de este personaje',
          type: 'error',
          position: 'bottom',
          closeTimeout: 6000,
        });
      }
    },


    updateAvatar(avatar: { id: any; }) {
      const vm = this;
      // window.$('body').addClass('overlaybg');
      f7.dialog.preloader('Actualizando tu avatar...');
      axiosApiInstance({
        url: '/api/auth/students/v3/user/profile/update_avatar',
        data: {
          avatar: avatar.id
        }
      }).then((response) => {
        f7.dialog.close();
        vm.getAvatarSelected(response.data.id);

      }).catch((error) => {
        console.log(error);
      })
    },

    async getAvatarSelected(id: any) {
      const vm = this;

      try {
        const {
          data
        } = await axiosApiInstance({
          method: 'get',
          url: '/api/auth/students/v3/user/profile/avatar'
        })
        user.user_avatar = data.avatar.filename;
      } catch (e) {
        vm.showToast({
          text: 'Ha ocurrido un error al guardar los cambios de tu avatar',
          type: 'error',
          position: 'bottom',
          closeTimeout: 6000,
        });
      }
    },

    //get grupo tematicas bibliotrca
    async lessonsGroupLibrary() {
      const vm = this;
      try {
        const {
          data
        } = await axiosApiInstance({
          method: 'get',
          url: '/api/auth/students/v3/user/library/lessons/group'
        })
        let listOfObjects = Object.keys(data.gruposTematicas).map((key) => {
          return data.gruposTematicas[key]
        })
        lessonsGroups = listOfObjects;
        tematicasGrupo = data.gruposTematicas;
        dificultadTematicas = data.dificultadTematicas;
      } catch (error) {
        console.log(error);
      }
    },

    async lessonsFinished() {
      const vm = this;
      try {
        const {
          data
        } = await axiosApiInstance({
          method: 'get',
          url: '/api/auth/students/v3/user/library/lessons/finished'
        })
        // lessonsFinished = data.tematicasCompletadas;
        store.commit("setLessonsFinished", data.tematicasCompletadas);
        cantTematicasCompletadas = data.cantTematicasCompletadas;
        console.log("Cargamos las tematicas finalizadas");
      } catch (error) {
        console.log(error);
      }
    },

    async LessonsPending() {
      const vm = this;
      try {
        const {
          data
        } = await axiosApiInstance({
          method: 'get',
          url: '/api/auth/students/v3/user/library/lessons/pending'
        })
        // lessonsPending = data.lessonsPending;
        store.commit("setLessonsPending", data.listTematicasPendientes);
        cantTematicasPendientes = data.cantTematicasPendientes;
        console.log('Cargamos las tematicas pendientes');
      } catch (error) {
        console.log(error);
      }
    },

    async lessonsKanban() {
      const vm = this;
      try {
        const {
          data
        } = await axiosApiInstance({
          method: 'get',
          url: '/api/auth/students/v3/user/library/lessons/kanban'
        });

        // thisMonth = data.mesActual;
        store.commit({
          type: 'setLessonsKanban',
          lessonsCount: data.cantidadTematicas,
          lessons: data.listTematicasKanban,
          thisMonth: data.mesActual,
        });
        setTimeout(function () {
          vm.cargamosKanban = 1;
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    },


    //FUNCIONES MIS STATS
    montlyTrivias() {
      const vm = this;
      axiosApiInstance({
        method: 'get',
        url: '/api/auth/students/v3/user/stats/trivias/monthly-chart'
      }).then((response) => {
        // success callback
        triviasDataGrafico = response.data.trivias;
        meses_esp = response.data.mesNombre;
        chartOptionsMensual = {
          xaxis: {
            categories: response.data.mesNombre
          }
        },
          seriesMensual = [{
            'name': 'Trivias jugadas',
            'data': this.triviasDataGrafico
          }];
        loadingCharts = true;
        this.$Progress.finish();
        loadingApex = 0;
      }).catch((error) => {
        console.log(error)
      })
    },

    // TRAEMOS LA TRIVIA FINALIZADA PARA MOSTRAR
    getTriviasResults(hash: string) {
      const vm = this;
      axiosApiInstance({
        method: 'post',
        url: '/api/auth/students/v3/user/trivias/results/' + hash,
        data: {
          hash: hash
        }
      }).then((response) => {

      }).catch((error) => {
        console.log(error);
        f7.toast.create({
          text: 'Ha ocurrido un error al traer la información de la trivia.',
          position: 'bottom',
          closeButton: true,
          closeButtonText: 'Cerrar',
          horizontalPosition: 'center',
          closeTimeout: 6000,
          cssClass: 'alert-notification alert-notification-error',
          destroyOnClose: true,
        }).open();
      })
    },
    // TRAEMOS EL TOF FINALIZADA PARA MOSTRAR
    getResultadoTofFinalizada(hash: string) {
      const vm = this;
      const dialogShowResultsTof = f7.dialog;
      dialogShowResultsTof.preloader('Cargando información...');
      axiosApiInstance({
        method: 'post',
        url: '/api/auth/students/v3/user/quiz_tof/results/' + hash,
        data: {
          hash: hash
        }
      }).then((response) => {
        tofFinalizada.trivia = response.data.trivia;
        tofFinalizada.preguntas = response.data.preguntas;
        dialogShowResultsTof.close();
      }).catch((error) => {
        console.log(error);
        f7.toast.create({
          text: 'Ha ocurrido un error al traer la información de la trivia tof.',
          position: 'bottom',
          closeButton: true,
          closeButtonText: 'Cerrar',
          horizontalPosition: 'center',
          closeTimeout: 6000,
          cssClass: 'alert-notification alert-notification-error',
          destroyOnClose: true,
        }).open();
      })
    },

    getTriviasThematic(page = 1) {
      const vm = this;
      overlay_show = true;
      overlay_show_resultados = true;
      isActiveMenu = 'tematicas';
      axiosApiInstance({
        method: 'get',
        url: '/api/auth/students/v3/user/stats/trivias/thematic?page=' + page
      }).then((response) => {
        trivias = response.data.trivias;
        pagination = response.data.pagination;
        overlay_show_resultados = false;
      }).catch((error) => {
        console.log(error)
      })
    },


    getStatsTriviasLeveling(page = 1) {
      const vm = this;
      overlay_show = true;
      overlay_show_resultados = true;
      isActiveMenu = 'nivelacion';
      axiosApiInstance({
        method: 'get',
        url: '/api/auth/students/v3/user/stats/trivias/leveling?page=' + page
      }).then((response) => {
        triviasTerminadas = response.data.trivias;
        laravelData = response.data.pagination;
        return response;
      }).catch((error) => {
        console.log(error)
      })
    },

    //MEJORES 5 LUGARES DEL TORNEO NACIONAL CIVICAMENTE
    rankingTopFives() {
      const vm = this;
      axiosApiInstance({
        method: 'get',
        url: '/api/auth/students/v3/general/stats/rankings/top-five'
      }).then((response) => {
        rankingTopFives = response.data;
        // $ranking_torneo = true;
      }).catch((error) => {
        console.log(error)
      })
    },

    // LOGRO CIUDADANO EJEMPLAR
    async ciudadanoEjemplarLogro() {
      const vm = this;
      try {
        const {
          data
        } = await axiosInstance({
          method: "get",
          url: "/api/auth/students/v3/user/achievements/achievement-ciudadano-ejemplar",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("cm_access_token")
          }
        });
      } catch (e) {
        return e;
      }
    },

  },
  computed: {
    ...mapState(['appSounds']),
  },
  mounted() {
    // console.log("Mounted from mixin");
  },
}
