<template>
<div>
  <XyzTransition appear mode="in-out" duration="auto" class="w-full h-full" xyz="fade out-delay-2">
    <div
      v-if="showMessage"
      @click.prevent="showMessage = false"
      class="fixed inset-0 z-[99998] flex items-center content-center justify-center w-full h-full mx-auto bg-indigo-900 bg-opacity-80"
    >
        <div
          class="w-full p-6 pr-10 text-6xl text-center text-white rounded-lg font-display xyz-nested"
          xyz="fade down in-delay-4"
        >
          ¡Última pregunta!
        </div>
    </div>
  </XyzTransition>
</div>
</template>
<script>
export default {
  name: "LastQuestionMessage",
  props: ["isLastQuestion"],
  data() {
    return {
      showMessage:false,
    };
  },
  mounted: function () {
    // const vm = this;
    this.showMessage = true;
    setTimeout(() => this.showMessage = false, 2500)
    // }
  },
};
</script>