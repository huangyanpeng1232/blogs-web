<template>
  <div id="app">
<!--    <div id="backImg"></div>-->
    <router-view></router-view>

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
  color: #666;
}
.color1 a{
  color: inherit;
}
.color1:hover{
  color: #22b7ff;
}
.color1 a:hover{
  color: inherit;
}
.color1:active{
  color: #139ad9;
}
.color1 a:active{
  color: inherit;
}
</style>
