<template>
  <div
    class="relative mx-auto rounded-full text-gray-800 bg-green-100 shadow-lg items-center justify-around flex flex-row py-3 px-3"
  >
    <div class="w-1/4 flex-none">
      <svg
        class="stroke-current text-indigo-500 w-12 h-12 mx-auto"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
        />
      </svg>
    </div>
    <div class="flex-grow">
      <div class="flex flex-col">
        <span class="text-xs">Esta temática se encuentra completada</span>
        <strong class="font-display text-lg text-indigo-500"
          >LOGRASTE <slot>1</slot> XP</strong>
      </div>
    </div>
  </div>
</template>
