<template>
    <div class="dashboard-contenedor-premios-mobile" v-bind:class="{ 'waiting-premios': loading_init }">
        <h4 class="p-3 mx-auto text-center d-flex align-items-center justify-content-center w-75 ancho-maximo-mobile">Recuerda seleccionar tu premio del mes</h4>
        <div class="row" style="position:relative;">
          <b-overlay :show="overlay_show" no-wrap></b-overlay>
            <div class="col-12" v-for="premio in $store.state.listPrizes" v-bind:key="premio.id">
                <div class="mb-4 card prize-card">
                    <div class="row no-gutters">
                        <div class="col-4 prize-img" :style="'background-image: url('+premio.imagen_url+');'"></div>
                        <div class="col-8">
                            <div class="p-3 card-body">
                                <div class="row no-gutters">
                                    <div class="col">
                                        <h5 class="card-title-premio">
                                            {{ premio.value }}
                                        </h5>
                                    </div>
                                </div>
                                <div class="row no-gutters">
                                    <div class="col">
                                        <div class="py-2 text-normal descripcionPremio">
                                            <span v-html="premio.descripcion.substring(0,55)+'...'"></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex align-items-center justify-content-between">
                                    <span class="label-gradient label-secondary" style="width: 90px;margin-right: 5px;">{{premio.puntos_requeridos}} XP</span>
                                    <button class="btn btn-warning" :disabled="premio.id == premio_selected" :class="{ 'btn-default animated shake': premio.id == premio_selected }" @click.prevent="buttonClick()" v-on:click.prevent="selectPrize(premio)">
                                        <span v-if="premio.id == premio_selected" style="font-size:10px;">Seleccionado</span>
                                        <span v-else style="font-size:10px;">¡Voy por este!</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { axiosInstance } from '@/js/axios'
import Vue from 'vue'

export default {
    data() {
        return {
            loading: true,
            loading_init: true,
            premios: '',
            overlay_show: true,
            premio_selected: '',
            puntaje_mes: '',
            seleccionPremio: 0,
            slickOptions: {
                dots: true,
                infinite: false,
                arrows: true,
                speed: 500,
                slidesToShow: 1,
                slidesToScroll: 1,
            },
            cargamosPremios: false,
        }
    },
    mounted() {
      if(this.$store.state.statusLoadPageDashboard){
        this.getPrizes();
        this.getPuntaje();
        this.getPrizeSelected();
        this.loading = false;
        this.loading_init = false;
      }
    },
    created: function() {
      this.getPrizeSelected()
    },
    ready: function() {
        this.loading = false;
        this.loading_init = false;
    },
    methods: {
        getPuntaje: function() {
            axiosInstance({
                method: 'get',
                url: '/api/auth/students/v3/user/prizes/general',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + Vue.localStorage.get('cm_access_token')
                }
            }).then((response) => {
                this.puntaje_mes = response.data.puntaje_mes.noformat;
            }).catch((error) => {
                console.log(error)
            })
        },
        getPrizes: function() {
            axiosInstance({
                method: 'get',
                url: '/api/auth/students/v3/general/prizes',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + Vue.localStorage.get('cm_access_token')
                }
            }).then((response) => {
                this.$store.state.listPrizes = response.data;
                this.loading = false;
                this.loading_init = false;
                this.cargamosPremios = true;
                if (this.seleccionPremio) {
                    this.$snotify.success('Has actualizado tu premio exitosamente.', 'Seleccionado',{
                      config: {
                        position: 'centerTop',
                        timeout: 8000
                      },
                      toast: {
                        position: 'rightTop'
                      }
                    });
                }
            }).catch((error) => {
                console.log(error)
            })
        },
        getPrizeSelected: function() {
            this.overlay_show = true;
            axiosInstance({
                method: 'get',
                url: '/api/auth/students/v3/user/prizes/active',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + Vue.localStorage.get('cm_access_token')
                }
            }).then((response) => {
                this.premio_selected = response.data.id;
                this.overlay_show = false;
            }).catch((error) => {
                console.log(error)
            })
        },
        selectPrize: function(getPrize) {
            axiosInstance({
                method: 'post',
                url: '/api/auth/students/v3/user/prizes/select_prize',
                data: {
                    prize: getPrize.id
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + Vue.localStorage.get('cm_access_token')
                }
            }).then((response) => {
                console.log(response);
                this.loading = true;
                this.$store.state.seleccionamos_el_premio = { 'premio': 'seleccionado' };
                this.seleccionPremio = 1;
                this.getPrizes();
                this.getPrizeSelected();
            }).catch((error) => {
                window.toastr.error('Ocurrió un error al guardar los cambios' + error);
            })

        },
    },
}

</script>
