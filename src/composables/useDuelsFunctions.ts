import { axiosApiInstance } from "@/js/axios";
import store from "@/store/store";
import { f7 } from "framework7-vue";
import { showAlertError } from "./useHelpersFunctions";

export async function searchOpponent(): Promise<String | any> {

    f7.dialog.preloader('Buscando oponente..')
    try {
        const {
            data
        } = await axiosApiInstance({
            method: 'get',
            url: '/api/auth/students/v3/user/duels/search-opponent',
        })

        return data;

    } catch (error) {
        f7.dialog.close();
        showAlertError('No se pudo crear el duelo');
        console.log('No se pudo crear el duelo:', error);
    }
}

export async function initDuels(): Promise<String | any> {

    try {
        const {
            data
        } = await axiosApiInstance({
            method: 'post',
            url: '/api/auth/students/v3/user/duels/create',
            data: {
              defiant: store.state.user.id,
              opponent: store.state.defiant.id,
              tipo_trivia: 2,
              asignatura: 1,
              language: 1
            }
        })
        store.state.duels.dueloActivo = true
        store.state.duels.hash_trivia = data.trivia_duelo_activo.trivia_hash;

    } catch (error) {
        f7.dialog.close();
        showAlertError('No se pudo crear el duelo');
        console.log('No se pudo crear el duelo:', error);
    }
}

// DUELOS PENDIENTES DE FINALIZAR
export async function getUserDuelsPending(): Promise<String | any> {

    try {
        const {
            data
        } = await axiosApiInstance({
            method: 'get',
            url: '/api/auth/students/v3/user/duels/pending',
        })
        var filtered = data.duelosUser.filter(function (el: any) {
          return el.duelo != null;
        });
        // return filtered;
        store.state.userListDuelsPending = filtered;

    } catch (error) {
        f7.dialog.close();
        showAlertError('No se pudo crear el duelo');
        console.log('No se pudo crear el duelo:', error);
    }
}

export async function acceptDuels(hash = null): Promise<String | any> {

    try {
        const {
            data
        } = await axiosApiInstance({
            method: 'get',
            url: '/api/auth/students/v3/user/duels/acceptDuels/' + hash,
        })
        return data;

    } catch (error) {
        f7.dialog.close();
        showAlertError('No se pudo crear el duelo');
        console.log('No se pudo crear el duelo:', error);
    }
}
