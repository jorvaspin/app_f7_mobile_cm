<template>
  <div class="col d-flex align-items-center">
    <div class="posicion">
      {{lugar+1}}
    </div>
    <div class="avatar">
      <img :src="curso.user.user_avatar" alt="" class="img-fluid">
    </div>
    <div class="nombre">
      {{curso.user.nick_or_name}}
    </div>
    <div class="puntaje">
      {{curso.puntaje}} XP
    </div>
  </div>
</template>
<script>
export default {

  props: [
    'curso',
    'lugar'
  ],

  data () {
    return {

    }
  },
  mounted () {

  },

  created: function() {

  },

  methods: {

  }
}
</script>
