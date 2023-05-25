<template>
  <f7-sheet
  class="premios-ganados"
  style="height:auto; --f7-sheet-bg-color: #fff;"
  swipe-to-close
  swipe-to-step
  backdrop
>
  <div class="sheet-modal-swipe-step">
    <div class="display-flex p-3 justify-content-space-between align-items-center text-white border-b border-orange-500 bg-gradient-to-br from-amber-500 to-orange-600 font-display">
      <div style="font-size: 18px"><b>¡Felicidades! tus premios son:</b></div>
    </div>
    <div class="padding-horizontal padding-bottom mt-4">
      <div class="grid grid-cols-2 gap-5 items-center justify-center">
        <div class="premioInventaryMobile" v-for="(prize,index) in $store.state.premiosGanados" :key="index">
          <div class="titulo font-display">
             {{prize.premio.name}}
          </div>
          <div class="imagenPremio">
            <img :src="prize.premio.image_url" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</f7-sheet>

</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
</style>
