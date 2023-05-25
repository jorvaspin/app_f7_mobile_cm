<template>
  <div class="font-display">
    <div class="relative flex flex-col items-center justify-center h-24 gap-2">
        <div class="absolute text-sm text-gray-600 uppercase dark:text-gray-200 -left-5 -top-1">Paso</div>
        <div class="flex items-center justify-center w-16 h-16 text-5xl leading-none text-gray-800 bg-yellow-200 rounded-full">
            <slot name="number">1</slot>
        </div>
        <div class="flex items-center justify-center w-full gap-1 text-xs tracking-wide text-center text-gray-500 uppercase dark:text-gray-200">
            <slot name="action">Lectura</slot>
        </div>
    </div>
  </div>
</template>
<style lang="scss">
.paso {
  &:before {
    content: "PASO";
    position: absolute;
    top: 0;
    left: -90px;
    font-size: 16px;
    color: #32323f;
    text-align: left;
    z-index: 3;
  }

  &:after {
    content: "1";
    position: absolute;
    top: 0;
    left: -75px;
    height: 67px;
    width: 67px;
    font-size: 54px;
    line-height: 74px;
    color: #32323f;
    text-align: center;
    text-shadow: 0 1px 0 #ffffff;
    background: #ffeaa7;
    border-radius: 50%;
    z-index: 2;
  }
}
</style>
