<template>
<div id="Calendar">
  <div id="calendar-div" class="calendar"></div>
</div>
</template>

<script>
import '../../assets/js/calendar.js'
export default {
  name: "Calendar",
  mounted:function() {
    $('#calendar-div').calendar({
      ifSwitch: true, // 是否切换月份
      hoverDate: true, // hover是否显示当天信息
      backToday: true // 是否返回当天
    });
  }
}
</script>

<style scoped>
@import "../../assets/css/calendar.css";
.calendar:hover{
  animation-name: mouse-in-calendar;
  animation-duration: 0.6s;
  animation-fill-mode: forwards
}
@keyframes mouse-in-calendar {
  from {
    box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.2);
  }
  to {
    box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.3);
  }
}
</style>