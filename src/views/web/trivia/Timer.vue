<template>
  <div class="timer" style="color: white;">
    <h3 id="session" style="font-size: 45px;">{{ displaySession }}</h3>
  </div>
</template>
<script>

export default {

  props: [],


  data() {
    return {
      sessionTotal: 0,
			session: 10,
			breakTotal: 0,
			break: 3,
			lap: 1,
			isPaused: true,
			isBreak: false,
      segundosRestantes:10,
      audio: new Audio('https://app.civicamente.cl/storage/app-files/sounds/base_trivia.mp3'),
      audioError: new Audio('https://app.civicamente.cl/storage/app-files/sounds/alarm.mp3')

    };
  },

  created: function() {
    this.startTimer(this.session);
    this.playSound();
  },

  beforeMount: function(){

  },

  updated: function(){

  },

  methods: {

    playSound() {
        this.audio.play();
      },

      stopSound: function(){
        this.audio.pause();
        this.audio = 0;
      },

      errorSound(){
        this.audioError.play();
      },

    secToString : function(sec){
      var hours, minutes, seconds, result;
      seconds = Math.floor((sec)%60);
      minutes = Math.floor((sec/60)%60);
      hours = Math.floor((sec/60/60)%60);
      result = [hours, minutes, seconds].map(function(val){

        if(val < 10){
          return "0"+val;
        }

        return val;
      });
      // Hide hours when don't need
      if(result[0] == "00") {
        result.shift();
      }
      return result.join(":");
    },
    getPercent: function(value){
      return ((this[value] / this[value+"Total"]) * 100) ;
    },
    reset: function(){
      this.stopTimer();
      this.lap = 1;
      this.isBreak = false;
      this.isPaused = true;
      this.session = this.sessionTotal;
      this.break = this.breakTotal;
      this.sessionTotal = 0;
      this.breakTotal = 0;
    },
    startTimer: function(timer){
      var that = this;
      if(timer >= 0){
        var timerSession = setInterval(function(){
          timer--;
          that.segundosRestantes = timer;
          if(timer <= 0){
            $('#SaveRespuesta').hide();
            $('#TimeOver').show();
            this.$store.state.count = timer;
            that.stopSound();
            that.errorSound();
            clearInterval(timerSession);
          }
          console.log(that.segundosRestantes);
        },1000);
      }
    },
    stopTimer: function () {
      if(timerSession){
        clearInterval(timerSession);
      }
    }
  },

  computed: {
    displaySession: function(){
      if(this.isBreak){
        return this.secToString(this.break);
      }
      return this.secToString(this.segundosRestantes);
    },
    displayBreak: function(){
      return this.secToString(this.break);
    },
    displayStatus: function(){
      if(this.isBreak){
        return "Break Session"
      }
      if(this.isPaused){
        return "Paused"
      }
      return "Session "+ this.lap;
    },
    progress: function(){
      if(this.isBreak){
        return this.getPercent("break");
      }else{
        return this.getPercent("session");
      }
    }
  },


  watch: {
  progress: function(progress){

  },
  isPaused: function(isPaused){

  },
  isBreak: function(isBreak){

  },
  session: function(sessionVal){
    if(!this.isBreak && sessionVal <= 0){
      this.stopTimer();
      this.break = this.breakTotal;
      this.isBreak = true;
    }
  },
  break: function(breakVal){
    if(this.isBreak && breakVal <= 0){
      this.stopTimer();
      this.lap++;
      this.session = this.sessionTotal;
      this.isBreak = false;
    }
  }
}

}
</script>
