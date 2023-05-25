<template>
  <f7-sheet
  class="modal-mis-logros-home"
  style="height:100vh; --f7-sheet-bg-color: #fff;"
  swipe-to-close
  swipe-to-step
  backdrop
  push
>
    <f7-page>
      <div class="navbar">
      <div class="navbar-bg"></div>
      <div class="navbar-inner sliding">
        <div class="left">
          <f7-link class="link back" sheet-close>
            <i class="icon icon-back"></i>
            <span class="if-not-md">Atrás</span>
          </f7-link>
        </div>
        <div class="title">Mis Logros</div>
      </div>
    </div>
    <div id="mainContent-mobile">
    <div class="sheet-modal-monedero">
        <f7-page-content>
          <div class="relative flex gap-5 py-4 mx-4 mt-4 bg-white rounded-lg shadow-md flex-nowrap">
            <img src="https://res.cloudinary.com/admsys-storage/image/upload/v1615771033/smarteducation/masterbrain/civicamente-v2/icons/logros-recompensas.png" class="w-24 h-24" alt="">
            <div class="pt-2 pl-4 pr-24">
              <h3 class="text-2xl text-red-600 uppercase font-burbank">
                Logros y recompensas obtenidas
              </h3>
              <p class="text-xl text-gray-700">
                Accede a recompensas exclusivas, incluso si no formas parte del cuadro
                de honor.
              </p>
            </div>
            <user-list-achievements />
          </div>
        </f7-page-content>
    </div>
    </div>
  </f7-page>
</f7-sheet>
</template>
<script>

import Vue from "vue";
export default {
  props: [

  ],
  data() {
    return {
      sheetOpened: false,
    };
  },
  methods: {
  },
};
</script>
