<template>
  <f7-sheet
  class="modalConsejo"
  style="height:auto; --f7-sheet-bg-color: #fff;"
  swipe-to-close
  swipe-to-step
  backdrop
>
  <div class="sheet-modal-swipe-step">
    <!-- <div class="display-flex padding justify-content-space-between align-items-center">
      <h3>¡Atención a este consejo!</h3><p>Todos debemos prepararnos para lograr nuestros objetivos.</p>
    </div> -->
    <div class="padding-horizontal padding-bottom">
      <div class="modalConsejo-mobile modalConsejo-web">
        <div class="contenido d-flex flex-column">
          <div class="row no-gutters">
            <div class="col-12">
              <p>
                Recuerda <strong>ver el video</strong>, <strong>leer el texto y escuchar el audio</strong>
                para responder correctamente la temática <span class="text-indigo-700 font-bold"></span>.
              </p>
            </div>
          </div>
          <div class="row no-gutters flex-grow-1">
            <div class="col-10 align-self-start pb-3">
              <!-- <b-button class="btn btn-success btn-lg" v-on:click="showLesson(tematicaObj,page, sectionName), buttonClick()">
                ¡Comenzar!
              </b-button> -->
            </div>
          </div>
        </div>
        <img src="https://res.cloudinary.com/admsys-storage/image/upload/q_auto:best,f_auto/smarteducation/masterbrain/civicamente-v2/smartyFace.png" alt="Smarty avisando">

      </div>
    </div>
  </div>
</f7-sheet>
</template>
<script>


export default {
  props: [
    'tematicaObj',
    'page',
    'sectionName'
  ],
  data () {
    return {

    }
  },

  mounted () {

  },

  methods: {
    effectModal(){
      this.$store.state.appSounds.soundModal.play();
    }

  }
}
</script>
<style lang="scss">
.modalConsejo{
  .modalConsejo-web {
      // z-index: 6950 !important;
      // background: rgba(44, 44, 65, 0.95);

      &>div.modal-dialog {
          max-width: 600px !important;

          .modal-body{
              padding: 2.5em !important;
              overflow: visible !important;
          }

          &>div.modal-content {
              // border-radius: 1rem;
              // overflow: hidden;

              // height: 328px;
              header.modal-header {
                  // background-image: linear-gradient(134deg, #4B61E6 0%, #7E41EF 100%);
                  // color: white;
                  // padding: 2rem;
                  // border-bottom:none;

                  div.modal-title {
                      // width: 100%;
                      // padding: 1px 0px 0;

                      h3 {
                          font-size: 2.3rem !important;
                          line-height: 1em;
                          text-align: left;

                      }

                      p {
                          font-family: inherit;
                          font-size: 1.6rem !important;
                          line-height: 1.6rem !important;
                          margin: 0;
                          max-width: 60% !important;
                      }
                  }
              }

              div.contenido {

                  font-size: 1.4rem !important;
                  line-height: 18px;

                  p{
                      max-width: 70% !important;
                  }

                  button {
                      margin-top: 20px !important;
                  }
              }

              img {
                right: -13em !important;
                width: auto;
                height: 140% !important;
              }
          }
      }
  }
}

</style>
