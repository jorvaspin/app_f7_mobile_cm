<template>
    <f7-page no-toolbar hide-navbar-on-scroll class="grupostematicas bg-global-app" id="grupoTematica"
    infinite
    :infinite-distance="50"
    :infinite-preloader="showPreloader"
    @infinite="loadMore"
    >
     <f7-navbar
      v-if="content.nombre"
      :title="content.nombre"
      back-link="Atrás"
      :sliding="false"
      class="shadow-lg font-display"
      style="background:transparent !important"
    ></f7-navbar>

        <div class="relative bg-center bg-cover header-grupos" :style="'background-image: url('+content.app_banner+');'">
            <div class="absolute inset-0 bg-gray-600 mix-blend-multiply"></div>
            <div class="relative skeleton-text skeleton-effect-blink" v-if="!content.nombre">
                <h2 class="mt-3 text-xl">
                    Titulo del grupo
                </h2>
                <div class="text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis et massa ac interdum.
                </div>
            </div>
            <div class="relative" v-else>
                <h2 class="flex mt-3 text-xl leading-none font-display">
                    <span class="flex-grow-0 w-16">
                        <span :class="content.icon" class="fa-xl"></span>
                    </span>
                    <span class="flex-1 flex-grow-1">{{content.nombre}}</span>
                </h2>
                <div class="text-sm">
                    <read-more more-str="Leer más" :text="content.description" link="#" :max-chars="250"></read-more>
                </div>
            </div>
        </div>
        <f7-list media-list class="skeleton-text skeleton-effect-blink" v-if="!listLessonsGroup.length">
        <f7-list-item
        v-for="(content, index) in 3"
        :key="index"
        title="Title"
        subtitle="Subtitle"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis et massa ac interdum."
        >
        <template #media>
            <div>
            <f7-skeleton-block style="width: 40px; height: 40px; border-radius: 50%"></f7-skeleton-block>
            </div>
        </template>
        </f7-list-item>
        </f7-list>
        <div v-else>
        <tematica-web-card-small v-for="(tematica,index) in listLessonsGroup" :key="index" :tematica="element" :page="page" :sectionName="sectionName"></tematica-web-card-small>
        </div>
    </f7-page>
</template>
<script>
import { axiosInstance } from '@/js/axios';
import {TematicaWebCardSmall} from '@components/GlobalComponents';
export default {
    props: [
        'sectionName'
    ],
    components: {
        TematicaWebCardSmall,
    },
    data() {
        return {
            showTematica: false,
            content:{
                description:''
            },
            listLessonsGroup:{},
            cantidadTematicas:0,
            numeroTematicas: 0,
            allowInfinite: true,
            showPreloader: true,
            overlay_show: true
        }
    },
    mounted() {
        const vm = this
        this.$store.state.routeNombre = 'Volver a la biblioteca'
        vm.$store.state.namePageprev = 'grupos'
        vm.getGrupoId()
    },


    created: function() {

    },

    updated: function() {

    },


    methods: {
        loadMore() {
            const vm = this;
            console.log("inivio");
            if (!vm.allowInfinite) return;
            vm.allowInfinite = false;
            console.log("entro a load more");
            setTimeout(() => {
                if (vm.listLessonsGroup.length >= vm.cantidadTematicas) {
                  console.log("entro al if de load more");
                    vm.showPreloader = false;
                    return;
                }
                vm.getGrupoId()
                console.log("paso abjo de get grupo");
                vm.allowInfinite = true;
            }, 1000);
        },
        tematicaInactiva() {
            this.$snotify.success('la temática se lanzará en poco tiempo para ser jugada.', 'Temática no disponible');
        },
        getMoreTematicas() {
            const vm = this
            vm.$f7.dialog.preloader('Cargando más información...')
            vm.getGrupoId()
        },
        async getGrupoId() {
            const vm = this;
            vm.$store.state.routeNombre = 'Volver a la biblioteca'
            vm.numeroTematicas = 10 + vm.numeroTematicas
            try {
                const { data } = await axiosInstance({
                    method: 'post',
                    url: '/api/auth/students/v3/general/library/lessons/group',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + vm.$localStorage.get('cm_access_token')
                    },
                    data: {
                        'grupoid': vm.$f7route.params.grupoid,
                        'numeroTematicas': vm.numeroTematicas
                    }
                })
                vm.$store.state.pageGrupos = 1;
                vm.$f7.dialog.close();
                vm.showTematica = true
                vm.overlay_show = false;
                vm.content = data.grupoTematica;
                vm.$store.state.grupoidActico = vm.$f7route.params.grupoid;
                vm.listLessonsGroup = data.listLessonsGroup;
                vm.cantidadTematicas = data.cantidadTematicas;
            } catch (e) {
                vm.data = null;
                vm.error = e;
            }
        },
    },
    computed:{

        }
}

</script>
