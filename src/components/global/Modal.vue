<template>
<Teleport to="#app">
<XyzTransition duration="auto" xyz="fade out-delay-3">
<div v-if="modelValue" class="modal-cm" aria-labelledby="modal-title" role="dialog" aria-modal="true" style="z-index:9997">
  <div class="flex items-center justify-center w-full min-h-full px-5 py-4 text-center sm:p-0">

    <div class="fixed inset-0 transition-opacity bg-slate-900 bg-opacity-80 xyz-nested" xyz="fade out-delay-2 duration-4" aria-hidden="true"></div>

    <!-- This element is to trick the browser into centering the modal contents. -->
    <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
    <div xyz="fade down-2 in-delay-2 out-delay-1 duration-2" class="w-full px-4 pt-12 overflow-hidden text-left text-gray-800 align-bottom transition-all transform bg-white rounded-lg shadow-xl blocked dark:bg-slate-200 xyz-nested sm:my-8 sm:align-middle sm:max-w-lg" @click.stop>
        <div class="absolute top-1 right-1 blocked">
        <button @click.prevent="close" type="button" class="w-8 h-8 p-1 btn btn-danger btn-rounded-full btn-shadow-sm z-10">
          <span class="sr-only">Cerrar</span>
          <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="pb-4">
        <slot>Content</slot>
      </div>
    </div>
  </div>
</div>
</XyzTransition>
</Teleport>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name:'modal',
    props: {
        modelValue: {
            required: true
        }
    },
    emits: ['update:modelValue'],
    watch:{
        modelValue(newData, oldData){
            if (newData === true) {
                this.sheetOpenSound();
            }
        }
    },
    methods: {
      close() {
        this.$emit("update:modelValue", !this.modelValue);
      },
    },
})
</script>

<style lang="postcss">
.modal-cm{
  @apply fixed inset-0 z-50 overflow-y-auto w-full h-full;

  & .card-question {
      @apply relative items-center overflow-hidden justify-center w-full px-2 py-3 block shrink-0 h-1/3;

      & .bg-card{
          @apply w-full h-full relative;
      }
      & .card-back-1{
          @apply absolute inset-0 z-10 bg-gray-100 shadow rounded-xl rotate-2 dark:bg-palette-dark-tint/70 dark:shadow-black/50;
          content:'';
      }
      & .card-back-2{
          @apply absolute inset-y-0 z-20 bg-gray-100 shadow inset-x-3 rounded-xl -rotate-1 dark:bg-palette-dark-active dark:shadow-black/50;
          content:'';
      }
      & .card-content{
          @apply shadow-md rounded-xl relative z-30 w-full h-full xs:text-sm xs:leading-4 text-xl text-center xs:px-5 px-4 py-4 overflow-hidden bg-white dark:bg-palette-dark-tint dark:shadow-black/50 dark:text-gray-300 tracking-tight leading-tight;
      }

      & .related-content {
          @apply rounded-sm text-left text-xxs font-serif flex items-start w-full justify-center relative leading-tight;

         & img {
             @apply w-auto mx-auto rounded-lg shadow border-2 border-white h-full;
              max-height: 6rem;
          }
      }
      div.pregunta {
          @apply w-4/5 m-auto text-center overflow-hidden
      }
  }
}
</style>
