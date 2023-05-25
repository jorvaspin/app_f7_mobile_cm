<template>
<transition name="fade" mode="in-out" tag="div">
<div id="achievement-alert" class="fixed bg-logro -inset-0" v-if="this.logroDesbloqueado.status">
  <div class="flex flex-col flex-wrap content-center justify-center" :class="device.desktop ? 'py-56' : 'py-20'">
    <div class="h-12 text-3xl font-bold tracking-wider text-center text-green-300 uppercase font-display mb-3" key="title">¡Nuevo logro desbloqueado!</div>
    <div class="w-auto mt-5 text-center" key="imagen">
      <img :src="logroDesbloqueado.image" class="mx-auto" :class="device.desktop ? 'w-52' : 'w-25'" alt="Imagen logro" />
    </div>
    <div class="w-auto h-12 my-5 text-center text-yellow-300 uppercase text-achievement justify-self-center font-display" :class="device.desktop ? 'text-8xl' : 'mt-5 text-3xl'" key="logro">
      {{ this.logroDesbloqueado.name }}
    </div>
    <div class="flex flex-col items-center content-center justify-center">

      <div class="inline-flex items-center justify-center text-center bg-gray-100 rounded-full text-primary-100 font-display bg-opacity-80" :class="device.desktop ? 'w-auto py-4 px-5 my-4 text-5xl' : 'w-90 py-3 px-4 my-3 text-xl'">
        Ganaste
        {{ $filters.formatNumber(this.logroDesbloqueado.civipoints) }} civipuntos
      </div>
    </div>


    <lottie
          class="absolute bottom-0 left-0 right-0"
          :options="defaultOptions"
          :width="800"
          :height="600"
          v-on:animCreated="handleAnimation"
          />
  </div>
</div>
</transition>
</template>
<script>
import * as animationData from "@animations/53513-confetti.json";
import { getDevice } from "framework7/lite-bundle";

export default {
  data() {
    return {
      defaultOptions: {
        animationData: animationData.default,
        loop: false,
        autoplay: true
      },
      animationSpeed: 1
    };
  },
  setup() {
    const device = getDevice();
    return {
      device
    };
  },
  methods: {
    handleAnimation: function(anim) {
      this.anim = anim;
    },

    stop: function() {
      this.anim.stop();
    },

    play: function() {
      this.anim.play();
    },

    pause: function() {
      this.anim.pause();
    },

    onSpeedChange: function() {
      this.anim.setSpeed(this.animationSpeed);
    }
  }

}
</script>

<style lang="scss" scoped>
.bg-logro{
  background: rgba(44,44,65,0.95);
  z-index: 99998;
}
.logro-desbloqueado {
  width: 100%;
  text-align: center;
  position: absolute;
  top: 0;
  z-index: 99999;

  #achievement {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: #fff;
    position: relative;
    transform: scale(0);
    transition: 250ms ease-in-out;
    margin: 40px auto;
    box-shadow: 0 3px 20px #1e7195;

    &.expand {
      transform: scale(1);

      .circle:before {
        animation: rotate 400ms linear;
      }

      &.widen {
        width: 380px;
        border-radius: 50px;
      }
    }

    .circle {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: #e4bf2b;
      position: absolute;
      top: 10px;
      left: 10px;

      &:before {
        font-size: 40px;
        font-family: 'Font Awesome 5 Pro';
        display: inline-block;
        content: "\f005";
        color: #fff;
        position: absolute;
        top: 15px;
        left: 17px;
        transform: scale(1);
        transition: 250ms ease-in-out;
      }

      &.rotate:before {
        animation: rotateBack 400ms linear;
      }
    }

    .copy {
      opacity: 0;
      transition: 250ms ease-in-out;
      width: 240px;
      position: absolute;
      left: 100px;
      top: 35px;

      &.show {
        opacity: 1;
        top: 25px;
      }

      h4 {
        margin: 0;
      }

      p {
        margin: 0;
      }
    }
  }

  .refresh {
    display: none;
    text-align: center;
    color: #fff;
    text-decoration: underline;
    font-size: 18px;
    cursor: pointer;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes rotateBack {
    0% {
      transform: rotate(360deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }
}
</style>
