import { axiosApiInstance } from "@/js/axios";
import store from "@/store/store";
import { f7 } from "framework7-vue";
import { showAlertError, showToast } from "./useHelpersFunctions";
import { Prize } from "../@types/Prize";


export async function getPrizes(): Promise<void> {
    try {
        const {
            data
        } = await axiosApiInstance({
            method: 'get',
            url: '/api/auth/students/v3/general/prizes'
        })

        store.commit('setAppPrizes', data);
        console.log("cargamos los premios");

    } catch (error) {
        // showAlertError(error);
        console.log('Ocurrió un error al cargar los premios: ', error);
    }
};

//TRAE EL PREMIO SELECCIONADO ACTUAL DEL USUARIO
export async function currentPrize(): Promise<void> {
    try {
        const {
            data
        } = await axiosApiInstance({
            method: 'get',
            url: '/api/auth/students/v3/user/prizes/current-prize'
        })
        // vm.premio_selected = data.id;
        // vm.overlay_show = false;
        store.commit('setUserCurrentPrize', data);
        console.log('traemos el premio ya seleccionado del usuario');
    } catch (error) {
        // showAlertError(error);
        console.log('Ocurrió un error al traer el premio actual: ', error);
    }
};

export async function selectPrize(getPrize: { id: any; }) {
    try {
        f7.dialog.preloader('Seleccionando el premio...');
        const { data } = await axiosApiInstance({
            method: 'post',
            url: '/api/auth/students/v3/user/prizes/select-prize',
            data: {
                prize: getPrize.id
            }
        });
        if (data.status === 'update') {
            store.commit('setUserCurrentPrize', getPrize);
            console.log('getPrize', getPrize);
            console.log(data);
        }

    } catch (error) {
        showAlertError('Ocurrió un error al guardar los cambios: ' + error);
    }
};