<template>
  <div
  class="w-full px-2 border-2 border-white rounded-lg shadow border-opacity-40 vueAudioBetter lg:border-8 bg-gradient-to-br from-slate-600 to-slate-800 lg:rounded-full"
  :style="{width: totalWidth}"
  >
    <div class="text-lg text-white total font-display">
      <span>{{ _sToMs(seek) }} / {{ _sToMs(duration) }}</span>
      <span>{{ curProgress }}%</span>
    </div>
    <div class="operatorButton">
      <span @click="togglePlayback" v-show="!playing">
        <span class="text-yellow-300 fal fa-play-circle w-14 h-14"></span>
      </span>
      <span @click="togglePlayback" v-show="playing">
            <span class="text-yellow-300 fal fa-pause-circle w-14 h-14"></span>
      </span>
      <span
      @click="stop"
      :class="{ 'opacity-20' : !playing }"
      >
        <span class="text-white fal fa-stop-circle w-7 h-7"></span>
      </span>
      <span
      @click="handleToggleMute" v-if="isMute"
      :class="{ 'opacity-20' : !playing }"
      >
        <span class="text-white fal fa-volume w-7 h-7"></span>
      </span>
      <span
      @click="handleToggleMute"
      v-else
      :class="{ 'opacity-20' : !playing }"
      >
        <span class="text-white fal fa-volume-mute w-7 h-7"></span>
      </span>
      <span
      @click="handleSetVolume(true)"
      :class="{ 'opacity-20' : !playing }"
      >
        <span class="text-white fal fa-plus-circle w-7 h-7" ></span>
      </span>
      <span
      @click="handleSetVolume(false)"
      :class="{ 'opacity-20' : !playing }"
      >
        <span class="text-white fal fa-minus-circle w-7 h-7" ></span>
      </span>




      <!-- <span class="iconfont icon-speed-2 rate" @click="handleSetRate" v-if="rate === 0.9"></span>
      <span class="iconfont icon-speed-1 rate" @click="handleSetRate" v-if="rate === 1"></span>
      <span class="iconfont icon-speed- rate" @click="handleSetRate" v-if="rate === 1.2"></span> -->
    </div>
    <div class="bg-white slider rounded-xl" ref="slider" @click="handleModifyProgress">
      <div class="progressInfo"></div>
      <div class="process rounded-xl bg-slate-400" :style="{width: pWidth}"></div>
      <div class="thunk" ref="trunk" :style="{left}">
          <div class="bg-yellow-300 shadow-xl blocke bg-opacity-90"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Audio from '@/js/plugins/audio';
import store from '@/store/store';
import { defineComponent } from 'vue';
// import '@assets/fonts/iconfont.css';

export default defineComponent({
  name: 'VueAudio',
  mixins: [Audio],
  props: ['width'],
  data() {
    return {
      min: 0,
      max: 100,
      slider: {},
      thunk: {},
      per: 0,
      rate: 1,
      isMute: true,
      curVolume: 0.5,
      totalWidth: '500 px'
    }
  },
  watch: {
    curProgress(v) {
      if (!document.onmouseup) {
        this.per = v;
      }
    }
  },
  computed:{
    curProgress() {
      let curProgress = ((Math.round((this.progress * 10000)))/100.00).toFixed(0);
      return curProgress;
    },
    scale(){
      let scale = (this.per - this.min) / (this.max - this.min);
      return scale;
    },
    pWidth(){
      if(this.slider){
        return this.slider.offsetWidth * this.scale + 'px';
      }else{
        return 0 + 'px'
      }
    },
    left(){
      if(this.slider){
        return this.slider.offsetWidth * this.scale -  this.thunk.offsetWidth/2  + 'px';
      }else{
        return 0 + 'px'
      }
    }
  },
  methods: {

    handleModifyProgress(e) {
      if (e.target.className === 'slider' || e.target.className === 'process') {
        let scale = e.offsetX / this.slider.offsetWidth;
        this.setProgress(scale);
      }
    },
    handleSetRate() {
      if (this.rate === 1) {
        this.rate = 0.9;
        this.setRate(this.rate);
      } else if (this.rate === 0.9) {
        this.rate = 1.2;
        this.setRate(this.rate);
      } else {
        this.rate = 1;
        this.setRate(this.rate);
      }
    },
    handleToggleMute() {
      this.isMute ? this.isMute = false : this.isMute = true;
      this.toggleMute();
    },
    handleSetVolume(flag) {
      flag ? this.curVolume += 0.1 : this.curVolume -= 0.1;
      this.curVolume > 1 ? this.curVolume = 1 : this.curVolume < 0 ? this.curVolume = 0 : '';
      this.setVolume(this.curVolume);
    },
    _sToMs(s) {
      if(typeof s !== 'number') return '00' + ':' + '00'
      s = parseInt(s);
      let h;
      h = Math.floor(s/60);
      s = s%60;
      h += '';
      s += '';
      h = (h.length == 1) ? '0' + h : h;
      s = (s.length == 1) ? '0' + s : s;
      return h+':'+s;
    }
  },
  mounted () {

    // detenemos la musica
    store.state.musicBackgroundApp.stop();
    store.state.onMusicApp = false;

    if(this.width && typeof this.width === 'number') {
      this.totalWidth = this.width + 'px';
    }
    this.setVolume(this.curVolume);
    this.slider = this.$refs.slider;
    this.thunk = this.$refs.trunk;
    this.thunk.onmousedown = e => {
        let pWidth = parseInt(this.pWidth);
        let disX = e.clientX;
        document.onmousemove = e => {
            let newWidth = e.clientX - disX + pWidth;
            let scale = newWidth / this.slider.offsetWidth;
            this.per = Math.ceil((this.max - this.min) * scale + this.min);
            this.per = Math.max(this.per,this.min);
            this.per = Math.min(this.per,this.max);
        }
        document.onmouseup = () => {
            document.onmousemove = document.onmouseup = null;
            this.setProgress(this.scale);
        }
        return false;
    }
  },
})
</script>

<style>
.vueAudioBetter {
  overflow: hidden;
  margin: 0 auto;
}
.vueAudioBetter .total {
  margin: 20px auto;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 80%;
}
.vueAudioBetter .operatorButton {
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 80%;
  height: 38px;
}
.operatorButton .rate {
  font-size: 32px;
}
.operatorButton > span {
  font-size: 30px;
  cursor: pointer;
  transition: 0.3s all;
}
/* .operatorButton span:first-child {
  font-size: 50px;
} */
.operatorButton > span:hover {
  transform: scale(1.2);
  transition: 0.3s all;
}

.vueAudioBetter .slider {
  position: relative;
  margin: 26px auto;
  width: 80%;
  height: 8px;
  /* background: rgb(248, 247, 247); */
  /* border-radius: 2px; */
  cursor: pointer;
}
.slider .process {
  position: absolute;
  left: 0;
  top: 0;
  width: 112px;
  height: 8px;
  /* border-radius: 3px; */
  /* background: #409eff; */
}
.slider .thunk {
  position: absolute;
  left: 100px;
  top: -5px;
  width: 20px;
  height: 20px;
}
.slider .blocke {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  /* border: 2px solid #409eff; */
  /* background: rgba(255, 255, 255, 1); */
  transition: 0.2s all;
}
.slider .blocke:hover {
  transform: scale(1.3);
  /* opacity: 0.9; */
}
.slider .progressInfo {
  position: absolute;
  top: -28px;
  color: #117eeb;
  font-weight: 600;
}
.operatorButton .iconfont:active {
  position: relative;
  top: 2px;
  left: 2px;
}
</style>
