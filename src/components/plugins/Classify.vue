<template>
<div id="Classify">
  <div class="classify">
    <span class="iconfont icon-menu">
      <span style="padding-left: 7px;font-size: 16px">分类</span>
    </span>
    <hr style="margin-top: 10px;margin-bottom: 15px">
    <ul class="classify-ul">
      <li v-for="classify in classifyList" :key="classify.id">
        <router-link :to="{ name: 'classify', params: { classifyId: classify.id}}">
          <div class="classify-text" style="float: left;">{{classify.name}}</div>
          <div class="classify-num" :style="{'background-color':classify.color,'float':'right'}">{{classify.blogSum}}</div>
          <div style="clear: both"></div>
        </router-link>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
export default {
  name: "Classify",
  created() {
    this.loadData();
  },
  methods: {
    loadData(){
      this.$axios.post('/classify/getActiveClassify').then(response => {
        if(response.status == 200 && response.data.status == 'succeed'){
          this.classifyList = response.data.classifyList;
        }else {
          this.alert(response.data.status);
        }
      }).catch(e =>{
        this.alert('系统错误:'+e,'错误');
      })
    }
  },
  data(){
    return{
      classifyList:[]
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
  padding: 8px 10px;
  border-radius: 4px;
  box-shadow: 0px 0px 3px rgba(50, 50, 50, 0.3);
  margin-left: 4px;
  margin-right: 4px;
  transition: all 0.15s ease 0s;
  cursor: pointer;
}
.classify-ul li:hover{
  transform: scale(1.04)
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
  min-width: 40px;
  text-align: center;
}
.classify-num:hover{
  box-shadow: 0px 0px 2px #aaa;
}
</style>