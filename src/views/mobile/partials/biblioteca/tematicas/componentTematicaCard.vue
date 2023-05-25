<template>
    <div>
        <div class="m-4 mb-5 cm-card-tematica" :class="tematica.valido_tematica ? 'completed' : ''">
            <div class="image-tematica" :style="'background-image: url('+tematica.imagen_portada+');'">
              <div class="absolute bottom-0 left-0 right-0 z-0 h-3/6 bg-gradient-to-t rounded-l-md" :class="$f7.device.desktop ? 'from-gray-800' : 'from-black to-transparent'"></div>
                <span class="number-tematica">
                    {{ tematicaOrder }} <!-- {{tematica.order.toString().substr(0, 3)}} -->
                </span>
                <div class="interaction-tematica" :style="$f7.device.desktop ? '': 'bottom: -50px !important;'">
                    <likes-tematica :tematicaId="tematica.id" :cantidadlikes="tematica.cantidad_likes"></likes-tematica>
                    <cant-users-tematica :cantidad-respondida="tematica.la_han_terminado"></cant-users-tematica>
                </div>
            </div>
            <div class="content-tematica" v-on:click="tematica.active == 2 || tematica.active == 0 ? null : verificoModal(tematica, page, sectionName)">
                <h5 class="title-tematica font-display">{{tematica.value}}</h5>
                <div class="text-sm description-tematica">
                    {{$filters.truncate(tematica.breve_descripcion,50)}}
                </div>
                <div class="extras" v-if="tematica.active == 2 || tematica.active == 0">
                    <!-- <span class="label-gradient label-light">{{tematica.dificultad_name}}</span> -->
                    <badge-light>
                        {{tematica.dificultad_name}}
                    </badge-light>
                    <button class="btn btn-primary btn-lg disabled" disabled>
                        Iniciar
                    </button>
                </div>
                <div class="extras" v-else>
                    <!-- <span class="label-gradient label-light">{{tematica.dificultad_name}}</span> -->
                    <badge-light>
                        {{tematica.dificultad_name}}
                    </badge-light>
                    <button class="ml-3 btn btn-default btn-sm" @click="showLesson(tematica.slug, page, sectionName), buttonClick()" v-if="tematica.valido_tematica">
                        Ver
                    </button>
                    <button class="ml-3 btn btn-warning btn-sm" @click.prevent="buttonClick()" v-else-if="tematica.tematica_iniciada">
                        Continuar
                    </button>
                    <button class="ml-3 btn btn-primary btn-sm" @click.prevent="buttonClick()" v-else>
                        Iniciar
                    </button>
                </div>
            </div>
        </div>
        <!-- <modal-consejo-mobile :tematicaObj="tematica" :page="page" :sectionName="sectionName" /> -->
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import LikesTematica from '@components/biblioteca/tematica/likes.component.vue';
import CantUsersTematica from '@components/biblioteca/tematica/cant-users.component.vue';
import { showLesson } from "@/composables/useLessonsFunctions";

export default defineComponent({
    name: 'cardTematica',
    props: [
        'tematica',
        'page',
        'sectionName'
    ],
    components:{
        LikesTematica,
        CantUsersTematica
    },
    data() {
        return {
            showLesson
        }
    },
    computed:{
        tematicaOrder(): String{
            let order = this.tematica.order;
            if (String(order).length > 3){
                return order.toString().substr(0, 3)+'+';
            }else{
                return order;
            }
            }
        }
})

</script>
