import LoginPage from '@views/globals/LoginCmPage.vue';
import DashboardPage from '@/views/mobile/pages/PageDashboard.vue';
import LibraryPage from '@views/mobile/pages/biblioteca/PageLibrary.vue';
import StatsPage from '@views/mobile/pages/stats/PageStats.vue';
import ProfilePage from '@/views/mobile/pages/profile/PageProfile.vue';
import NotFoundPage from '../pages/404.vue';

import GruposTematicas from '@views/mobile/Dashboard/GruposTematicasMobile.vue';
import LessonsKanbanPage from '@views/mobile/pages/biblioteca/pageLessonsKanban.vue';
import LessonsPendingPage from '@views/mobile/pages/biblioteca/pageLessonsPending.vue';
import LessonsFinishedPage from '@views/mobile/pages/biblioteca/pageLessonsFinished.vue';
import LessonPage from '@views/mobile/pages/biblioteca/contentTematica.vue';

import EstadisticaTrivia from '@views/mobile/pages/stats/popupFinished/PopUpTriviaFinished.vue';

import store from '@/store/store';

function checkAuth({ to, from, resolve, reject }) {
  const router = this;
  if (store.state.loginState) {
    resolve()
  } else {
    reject();
    router.navigate({ name: 'login' });
  }
}

const routesMobile = [{
  path: '/',
  redirect: "/login/",
},
{
  path: '/login/',
  name: 'login',
  component: LoginPage,
  viewName: 'main',
  options: {
    transition: 'f7-dive',
  },
},
{
  path: '/dashboard/',
  name: "cm.dashboard",
  component: DashboardPage,
  // beforeEnter: checkAuth
},

//BIBLIOTECA
{
  path: '/biblioteca/',
  name: "cm.biblioteca",
  component: LibraryPage,
  // beforeEnter: checkAuth,
  routes: [
    {
      path: '/groups/:id/',
      name: 'biblioteca.groups',
      // component: GruposTematicas,
      asyncComponent: () => import('@/views/mobile/pages/biblioteca/pageLessonsGroup.vue'),
    },
    {
      path: '/kanban/',
      name: 'biblioteca.tematicaskanbanmes',
      // component: LessonsKanbanPage,
      asyncComponent: () => import('@/views/mobile/pages/biblioteca/pageLessonsKanban.vue'),
    },
    {
      path: '/pending/',
      name: 'biblioteca.tematicaspendientes',
      // component: LessonsPendingPage,
      asyncComponent: () => import('@/views/mobile/pages/biblioteca/pageLessonsPending.vue'),
    },
    {
      path: '/finished/',
      name: 'biblioteca.tematicascompletadas',
      // component: LessonsFinishedPage,
      asyncComponent: () => import('@/views/mobile/pages/biblioteca/pageLessonsFinished.vue'),
    },
    {
      path: '/tematica/:slug/',
      name: "cm.biblioteca.tematica",
      // component: LessonPage,
      asyncComponent: () => import('@views/mobile/pages/biblioteca/contentTematica.vue'),
      options: {
        transition: 'f7-cover-v',
        ignoreCache: true,
      }
    }]
},

{
  path: '/trivia/:hash',
  name: 'cm.biblioteca.trivia',
  asyncComponent: () => import('@/views/mobile/pages/biblioteca/PageTrivia.vue'),
  options: {
    transition: 'f7-cover-v',
  },
},
// quiz tof
{
  path: '/quiz_tof/:hash',
  name: 'cm.quiz.tof',
  asyncComponent: () => import('@views/mobile/pages/quiz_tof/TrueOrFalse.vue'),
  options: {
    transition: 'f7-cover-v',
  },
},
// duelos buscar oponente
{
  path: '/searchOpponent',
  name: 'cm.searchOpponent',
  asyncComponent: () => import('@views/globals/duelos/page/pageSearchOpponent.vue'),
  options: {
    transition: 'f7-cover-v',
  },
},
{
  path: '/triviaDuelo/:hash',
  name: 'cm.triviaduelo.jugar',
  asyncComponent: () => import('@views/mobile/pages/duels/PageTriviaDuels.vue'),
  options: {
    transition: 'f7-cover-v',
  },
},




//ESTADISTICAS
{
  path: '/estadisticas/',
  name: "cm.estadisticas",
  component: StatsPage,
  routes: [{
    path: '/results/:hash',
    component: EstadisticaTrivia,
    options: {
      transition: 'f7-cover-v',
    },
  },
  {
    path: '/rankingnivelcolegio/',
    name: 'inicio.rankingnivelcolegio',
    asyncComponent: () => import('@views/mobile/pages/stats/PageRankingNivelColegio.vue'),
    props: true
  },
  {
    path: '/rankingnivelnacional/',
    name: 'inicio.rankingnivelnacional',
    asyncComponent: () => import('@views/mobile/pages/stats/PageRankingNivelNacional.vue'),
    props: true
  },
  {
    path: '/triviasfinished/:value',
    name: 'inicio.triviasfinished',
    asyncComponent: () => import('@views/mobile/pages/stats/PageFinishedTrivias.vue'),
    props: true
  },]
},
//PERFIL USUARIO
{
  path: '/perfil/',
  name: "cm.perfil",
  component: ProfilePage,
  routes: [
    {
      path: '/datos-personales/',
      name: "cm.perfil.form",
      asyncComponent: () => import('@/views/mobile/pages/profile/PageEditForm.vue'),
      routes: [
        {
          path: '/avatares/',
          name: "cm.perfil.avatares",
          asyncComponent: () => import('@views/mobile/pages/profile/avatar/listAvatars.vue'),
          options: {
            transition: 'f7-cover-v',
          },
          routes: [{
            path: '/:avatarId',
            name: "cm.perfil.avatares.avatar",
            asyncComponent: () => import('@views/mobile/pages/profile/avatar/showAvatar.vue'),
            options: {
              transition: 'f7-cover-v',
            },
          }]
        },
      ]
    },

    {
      path: '/wallet/',
      name: "cm.perfil.wallet",
      asyncComponent: () => import('@/views/mobile/pages/profile/PageWallet.vue'),
    },
    {
      path: "/inventario/",
      name: "cm.perfil.inventaryPanel",
      asyncComponent: () => import('@/views/mobile/pages/profile/PageInventary.vue'),
    },
    {
      path: '/achievements/',
      name: "cm.perfil.logros",
      asyncComponent: () => import('@/views/mobile/pages/profile/PageAchievements.vue')
    },
    {
      path: '/duelosActivos/',
      name: "cm.perfil.duelosActivos",
      asyncComponent: () => import('@/views/mobile/pages/profile/pageDuelosActivos.vue'),
    },
    {
      path: '/catalogo/',
      name: "cm.perfil.catalogo",
      asyncComponent: () => import('@views/mobile/Dashboard/pageChests.vue'),
      options: {
        transition: 'f7-flip',
      }
    },
    {
      path: '/configuracion/',
      name: "cm.perfil.configuracion",
      asyncComponent: () => import('@/views/mobile/pages/profile/PageSettings.vue'),
    },
  ],
},

//GENERAL PAGES
{
  path: "/achievements/",
  name: "cm.achievements",
  asyncComponent: () => import('@views/mobile/pages/PageAchievements.vue')
},
{
  path: "/notifications/",
  name: "cm.notifications",
  asyncComponent: () => import('@/views/mobile/pages/PageNotifications.vue'),
  routes: [
    {
      path: '/notifications/dueloTerminado/:hash',
      name: 'cm.notifications.dueloTerminado',
      asyncComponent: () => import('@views/mobile/pages/duels/duelResult/DuelResult.vue'),
      options: {
        transition: 'f7-cover-v',
      },
    }
  ],
  options: {
    transition: 'f7-cover-v',
  },
},
{
  path: "/news/",
  name: "cm.news",
  asyncComponent: () => import('@/views/globals/pages/PageNews.vue'),
  options: {
    transition: 'f7-cover-v'
  },
},
{
  path: "/user-ranges/",
  name: "cm.user-ranges",
  asyncComponent: () => import('@/views/globals/pages/PageUserRanges.vue'),
  options: {
    transition: 'f7-cover'
  },
},
{
  path: "/encuesta/",
  name: "cm.encuesta",
  async({ resolve }) {
    const vueComponent = () => import('@/components/encuesta/encuesta.component.vue');
    vueComponent().then((vc) => {
      resolve({
        component: vc.default
      })
    });
  },
  options: {
    transition: 'f7-cover-v',
  },
},

// {
//   path: "/chestsAvailable/",
//   name: "cm.chestsAvailable",
//   component: ChestsAvailable,
//   options: {
//     transition: 'f7-cover-v',
//   },
// },
{
  path: '(.*)',
  component: NotFoundPage,
},
{
  scrollBehavior() {
    document.getElementById('app')?.scrollIntoView();
  }
}
];

export default routesMobile;
