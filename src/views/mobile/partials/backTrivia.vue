<template>
  <f7-navbar class="toolbar-mobile-morado">
  <f7-nav-left style="margin-top: -26px !important;"> <span><f7-link v-on:click="goBackMusic()"><i class="fad fa-chevron-left pr-3"></i> Volver</f7-link></span></f7-nav-left>
  <f7-nav-right style="margin-top: -26px !important;">
    <img src="https://res.cloudinary.com/dr3zgzxx0/image/upload/v1608236713/ruleta_nhuuwk.svg" alt="" width="50"> <span>Trivias Generales</span>
  </f7-nav-right>
</f7-navbar>
</template>
<script>
export default {

  name: 'backTrivia',

  props: [
    'titleNav'
  ],
  data() {
    return {

    };
  },
  updated: function(){

  },
  computed:{
    title(){
      return (this.titleNav) ? this.titleNav : '';
    }
  }
};
</script>
