import { axiosApiInstance } from "@/js/axios";
import store from "@/store/store";
import { showAlertError } from "./useHelpersFunctions";

export async function getCuadroDeHonor() {
  try {
    const {
      data
    } = await axiosApiInstance({
      method: 'get',
      url: '/api/auth/students/v3/general/stats/rankings/honor'
    })
    store.commit("setCuadroDeHonor", data.cuadroDeHonor);
    console.log('Cargamos el cuadro de honor');
  } catch (error) {
    // showAlertError(error);
    console.log('Ocurrió un errror al cargar el cuadro de honor', error);
  }
};

export async function getMisStats(page = 1) {
  store.state.overlay_show = true;
  store.state.overlay_show_resultados = true;
  store.state.initTrivia = false;
  store.state.isActiveMenu = 'todas';

  try {
    const {
      data
    } = await axiosApiInstance({
      method: 'get',
      url: '/api/auth/students/v3/user/stats/trivias/me?page=' + page
    })
    store.state.triviasTerminadas = data.trivias;
    store.state.laravelData = data.pagination;
    store.state.rankingAcumuladoNivel = data.rankingAcumuladoNivel;
    store.state.inTodas = true;
    store.state.inTematicas = false;
    store.state.inDuelos = false;
    store.state.inNivelacion = false;
    store.state.overlay_show = false;
    store.state.overlay_show_resultados = false;
    store.state.loadingDataRanking = true;
  } catch (error) {
    console.log('Ocurrió un error al traer las estadísticas', error)
  }
};

//RANKING CURSOS COLEGIO Y NIVEL NACIONAL
export async function rankingStats() {
  store.state.statusLoadPageStats = false;
  try {
    const {
      data
    } = await axiosApiInstance({
      method: 'post',
      url: '/api/auth/students/v3/general/stats/rankings/anual'
    })
    store.commit({
      type: 'setRankingStats',
      local: await data.listRankingNivelColegio,
      nacional: await data.listRankingNivelNacional,
    });
    store.state.statusLoadPageStats = true;
    console.log('Cargamos las estadísticas nacionales');
  } catch (error) {
    console.log('Ocurrió un error al traer el ranking stats: ', error)
  }
};

export async function finishedTrivias(cantTriviasFinished = 5): Promise<void> {
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
        store.commit("setTriviasFinished", data.trivias);
    } catch (error) {
        console.log('Ocurrió un error al traer las trivias del alumno', error)
        // showAlertError(error);
    }
};

export async function finishedDuels(cantDuelFinished = 5): Promise<void> {
  try {
      const {
          data
      } = await axiosApiInstance({
          method: 'post',
          url: "/api/auth/students/v3/user/stats/trivias/duels",
          data:{
            cantDuelFinished: cantDuelFinished
          }
      })
      store.commit("setDuelsFinished", data.trivias_finished);
  } catch (error) {
      console.log('Ocurrió un error al traer las trivias del alumno', error)
      // showAlertError(error);
  }
};