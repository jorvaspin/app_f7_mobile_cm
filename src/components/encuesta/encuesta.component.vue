<template>
  <f7-page hide-navbar-on-scroll no-toolbar no-navbar>
  <div class="encuesta-civicamente animated slideInUp" v-if="encuestaActiva == 0 && initEncuesta == 0">
    <div class="contenedorPregunta">
      <transition name="slide-fade">
      <div class="pregunta" v-show="isShow">
        <img src="https://res.cloudinary.com/admsys-storage/image/upload/smarteducation/masterbrain/civicamentecl/civicamente-2021-apaisado.svg" class="imglogo" alt="">
        <h2 class="p-3 text-xl">Estimada comunidad, tenemos una breve encuesta que debes responder antes de iniciar un nuevo juego en Civicamente.</h2>
        <h4 class="p-3 text-sm">Seleccione una encuesta a responder</h4>
        <div class="continput">
        	<ul>
            <li v-for="(enc, index) in listEncuesta" :key="index">
              <input checked type="radio" v-model="encuestaSeleccionada" :value="enc.id" name="1">
              <label>{{enc.titulo}}</label>
              <div class="bullet">
                <div class="line zero"></div>
                <div class="line one"></div>
                <div class="line two"></div>
                <div class="line three"></div>
                <div class="line four"></div>
                <div class="line five"></div>
                <div class="line six"></div>
                <div class="line seven"></div>
              </div>
        		</li>
        	</ul>
        </div>
        <p class="p-4">Serán una serie de preguntas las cuales debes responder con los "EMOJIS" que aparecen mas abajo. Cada emoji representa como te sientes o te sentiste con la pregunta realizada.</p>
        <hr>
        <vue-feedback-reaction v-model="feedback" :labels="['Muy mal', 'Mal', 'normal','Bien','Muy bien']" v-if="initEncuesta == 0" />
        <div class="acciones">
          <button type="button" name="button" class="btn btn-primary disabled" disabled v-if="encuestaSeleccionada==0"><i class="fad fa-chevron-right"></i> Iniciar encuesta</button>
          <button type="button" name="button" class="btn btn-primary" v-else v-on:click="startPoll()"><i class="fad fa-chevron-right"></i> Iniciar encuesta</button>
        </div>
      </div>
      </transition>
    </div>
  </div>
  <div class="encuesta-civicamente animated slideInUp" v-else>
    <div class="contenedorPregunta" v-for="(pregunta, index) in preguntas" v-show="idPregunta == pregunta.id" :key="index">
      <transition name="slide-fade">
      <div class="pregunta" v-show="idPregunta == pregunta.id">
        <img src="https://res.cloudinary.com/admsys-storage/image/upload/smarteducation/masterbrain/civicamentecl/civicamente-2021-apaisado.svg" class="imglogo" alt="">
        <p>Pregunta {{1+index}}</p>
        <h2>{{pregunta.pregunta}}</h2>
        <hr>
        <vue-feedback-reaction v-model="feedbackUser" :labels="['Muy mal', 'Mal', 'normal','Bien','Muy bien']" />
        <div class="acciones">
          <button type="button" name="button" class="btn btn-primary disabled" disabled v-if="feedbackUser == ''"><i class="fad fa-chevron-right"></i> Enviar respuesta</button>
          <button type="button" name="button" class="btn btn-primary" v-else v-on:click="responder(index+1)"><i class="fad fa-chevron-right"></i> Enviar respuesta</button>
        </div>
        </div>
      </transition>
    </div>
  </div>
</f7-page>
</template>

<script>
import { axiosInstance } from '@/js/axios'

import { VueFeedbackReaction } from 'vue-feedback-reaction';

export default {

  props: [],

  data() {
    return {
 
    };
  },

  components: {
    VueFeedbackReaction
  },

  created: function() {
    this.getStatusPoll();
    $('body').addClass('overlaybg');
  },


  beforeMount: function(){

  },

  updated: function(){

  },

  methods: {
    getStatusPoll(){
      const vm = this;
      axiosInstance({
        method: 'get',
        url: '/api/auth/students/v3/user/poll/status',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+Vue.localStorage.get('cm_access_token')
        }
      }).then((response) => {
        $('body').removeClass('overlaybg');
        vm.listEncuesta = response.data.encuesta;
        vm.idsCompletadas = new Set(response.data.encuestasCompletadas.map(({ encuesta_id }) => encuesta_id));
        vm.listEncuesta = vm.listEncuesta.filter(({ id }) => !vm.idsCompletadas.has(id));
        //si no tiene encuestas que no se abra el modal
        if(vm.listEncuesta.length == 0){
          vm.volver()
        }else{
          console.log('else');
        }
      }).catch((error) => {
        $('body').removeClass('overlaybg');
        console.log(error)
      })
    },
    startPoll(){
      const vm = this;
      vm.feedback = '';
      axiosInstance({
        method: 'post',
        url: '/api/auth/students/v3/user/poll/start',
        data: {
          encuesta_id: vm.pollSelectedId
        },
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+Vue.localStorage.get('cm_access_token')
        }
      }).then((response) => {
        vm.initEncuesta = 1;
        vm.preguntas = response.data;
        vm.encuestaId = vm.pollSelectedId;
        console.log(response.data);
      }).catch((error) => {
        $('body').removeClass('overlaybg');
        console.log(error)
      })
    },
    responder(id){
      const vm = this;
      if(vm.cantidadPreguntas > id){
        vm.idPregunta = vm.preguntas[id].id;
        vm.respuestas.push({pregunta_id: vm.preguntas[id-1].id, value: vm.feedbackUser});
        vm.feedbackUser = '';
      }else{
        vm.respuestas.push({pregunta_id: vm.preguntas[vm.cantidadPreguntas-1].id, value: vm.feedbackUser});
        vm.feedbackUser = '';
        vm.completedPoll();
      }
    },

    completedPoll(){
      const vm = this;
      axiosInstance({
        method: 'post',
        url: '/api/auth/students/v3/user/poll/complete',
        data: {
          respuestas: vm.respuestas,
          encuesta_id: vm.pollSelectedId
        },
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+Vue.localStorage.get('cm_access_token')
        }
      }).then((response) => {
        this.$snotify.success('La encuesta a sido completada con exito!', 'Completada');
        vm.abrirEncuesta = 1;
        Vue.localStorage.remove('encuestaMasTarde'+vm.user.id);
        vm.getStatusPoll();
      }).catch((error) => {
        $('body').removeClass('overlaybg');
        console.log(error)
      })
    }
  },



}
</script>
