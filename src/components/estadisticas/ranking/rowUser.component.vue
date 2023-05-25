<template>
  <div
    class="relative flex items-center gap-3 p-4 overflow-hidden border-b last:border-none md:p-2"
    :class="[
        data.user.id == this.$store.state.user.id
        ? 'selectedUser border-yellow-200 bg-yellow-100 active'
        : ' border-gray-200',
        (section == 'estadisticas') ? 'h-12':'h-full'
    ]
    "
  >
    <div class="flex-none w-8 text-xl text-center font-display">
      {{ index }}
    </div>
    <div class="flex-none w-8 text-center">
      <img
        :src="userAvatar"
        alt=""
        class="w-8 border border-white rounded-full"
      />
    </div>
    <div
    class="flex-1 text-xs text-left text-gray-700"
    :class="{'truncate': (this.section == 'estadisticas')}"
    >
      <span
      :style="
        usedNickname != null
          ? usedNickname.nickname.style
          : ''
        "
      class="text-ellipsis font-display" :title="userName">
        {{ userName }}</span>

    </div>
    <div class="flex-none w-20 text-center">
      <badge-light class="text-xs">
        {{ $filters.formatNumber(data.puntaje_total) }} XP
      </badge-light>
    </div>
  </div>
</template>
<script>
export default {
  name: "RowUser",
  props: ["data", "index","section"],
  computed: {
    userName(){
        if(this.$store.state.user.id == this.data.user.id){
            return (this.section == 'estadisticas') ? this.$store.state.user.nick_or_name : this.$store.state.user.short_name;
        }
        else{
            return (this.section == 'estadisticas') ? this.data.user.nick_or_name : this.data.user.short_name;
        }
    },
    userAvatar(){
        return (this.$store.state.user.id == this.data.user.id) ? this.$store.state.user.user_avatar : this.data.user.user_avatar;
    },
    usedNickname(){
        return (this.data.user.nickname_used == null) ? null : JSON.parse(this.data.user.nickname_used.value);
    },
  },
};
</script>
<style lang="scss">
.selectedUser {
  .active {
    &:before {
      content: "Yo";
      position: absolute;
      top: 2px;
      right: 3px;
      font-family: "Burbank Big";
      font-size: .7rem;
      color: #ffffff;
      letter-spacing: 0;
      text-align: center;
      z-index: 3;
    }
    &:after {
      content: "";
      position: absolute;
      top: -15px;
      right: -20px;
      width: 50px;
      height: 30px;
      transform: rotate(45deg);
      background: #eb4d4b;
      z-index: 2;
    }
  }
}
</style>
