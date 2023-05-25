<template>
<f7-page>
    <div class="container">
      <div class="row align-items-center h-screen">
        <div class="col-md-4 offset-md-4 col-xs-12">
          <div class="container">
            <div class="row">
              <div class="col-md-12 text-center col-xs-12">
                <img src="https://res.cloudinary.com/admsys-storage/image/upload/q_auto/smarteducation/masterbrain/civicamente-app/public-images/civicamente-new-slogan-square-contrast.svg" class="animated bounceIn mb-3" width="250" alt="Civicamente">
              </div>
            </div>
          </div>
          <div class="box-login" style="padding-bottom: 0.1rem!important;">
            <h2 class="animated headShake">Bienvenid@s</h2>
              <div class="container-fluid">
                <h2>redirigiendo...</h2>
              </div>
          </div>
        </div>
      </div>
    </div>
</f7-page>
</template>
<script>
import { f7ready } from "framework7-vue";
export default {

  props: [

  ],

  data () {
    return {

    }
  },

  mounted () {

    const vm = this;

    f7ready((f7) => {

      console.log('f7Mounted', f7);
      // f7.dialog.alert('Component mounted');
      f7.views.main.router.navigate({name:'cm.dashboard'});




    });

  },

  created: function() {


    // this.$router.push({name: 'cm'}).catch(err => {});
  },

  updated: function () {

  },

  methods: {

  }
}
</script>
