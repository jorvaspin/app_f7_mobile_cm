<template>
  <img
    class="w-auto h-5"
    :src="civipuntoImg"
    alt="Civipunto"
  />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import civipuntoImg from "@assets/images/civipuntos/100-civipuntos-coin.png";

export default defineComponent({
  name: "icon-civipunto",
  data() {
    return {
      civipuntoImg,
    };
  },
});
</script>
