<template>
  <div class="cd-panel-noticias cd-panel--from-right js-cd-panel-sideNoticia cd-panel--is-visible">
    <div class="cd-panel-noticias cd-panel--from-right animated faster slideInRight" id="sideNoticia">
      <div class="cd-panel__container"> <!-- v-on:click="cerrarVentanaFiltros()" -->
        <perfect-scrollbar :options="options" class="cd-panel__content">
          <a class="cd-panel__close js-cd-close" v-on:click="cerrarNoticia()">
            <div class="js-cd-close"></div>
            <span class="js-cd-close">
              Cerrar <br>Ventana
            </span>
          </a>
          <div class="row no-gutters">
            <div class="col">
              <div class="cabecera" :style="'background-image: url('+this.$store.state.urlNoticia+'/storage/'+this.$store.state.noticiaIdCivicamente.cover_image+');'">
                <div class="overlay"></div>
                <div class="cintaInferior"></div>
                <h3>
                  {{this.$store.state.noticiaIdCivicamente.title}}
                </h3>
              </div>
            </div>
          </div>
          <div class="row no-gutters">
            <div class="col">
              <div class="contenido" v-html="this.$store.state.noticiaIdCivicamente.description"></div>
            </div>
          </div>
        </perfect-scrollbar>
      </div>
    </div>
  </div>
</template>
<script>

export default {

  props: [

  ],

  data () {
    return {
      options: {
        wheelPropagation: false
      },
    }
  },

  mounted () {
    this.cerrarNoticia();
  },

  created: function() {
  },

  updated: function () {

  },

  methods: {
    cerrarNoticia(){
      const vm = this;
      setTimeout(function(){
        $('#sideNoticia').removeClass('slideInRight');
        $('#sideNoticia').addClass('slideOutRight');
          setTimeout(function(){
            $('#sideNoticia').removeClass('slideOutRight');
            $('#sideNoticia').addClass('slideInRight');
            vm.$store.state.noticiaIdCivicamente = {};

          }, 500);
      }, 200);
    },
  },
}
</script>
