<template>
<div id="Tag">
  <div class="tag">
    <span class="iconfont icon-tag">
      <span style="padding-left: 7px;font-size: 16px">标签</span>
    </span>
    <hr style="margin-top: 8px;margin-bottom: 5px">
    <ul class="tag-ul">
      <li v-for="tag in tagList" :key="tag.id" :style="{'background-color':tag.color}">
        <router-link :to="{ name: 'tag', params: { tagId: tag.id}}">
        {{tag.name}}
        </router-link>
      </li>
      <div style="clear: both"></div>
    </ul>
  </div>

</div>
</template>

<script>

export default {
  name: "Tag",
  created() {
    this.loadData();
  },
  methods: {
    loadData(){
      this.$axios.post('/tag/getActiveTag').then(response => {
        if(response.status == 200 && response.data.status == 'succeed'){
          this.tagList = response.data.tagList;
        }else {
          this.alert(response.data.status);
        }
      }).catch(e =>{
        this.alert('系统错误1:'+e,'错误');
      })
    }
  },
  data(){
    return{
      tagList:[]
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
.tag-ul li a{
  color: white;
  text-decoration: none;
}
</style>