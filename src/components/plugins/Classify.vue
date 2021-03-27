<template>
<div id="Classify">
  <div class="classify">
    <span class="iconfont icon-menu">
      <span style="padding-left: 7px;font-size: 16px">分类</span>
    </span>
    <hr style="margin-top: 10px;margin-bottom: 15px">
    <ul class="classify-ul">
      <li v-for="classify in classifyList" :key="classify.id">
        <div class="classify-text" style="float: left;">{{classify.text}}</div>
        <div class="classify-num" :style="{'background-color':classify.color,'float':'right'}">{{classify.num}}</div>
        <div style="clear: both"></div>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
export default {
  name: "Classify",
  data(){
    return{
      classifyList:[
        {
          id:'1',
          url:'/',
          text:'Spring Boot',
          color:'rgb(244, 126, 96)',
          num:12
        },
        {
          id:'2',
          url:'/',
          text:'Mysql',
          color:'rgb(52, 152, 219)',
          num:81
        },
        {
          id:'3',
          url:'/',
          text:'Redis',
          color:'rgb(248, 178, 106)',
          num:120
        },
        {
          id:'4',
          url:'/',
          text:'Mybatis',
          color:'rgb(225, 91, 100)',
          num:78
        },
        {
          id:'5',
          url:'/',
          text:'Java 基础',
          color:'rgb(29,228,255)',
          num:4
        }
      ]
    }
  }
}
</script>

<style scoped>

.classify{
  margin-top: 20px;
  background-color: #ffffff;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  padding: 10px;
}

.classify:hover{
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

.icon-menu{
  font-size: 18px;
  color: #666;
}
.classify-ul{
  padding: 0px;
}
.classify-ul li{
  list-style: none;
  margin-top: 10px;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0px 0px 3px rgba(50, 50, 50, 0.3);
  margin-left: 4px;
  margin-right: 4px;
  transition: all 0.2s ease 0s;
  cursor: pointer;
}
.classify-ul li:hover{
  transform: scale(1.05)
}

.classify-text{
  color: #666;
  font-size: 14px;
  position: relative;
  top: 4px;
}
.classify-num{
  border-radius: 4px;
  color: white;
  padding: 5px;
  cursor: pointer;
  min-width: 30px;
  text-align: center;
}
.classify-num:hover{
  box-shadow: 0px 0px 2px #aaa;
}
</style>