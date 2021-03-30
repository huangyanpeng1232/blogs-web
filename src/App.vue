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

<style>
#backImg{
  background: url("assets/images/index_back.svg") no-repeat scroll center center / cover;
  width: 100%;
  height: calc(100vh);
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: -1;
}
.color1{
  color: rgb(255, 200, 0);
}
.color1:hover{
  color: rgb(255, 168, 0);
}
.color1:active{
  color: rgb(255, 140, 0);
}

.color2 a{
  color: rgb(255, 200, 0);
}
.color2 a:hover{
  color: rgb(255, 168, 0);
}
.color2 a:active{
  color: rgb(255, 140, 0);
}

</style>
