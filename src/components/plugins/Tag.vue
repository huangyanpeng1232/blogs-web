<template>
<div id="Tag">
  <div class="tag">
    <span class="iconfont icon-tag">
      <span style="padding-left: 7px;font-size: 16px">标签</span>
    </span>
    <hr style="margin-top: 8px;margin-bottom: 5px">
    <ul class="tag-ul">
      <li v-for="tag in tagList" :key="tag.id" :style="{'background-color':tag.color}">
        {{tag.text}}
      </li>
      <div style="clear: both"></div>
    </ul>
  </div>
</div>
</template>

<script>
export default {
  name: "Tag",
  data(){
    return{
      tagList:[
        {
          id:'1',
          url:'/',
          text:'随手记',
          color:'#fb9b5f'
        },
        {
          id:'2',
          url:'/',
          text:'好文章',
          color:'#f8b26a'
        },
        {
          id:'3',
          url:'/',
          text:'Java 基础支持',
          color:'#f47e60'
        },
        {
          id:'4',
          url:'/',
          text:'最优Spring',
          color:'#3498db'
        },
        {
          id:'5',
          url:'/',
          text:'最棒文章',
          color:'#abbd81'
        },
        {
          id:'6',
          url:'/',
          text:'Hello Java',
          color:'#e15b64'
        },
        {
          id:'7',
          url:'/',
          text:'Python 最强',
          color:'#67cc86'
        },
        {
          id:'8',
          url:'/',
          text:'好文',
          color:'#f36efc'
        },
        {
          id:'9',
          url:'/',
          text:'力荐',
          color:'#f47e60'
        }
      ]
    }
  }
}
</script>

<style scoped>
.tag>.icon-tag{
  font-size: 18px;
  color: #666;
}
.tag{
  margin-top: 20px;
  background-color: #ffffff;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  padding: 10px;
}

.tag:hover{
  animation-name: mouse-in-tag;
  animation-duration: 0.6s;
  animation-fill-mode: forwards
}
@keyframes mouse-in-tag {
  from {
    box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.2);
  }
  to {
    box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.3);
  }
}

.icon-tag{
  font-size: 18px;
  color: #666;
}
.tag-ul{
  padding: 0px;
}
.tag-ul li{
  float: left;
  list-style: none;
  margin-top: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  box-shadow: 0px 0px 3px rgba(50, 50, 50, 0.3);
  margin-left: 4px;
  margin-right: 4px;
  transition: all 0.1s ease 0s;
  cursor: pointer;
  color: white;
  font-size: 14px;
}
.tag-ul li:hover{
  transform: scale(1.04)
}
</style>