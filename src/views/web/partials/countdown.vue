<template>
  <div class="countdown d-flex align-items-center justify-content-center h-100">
    <countdown ref="countdown" :auto-start="false" @progress="handleCountdownProgress" :time="tiempoinicio">
      <template slot-scope="props"><h3 id="session">{{ props.seconds }}</h3></template>
    </countdown>
    <h2 v-show="iniciado == 0">¡A Jugar!</h2>
  </div>
</template>
<script>

export default {

  props: [

  ],

  data () {
    return {
      usuario: [],
      tematica: {},
      tiempoinicio: 3000
    }
  },
  mounted () {
    const vm = this;
    setTimeout(function(){
      vm.$refs.countdown.start();
      vm.audioContador.play();
    }, 550);
  },

  created: function() {
    this.audio.pause();
    this.audio.currentTime = 0;
    console.log(this.$router.history.current.name);
  },

  updated: function () {

  },

  methods: {
    //new contunr
    handleCountdownProgress(data) {
      const vm = this;
      if(data.totalSeconds == 1){
        setTimeout(function(){
          vm.iniciado = 0;
        }, 1000);
        setTimeout(function(){
          vm.$router.push({name: 'trivia', params: { hash: vm.$router.currentRoute.params.hash}});
        }, 1500);
      }
    },

    //transformamos a minutos y segundos el new count
    transform(props) {
      Object.entries(props).forEach(([key, value]) => {
        // Adds leading zero
        const digits = value < 10 ? `0${value}` : value;
        console.log(digits);
        // uses singular form when the value is less than 2
        const word = value < 2 ? key.replace(/s$/, '') : key;
        console.log(word);
        props[key] = `${digits}`;
      });

      return props;
    },
  }
}
</script>
