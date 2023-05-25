import { Howl } from "howler";
import { AppAchievement, userAchievement } from "./Achievement";
import { AppNews } from "./AppNews";
import { AppChests } from "./AppChests";
import { FormUser } from "./FormUser";
import { User } from "./User";

export interface State {
  duels: {
    dueloActivo: boolean,
    hash_trivia: string
  },
  defiant: any;
  asignaturaTriviaTematica: Number;
  pusherApiKey?: string,
  vimeoApiKey?: string,
  vimeoEmbedApiKey?: string,
  appIsReady: boolean,
  siteName: string,
  logroDesbloqueado: {
    status: boolean,
    name: string,
    image: string,
    civipoints: number,
  },
  loginState: boolean,
  settings: {
    ACTIVAR_INVENTARIO: boolean,
    ACTIVAR_CATALOGO: boolean,
  },
  user: User,
  userListWalletTransactions: Array<object>,
  userListInventary: Array<object>,
  userLessonsLikes: Array<any>,
  userAchievements: Array<userAchievement>,
  userCurrentPrize: Object,
  userListDuelsPending: Array<any>,
  userListNotifications: {
    notifications: Array<object>,
    unread: number,
  },
  lessonsGroups: AreLessonsGroups,
  lessonsKanban: AreLessons,
  lessonsPending: AreLessons,
  lessonsFinished: AreLessons,
  //TRIVIAS
  triviaFinalizada: Object,
  //RANKINGS
  ranking: Array<any>,
  rankingMiCurso: Array<any>,
  cuadroDeHonor: Array<any>,
  notaDG: number,
  respuestaDG: number,
  puntajeDG: number,
  //musica y sonidos de la app
  musicBackgroundApp: Howl,
  soundTriviaBackground: Howl,
  soundDueloBackground: Howl,
  soundTriviaSuccess: Howl,
  soundTriviaFail: Howl,
  soundTriviaTimeOver: Howl,
  soundTriviaEnding: Howl,
  soundTriviaChangeQuestion: Howl,
  appAchievements: Array<AppAchievement>,
  appPrizes: Array<object>,
  appNews: Array<AppNews>, // LISTA DE LAS NOVEDADES
  appChests: Array<AppChests>, // LISTA DE LAS NOVEDADES
  appUserRanges: Array<AppUserRanges>, // LISTA DE LAS NOVEDADES
  appSounds: {
    buttonSound: Howl,
    soundModal: Howl,
    soundSheetModal: Howl,
    tapClick: Howl,
    tapClick2: Howl,
    errorNetwork: Howl,
    logroDesbloqueado: Howl,
  },
  showConfeti: boolean,
  listPaises: Array<object>,
  thisMonth: string,
  thisYear: number,
  showDiagnosticTest: boolean,
  AvatarsCategories: Array<AvatarCategories>,
  statusLoadPageDashboard: boolean,
  statusLoadPageLibrary: boolean,
  statusLoadPageStats: boolean,
  statusLoadPageProfile: boolean,
}
