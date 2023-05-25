import { GetterTree } from 'vuex'
import { State } from "./interfaces/State"
import { AreLessonsGroups } from "./interfaces/AreLessonsGroups"
import { AreLessons } from "./interfaces/AreLessons"
import { AppNews } from './interfaces/AppNews'
import { AppChests } from './interfaces/AppChests'
import { User } from "./interfaces/User"
import { Defiant } from "./interfaces/Defiant"
import { AppAchievement } from './interfaces/Achievement'
import { AvatarCategories } from './interfaces/CategoriesAvatars'
import { AppUserRanges } from './interfaces/AppUserRanges'

export type Getters = {
    getLoggedIn(state: State): boolean
    listNotifications(state: State): Array<string>
    listCuadroDeHonor(state: State): Array<any>
    listTriviasFinished(state: State): Array<any>
    listDuelsFinished(state: State): Array<any>
    listLessonsKanban(state: State): AreLessons
    listLessonsPending(state: State): AreLessons
    listLessonsFinished(state: State): AreLessons
    listLessonsGroups(state: State): AreLessonsGroups
    listRankingNivelColegio(state: State): Array<Object>
    listRankingNivelNacional(state: State): Array<Object>
    userRangoProgress(state: State): Number | undefined
    listUserAchievements(state: State): Array<any>
    listUserWalletTransactions(state: State): Array<any>
    listAppPrizes(state: State): Array<Object>
    listAppNews(state: State): Array<AppNews>
    listAppChests(state: State): Array<AppChests>
    listAppUserRanges(state: State): Array<AppUserRanges>
    listAppAvatarsCategories(state: State): Array<AvatarCategories>
    listAppAchievements(state: State): Array<AppAchievement>
}

export const getters: GetterTree<State, State> & Getters = {
    getLoggedIn: (state: { loginState: any; }) => {
        return state.loginState
    },
    listNotifications: (state: { userListNotifications: any; }) => {
        return state.userListNotifications;
    },
    listCuadroDeHonor: (state: { cuadroDeHonor: any; }) => {
        return (state.cuadroDeHonor.length) ? state.cuadroDeHonor : [];
    },
    listTriviasFinished: (state: { triviasFinished: any; }) => {
        return (state.triviasFinished.length) ? state.triviasFinished : [];
    },
    listDuelsFinished: (state: { duelsFinished: any; }) => {
        return (state.duelsFinished.length) ? state.duelsFinished : [];
    },
    listLessonsKanban: (state: { lessonsKanban: AreLessons; }) => {
        return state.lessonsKanban;
    },
    listLessonsPending: (state: { lessonsPending: AreLessons; }) => {
        return state.lessonsPending;
    },
    listLessonsFinished: (state: { lessonsFinished: AreLessons }) => {
        return state.lessonsFinished;
    },
    listLessonsGroups: (state: { lessonsGroups: AreLessonsGroups }) => {
        return state.lessonsGroups;
    },

    listRankingNivelColegio: (state: { listRankingNivelColegio: Array<Object>; }) => {
        return state.listRankingNivelColegio;
    },

    listRankingNivelNacional: (state: { listRankingNivelNacional: Array<Object>; }) => {
        return state.listRankingNivelNacional;
    },


    //USER GETTERS
    userRangoProgress: (state: { user: User; }) => {
        if (state.user.puntaje_general && state.user.rango) {
            return (state.user.puntaje_general / state.user.rango.next_level) * 100
        }
    },

    listUserAchievements: (state: { userAchievements: Array<any>; }) => {
        return state.userAchievements;
    },

    listUserWalletTransactions: (state: { userListWalletTransactions: Array<any>; }) => {
        return state.userListWalletTransactions;
    },


    //APP GETTERS
    listAppPrizes: (state: { appPrizes: Array<Object>; }) => {
        return state.appPrizes;
    },

    listAppNews: (state: { appNews: Array<AppNews>; }) => {
        return state.appNews;
    },

    listAppChests: (state: { appChests: Array<AppChests>; }) => {
        return state.appChests;
    },

    listAppUserRanges: (state: { appUserRanges: Array<AppUserRanges>; }) => {
        return state.appUserRanges;
    },

    listAppAvatarsCategories: (state: { AvatarsCategories: Array<AvatarCategories>; }) => {
        return state.AvatarsCategories;
    },

    listAppAchievements: (state: { appAchievements: Array<AppAchievement>; }) => {
        return state.appAchievements;
    },

}
