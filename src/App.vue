<template>
  <div id="app">
    <div id="backImg"></div>
    <Alert ref="alert"></Alert>
    <router-view></router-view>
  </div>
</template>

<script>

import Alert from "@/components/plugins/Alert";
export default {
  name: 'App',
  components: {Alert}
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
.color1:hover{
  color: #444;
}
.color1:active{
  color: #222;
}

.color2 a{
  color: #666;
}
.color2 a:hover{
  color: #444;
}
.color2 a:active{
  color: #222;
}

</style>
