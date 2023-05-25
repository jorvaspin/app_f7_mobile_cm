import { f7 } from "framework7-vue";
import { axiosApiInstance } from "../js/axios";
import store from "../store/store";

export async function lessonsGroups(amount_records = 0): Promise<void> {
    try {
        const {
            data
        } = await axiosApiInstance({
            method: 'post',
            url: '/api/auth/students/v3/user/library/lessons/groups',
            data: {
                amount_records
            }
        });
        // let listOfObjects = Object.keys(data.groups).map((key) => {
        //     return data.groups[key];
        // });
        store.commit({
            type: 'setLessonsGroups',
            groupsCount: data.groupsCount,
            groups: data.groups,
        });
        console.log("Cargamos las tematicas por grupo");
    } catch (error) {
        console.log(error);
    }
}

export async function lessonsKanban(): Promise<void> {
    try {
        const {
            data
        } = await axiosApiInstance({
            method: 'get',
            url: '/api/auth/students/v3/user/library/lessons/kanban'
        });
        store.commit({
            type: 'setLessonsKanban',
            lessonsCount: data.lessonsCount,
            lessons: data.lessons,
            thisMonth: (data.thisMonth) ?? '',
        });
        console.log('Cargamos las tematicas kanban');
    } catch (error) {
        console.log(error);
    }
}

export async function lessonsPending(): Promise<void> {
    try {
        const {
            data
        } = await axiosApiInstance({
            method: 'get',
            url: '/api/auth/students/v3/user/library/lessons/pending'
        })
        // vm.$store.state.lessonsPending = data.lessonsPending;
        store.commit({
            type: 'setLessonsPending',
            lessonsCount: data.lessonsCount,
            lessons: data.lessons,
        });
        console.log('Cargamos las tematicas pendientes');
    } catch (error) {
        console.log(error);
    }
};

export async function lessonsFinished(): Promise<void> {
    try {
        const {
            data
        } = await axiosApiInstance({
            method: 'get',
            url: '/api/auth/students/v3/user/library/lessons/finished'
        })
        store.commit({
            type: 'setLessonsFinished',
            lessonsCount: data.lessonsCount,
            lessons: data.lessons,
        });
        console.log("Cargamos las tematicas finalizadas");
    } catch (error) {
        console.log(error);
    }
};

export async function getLessons() {
    store.state.statusLoadPageLibrary = false;
    try {
        let isLoadPageLibrary = await Promise.all([
            lessonsKanban(),
            lessonsPending(),
            lessonsGroups(),
            lessonsFinished()
        ]);
        if(isLoadPageLibrary){
            //cambiamos esta variable a true al finalizar el proceso para que la pagina biblioteca oculte el loader
            store.state.statusLoadPageLibrary = true;
        }
    } catch (error) {
        console.log('no se pudieron refrescar los contenidos');
    }
};

export async function showLesson(slug: any, page = null, section: string) {
    // console.log(page);
    // const vm = this;
    // store.state.zindexbiblioteca = 1039;
    // localStorage.setItem('comenzar_tematica' + tematica.id + store.state.user.id, tematica.id + store.state.user.id);
    // store.state.grupoSlugTematica = tematica.slug;
    console.log('f7.views.get: ', f7.views.get);

    f7.views.current.router.navigate({
      name: 'cm.biblioteca.tematica',
      params: {
        slug: slug
      }
    });

    // if(page == 'biblioteca' || page == 'dashboard'){

    //   f7.views.current.router.navigate('/biblioteca/tematica/'+tematica.slug);

    // }else if(page == 'web-dashboard' || page == 'web-biblioteca' || page == 'web-grupos' || page == 'panel-tematicas-pendientes'){


    //   f7.views.current.router.navigate({
    //     name:'cm.biblioteca.tematica',
    //     clearPreviousHistory:true,
    //     params: { slug: tematica.slug }
    //   });

    // }else if(page == 'completadas'){
    //   f7.views.library.router.navigate('/biblioteca/tematica/'+tematica.slug)
    // }else if(page == 'grupos-tematicas'){
    //   f7.views.library.router.navigate('/inicio/grupostematicas/'+grupoid+'/tematica/'+tematica.slug)

    // }

  };