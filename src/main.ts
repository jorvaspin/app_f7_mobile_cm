// Import Vue
import {
  createApp
} from 'vue';
import i18n from './i18n';

// Import Framework7
import Framework7 from 'framework7/lite-bundle';

// Import Framework7-Vue Plugin
import Framework7Vue, {
  registerComponents
} from 'framework7-vue/bundle';

// Import Framework7 Styles
import 'framework7/framework7-bundle.css';

// Import Icons and App Custom Styles
import './css/icons.css';
//IMPORTAMOS LOS STYLES
import './css/app.scss';
import './css/tailwind.css';
import './js/plugins/fontawesome';

import VueAnimXyz from '@animxyz/vue3';
import '@animxyz/core' // Import css here if you haven't elsewhere

import {
  UserAvatar,
  CivipuntoIcon,
  BadgePrimary,
  BadgeLight,
  BadgeSecondary,
  BadgeWarning,
  BadgeSuccess,
  BadgeMulticolor,
  BadgeChromatic,
} from './components/GlobalComponents';
import VueLoading from 'vue-loading-overlay';
import ReadMore from './js/plugins/read-more';
import dayjs from './js/plugins/daysjs';
import 'vue-transitions-css';
import VueCountdown from '@chenfengyuan/vue-countdown';
import "@lottiefiles/lottie-player";
// import LottieVuePlayer from "@lottiefiles/vue-lottie-player";
// import InstantSearch from 'vue-instantsearch/vue3/es';
// import './plugins/firebase';

// importamos los registros de SW
import './js/service-worker/app.js'
import './js/service-worker/caches.js'

// Import App Component
import mobileLayoutApp from './layouts/mobile.layout.vue';
import mixinFunctions from "./mixins/Mixins";
import filters from "./js/filters";
import { store, key } from "./store/store";

// Init Framework7-Vue Plugin
Framework7.use(Framework7Vue);
// Init App
const app = createApp(mobileLayoutApp);
// Register Framework7 Vue components
registerComponents(app);

//Mixin
app.mixin(mixinFunctions);

//Filtros generales
app.config.globalProperties.$filters = filters;
app.config.globalProperties.$dayjs = dayjs;
//Vuex
app.use(store, key);
app.use(i18n);
app.use(VueLoading);
app.use(ReadMore);
app.use(VueAnimXyz);
// app.use(InstantSearch);

//COMPONENTES GLOBALES MOBILE Y WEB
// app.component("font-awesome-icon", FontAwesomeIcon);
app.component('countdown', VueCountdown);
app.component("vue-loading", VueLoading);
app.component("user-avatar", UserAvatar);
// app.component("pagination", Pagination);
app.component("badge-primary", BadgePrimary);
app.component("badge-light", BadgeLight);
app.component("badge-secondary", BadgeSecondary);
app.component("badge-warning", BadgeWarning);
app.component("badge-success", BadgeSuccess);
app.component("badge-multicolor", BadgeMulticolor);
app.component("badge-chromatic", BadgeChromatic);
app.component("civipunto-icon", CivipuntoIcon);

// Mount the app
app.mount('#app');

// app.component(
//   "navbar-fixed", () => import('../components/navbar/fixed.vue')
// );

// app.component(
//   "appbar",
//   () => import("@components/navbar/appbar.vue").default
// );

// app.component(
//   "appbar-iphone",
//   () => import("../views/mobile/partials/appbarIphone.vue").default
// );

// app.component(
//   "card-menu-lateral",
//   () => import("../views/mobile/Dashboard/cardPerfilUsuario/CardMenuLateral.vue")
//   .default
// );


// // ESTADISTICAS
// app.component(
//   "ranking-nivel-nacional",
//   () => import("../components/estadisticas/views/RankingNivelNacional.vue")
//   .default
// );

// app.component(
//   "webscrol",
//   () => import("../views/web/pageScroll.vue")
//   .default
// );

// app.component(
//   "ranking-nivel-colegio",
//   () => import("../components/estadisticas/views/RankingNivelColegio.vue")
//   .default
// );

// // RANKING GLOBAL PARA LISTA
// app.component(
//   "list-ranking-colegio",
//   () => import("../components/estadisticas/rankings/listRankingColegio.vue")
//   .default
// );
// app.component(
//   "list-ranking-nacional",
//   () => import("../components/estadisticas/rankings/listRankingNacional.vue")
//   .default
// );


// // MODALS MENU
// app.component(
//   "modal-consejo",
//   () => import("../views/mobile/Dashboard/biblioteca/ModalConsejoMobile.vue").default
// );

// app.component(
//   "modal-premios-ganados",
//   () => import("../views/mobile/partials/ModalPremiosGanados.vue").default
// );

// app.component(
//   "modal-monedero",
//   () => import("../views/mobile/partials/ModalMonedero.vue").default
// );
// app.component(
//   "modal-mis-logros",
//   () => import("../views/mobile/partials/ModalMisLogros.vue").default
// );

// // MODALS TRIVIAS

// //Biblioteca
// app.component(
//   "modal-consejo-mobile",
//   () => import("../views/mobile/Dashboard/biblioteca/ModalConsejoMobile.vue")
//   .default
// );
// app.component(
//   "biblioteca-component-tematica-card",
//   () => import("../views/mobile/partials/biblioteca/tematicas/componentTematicaCard.vue")
//   .default
// );
// app.component(
//   "biblioteca-component-tematica-card-completadas",
//   () => import("../views/mobile/partials/biblioteca/tematicas/componentTematicaCardMiniCompletadas.vue")
//   .default
// );

// //notificaciones duelos

// //premios mobile
// app.component(
//   "alumno-premios-mobile",
//   () => import("../views/mobile/Dashboard/SelectPrizeMobile.vue").default
// );
// app.component(
//   "barra-back-mobile",
//   () => import("../views/mobile/partials/navbarBack.vue").default
// );
// //stado de la conexion a internet
// app.component(
//   "isconnected-mobile",
//   () => import("../views/mobile/Dashboard/conexion/IsConnectedMobile.vue")
//   .default
// );
// app.component(
//   "sidebar-notifications",
//   () => import("../views/mobile/partials/sidebarNotifications.vue").default
// );

// //TEMATICA
// app.component(
//   "likes-tematica",
//   () => import("@components/biblioteca/tematica/likes.component")
//   .default
// );

// import CantUsersTematica from '@components/biblioteca/tematica/cant-users.component.vue';
// app.component(
//   "cant-users-tematica", CantUsersTematica);

// import TematicaNumber from '@components/biblioteca/tematica/number.component.vue';
// app.component("tematica-number", import('@components/biblioteca/tematica/number.component.vue'));

// app.component(
//   "tematica-paso",
//   () => import("@components/biblioteca/tematica/paso-number.component.vue").default
// );

// app.component(
//   "tematica-badge-completed",
//   () => import("@components/biblioteca/tematica/badge-completed.component.vue").default
// );

// app.component(
//   "tematica-web-card",
//   () => import("../components/biblioteca/tematica-card.component.vue").default
// );

// app.component(
//   "tematica-web-card-small",
//   () => import("../components/biblioteca/tematica-card-small.component.vue").default
// );

// // app.component(
// //   "statusbar-ios",
// //   () => import("../views/mobile/partials/statusBarIos.vue").default
// // );
// // app.component(
// //   "statusbar-ios-morado",
// //   () => import("../views/mobile/partials/backTrivia.vue").default
// // );

// // WEB
// //partials
// app.component("encuesta", () => import("../views/web/partials/Encuesta.vue").default);
// //login view

// app.component(
//   "perfil-lateral",
//   () => import("../views/web/partials/sidebarLeft.vue").default
// );

// app.component(
//   "tourcivicamente",
//   () => import("../views/web/dashboard/TourCivicamente.vue").default
// );

// app.component(
//   "modal-duelo",
//   () => import("../views/web/dashboard/trivia/ModalDuelos.vue").default
// );
// app.component(
//   "modal-resultados-trivia",
//   () => import("../views/web/dashboard/ModalResultadosTrivia.vue").default
// );
// app.component(
//   "modal-noticias",
//   () => import("../views/web/dashboard/ModalNoticias.vue").default
// );
// app.component(
//   "notificaciones",
//   () => import("../views/web/dashboard/Notificaciones.vue").default
// );

// // NOVEDADES PLATAFORMA
// app.component("news", () => import("../views/globals/pages/news.vue").default);

// //result trivia individual
// app.component(
//   "resultado-trivia",
//   () => import("../views/web/dashboard/trivia/partials/ResultadoTrivia.vue").default
// );

// //result trivia individual
// app.component(
//   "resultado-duelo",
//   () => import("../views/web/dashboard/trivia/partials/ResultadoDuelo.vue").default
// );

// // import globalAlumnoRango from "@components/user/rango.vue";
// // app.component("global-alumno-rango", globalAlumnoRango);

// import AlumnoPremios from "@views/web/partials/dashboard/sectionPremios.vue";
// app.component("alumno-premios", AlumnoPremios);

// //contador
// app.component("count", () => import("../views/web/partials/countdown.vue").default);

// //progress top bar
// app.component(
//   "topbar",
//   () => import("../views/web/partials/progressbar.vue").default
// );

// // LOGROS
// import LogroDesbloqueado from '@/views/web/partials/logroDesbloqueado.vue';
// app.component(
//   "logro-desbloqueado", LogroDesbloqueado);

// //stado de la conexion a internet
// app.component(
//   "isconnected",
//   () => import("../views/web/dashboard/conexion/IsConnected.vue").default
// );

// // duelos
// app.component(
//   "card-ganador-duelo",
//   () => import("../components/duelos/CardGanadorDuelo.vue").default
// );
// app.component(
//   "card-perdedor-duelo",
//   () => import("../components/duelos/CardPerdedorDuelo.vue").default
// );

// // card individual
// app.component(
//   "card-duelo-trivia",
//   () => import("../components/duelos/cardDueloTrivia.vue").default
// );

// app.component(
//   "card-retador-duelo",
//   () => import("../components/duelos/CardRetadorDuelo.vue").default
// );
// app.component(
//   "card-contrincante-duelo",
//   () => import("../components/duelos/CardContrincanteDuelo.vue").default
// );

// // card buscando oponente
// app.component(
//   "card-alumno-normal",
//   () => import("../components/duelos/CardAlumnoNormal.vue").default
// );
// app.component(
//   "card-mini-alumno-normal",
//   () => import("../components/duelos/CardMiniAlumnoNormal.vue").default
// );

// app.component(
//   "popup-diagnostico-nota",
//   () => import("../views/web/dashboard/diagnostico/popupDiagnosticoNota.vue").default
// );

// // diagnostivo mobile
// app.component(
//   "popup-diagnostico-nota-mobile",
//   () => import("../views/mobile/Dashboard/diagnostico/popupDiagnosticoNota.vue")
//   .default
// );
// app.component(
//   "popup-diagnostico-inicio-mobile",
//   () => import("../views/mobile/Dashboard/diagnostico/popupIniciarDiagnostico.vue")
//   .default
// );

// //VIEW COMPONENTS
// app.component(
//   "badge-primary",
//   () => import("@components/badges/badge-primary.component.vue").default
// );
// app.component(
//   "badge-light",
//   () => import("@components/badges/badge-light.component.vue").default
// );
// app.component(
//   "badge-secondary",
//   () => import("@components/badges/badge-secondary.component.vue").default
// );
// app.component(
//   "badge-warning",
//   () => import("@components/badges/badge-warning.component.vue").default
// );
// app.component(
//   "badge-success",
//   () => import("@components/badges/badge-success.component.vue").default
// );
// app.component(
//   "badge-multicolor",
//   () => import("@components/badges/badge-multicolor.component.vue").default
// );

// app.component(
//   "user-info-establecimiento",
//   () => import("@components/user/infoEstablecimiento.component.vue").default
// );
// app.component(
//   "user-info-curso",
//   () => import("@components/user/infoCurso.component.vue").default
// );

// app.component(
//   "user-list-achievements",
//   () => import("@components/user/listAchievements.component.vue").default
// );

// app.component(
//   "user-list-duels-pending",
//   () => import("@components/user/listDuelsPending.component.vue").default
// );

// app.component('vue-audio', () => import("@components/biblioteca/VueAudio.vue").default);

// //GENERALES
// app.component('close-panel-button', () => import("@components/page-panel/closePanelButton.component.vue").default);
// app.component('close-page-button', () => import("@components/page-panel/closePageButton.component.vue").default);
// app.component('close-popup-button', () => import("@components/page-panel/closePopUpButton.component.vue").default);
