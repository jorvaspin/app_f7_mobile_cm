<template>
  <div class="seleccion-avatar" v-if="this.loginState">
    <vodal
    :show="this.showAvatars"
    :animation="animation"
    >
    <a href="#close" class="cerrarmodal" v-on:click="closeModal"><i class="fal fa-times"></i></a>
    <div class="card-me hideMobile">
      <me-avatar></me-avatar>
    </div>
  </vodal>
  </div>
</template>
<script>

export default {

  props: [

  ],

  data () {
    return {
      usuario: [],
      user: '',
      isLoggin: false,
      loading: true,
      uID: '',
      nombre: '',
      password: '',
      repetirPassword:'',
      edad: '',
      nickname:'',
      triviasPorJugar: 0,
      tematicasPorJugar: 0
    }
  },
  mounted () {

  },

  created: function() {
    console.log(this.$router.history.current.name);
  },

  updated: function () {

  },

  methods: {
    updateEdad(){
      $('body').addClass('overlaybg');
      const vm = this;
      vm.$Progress.start();
        edad: vm.edad
      },{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+Vue.localStorage.get('cm_access_token')
        }
      }).then(response => {
        setTimeout(function(){
          vm.$snotify.success('Ya puedes participar. Te hemos asignado un nivel acorde a tu edad.', 'Genial!');
          $('body').removeClass('overlaybg');
          vm.showEdad = false;
          vm.$Progress.finish();
          vm.getRanking();
        }, 700);
      })
      .catch(e => {
        console.log(e);
      })
    },
    closeModal(){
      if(this.showAvatars){
        this.showAvatars = false;
      }else{
        this.showAvatars = true;
      }
    }
  }
}
  </script>
