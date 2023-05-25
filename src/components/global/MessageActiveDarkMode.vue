<template>
    <div
        class="rounded-lg shadow bg-gradient-to-br from-indigo-900 to-midnight"
    >
        <div class="px-4 py-5 sm:p-6">
            <div class="flex flex-col">
                <div class="flex gap-3 sm:items-start sm:justify-between">
                    <div class="flex self-start justify-center w-16 shrink-0">
                        <img :src="imgNinjaMode" class="w-16" alt="" />
                    </div>
                    <div>
                        <h3
                            class="mb-2 text-xl leading-6 text-blue-50 font-display"
                        >
                            Activa el modo ninja
                        </h3>
                        <div class="max-w-xl text-sm text-gray-700">
                            <p>
                                El modo ninja cambia la apariencia completa de
                                tu app..
                            </p>
                        </div>
                    </div>
                </div>
                <div
                    class="flex flex-shrink-0 mt-5 sm:mt-0 sm:ml-6 sm:flex sm:items-center"
                >
                    <button type="button" class="w-3/5 grow-0 btn btn-success">
                        Activar ahora
                    </button>
                    <button type="button" class="w-2/5 grow-0 btn btn-link">
                        Después
                    </button>
                </div>
            </div>
        </div>
    </div>
    <!-- <div class="flex items-center justify-between p-5 bg-gradient-to-br from-indigo-900 to-midnight card-box">
        <div class="flex justify-center w-14 shrink-0">
          <img :src="imgNinjaMode" class="w-10" alt="">
        </div>
        <div>
        <div class="w-full text-left grow">
        <h4 class="leading-none font-display grow">Activar el <br>modo ninja</h4>
        </div>
        </div>
        <div><button class="btn btn-success">Activar</button> </div>
      </div> -->
</template>
<script lang="ts">
import { defineComponent } from "vue";
import imgNinjaMode from '@/assets/images/icons/ninja-mode.svg'

export default defineComponent({
    name:'message-active-dark-mode',
    setup() {},
    data() {
        return {
            imgNinjaMode
        }
    },
});
</script>
