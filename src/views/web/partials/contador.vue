<template>
  <countdown ref="countdown" :auto-start="false" @progress="handleCountdownProgress" :time="this.$store.state.tiempo" :transform="transform">
    <template slot-scope="props"><h3 id="session">{{ props.minutes }}:{{ props.seconds }}</h3></template>
  </countdown>
</template>
<script>

export default {

  props: [

  ],

  data () {
    return {
      tiempo: 0
    }
  },

  mounted () {
    
  },

  created: function() {
  },

  updated: function () {

  },

  methods: {
    handleCountdownProgress(data) {
      if(data.totalSeconds == 1){
        setTimeout(function(){
          alert("llegamos a cero");
        }, 1000);

      }
      console.log(data.totalSeconds);
    },
    transform(props) {
      Object.entries(props).forEach(([key, value]) => {
        // Adds leading zero
        const digits = value < 10 ? `0${value}` : value;

        // uses singular form when the value is less than 2
        const word = value < 2 ? key.replace(/s$/, '') : key;

        props[key] = `${digits}`;
      });

      return props;
    },
  }
}
</script>
