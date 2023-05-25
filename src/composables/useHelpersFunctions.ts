import store from "@/store/store";
import { f7 } from "framework7-vue";

export async function showAlertError(error: any) {
    try {
        f7.toast.create({
            text: error,
            position: 'bottom',
            closeButton: true,
            closeButtonText: 'Cerrar',
            horizontalPosition: 'center',
            closeTimeout: 4000,
            cssClass: 'alert-notification alert-notification-error',
            destroyOnClose: true,
        }).open();

    } catch (error) {
        console.log(error);
    }
};

export async function showToast({
    text = 'Message toast',
    type = 'success',
    position = 'top',
    closeButton = true,
    horizontalPosition = 'center',
    closeTimeout = 4000
}) {
    var alert_class = undefined;

    switch (type) {
        case 'success':
        default:
            alert_class = 'alert-notification-success';
            break;
        case 'warning':
            alert_class = 'alert-notification-warning';
            break;
        case 'info':
            alert_class = 'alert-notification-info';
            break;
        case 'error':
            alert_class = 'alert-notification-error';
            break;
    }

    try {
        f7.toast.create({
            text: text,
            position: position || "top",
            closeButton: closeButton,
            closeButtonText: 'Cerrar',
            closeButtonColor: 'blue',
            horizontalPosition: horizontalPosition || 'bottom',
            closeTimeout: closeTimeout,
            cssClass: 'alert-notification ' + alert_class,
            destroyOnClose: true,
        }).open();

    } catch (e) {
        console.log(e);
    }
};

export function methodLoadDataProfile() {
    //LLENAMOS EL FORMULARIO
    if (store.state.user.birthday != null) {
        var cumpleSplit = store.state.user.birthday.split("-");
        store.state.formUser.birthday.day = cumpleSplit[0];
        store.state.formUser.birthday.month = cumpleSplit[1];
        store.state.formUser.birthday.year = cumpleSplit[2];
    }
    store.state.formUser.email = store.state.user.email;
    store.state.formUser.nickname = store.state.user.nickname;
    store.state.formUser.pais.id = store.state.user.pais_id;

};