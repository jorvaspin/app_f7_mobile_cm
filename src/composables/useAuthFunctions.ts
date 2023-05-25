import { f7 } from "framework7-vue";
import store from "../store/store";
import { axiosApiInstance, axiosInstance } from "../js/axios";
import { lessonsFinished, lessonsGroups, lessonsKanban, lessonsPending, getLessons } from "./useLessonsFunctions";
import { getNews, getPusherChannels, getUserBackgroundMusicPreference, setBackgroundSound, setSoundsApp } from "./useAppFunctions";
import { rankingStats, finishedTrivias, finishedDuels } from "./useStatsFunctions";
import { getUserNotifications, getStatusDuels } from "./userFunctions";
import { getUserDuelsPending } from "@/composables/useDuelsFunctions";
import { showAlertError } from "./useHelpersFunctions";
import { format } from 'rut.js';

export default function authFunctions() {

    async function login({ uID, password }: { uID: string, password: string }) {
        const dialogLoggingIn = f7.dialog;
        const dialogSyncDatos = f7.dialog;

        dialogLoggingIn.preloader('Iniciando sesión');

        //Formateamos el rut para dejarlo sin puntos.
        uID = format(uID, { dots: false });

        const { data } = await axiosInstance({
            method: 'post',
            url: '/api/auth/loginAlumno',
            data: {
                uID: uID,
                nickname: uID,
                password: password
            }
        });

        if (data.successfulAccess) {
            console.log('se accede al inicio de sesión');

            dialogLoggingIn.close();

            dialogSyncDatos.preloader('Estamos sincronizando tu información en este dispositivo...');

            localStorage.setItem('cm_access_token', data.access_token);
            localStorage.setItem('cm_formUID', uID); //Guardamos el UID en localstorage
            //GET DATA USER
            store.dispatch('userLogged', data.user)
            store.state.cm_access_token = data.access_token;
            store.state.userLessonsLikes = data.tematicasLikes;
            store.state.thisMonth = data.mes_actual;
            store.state.thisYear = data.year_actual;
            store.state.settings.ACTIVAR_TORNEO_NACIONAL = data.settings.ACTIVAR_TORNEO_NACIONAL;
            store.state.settings.ACTIVAR_DUELOS = data.settings.ACTIVAR_DUELOS;
            store.state.settings.ACTIVAR_INVENTARIO = data.settings.ACTIVAR_INVENTARIO;
            store.state.settings.ACTIVAR_CATALOGO = data.settings.ACTIVAR_CATALOGO;

            if (data.tema_activo !== null) {
                store.state.temaActivo = JSON.parse(data.tema_activo.value)
                store.state.temaActivo_id = data.tema_activo.id;
            }

            if (data.nick_activo !== null) {
                store.state.nickActivo = JSON.parse(data.nick_activo.value)
                store.state.nickActivo_id = data.nick_activo.id;
            }

            //CONSULTAMOS SI LA PRUEBA DE DIAGNOSTICO ESTA ACTIVA O NO FINALIZADA
            if (data.pruebaDiagnostico.active) {
                if (!data.pruebaDiagnostico.completed) {
                    // $("body").addClass("overhidden");
                    // f7.dialog.preloader('Iniciando test de diagnÃ³stico.');
                    // $store.state.showDiagnosticTest = true;
                    // vm.diagnosticoStatus();
                }
            }

            //ENVIAMOS AL DASHBOARD
            f7.views.main.router.navigate('/dashboard/',{
                clearPreviousHistory: true,
                reloadCurrent: true,
                ignoreCache: true,

            });

            await setSoundsApp();
            //GET DATA GENERAL
            getUserNotifications();
            getStatusDuels();
            getUserDuelsPending();
            getNews();

            //CARGAMOS LAS LESSONS
            await getLessons();

            //STATS
            rankingStats();

            // STATS -> FINISHED TRIVIAS
            finishedTrivias();
            finishedDuels();

            // vm.statusEncuesta(); // *******
            setTimeout(async function () {
                await getPusherChannels();
            }, 4000);


            //ESTABLECEMOS BACKGROUND MUSIC
            const initUserBackgroundMusic = await getUserBackgroundMusicPreference();
            setBackgroundSound(initUserBackgroundMusic);

            // vm.statusEncuesta();
            // vm.methodGetAvatar().then(response => {
            //   $store.state.user.user_avatar = response.avatar.filename
            // }).catch(e => {
            //   console.log(e);
            // });
            // inicializamos pusher

            dialogSyncDatos.close();

        } else {
            dialogLoggingIn.close();
            return false;
        }
    }
    async function loginStatus(): Promise<void> {
        const dialogConfirmDatos = f7.dialog;
        const dialogSyncDatos = f7.dialog;

        if (localStorage.getItem('cm_access_token') !== null && localStorage.getItem('cm_access_token') !== 'undefined') {

            try {
                dialogConfirmDatos.preloader('Confirmando tus datos...');
                const {
                    data
                } = await axiosInstance({
                    method: 'post',
                    url: '/api/auth/loginStatus',
                    data: {
                        token: localStorage.getItem('cm_access_token')
                    },
                    headers: {
                        "Content-Type": "application/json",
                        Authorization:
                            "Bearer " + localStorage.getItem("cm_access_token"),
                    },
                },
                );

                console.log('loginStatus desde el composable:', data);

                if (data.successfulAccess === true) {
                    console.log('ingresamos exitosamente a methodLoginStatus con respuesta_token TRUE');

                    dialogConfirmDatos.close();

                    dialogSyncDatos.preloader('Estamos sincronizando tu información en este dispositivo...');

                    store.dispatch('userLogged', data.user)
                    store.state.cm_access_token = data.access_token;
                    store.state.userLessonsLikes = data.tematicasLikes;
                    store.state.thisMonth = data.mes_actual;
                    store.state.thisYear = data.year_actual;
                    store.state.settings.ACTIVAR_TORNEO_NACIONAL = data.settings.ACTIVAR_TORNEO_NACIONAL;
                    store.state.settings.ACTIVAR_DUELOS = data.settings.ACTIVAR_DUELOS;
                    store.state.settings.ACTIVAR_INVENTARIO = data.settings.ACTIVAR_INVENTARIO;
                    store.state.settings.ACTIVAR_CATALOGO = data.settings.ACTIVAR_CATALOGO;

                    if (data.tema_activo !== null) {
                        store.state.temaActivo = JSON.parse(data.tema_activo.value)
                        store.state.temaActivo_id = data.tema_activo.id;
                    }

                    if (data.nick_activo !== null) {
                        store.state.nickActivo = JSON.parse(data.nick_activo.value)
                        store.state.nickActivo_id = data.nick_activo.id;
                    }

                    //ENVIAMOS AL DASHBOARD
                    // f7.views.main.router.navigate('/dashboard/');
                    f7.views.main.router.navigate('/dashboard/',{
                        clearPreviousHistory: true,
                        reloadCurrent: true,
                        ignoreCache: true,

                    });

                    // vm.getUserDuelsPending();
                    // vm.methodGetStatusDueloIniciado();
                    await setSoundsApp();
                    //GET DATA GENERAL
                    getUserNotifications();
                    getStatusDuels();
                    getUserDuelsPending();
                    await getNews();


                    //CARGAMOS LAS LESSONS
                    await getLessons();

                    //STATS
                    rankingStats();

                    // STATS -> FINISHED TRIVIAS
                    finishedTrivias();
                    finishedDuels();
                    // vm.statusEncuesta(); // *******

                    setTimeout(async function () {
                      await getPusherChannels();
                      // vm.getStatusDueloActivo();
                    }, 4000);

                    //ESTABLECEMOS BACKGROUND MUSIC
                    const initUserBackgroundMusic = await getUserBackgroundMusicPreference();
                    setBackgroundSound(initUserBackgroundMusic);

                    //CONSULTAMOS SI LA PRUEBA DE DIAGNOSTICO ESTA ACTIVA O NO FINALIZADA
                    if (data.pruebaDiagnostico.active) {
                        if (!data.pruebaDiagnostico.completed) {
                            // $("body").addClass("overhidden");
                            // f7.dialog.preloader('Iniciando test de diagnÃ³stico.');
                            // $store.state.showDiagnosticTest = true;
                            // vm.diagnosticoStatus();
                        }
                    }


                    // f7.dialog.close();
                    setTimeout(() => {
                        dialogSyncDatos.close();
                    }, 5000);
                    //SI EL TOKEN NO ESTA ACTIVO; ENTONCES LO ENVIAMOS AL LOGIN Y RESTAURAMOS TODO.
                } else {

                    console.log('Tu token de usuario no es válido. Debes volver a iniciar sesión.');
                    store.dispatch('userLogOut'); //Reestablece el Vuex Store con los parÃ¡metros originales.
                    localStorage.clear();
                    //REDIRECCIONAMOS AL LOGIN
                    f7.views.main.router.navigate('/login/');

                    dialogConfirmDatos.close();
                }

                //f7.dialog.close();
                // f7.dialog.close();

            } catch (error: any) {
                f7.views.main.router.navigate('/login/', {
                    clearPreviousHistory: true,
                    force: true
                });
                dialogConfirmDatos.close();
                console.log('catch async loginStatus from composable', error);
            }

            // f7.dialog.close();


        } else {
            //VOLVEMOS A LA PAGINA DEL LOGIN EN EL CASO QUE EL ACCESSTOKEN NO ESTE
            // f7.dialog.close();
            store.dispatch('userLogOut');
            f7.views.main.router.navigate('/login/', {
                clearPreviousHistory: true,
                force: true
            });
            // this.showAlertError('No existe un Token activo');
            console.log("Error al acceder. No existe access_token en localStorage");
        }
    }

    // login on resume
    async function loginResumeStatus(): Promise<void> {
        const dialogConfirmDatos = f7.dialog;
        const dialogSyncDatos = f7.dialog;

        if (localStorage.getItem('cm_access_token') !== null && localStorage.getItem('cm_access_token') !== 'undefined') {

            try {
                dialogConfirmDatos.preloader('Confirmando tus datos...');
                const {
                    data
                } = await axiosInstance({
                    method: 'post',
                    url: '/api/auth/loginResumeStatus',
                    data: {
                        token: localStorage.getItem('cm_access_token')
                    },
                    headers: {
                        "Content-Type": "application/json",
                        Authorization:
                            "Bearer " + localStorage.getItem("cm_access_token"),
                    },
                },
                );

                console.log('loginStatus desde el composable:', data);

                if (data.successfulAccess === true) {
                    console.log('ingresamos exitosamente a loginResumeStatus con respuesta_token TRUE');

                    dialogConfirmDatos.close();

                    dialogSyncDatos.preloader('Estamos sincroniizando tu información en este dispositivo...');

                    store.dispatch('userLogged', data.user)
                    store.state.cm_access_token = data.access_token;
                    store.state.thisMonth = data.mes_actual;
                    store.state.thisYear = data.year_actual;
                    store.state.settings.ACTIVAR_TORNEO_NACIONAL = data.settings.ACTIVAR_TORNEO_NACIONAL;
                    store.state.settings.ACTIVAR_DUELOS = data.settings.ACTIVAR_DUELOS;
                    store.state.settings.ACTIVAR_INVENTARIO = data.settings.ACTIVAR_INVENTARIO;
                    store.state.settings.ACTIVAR_CATALOGO = data.settings.ACTIVAR_CATALOGO;

                    // f7.dialog.close();
                    setTimeout(() => {
                        dialogSyncDatos.close();
                    }, 5000);
                    //SI EL TOKEN NO ESTA ACTIVO; ENTONCES LO ENVIAMOS AL LOGIN Y RESTAURAMOS TODO.
                } else {

                    console.log('Tu token de usuario no es válido. Debes volver a iniciar sesión.');
                    store.dispatch('userLogOut'); //Reestablece el Vuex Store con los parÃ¡metros originales.
                    localStorage.clear();
                    //REDIRECCIONAMOS AL LOGIN
                    f7.views.main.router.navigate('/login/');

                    dialogConfirmDatos.close();
                }

                //f7.dialog.close();
                // f7.dialog.close();

            } catch (error: any) {
                f7.views.main.router.navigate('/login/', {
                    clearPreviousHistory: true,
                    force: true
                });
                dialogConfirmDatos.close();
                console.log('catch async loginStatus from composable', error);
            }

            // f7.dialog.close();


        } else {
            //VOLVEMOS A LA PAGINA DEL LOGIN EN EL CASO QUE EL ACCESSTOKEN NO ESTE
            // f7.dialog.close();
            store.dispatch('userLogOut');
            f7.views.main.router.navigate('/login/', {
                clearPreviousHistory: true,
                force: true
            });
            // this.showAlertError('No existe un Token activo');
            console.log("Error al acceder. No existe access_token en localStorage");
        }
    }

    async function logout() {
        const dialogSignOffConfirm = f7.dialog;
        const dialogSignOff = f7.dialog;

        dialogSignOffConfirm.confirm('¿Realmente deseas cerrar tu sesión en este dispositivo?', 'Cerrando sesión', async function () {
            dialogSignOff.preloader('Cerrando sesión en este dispositivo...');
            try {
                const { data } = await axiosApiInstance({
                    method: 'get',
                    url: '/api/auth/logoutAlumno'
                });

                if (data.logout === true) {

                    f7.tab.show('#view-today');
                    f7.views.current.router.navigate('/login/', {
                        clearPreviousHistory: true
                    });
                    store.dispatch('userLogOut'); //Reestablece el Vuex Store con los parámetros originales.
                    localStorage.setItem('cm_access_token', 'undefined');
                    localStorage.setItem('user_id_session', 'undefined');
                    localStorage.setItem('tiempo_de_juego', '120000');
                    localStorage.setItem("cm_onMusicApp", 'false');
                    if (store.state.musicBackgroundApp.playing() || localStorage.getItem('cm_onMusicApp') === 'true') {
                        store.state.musicBackgroundApp.stop();
                    }
                    dialogSignOff.close();
                    console.log('Se cerró sesión exitosamente');

                } else if (data === false) {
                    dialogSignOff.close();
                    showAlertError('Ocurrió un error y no se ha podido cerrar sesión');

                    console.log('No se ha podido cerrar sesión');
                }
            } catch (error) {
                dialogSignOff.close();
                console.log(error);
            }
            dialogSignOffConfirm.close();
            dialogSignOff.close();

        });
    }

    async function isLoggedInResume() {
        if (localStorage.getItem("cm_access_token") !== null && localStorage.getItem("cm_access_token") !== "undefined") {
            console.log('ingresamos al loginStatus() desde el isLoggedIn()');
            await loginResumeStatus();
            return true;
        } else {
            f7.views.main.router.navigate("/login/", {
                reloadCurrent: true,
                clearPreviousHistory: true,
            });
            console.log('enviamos al login desde el isLoggedIn()');
            // return false;

        }
    }

    async function isLoggedIn() {
        if (localStorage.getItem("cm_access_token") !== null && localStorage.getItem("cm_access_token") !== "undefined") {
            console.log('ingresamos al loginStatus() desde el isLoggedIn()');
            await loginStatus();
            return true;
        } else {
            f7.views.main.router.navigate("/login/", {
                reloadCurrent: true,
                clearPreviousHistory: true,
            });
            console.log('enviamos al login desde el isLoggedIn()');
            // return false;

        }
    }


    return {
        login,
        loginStatus,
        isLoggedIn,
        isLoggedInResume,
        logout,
    };
}
