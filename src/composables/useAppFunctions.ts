import { f7 } from "framework7-vue";
import { axiosApiInstance, axiosInstance } from "../js/axios";
import store from "../store/store";
import { showAlertError, showToast } from "./useHelpersFunctions";
import Pusher from 'pusher-js';
import { Howl, Howler } from "howler";
import clickButtonBase64 from "@/assets/sounds/clickButtonBase64";
import soundModalBase64 from "@/assets/sounds/soundModalBase64";
import InterfaceConfirm from "@/assets/sounds/interface-confirm.mp3";
import soundChangeQuestion from "@/assets/sounds/previews/36382008_shuffle-score_by_top-up-sounds_preview.mp3";
import soundTapClick from "@/assets/sounds/tap-click.mp3";
import soundTapClick2 from "@/assets/sounds/tap-click-2.mp3";
import soundErrorNetworkBase64 from "@/assets/sounds/soundErrorNetworkBase64";
import soundLogrosBase64 from "@/assets/sounds/soundLogrosBase64";
import { getUserNotifications } from "./userFunctions";
import axios from "axios";


Howler.autoUnlock = true;
Howler.html5PoolSize = 100;

const apiKey = store.state.pusherApiKey || '';
export const pusher = new Pusher(apiKey, {
    cluster: 'us2'
});
//TAKE SYSTEM NEWS
export async function getNews(maxRecords = 10): Promise<void> {
    try {
        const {
            data
        } = await axiosApiInstance({
            method: 'post',
            url: '/api/graphql',
            data: {
                query: `
                {
                    GetNews(first:${maxRecords}){
                        data{
                            uuid,
                            title
                            short_description,
                            description,
                            image_original,
                            image_main,
                            created_at
                        }
                    }
                }
                `
            }
        })
        store.commit('setAppNews', data.data.GetNews.data);
        console.log("Cargamos las news");
    } catch (error) {
        console.log('Error al cargar las news:', error);
    }
};

export async function listUserRanges(maxRecords = 10): Promise<void> {
    try {
        const {
            data
        } = await axiosApiInstance({
            method: 'post',
            url: '/api/graphql',
            data: {
                query: `
                {
                    listUserRanges(first:${maxRecords}){
                        data{
                            id
                            value
                            pointsRequired
                            filename
                        }
                    }
                }
                `
            }
        })
        store.commit('setAppUserRanges', data.data.listUserRanges.data);
        console.log("Cargamos los rangos de usuario");
    } catch (error) {
        console.log('Error al cargar los rangos de usuario', error);
    }
};

//TAKE SYSTEM ACHIEVEMENTS
export async function getAppAchievements(): Promise<void> {
    try {
        const {
            data
        } = await axiosApiInstance({
            method: "get",
            url: "/api/auth/students/v3/general/achievements"
        });
        store.commit('setAppAchievements', data);
        console.log("Cargamos los logros y recompensas del sistema.");
    } catch (error) {
        console.log(error);
    }
};

export async function getAvatarsCategories() {
    try {
        const {
            data
        } = await axiosApiInstance({
            method: 'get',
            url: '/api/auth/students/v3/general/profile/avatars_categories',
        })
        if (data) {
            store.commit('setAppAvatarsCategories', data);
            // store.commit('setAppListAvatars', data[0].avatars);
            store.state.activeID = data[0].id;
        }
    } catch (error) {
        console.log(error);
    }
};

export async function changeCategories(category: { id: any; avatars: any; }) {
    if (store.state.activeID != category.id) {
        store.state.listAvatars = [];
        setTimeout(function () {
            // this.isAvatar = true;
            store.state.listAvatars = category.avatars;
            store.state.activeID = category.id;
        }, 1);
    }
};

export async function getPusherChannels(): Promise<void> {

    // app.$nextTick(() => {
    const userId = store.state.user.id;
    const cursoId = store.state.user.curso_id;

    var channelNotificaciones = pusher.subscribe(
        "notifications-channel." + userId
    );

    channelNotificaciones.bind(
        "NotificacionesDuelosEvents",
        async () => {
            getUserNotifications();
        }
    );

    //CHANNEL LOGROS
    var channelLogros = pusher.subscribe(
        "recompensas-channel." + userId
    );
    channelLogros.bind("LogrosDesbloqueados", async (data: any) => {
        console.log(data);
        store.state.logroDesbloqueado.name = data.recompensa.name;
        store.state.logroDesbloqueado.image = data.recompensa.image;
        store.state.logroDesbloqueado.civipoints = data.recompensa.civipoints;
        store.state.user.wallet_amount = data.walletBalance;
        // Run the animations
        setTimeout(function () {
          store.state.logroDesbloqueado.status = true;
          store.state.appSounds.logroDesbloqueado.play();
        }, 800);
        // Hide the achievement
        setTimeout(function () {
          // $("#achievement-alert").fadeOut();
          store.state.logroDesbloqueado.status = false;
        }, 5000);
        // actualizamos los logros
        // getAppAchievements();
        // getUserAchievements();
    });


    //CHANNEL DUELS TIEMPO REAL NOTIFICATIONS
    // var channelLogros = pusher.subscribe(
    //     "recompensas-channel." + userId
    // );
    // channelLogros.bind("LogrosDesbloqueados", async (data: any) => {
    //     store.state.logroDesbloqueado.name = data.recompensa.name;
    //     store.state.logroDesbloqueado.image = data.recompensa.image;
    //     store.state.logroDesbloqueado.civipoints = data.recompensa.civipoints;
    //     store.state.user.wallet_amount = data.walletBalance;
    //     // showAchievement();
    //     // actualizamos los logros
    //     // getAppAchievements();
    //     // getUserAchievements();
    // });

    //CHANNEL AVATAR
    // var channelAvatar = pusher.subscribe(
    //     "avatar-channel." + userId
    // );
    // channelAvatar.bind("UpdateAvatarApps", async (data: any) => {
    //     store.state.user.user_avatar = data.avatar.filename;
    //     store.state.user.avatar_id = data.avatar.id;
    //     store.state.user.avatar = data.avatar;
    // });
    // if (!f7.device.desktop) {
    // f7.toast.create({
    //     text: 'Se ha activado la sincronización automática de tus datos en este dispositivo.',
    //     position: 'bottom',
    //     closeTimeout: 7000,
    //     closeButton: true,
    //     closeButtonColor: 'blue',
    //     closeButtonText: 'Cerrar',
    //     destroyOnClose: true,
    // }).open();
    f7.notification.create({
        icon: '<img src="https://res.cloudinary.com/admsys-storage/image/upload/c_scale,w_50/smarteducation/masterbrain/civicamente-app/public-images/favicon-2.png">',
        title: 'Cívicamente',
        titleRightText: 'ahora',
        subtitle: 'Sincronización automática',
        text: 'Se ha activado la sincronización automática de tus datos en este dispositivo.',
        closeOnClick: true,
        closeTimeout: 5000,
    }).open();
    // }
    // });
};



//SETEAMOS LOS SONIDOS PARA LA APP
export async function setSoundsApp() {

    axiosApiInstance({
        method: 'get',
        url: '/api/auth/getSoundsApp',

    }).then(response => {
        // musica de fondo para la app

        const musicBackgroundApp = new Howl({
            src: [response.data.musicBackgroundApp],
            loop: true,
            // volume: 0.5,
            preload: true,
            // html5: true
        });

        store.state.musicBackgroundApp = musicBackgroundApp;

        // SONIDOS DE LA TRIVIA

        // musica de fondo para la trivia
        const soundTriviaBackground = new Howl({
            src: [response.data.soundTriviaBackground],
            loop: true,
            // volume: 0.3,
            html5: true
        });
        // musica de fondo para la trivia de duelo
        const soundDueloBackground = new Howl({
            src: [response.data.soundDueloBackground],
            loop: true,
            // volume: 0.3,
            html5: true
        });

        // sonido respuesta correcta trivia
        const soundTriviaSuccess = new Howl({
            src: [response.data.soundTriviaSuccess],
            html5: true
        });
        // sonido respuesta incorrecta trivia
        const soundTriviaFail = new Howl({
            src: [response.data.soundTriviaFail],
            html5: true
        });
        // sonido de tiempo acabado trivia
        const soundTriviaTimeOver = new Howl({
            src: [response.data.soundTriviaTimeOver],
            html5: true
        });
        // sonido de trivia finalizada
        const soundTriviaEnding = new Howl({
            src: [response.data.soundTriviaEnding],
            html5: true
        });

        //setamos variables globales

        //sonidos y musica

        store.state.soundTriviaBackground = soundTriviaBackground;
        store.state.soundDueloBackground = soundDueloBackground;
        store.state.soundTriviaSuccess = soundTriviaSuccess;
        store.state.soundTriviaFail = soundTriviaFail;
        store.state.soundTriviaTimeOver = soundTriviaTimeOver;
        store.state.soundTriviaEnding = soundTriviaEnding;

    }).catch((error) => {
        console.log(error)
    })
    //

    // EFFECTO DE CARDS AL CAMBIAR DE PREGUNTA EN TRIVIA
    const soundTriviaChangeQuestion = new Howl({
        src: [soundChangeQuestion],
        volume: 0.4,
        preload: true,
    });
    store.state.soundTriviaChangeQuestion = soundTriviaChangeQuestion;

    // EFFECTO DE CLICK TABS
    const tapClick = new Howl({
        src: [soundTapClick],
        volume: 0.6,
        preload: true,
    });
    store.state.appSounds.tapClick = tapClick;

    const tapClick2 = new Howl({
        src: [soundTapClick2],
        volume: 0.6,
        preload: true,
    });
    store.state.appSounds.tapClick2 = tapClick2;

    // EFFECTO DE SONIDO CLICK BOTONES
    const clickButton = new Howl({
        src: [clickButtonBase64],
        volume: 0.6,
        preload: true,
    });
    store.state.appSounds.buttonSound = clickButton;


    // EFFECTO DE SONIDO PARA MODALS
    const soundModal = new Howl({
        src: [soundModalBase64],
        volume: 0.5,
        preload: true,
    });
    store.state.appSounds.soundModal = soundModal;

    // EFFECTO DE SONIDO PARA MODALS
    const soundSheetModal = new Howl({
        src: [InterfaceConfirm],
        volume: 0.5,
        preload: true,
    });
    store.state.appSounds.soundSheetModal = soundSheetModal;

    // EFFECTO DE SONIDO PARA ERROR DE RED
    const errorNetwork = new Howl({
        src: [soundErrorNetworkBase64],
        volume: 0.3
    });

    store.state.appSounds.errorNetwork = errorNetwork;

    // EFECTO DE SONIDO PARA LOGROS
    const logroDesbloqueado = new Howl({
        src: [soundLogrosBase64],
        volume: 0.6
    });
    store.state.appSounds.logroDesbloqueado = logroDesbloqueado;
};

// FUNCIONES PARA LOS SONIDOS GENERALES
// SONIDOS DE LA TRIVIA

export function quizResetSounds(isPlaying = false, musicOff = false) {
    isPlaying = true;
    if (!musicOff) {
        quizPlayBgSound();
    }
    quizStopTimeOverSound();
}

// duels sounds
export function quizResetDuelsSounds(isPlaying = false, musicOff = false) {
    isPlaying = true;
    if (!musicOff) {
        quizPlayDuelsBgSound();
    }
    quizStopTimeOverSound();
}

export function quizPlayDuelsBgSound() {
    // store.state.musicBackgroundApp.pause();
    store.state.musicBackgroundApp.stop();
    // console.log(localStorage.getItem('cm_onMusicApp'));
    if (!store.state.soundDueloBackground.playing()) {
        store.state.soundDueloBackground.play();
    } else {
        quizStopBgSound();
        store.state.soundDueloBackground.play();
    }
    store.state.onMusicApp = false;
    // store.state.soundDueloBackground.loop = true;
}

export function quizPauseDuelsBgSound() {
    store.state.soundDueloBackground.pause();
}

export function quizStopDuelsBgSound() {
    store.state.soundDueloBackground.stop();
}

// QUIZ SOUNDS
export function quizPlayBgSound() {
    // store.state.musicBackgroundApp.pause();
    store.state.musicBackgroundApp.stop();
    // console.log(localStorage.getItem('cm_onMusicApp'));
    if (!store.state.soundTriviaBackground.playing()) {
        store.state.soundTriviaBackground.play();
    } else {
        quizStopBgSound();
        store.state.soundTriviaBackground.play();
    }
    store.state.onMusicApp = false;
    // store.state.soundTriviaBackground.loop = true;
}

export function quizPauseBgSound() {
    store.state.soundTriviaBackground.pause();
}

export function quizStopBgSound() {
    store.state.soundTriviaBackground.stop();
}

export function quizPlaySoundChangeQuestion() {
    store.state.soundTriviaChangeQuestion.play();
}
export function quizStopSoundChangeQuestion() {
    store.state.soundTriviaChangeQuestion.stop();
}

export function quizStopAllSounds() {
    quizStopBgSound();
    quizStopDuelsBgSound();
    quizStopTimeOverSound();
    quizStopSoundChangeQuestion();
    // this.musicon = false;
    // this.musicoff = true;
    // showToast({ text: 'Sonido pausado' });
    // this.atras();
}

export function quizPlayTimeOverSound() {
    store.state.soundTriviaTimeOver.play();
}
export function quizStopTimeOverSound() {
    store.state.soundTriviaTimeOver.stop();
}

export const answerPlaySuccessSound = function () {
    store.state.soundTriviaSuccess.play();
}
export function answerPlayFailSound() {
    store.state.soundTriviaFail.play();
}
export function quizPlayEndingSound() {
    store.state.soundTriviaEnding.play();
}





// DATA GENERAL
export function getPaises() {
    axiosApiInstance({
        method: 'get',
        url: '/api/auth/students/v3/general/profile/countries'
    }).then((response) => {
        store.state.listPaises = response.data.paises;

    }).catch((error) => {
        console.log(error);
        showAlertError(error);
    })
};


//VIMEO API REQUEST
export const getVideoApiVimeo = async (id: string) => {
    const Token = store.state.vimeoApiKey;

    const response = await axios.get(`https://api.vimeo.com/videos/${id}`, {
        headers: {
            'Authorization': `Bearer ${Token}`,
        },
    });

    const mofifiedResponse = {
        link: response.data.files[0].link,
        type: response.data.files[0].type,
        image: response.data.pictures.sizes[2].link,
        stats: response.data.stats,
    };

    return mofifiedResponse;
};

export function embedVimeoApi(link: string) {
    axiosInstance({
        method: 'get',
        url: 'http://vimeo.com/api/oembed.json?url=' + link,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer' + store.state.vimeoEmbedApiKey
        }
    }).then((response) => {
        console.log(response.data);
    }).catch((error) => {
        console.log(error)
    })
}

//APP BACKGROUND SOUND FUNCTIONS

//activar desactivar musica app
export function toggleBackgroundSound(value: boolean) {
    if (value) {
        setBackgroundSound(true);
    } else {
        setBackgroundSound(false);
    }
};

export async function setBackgroundSound(value: boolean) {

    localStorage.setItem("cm_onMusicApp", new Boolean(value).toString());
    store.commit('setAppBackgroundMusic', value);

    const musicBg = await store.state.musicBackgroundApp;
    console.log('ingresamos al setBackgroundSound', musicBg);

    if (!musicBg.playing() && value === true) {
        store.state.musicBackgroundApp.volume(0.5);
        store.state.musicBackgroundApp.play();
        console.log('Activamos el play');
    } else if (musicBg.playing() && value === false) {
        store.state.musicBackgroundApp.pause();
        console.log('Activamos el stop');
    }
};

export async function getUserBackgroundMusicPreference() {

    if (localStorage.getItem("cm_onMusicApp") === 'true') {
        return true;
    } else {
        return false;
    }
};



//APP THEME
export async function toggleTheme(value: boolean) {
    if (value) {
        setTheme("dark-theme");
        console.log('Change to dark theme');
    } else {
        setTheme("light-theme");
        console.log('Change to light theme');
    }
}

export async function setTheme(theme: string) {

    localStorage.setItem("cm_userTheme", theme);
    store.commit('setAppDarkTheme', theme);

    if (theme === "dark-theme") {
        document.documentElement.classList.add("dark", "theme-dark");
    } else {
        document.documentElement.classList.remove("dark", "theme-dark");
    }
};

export async function getMediaPreference() {

    const hasDarkPreference = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const appTheme = localStorage.getItem("cm_userTheme");

    //SI EXISTE UN REGISTRO DEL THEME EN LOCALSTORAGE, LO TOMAMOS.
    if (appTheme) {
        store.commit('setAppDarkTheme', appTheme);
    }

    if ((hasDarkPreference && appTheme === 'dark-theme') || appTheme === 'dark-theme') {
        return "dark-theme";
    } else {
        return "light-theme";
    }
};

// Permisos para las notificaciones
export async function permissionNotifications() {
    // verificamos si el navegador lo soporta
    if (!window.Notification) {
        console.log("este navegador no soporta notificaciones");
        return;
    }

    if (Notification.permission == 'granted') {
        new Notification('Hola mundo - granted');
    } else if (Notification.permission == 'denied' || Notification.permission == 'default') {
        Notification.requestPermission(function (permission) {
            console.log(permission);

            if (permission == 'granted') {
                new Notification('Hola mundo - pregunta');
            }
        });
    }
};


//TAKE CHESTS FROM PRIZES
export async function getCofres(maxRecords = 10): Promise<void> {
  try {
      const {
          data
      } = await axiosApiInstance({
          method: 'post',
          url: '/api/graphql',
          data: {
              query: `
              {
                listChests(isActive:true, notFleeting:true){
                  data {
                    id
                    name
                    typeChest
                    imageUrl
                    description
                    amount
                    isActive
                    untilAt
                  }
                }
              }
              `
          }
      })
      console.log("Cargamos las cofres");
      console.log(data);
      return data.data.listChests.data;
      // store.commit('setAppChests', data.data.listChests.data);

  } catch (error) {
      console.log('Error al cargar las cofres:', error);
  }
};
// traemos los cofres que son fugazes
export async function getFleetingChests(maxRecords = 10): Promise<void> {
  const dialogGetChests = f7.dialog;
  dialogGetChests.preloader('Cargando contenido...');
  try {
      const {
          data
      } = await axiosApiInstance({
          method: 'post',
          url: '/api/graphql',
          data: {
              query: `
              {
                listChests(isActive:true, onlyFleeting:true){
                  data {
                    id
                    name
                    typeChest
                    imageUrl
                    description
                    amount
                    isActive
                    untilAt
                    timeUntil
                  }
                }
              }
              `
          }
      })
      console.log("Cargamos las cofres fugazes");
      return data.data.listChests.data;
      dialogGetChests.close();

  } catch (error) {
      console.log('Error al cargar las cofres:', error);
  }
};


export async function buyChest(chest_id = null, chest_amount = null, chest_name = null): Promise<any> {
    const dialogOpenChestBuy = f7.dialog;

    dialogOpenChestBuy.preloader('Abriendo cofre...');
    console.log(chest_id);
    console.log(chest_amount);
    console.log(chest_name);



    try {
        const {
            data
        } = await axiosApiInstance({
            method: 'post',
            url: '/api/auth/students/v3/user/chests/buy-chest',
            data: {
              id: chest_id,
              amount: chest_amount,
              name: chest_name
            },
        })

        dialogOpenChestBuy.close();
        return data;

    } catch (error) {
        f7.dialog.close();
        showAlertError('No se pudo comprar el cofre');
        console.log('No se pudo comprar el cofre:', error);
    }
}

export async function getCategoryPrizesChest(): Promise<any> {

    try {
        const {
            data
        } = await axiosApiInstance({
            method: 'get',
            url: '/api/auth/students/v3/user/inventary/category'
        })
        return data;

    } catch (error) {
        f7.dialog.close();
        showAlertError('No se pudo traer las categorias de los premios de cofres');
        console.log('No se pudo traer las categorias de los premios de cofres:', error);
    }
}

export async function getInventoryCagetory(unique_code = null): Promise<any> {
    const dialogChangeCategoryInventary = f7.dialog;

    dialogChangeCategoryInventary.preloader('Estamos filtrando los premios');

    try {
        const {
            data
        } = await axiosApiInstance({
            method: 'post',
            url: '/api/auth/students/v3/user/inventary/prizes-category',
            data: {
              unique_code: unique_code
            },
        })

        dialogChangeCategoryInventary.close();
        return data;

    } catch (error) {
        f7.dialog.close();
        showAlertError('No se pudo traer las categorias de los premios de cofres');
        console.log('No se pudo traer las categorias de los premios de cofres:', error);
    }
}

export async function usarCartaTema(id = null): Promise<any> {
    const dialogUsedTheme = f7.dialog;

    dialogUsedTheme.preloader('Estamos aplicando los cambios');

    try {
        const {
            data
        } = await axiosApiInstance({
          method: 'post',
          url: '/api/auth/students/v3/user/inventary/used-theme',
            data: {
              prize_id: id,
              prize_activo: store.state.temaActivo_id
            },
        })

        dialogUsedTheme.close();
        return data;

    } catch (error) {
        f7.dialog.close();
        showAlertError('No se pudo traer las categorias de los premios de cofres');
        console.log('No se pudo traer las categorias de los premios de cofres:', error);
    }
}


export async function usarCartaNickname(id = null): Promise<any> {
    const dialogUsedTheme = f7.dialog;

    dialogUsedTheme.preloader('Estamos aplicando los cambios');

    try {
        const {
            data
        } = await axiosApiInstance({
          method: 'post',
          url: '/api/auth/students/v3/user/inventary/used-nickname',
            data: {
              prize_id: id,
              prize_activo: store.state.nickActivo_id
            },
        })

        dialogUsedTheme.close();
        return data;

    } catch (error) {
        f7.dialog.close();
        showAlertError('No se pudo traer las categorias de los premios de cofres');
        console.log('No se pudo traer las categorias de los premios de cofres:', error);
    }
}
