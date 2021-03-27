<template>
  <div id="app">
    <router-view></router-view>
    <div id="backImg"></div>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style scoped>
#backImg{
  background: url("assets/images/index_back.svg") no-repeat scroll center center / cover;
  width: 100%;
  height: calc(100vh);
  position: fixed;
  top: 0px;
  left: 0px;
}
</style>
