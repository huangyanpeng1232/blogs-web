<template>
  <div id="app">
<!--    <div id="backImg"></div>-->
    <router-view></router-view>
    <BgAnimation></BgAnimation>
  </div>
</template>
<script>
import BgAnimation from "@/components/background/BgAnimate";

export default {
  name: 'App',
  components: {
    BgAnimation
  },
  mounted() {
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = '../assets/js/background.js';
    document.body.appendChild(s);
  }
}
</script>

<style>
#backImg{
  background: url("assets/images/index_back.svg") no-repeat scroll center center / cover;;
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
  color: #22b7ff;
}
.color1 a{
  color: inherit;
  outline:none;
}
.color1 a:visited{
  color: inherit;
  outline: none;
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
