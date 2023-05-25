<template>
    <audio ref="trivia_sound" v-bind:src="trivia_sound"></audio>
</template>
<script>
  export default {
    data(){
        return{
            trivia_sound: '',
        }
    },
  //   data(){
  //       return{
  //           link: '#',
  //           disabled: true,
  //           time: 20*1000,
  //           interval:1000,
  //           is_trivia:true,
  //           is_active_sounds:true,
  //           trivia_sound: new Audio('/app-files/sounds/base_trivia.mp3'),
  //           trivia_end_sound: new Audio('/app-files/sounds/alarm.mp3'),
  //       }
  //   },
  //   methods: {
  //     addItem(){
  //       let uri = 'http://localhost:8000/items';
  //       this.axios.post(uri, this.item).then((response) => {
  //         this.$router.push({name: 'DisplayItem'})
  //       })
  //   }
  // }
}
</script>