<template>
  <div v-if="$f7.device.ios" class="toolbar-mobile-white"></div>
</template>
<script>
export default {

  name: 'navbarBack',

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
