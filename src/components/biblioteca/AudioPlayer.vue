<template>
  <div id="audio-player-root">
    <div class="hidden">
      <audio style="display: none" ref="player" preload="true" :id="playerid" :oncanplay="onCanPlay()" :onended="endListener" :onpause="pauseListener">
        <source :src="url" type="audio/mpeg" />
      </audio>
    </div>
    <div
      class="w-full max-w-5xl px-4 mx-auto my-0 mt-4 overflow-hidden border-b-2 rounded-md shadow-md border-stone-800 py-7 bg-gradient-to-br from-stone-500 to-stone-800"
    >
      <div id="player-row" class="flex flex-wrap items-center w-full">
        <div class="flex-initial w-16 pr-3">
          <button id="button-div" @click.prevent="toggleAudio(), tapClick()" class="flex items-center justify-center p-1 w-14 h-14 btn btn-warning btn-rounded-full">
            <svg
            key="play"
              v-show="!isPlaying"
              class="w-10 h-10 play-button"
              :class="{
                'text-opacity-50' : !audioLoaded,
                'text-amber-100': audioLoaded,
                'hover:text-amber-200': audioLoaded,
                'cursor-pointer': audioLoaded,
              }" aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM372.5 276.5l-144 88C224.7 366.8 220.3 368 216 368c-13.69 0-24-11.2-24-24V168C192 155.3 202.2 144 216 144c4.344 0 8.678 1.176 12.51 3.516l144 88C379.6 239.9 384 247.6 384 256C384 264.4 379.6 272.1 372.5 276.5z"></path></svg>
            <svg
            key="pause"
              v-show="isPlaying"
              class="w-10 h-10 text-white cursor-pointer text-opacity-70 play-button hover:text-amber-200" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle-pause" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM224 191.1v128C224 337.7 209.7 352 192 352S160 337.7 160 320V191.1C160 174.3 174.3 160 191.1 160S224 174.3 224 191.1zM352 191.1v128C352 337.7 337.7 352 320 352S288 337.7 288 320V191.1C288 174.3 302.3 160 319.1 160S352 174.3 352 191.1z"></path></svg>
          </button>
        </div>
        <div
          id="progress-bar"
          class="flex-grow overflow-hidden bg-indigo-600 border-2 rounded-lg shadow border-amber-300"
        >
          <div class="relative w-full h-full overlay-container">
            <input
              v-model="playbackTime"
              type="range"
              min="0"
              :max="audioDuration"
              class="w-full h-full border-none slider"
              id="position"
              name="position"
            />

            <!-- Show loading indicator until audio has been loaded -->

            <div
              v-if="!audioLoaded"
              class="absolute inset-0 flex items-center justify-start w-full px-2 text-gray-500 pointer-events-none"
            >
              Cargando, por favor espera...
            </div>

            <div
              v-else
              class="absolute inset-0 flex items-center justify-between w-full px-2 pointer-events-none "
            >
              <span
                class="text-sm text-gray-700 font-display"
                v-html="elapsedTime()"
              ></span>
              <span
                class="text-sm text-gray-700 font-display"
                v-html="totalTime()"
              ></span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- outer gray border -->
  </div>
</template>
<script lang="ts">
import { f7 } from "framework7-vue";
import { defineComponent } from "vue";
export default defineComponent({
  props: ["url", "playerid"],
  data() {
    return {
      playbackTime: 0,
      audioDuration: 100,
      audioLoaded: false,
      isPlaying: false,
      listenerActive: false,
    };
  },
  methods: {

    onCanPlay(){
      this.audioLoaded = true;
    },

    //Set the range slider max value equal to audio duration
    initSlider() {
      var audio = this.$refs.player;
      if (audio) {
        this.audioDuration = Math.round(audio.duration);
      }
    },

    //Convert audio current time from seconds to min:sec display
    convertTime(seconds: number) {
      const format = (val: number) => `0${Math.floor(val)}`.slice(-2);
      var hours = seconds / 3600;
      var minutes = (seconds % 3600) / 60;

      return [minutes, seconds % 60].map(format).join(":");
    },

    //Show the total duration of audio file
    totalTime() {
      var audio = this.$refs.player;
      if (audio) {
        var seconds = audio.duration;
        return this.convertTime(seconds);
      } else {
        return "00:00";
      }
    },

    //Display the audio time elapsed so far
    elapsedTime() {
      var audio = this.$refs.player;
      if (audio) {
        var seconds = audio.currentTime;
        return this.convertTime(seconds);
      } else {
        return "00:00";
      }
    },

    //Playback listener function runs every 100ms while audio is playing
    playbackListener(e: any) {
      var audio = this.$refs.player;

      //Sync local 'playbackTime' var to audio.currentTime and update global state
      this.playbackTime = audio.currentTime;

      // console.log("update: " + this.playbackTime);

      //Add listeners for audio pause and audio end events
      // audio.addEventListener("ended", this.endListener);
      // audio.addEventListener("pause", this.pauseListener);
    },

    //Function to run when audio is paused by user
    pauseListener() {
      this.isPlaying = false;
      this.listenerActive = false;
      this.cleanupListeners();
    },
    //Function to run when audio play reaches the end of file
    endListener() {
      this.isPlaying = false;
      this.listenerActive = false;
      console.log('Ended');
      f7.toast.create({
          icon: '<i class="fa-regular fa-check fa-4x text-success-100"></i>',
          text: '¡Excelente! has finalizado el paso 3.',
          position: 'center',
          closeTimeout: 5000,
        }).open();
      this.cleanupListeners();
    },
    //Remove listeners after audio play stops
    cleanupListeners() {
      var audio = this.$refs.player;
      audio.removeEventListener("timeupdate", this.playbackListener);
      audio.removeEventListener("ended", this.endListener);
      audio.removeEventListener("pause", this.pauseListener);

      //console.log("All cleaned up!");
    },
    toggleAudio() {
      var audio = this.$refs.player;
      //var audio = document.getElementById("audio-player");
      if (audio.paused) {
        audio.play();
        this.isPlaying = true;
      } else {
        audio.pause();
        this.isPlaying = false;
      }
    },
  },
  mounted: function () {
    // nextTick code will run only after the entire view has been rendered
    this.$nextTick(function () {
      const vm = this;
      var audio = vm.$refs.player;
      //Wait for audio to load, then run initSlider() to get audio duration and set the max value of our slider
      // "loademetadata" Event https://www.w3schools.com/tags/av_event_loadedmetadata.asp
      audio.addEventListener(
        "loadedmetadata",
        function () {
          vm.initSlider();
        }.bind(this)
      );

      //Wait for audio to begin play, then start playback listener function
        this.$watch("isPlaying",() => {
          if(this.isPlaying) {
            var audio=this.$refs.player;
            this.initSlider();
            //console.log("Audio playback started.");
            //prevent starting multiple listeners at the same time
            if(!this.listenerActive) {
              vm.listenerActive=true;
              audio.addEventListener("timeupdate",this.playbackListener);
            }
          }
        });
        //Update current audio position when user drags progress slider
        this.$watch("playbackTime",function() {
            var audio=this.$refs.player;
        var diff=Math.abs(this.playbackTime-this.$refs.player.currentTime);

          //Throttle synchronization to prevent infinite loop between playback listener and this watcher
          if(diff>0.01) {
            this.$refs.player.currentTime = this.playbackTime;
          }
        });



    });
  },
});
</script>

<style lang="postcss" scoped>

input[type="range"] {
  display: block;
  margin: auto;
  position: relative;
  overflow: hidden;
  width: 100%;
  cursor: pointer;
  outline: none;
  -webkit-appearance: none;
  border-radius: 0; /* iOS */
  background: transparent;
}

input[type="range"]:focus {
  outline: none;
}

::-webkit-slider-runnable-track {
  background: #fff;
}

/*
 * 1. Set to 0 width and remove border for a slider without a thumb
 */
::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 0; /* 1 */
  height: 40px;
  background: #fff;
  box-shadow: -100vw 0 0 100vw #fbbf24;
  border: none; /* 2px solid #999; */
}

::-moz-range-track {
  height: 40px;
  background: #ddd;
}

::-moz-range-thumb {
  background: #fff;
  height: 40px;
  width: 0; /* 20px; */
  border: none; /* 3px solid #999; */
  border-radius: 0 !important;
  box-shadow: -100vw 0 0 100vw dodgerblue;
  box-sizing: border-box;
}

::-ms-fill-lower {
  background: dodgerblue;
}

::-ms-thumb {
  background: #fff;
  border: 2px solid #999;
  height: 40px;
  width: 20px;
  box-sizing: border-box;
}

::-ms-ticks-after {
  display: none;
}

::-ms-ticks-before {
  display: none;
}

::-ms-track {
  background: #ddd;
  color: transparent;
  height: 40px;
  border: none;
}

::-ms-tooltip {
  display: none;
}
</style>