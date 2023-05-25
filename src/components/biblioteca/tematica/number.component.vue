<template>
  <div
    class="flex items-center justify-center leading-none text-yellow-300 truncate border-b-2 border-gray-900 rounded-full font-display bg-gradient-to-br from-gray-600 to-gray-800"
    :class="(!mini) ? 'w-10 h-10 text-xl' : 'w-8 h-8 text-sm'"
  >
    <div class="-mb-1"><slot>N</slot></div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "lesson-number",
  props: {
    mini: { type: Boolean, required: false, default: false },
  },
});
</script>
