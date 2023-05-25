<template>
  <div v-if="this.$store.state.isTerminateTour == null">
    <v-tour name="myTour" :steps="this.$store.state.steps" :options="this.$store.state.myOptions" :callbacks="myCallbacks"></v-tour>
  </div>
</template>
<script>

export default {

  props: [

  ],

  data () {
    return {
      myCallbacks: {
        onPreviousStep: this.myCustomPreviousStepCallback,
        onNextStep: this.myCustomNextStepCallback,
        onStop: this.onStopCallback,
      }
    }
  },

  mounted () {
    // console.log("erna perro ql");
  },

  created: function() {
    this.isTerminateTour = Vue.localStorage.get('tourTerminate'+this.$store.state.user.id);
  },

  updated: function () {
    this.isTerminateTour = Vue.localStorage.get('tourTerminate'+this.$store.state.user.id);
  },

  methods: {
    onStopCallback (currentStep) {
      Vue.localStorage.set('tourTerminate'+this.$store.state.user.id, this.$store.state.user.id);
      this.isTerminateTour = Vue.localStorage.get('tourTerminate'+this.$store.state.user.id);
    },
    myCustomPreviousStepCallback (currentStep) {
      console.log('[Vue Tour] A custom previousStep callback has been called on step ' + (currentStep + 1))
    },
    myCustomNextStepCallback (currentStep) {
      console.log('[Vue Tour] A custom nextStep callback has been called on step ' + (currentStep + 1))

      if (currentStep === 1) {
        console.log('[Vue Tour] A custom nextStep callback has been called from step 2 to step 3')
      }
    },
  },
}
</script>
