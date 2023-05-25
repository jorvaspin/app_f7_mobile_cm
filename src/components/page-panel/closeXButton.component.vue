<template>
  <a class="cm-x__close" @click="goBack()">
    <img src="https://res.cloudinary.com/admsys-storage/image/upload/v1622845717/smarteducation/masterbrain/civicamente-v2/duelos/btn_modal_close.png" alt="">
  </a>
</template>

<script>
export default {
    name:'closeXButton'
};
</script>

<style lang="scss">
.cm-x__close {
  position: absolute;
  top: 20px;
  right: -30px;
  margin-bottom: -45px;
  height: 45px;
  width: 120px;
  z-index: 3;
  display: flex;
  justify-content: flex-start;
  align-items: center;

    img{
      width: 40px;
    }
}
</style>
