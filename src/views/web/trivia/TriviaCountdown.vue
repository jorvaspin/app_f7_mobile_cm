<template>
    <div>
      <audio ref="triviaSound" v-bind:src="triviaSound"></audio>
    </div>
      <div :time="time" :interval="interval" tag="p" class="trivia-counter rounded" v-on:countdownend="countdownend" v-on:countdownprogress="onCountdownProgress">
        <template slot-scope="props">
        <h5 class="header">Tiempo Restante</h5>
        <div class="counter-into">{{ props.minutes }}</div>
        <div class="counter-point">:</div>
        <div class="counter-into">{{ props.seconds }}</div>
        </template>
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