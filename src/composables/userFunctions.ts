import { axiosApiInstance } from "@/js/axios";
import store from "@/store/store";
import { f7 } from "framework7-vue";
import { showAlertError } from "./useHelpersFunctions";


//USER NOTIFICATION FUNCTIONS
export async function getUserNotifications(): Promise<void> {
    try {
        const {
            data
        } = await axiosApiInstance({
            method: 'get',
            url: '/api/auth/students/v3/user/notifications'
        })

        store.commit({
            type: 'setNotifications',
            notifications: data.notifications,
            unread: data.unread,
        });
        // return data;
        console.log('Cargamos las notificaciones');
    } catch (error) {
        console.log(error);
    }
};

export function markAsRead(notification: any) {
    f7.dialog.preloader('Marcando como leído');
    axiosApiInstance({
        method: 'post',
        url: '/api/auth/students/v3/user/notifications/markAsRead/' + notification.uuid,
    }).then((response) => {
        store.commit({
            type: 'setNotifications',
            notifications: response.data.notifications,
            unread: response.data.unread,
        });
        f7.dialog.close();
        console.log('Elemento marcado como leido', notification);

        f7.toast.create({
            text: 'La notificación se marcó como leída',
            position: 'bottom',
            closeTimeout: 3000,
            destroyOnClose: true,
        }).open();
    }).catch((error) => {
        f7.dialog.close();
        showAlertError('Ocurrió un error y no se pudo completarse la operación.');
        console.log(error)
    })
};

export function deleteNotification(notification: any) {
    f7.dialog.preloader();
    axiosApiInstance({
        method: 'post',
        url: '/api/auth/students/v3/user/notifications/deleteNotification/' + notification.uuid,
    }).then((response) => {
        store.commit({
            type: 'setNotifications',
            notifications: response.data.notifications,
            unread: response.data.unread,
        })
        f7.dialog.close();
        f7.toast.create({
            text: 'La notificación se eliminó exitosamente',
            position: 'bottom',
            closeTimeout: 3000,
            destroyOnClose: true,
        }).open();
        console.log('Elemento eliminado', notification);
    }).catch((error) => {
        f7.dialog.close();
        showAlertError('Ocurrió un error y no se pudo completarse la operación.');
        console.log(error)
    })
};

export async function getUserAchievements() {
    try {
        const {
            data
        } = await axiosApiInstance({
            method: "get",
            url: "/api/auth/students/v3/user/achievements"
        });

        store.commit('setUserAchievements', data);

    } catch (error) {
        console.log(error);
        return error;
    }
};

export async function getUserWalletTransactions(): Promise<void> {
    try {
        const {
            data
        } = await axiosApiInstance({
            method: 'get',
            url: '/api/auth/students/v3/user/wallet/transactions'
        })
        store.commit('setUserWalletTransactions', data);
        console.log('Cargamos las transactions del wallet')
    } catch (error) {
        console.log('Ocurrió un error al traer las transacciones del wallet', error)
        // showAlertError(error);
    }
};

// stats user
export async function getMisStatsTematicas(cantTriviasFinished = 5): Promise<void> {

    try {
        const {
            data
        } = await axiosApiInstance({
            method: 'post',
            url: "/api/auth/students/v3/user/stats/trivias/thematic",
            data:{
              cantTriviasFinished: cantTriviasFinished
            }
        })
        return data;
    } catch (error) {
        console.log('Ocurrió un error al traer las trivias temáticas terminadas del alumno', error)
        // showAlertError(error);
    }
};
export async function getMisStatsNivelacion(cantTriviasFinished = 5): Promise<void> {
    try {
        const {
            data
        } = await axiosApiInstance({
            method: 'post',
            url: "/api/auth/students/v3/user/stats/trivias/leveling",
            data:{
              cantTriviasFinished: cantTriviasFinished
            }
        })
        console.log('Cargamos la data de stats nivelacion');
        return data;
    } catch (error) {
        console.log('Ocurrió un error al traer las trivias del alumno', error)
        // showAlertError(error);
    }
};
export async function getMisStatsTof(cantTriviasFinished = 5): Promise<void> {
    try {
        const {
            data
        } = await axiosApiInstance({
            method: 'post',
            url: "/api/auth/students/v3/user/stats/trivias/tof",
            data:{
              cantTriviasFinished: cantTriviasFinished
            }
        })
        return data;
    } catch (error) {
        console.log('Ocurrió un error al traer las trivias del alumno', error)
        // showAlertError(error);
    }
};
export async function getMisStatsDuelos(page = 1): Promise<void> {
    const dialogShowTriviasTerminadas = f7.dialog;
    dialogShowTriviasTerminadas.preloader('Cargando información...');
    try {
        const {
            data
        } = await axiosApiInstance({
            method: 'post',
            url: "/api/auth/students/v3/user/stats/trivias/duels?page=" + page
        })
        return data;
        dialogShowTriviasTerminadas.close();
    } catch (error) {
        console.log('Ocurrió un error al traer las trivias del alumno', error)
        // showAlertError(error);
    }
};

export async function getStatusDuels(): Promise<void> {
    try {
        const {
            data
        } = await axiosApiInstance({
            method: 'get',
            url: "/api/auth/students/v3/user/duels/status"
        })
        store.state.duelosPorjugar = data.duelosPorjugar;

        if (data.dueloActivo) {
          store.dispatch('userDefiant', data.defiant)
          store.state.duels.dueloActivo = true
          store.state.duels.hash_trivia = data.dueloActivo.trivia.trivia_hash
          store.state.duels.defiantStatusPlay = data.defiantStatusPlay
        } else {
          store.state.duels.dueloActivo = false;
        }
    } catch (error) {
        console.log('Ocurrió un error al ver si hay un duelo activo', error)
        // showAlertError(error);
    }
};

// TOMAMOS EL TOKEN POR DISPOSITIVO Y LOS ENVIAMOS PARA GUARDAR EN LA TABLA
// export async function sendDeviceTokenFCM(token = null): Promise<void> {
//     try {
//         const {
//             data
//         } = await axiosApiInstance({
//             method: 'post',
//             data: {
//               'token': token
//             },
//             url: "/api/auth/students/v3/user/fcm/saveTokenDevice"
//         })
//
//         console.log(data);
//
//
//     } catch (error) {
//         console.log('Ocurrió un error al ver si hay un duelo activo', error)
//         // showAlertError(error);
//     }
// };
