//COMPONENTES MOBILE Y WEB
import Appbar from './navbar/appbar.vue';

// ESTADISTICAS
import RowUser from "./estadisticas/ranking/rowUser.component.vue";
import ListRankingColegio from './estadisticas/ranking/listRankingColegio.vue';
import ListRankingNacional from './estadisticas/ranking/listRankingNacional.vue';
import RankingNivelNacional from './estadisticas/views/RankingNivelNacional.vue';
import RankingNivelColegio from './estadisticas/views/RankingNivelColegio.vue';

//TEMATICA
import TematicaWebCard from './biblioteca/lesson-card.component.vue';
import TematicaWebCardSmall from './biblioteca/lesson-card-small.component.vue';
import sectionLessons from './biblioteca/SectionLessons.vue';

//TRIVIA
import LastQuestionMessage from "./trivia/LastQuestionMessage.vue";
import MessageConsecutiveCorrectAnswers from './trivia/MessageConsecutiveCorrectAnswers.vue';
import MessageQuizFinished from './trivia/MessageQuizFinished.vue';
import MessageQuizTofFinished from './trivia/MessageQuizTofFinished.vue';


//USER
import UserAvatar from "./user/avatar.vue";
import UserListAchievements from './user/listAchievements.component.vue';
import UserInfoEstablecimiento from './user/infoEstablecimiento.component.vue';
import UserInfoCurso from './user/infoCurso.component.vue';
import UserListDuelsPending from './user/listDuelsPending.component.vue';

//partials
// app.component("encuesta", () => import("../views/web/partials/Encuesta.vue").default);
//login view

//ACHIEVEMENTS
import ListAchievements from './achievements/listAchievements.component.vue';

import IsConnected from '@views/web/dashboard/conexion/IsConnected.vue';
//stado de la conexion a internet

// duelos
import CardGanadorDuelo from './duelos/CardGanadorDuelo.vue';
import CardPerdedorDuelo from './duelos/CardPerdedorDuelo.vue';
import CardDueloTrivia from './duelos/cardDueloTrivia.vue';
import CardRetadorDuelo from './duelos/CardRetadorDuelo.vue';
import CardContrincanteDuelo from './duelos/CardContrincanteDuelo.vue';
import CardAlumnoNormal from './duelos/CardAlumnoNormal.vue';
import CardMiniAlumnoNormal from './duelos/CardMiniAlumnoNormal.vue';
import MessageDuelsFinished from './duelos/MessageDuelsFinished.vue';

//ELEMENTS COMPONENTS
import BadgePrimary from "./badges/badge-primary.component.vue";
import BadgeLight from "./badges/badge-light.component.vue";
import BadgeSecondary from "./badges/badge-secondary.component.vue";
import BadgeWarning from "./badges/badge-warning.component.vue";
import BadgeSuccess from "./badges/badge-success.component.vue";
import BadgeMulticolor from "./badges/badge-multicolor.component.vue";
import BadgeChromatic from "./badges/badge-chromatic.component.vue";


//GENERALES
import ClosePanelButton from './page-panel/closePanelButton.component.vue';
import ClosePageButton from './page-panel/closePageButton.component.vue';
import ClosePopupButton from './page-panel/closePopUpButton.component.vue';
import VueAudio from './biblioteca/VueAudio.vue';
import AudioPlayer from './biblioteca/AudioPlayer.vue';
import CivipuntoIcon from './icons/civipunto.component.vue';



export {
    Appbar,
    RankingNivelNacional,
    RankingNivelColegio,
    ListRankingColegio,
    ListRankingNacional,
    RowUser,
    TematicaWebCard,
    TematicaWebCardSmall,
    sectionLessons,
    LastQuestionMessage,
    MessageConsecutiveCorrectAnswers,
    MessageQuizFinished,
    MessageDuelsFinished,
    MessageQuizTofFinished,
    UserAvatar,
    UserListAchievements,
    UserInfoEstablecimiento,
    UserInfoCurso,
    UserListDuelsPending,
    ListAchievements,
    IsConnected,
    CardGanadorDuelo,
    CardPerdedorDuelo,
    CardDueloTrivia,
    CardRetadorDuelo,
    CardContrincanteDuelo,
    CardAlumnoNormal,
    CardMiniAlumnoNormal,
    BadgePrimary,
    BadgeLight,
    BadgeSecondary,
    BadgeWarning,
    BadgeSuccess,
    BadgeMulticolor,
    BadgeChromatic,
    ClosePanelButton,
    ClosePageButton,
    ClosePopupButton,
    VueAudio,
    AudioPlayer,
    CivipuntoIcon
}
