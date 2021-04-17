<template>
<div id="Weather" @mouseover="hideName()">
  <div id="he-plugin-simple" ></div>
</div>
</template>

<script>
export default {
  name: "Weather",
  methods:{
    loadWeather(){
      window. WIDGET = {
        "CONFIG": {
          "modules": "01234",
          "background": "1",
          "tmpColor": "FFFFFF",
          "tmpSize": "16",
          "cityColor": "FFFFFF",
          "citySize": "16",
          "aqiColor": "FFFFFF",
          "aqiSize": "16",
          "weatherIconSize": "24",
          "alertIconSize": "18",
          "padding": "10px 10px 10px 10px",
          "shadow": "0",
          "language": "auto",
          "fixed": "false",
          "vertical": "top",
          "horizontal": "left",
          "key": "5552f297dff9456190262063fd6a5cb8"
        }
      }
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://widget.qweather.net/simple/static/js/he-simple-common.js?v=2.0';
      document.getElementsByTagName('head')[0].appendChild(script);
    },
    hideName(){
      $('.wv-lt-refresh').html('天气')
    }
  },
  mounted() {
    this.loadWeather();
  }
}
</script>

<style>
#Weather{
  opacity: 0.8;
  width: 200px;
}
#Weather .s-sticker{
  border-radius: 100px;
}

</style>