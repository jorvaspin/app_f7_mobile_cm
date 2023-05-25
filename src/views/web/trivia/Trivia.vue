<template>
  <!-- <div v-for="question in questions">
    <h2>{{ question.text }}</h2>
    <ol>
      <li v-for="response in question.responses">
        <label>
          <input type="radio"> {{response.text}}
        </label>
      </li>
    </ol>
  </div> -->
  <div class="card-body">
    <div class="row">
        <div class="col-md-12">
            <div class="trivia-estado-avance">
                <div class="bar">
                    <div class="bar-data" v-bind:style="{width:triviaCount}"></div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-9">
            <div class="trivia-blackboard">
                {{ triviaAnswer }}
                <button class="btn btn-info trivia-contenido-relacionado" data-toggle="popover" data-trigger="hover" data-placement="right" data-content=""><i class="fa fa-file"></i> Contenido Relacionado</button>
                <div class="trivia-dificultad dificultad-1"></div>
            </div>
                <audio ref="triviaSound" v-bind:src="triviaSound"></audio>
                <div class="trivia-questions">
                <template v-if="isTrivia">
                  <div v-for="question in triviaQuestions" class="trivia-question"> {{ question  }} </div>
                </template>
                <div v-else class="trivia-question timeover">
                  <i class="fal fa-clock fa-spin"></i> Se acabó el tiempo! <i class="fa-regular fa-long-arrow-right fa-2x float-right pr-3"></i>
                </div>
                </div>

        </div>
        <div class="col-md-3">
            <trivia-countdown :time="time" :interval="interval" tag="p" class="trivia-counter rounded" v-on:countdownend="countdownend" v-on:countdownprogress="onCountdownProgress">
                <template slot-scope="props">
                <h5 class="header">Tiempo Restante</h5>
                <div class="counter-into">{{ props.minutes }}</div>
                <div class="counter-point">:</div>
                <div class="counter-into">{{ props.seconds }}</div>
                </template>
            </trivia-countdown>
            <div class="trivia-points rounded">
                <div class="point-into success">
                  <h5 class="header">Acertadas</h5>
                  1
                </div>
                <div class="point-into error">
                  <h5 class="header">Fallidas</h5>
                5</div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>

  export default {
    components: {
        'trivia-countdown': vuecountdown
    },
    data(){
        return{
          time: 20*1000,
          interval:1000,
          triviaAnswer:'Uno de los derechos que establece la Constitución Política de la República de Chile es el de asociarse sin permiso previo, lo cual permite a los ciudadanos:',
          triviaQuestions: [
            'La libertad de emitir opinión e informarse.',
            'La existencia de sindicatos y partidos políticos.',
            'La participación en los procesos electorales.',
            'La igual protección ante la ley.',
          ],
          questions:
          [
            {
              text: "Uno de los derechos que establece la Constitución Política de la República de Chile es el de asociarse sin permiso previo, lo cual permite a los ciudadanos:",
              responses: [
                {text: 'La libertad de emitir opinión e informarse.'},
                {text: 'La existencia de sindicatos y partidos políticos.', correct: true},
                // {text: 'La participación en los procesos electorales.'},
                // {text: 'La igual protección ante la ley.'},
              ]
            },
            {
              text: "Question 2",
              responses: [
                {text: 'Right answer', correct: true},
                {text: 'Wrong answer'},
                {text: 'La participación en los procesos electorales.'},
                {text: 'La igual protección ante la ley.'},
              ]
            },
          ],
          triviaCount: '40%',
          isTrivia:true,
          isActiveSounds:true,
          triviaSound: new Audio('/app-files/sounds/base_trivia.mp3'),
          triviaEndSound: new Audio('/app-files/sounds/alarm.mp3'),
        }
    },
    //props:['getTriviaQuestions','getisTrivia'],
    created: function(){
      //this.countdown();
      this.TriviaPlay();
    },
    methods:
    {
        countdown: function () {
           // this.disabled = this.disabled;
        },
        countdownend: function () {
            this.disabled = false;
            if(this.isActiveSounds){
                this.triviaSound.pause();
                this.triviaEndSound.play();
            };
          this.isTrivia = false;
          console.log(this.isTrivia);
        },
        onCountdownProgress(data) {
            console.log(data.seconds);
        },
        TriviaPlay: function(data) {
            if(this.isActiveSounds){
                this.triviaSound.play();
            }
        }
    },
}



</script>
<style>
  [v-cloak] {display: none}
</style>
