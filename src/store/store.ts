import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex';
import { State } from "./interfaces/State";
import { User } from "./interfaces/User";
import { Defiant } from "./interfaces/Defiant";
import { getters } from './getters';
import dayjs from '../js/plugins/daysjs';

// define injection key
export const key: InjectionKey<Store<State>> = Symbol()

const getDefaultState = () => {
  return {
    appIsReady: false,
    // pathStatic: pathStatic,
    siteName: "| Cívicamente, Formación Ciudadana y Educación Cívica.",
    cm_access_token: "",
    logroDesbloqueado: {
      status: false,
      name: 'Nombre del logro',
    },
    duelsChallenge: {
      status: false,
      name: 'Nombre del logro',
    },
    loginState: false,
    user: {
      respuesta_token: false,
      uID: '',
      full_name: 'Estudiante',
      name: 'Estudiante',
      nick_or_name: 'Estudiante',
      nickname: 'nickname',
      puntaje_general: 0,
      comuna_nombre: 'comuna',
      duels: {
        finished: 0,
        active: 0,
        toPlay: 0,
      },
      curso: {
        nivel: {
          id: null
        }
      },
      last_game: 'Hoy',
      pais: {
        id: null,
        filename: null
      },
      rango: {
        value: 'Nivel',
      },
      wallet_amount: 0,
      achievements: {}
    },
    userListWalletTransactions: [],
    userListInventary: [],
    userLessonsLikes: [],
    userAchievements: [],
    userCurrentPrize: {},
      notifications: [],
      unread: 0,
    },
    settings: {
      HC_API_KEY: '',
      ACTIVAR_INVENTARIO: false,
      ACTIVAR_CATALOGO: false
    },
    nickActivo: {
      nickname: {
        style: ''
      }
    },
    temaActivo: {
      background: {
        leftbar: null,
        navbar: null
      }
    },
    openedSearhOpponent: false,
    duels: {
      duelosPorJugar: 0,
      buscandoOponente: false,
      dueloActivo: false,
      hash_trivia: '',
      // PREFIJO A JUGAR DEFIANT U OPPONENTE PARA CARGAR LA DATA
      // DEFIANT = TRUE (SOY DEFIANT)
      // DEFIANT = FALSE (SOY OPPONENT)
      defiantStatusPlay: true,
      defiant: {
        uID: '',
        full_name: 'Estudiante',
        puntaje_general: 0,
        comuna_nombre: 'comuna',
        duels: {
          finished: 0,
          active: 0,
          toPlay: 0,
        },
        curso: {
          nivel: {
            id: null
          }
        },
        last_game: 'Hoy',
        pais: {
          id: null,
          filename: null
        },
        rango: {
          filename: 'https://res.cloudinary.com/admsys-storage/image/upload/c_mpad,g_center,h_100,w_100,e_grayscale/smarteducation/masterbrain/civicamente-app/app-files/rangos/n1.png',
          next_level: 0,
          puntaje: 0,
          value: 'Nivel',
        },
        wallet_amount: 0,
        achievements: {}
      },
      opponent: {
        id: 0,
        name: '',
        avatar: '',
        activo: false
      }
    },

    formUser: {
      email: '',
      nickname: '',
      birthday: {
        day: new Date().getDay(),
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
      },
      pais: {
        id: 0,
        filename: ''
      }
    },
    //LESSONS
    lessonsGroups: {
      groupsCount: 0,
      groups: [],
    },
    lessonsKanban: {
      lessonsCount: null,
      lessons: [],
      thisMonth: undefined
    },
    lessonsPending: {
      lessonsCount: null,
      lessons: [],
    },
    lessonsFinished: {
      lessonsCount: null,
      lessons: [],
    },
    // trivia terminara para mostrar resultado
    activeTabResultadosTodos: true,
    activeTabResultadosCorrectas: false,
    activeTabResultadosIncorrectas: false,
    triviaFinalizada: {
      trivia: {},
      preguntas: [],
      correctas: 0,
      incorrectas: 0,
      tematica: {},
      idtematica: 0
    },
    // tof terminada para mostrar resultado
    activeTabResultadosTofTodos: true,
    activeTabResultadosTofCorrectas: false,
    activeTabResultadosTofIncorrectas: false,
    tofFinalizada: {
      trivia: {
        questions_summary: {
          correct:0,
          wrong: 0
        }
      },
      preguntas: []
    },
    // para cancelar el boton el jugar tematica una vez terminada
    ranking: [],
    listRankingNivelNacional: [],
    pruebaDiagnosticoTerminada: false,
    notaDG: 0,
    respuestaDG: 0,
    puntajeDG: 0,
    //musica y sonidos de la app
    onMusicApp: false,
    musicBackgroundApp: null,
    soundTriviaBackground: null,
    soundDueloBackground: null,
    listPaises: [],
    thisMonth: dayjs().subtract(1, "month").startOf("month").format('MMMM'),
    thisYear: new Date().getFullYear(),
    showDiagnosticTest: false,

    //categoria de avatar y avatar
    AvatarsCategories: [],
    listAvatars: [],
      buttonSound: null,
      soundModal: null,
      soundSheetModal: null,
      tapClick: null,
      tapClick2: null,
      errorNetwork: null,
      logroDesbloqueado: null
    },

    appDarkTheme: 'light-theme',

    //datos oponente localStorage

    idRetador: 0,
    hashAnfitrion: "",
    noticiaIdCivicamente: {},
    urlNoticia: "",

    seleccionamos_el_premio: "",
    statusPoll: false,
    desafioActivado: false,
    //tour
    isTerminateTour: null,
    myOptions: {
      useKeyboardNavigation: false,
      labels: {
        buttonSkip: "Salir",
        buttonPrevious: "Anterior",
        buttonNext: "Siguiente",
        buttonStop: "Terminar"
      }
    },
    // duels finidhed
    triviaDuelsFinalizada: {
      preguntas: [],
      trivia: {},
      correctas: 0,
      incorrectas: 0,
      duelo: {}
    },
    //data mobile
    modalAvatar: false,
    avatarSeleccionado: {},
    routeNombre: "",
    //estadisticas
    chartOptionsMensual: {
      chart: {
        id: "vuechart-example"
      }
    },
    seriesMensual: [{
      name: "Trivias",
      data: []
    }],
    triviasDataGrafico: [],
    meses_esp: [],
    loadingCharts: false,
    loadingApex: 1,
    loadingDataRankingNacional: false,
    drawer: false,
    tabMenu: "home",
    duelos_activos: 0,
    zindexbiblioteca: 1020,
    cantTematicasCompletadas: 0,

    cantTematicasPendientes: 0,

    notificationWithButton: null,
    dueloID: 0,
    retadorNickOrName: "",
    notificacionDuelo: {},
    disabledBiblioteca: false,
    disabledEstadisticas: false,
    // tematica completada
    tematica_completed: 0,
    tematica_completed_puntaje: 0,
    // list trivias finished
    triviasFinished: [],
    // list duels finished
    duelsFinished: []
  };
}
const state = getDefaultState();

const mutations = {
  RESET_STATE(state: any) {
    Object.assign(state, getDefaultState())
  },
  userLogged(state: any, user: User) {
    state.user = user;
    state.loginState = true;
  },
  userDefiant(state: any, defiant: Defiant) {
    state.defiant = defiant;
  },
  userLogOut(state: any) {
    state.loginState = false;
  },

  setLoadDataProfile(state: any) {
    if (store.state.user.birthday != null) {
      var cumpleSplit = store.state.user.birthday.split("-");
      state.formUser.birthday.day = cumpleSplit[0];
      state.formUser.birthday.month = cumpleSplit[1];
      state.formUser.birthday.year = cumpleSplit[2];
    }
    state.formUser.email = state.user.email;
    state.formUser.nickname = state.user.nickname;
    state.formUser.pais.id = state.user.pais_id;
  },

  setCuadroDeHonor(state: any, payload: any) {
    state.cuadroDeHonor = payload;
  },

  setTriviasFinished(state: any, payload: any) {
    state.triviasFinished = payload;
  },

  setDuelsFinished(state: any, payload: any) {
    state.duelsFinished = payload;
  },

  setLessonsKanban(state: any, payload: any) {
    state.lessonsKanban.lessonsCount = payload.lessonsCount;
    state.lessonsKanban.lessons = payload.lessons;
    state.lessonsKanban.thisMonth = payload.thisMonth;
  },
  setLessonsPending(state: any, payload: any) {
    state.lessonsPending.lessonsCount = payload.lessonsCount;
    state.lessonsPending.lessons = payload.lessons;
  },
  setLessonsFinished(state: any, payload: any) {
    state.lessonsFinished.lessonsCount = payload.lessonsCount;
    state.lessonsFinished.lessons = payload.lessons;
  },
  setLessonsGroups(state: any, payload: any) {
    state.lessonsGroups.groupsCount = payload.groupsCount;
    state.lessonsGroups.groups = payload.groups;
  },

  setNotifications(state: any, payload: any) {
    state.userListNotifications.notifications = payload.notifications;
    state.userListNotifications.unread = payload.unread;
  },

  setUserAchievements(state: any, payload: any) {
    state.userAchievements = payload;
  },

  setUserCurrentPrize(state: any, payload: any) {
    state.userCurrentPrize = payload;
  },

  setUserWalletTransactions(state: any, payload: any) {
    state.userListWalletTransactions = payload;
  },

  setAppBackgroundMusic(state: any, payload: any) {
    state.onMusicApp = payload;
  },

  setAppAchievements(state: any, payload: any) {
    state.appAchievements = payload;
  },

  setAppPrizes(state: any, payload: any) {
    state.appPrizes = payload;
  },

  setAppNews(state: any, payload: any) {
    state.appNews = payload;
  },

  setAppChests(state: any, payload: any) {
    state.appChests = payload;
  },

  setAppUserRanges(state: any, payload: any) {
    state.appUserRanges = payload;
  },

  setAppAvatarsCategories(state: any, payload: any) {
    state.AvatarsCategories = payload;
  },
  setAppListAvatars(state: any, payload: any) {
    state.listAvatars = payload;
  },

  setAppDarkTheme(state: any, payload: any) {
    state.appDarkTheme = payload;
  },

  //RANKINGS
  setRankingStats(state: any, payload: any) {
      state.listRankingNivelColegio = payload.local;
      state.listRankingNivelNacional = payload.nacional;
  },

};


const actions = {
  resetState({
    commit
  }: any) {
    commit('RESET_STATE');
  },
  userDefiant({
    commit
  }: any, defiant: any) {
    commit("userDefiant", defiant);
  },
  userLogged({
    commit
  }: any, user: any) {
    commit("userLogged", user);
  },
  userLogOut({
    commit
  }: any) {
    commit("RESET_STATE");
    commit("userLogOut");
  },
}

export const store = createStore<State>({
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations
});

export function useStore() {
  return baseUseStore(key)
}

export default store;
