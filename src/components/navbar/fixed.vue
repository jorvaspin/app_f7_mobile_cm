<template>
  <div class="navbar shadow-lg">
    <div class="navbar-bg bg-global-app navbar-fixed"></div>
    <div class="navbar-inner sliding">
      <div class="title text-sm text-gray-800">{{$store.state.routeNombre}}</div>
      <div class="right">
        <!-- <a v-on:click="volver()">
          <i class="text-2xl icon fal fa-times" style="color: black !important;"></i>
        </a> -->
        <a class="link back">
          <i class="icon fal fa-times fa-xl"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>
