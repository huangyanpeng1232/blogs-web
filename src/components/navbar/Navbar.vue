<template>
<div id="Navbar">
  <div class="navbar-div">
    <ul class="menu-ul">
      <li style="float: left" class="title">
        <router-link to="/">
            <span class="title" >
              个人博客
            </span>
        </router-link>
      </li>
      <li style="float:right;" class="menu-btn color1">
          <router-link :to="{name:'add'}">
            <span class="iconfont icon-edit-blogs"></span>
            <span>创作</span>
          </router-link>
      </li>
      <li style="float:right;" class="menu-btn color2 color1">
        <div >
          <span class="iconfont icon-icon-time"></span>
          <span>时间线</span>
        </div>
      </li>
      <li style="float:right;" class="menu-btn color2 color1" @mouseenter="tagListShow = true" @mouseleave="tagListShow = false">
        <div>
          <span class="iconfont icon-tag"></span>
          <span>标签</span>
          <span v-if="tagList != undefined && tagList.length > 0" class="menu-btn-down"></span>
        </div>
        <ul class="menu-children-ul" v-show="tagListShow">
          <template v-for="item in tagList">
            <router-link :key="item.id" :to="{ name: 'tag', params: { tagId: item.id}}">
              <li class="color2">
                  {{item.name}}
              </li>
            </router-link>
          </template>
        </ul>
      </li>
      <li style="float:right;" class="menu-btn color2 color1" @mouseenter="classifyListShow = true" @mouseleave="classifyListShow = false">
        <div>
          <span class="iconfont icon-menu"></span>
          <span>分类</span>
          <span v-if="classifyList != undefined && classifyList.length > 0" class="menu-btn-down"></span>
        </div>
        <ul class="menu-children-ul" v-show="classifyListShow">

          <template v-for="item in classifyList" >
            <router-link :key="item.id" :to="{ name: 'classify', params: { classifyId: item.id}}">
            <li class="color2">
                {{item.name}}
            </li>
            </router-link>
          </template>
        </ul>
      </li>
      <li style="float:right;" class="menu-btn color2 color1" @mouseenter="adminListShow = true" @mouseleave="adminListShow = false">
        <div>
          <span class="iconfont icon-menu"></span>
          <span>管理</span>
          <span class="menu-btn-down"></span>
        </div>
        <ul class="menu-children-ul" v-show="adminListShow">
          <router-link :to="{ name: 'BlogsAdmin'}">
            <li class="color1">
              文章管理
            </li>
          </router-link>
          <router-link :to="{ name: 'ClassifyAdmin'}">
            <li class="color1">
              分类管理
            </li>
          </router-link>
          <router-link :to="{ name: 'TagAdmin'}">
            <li class="color1">
              标签管理
            </li>
          </router-link>
        </ul>
      </li>
      <li style="float:right;" class="menu-btn color1">
        <router-link :to="'/'">
          <span class="iconfont icon-home"></span>
          <span>首页</span>
        </router-link>
      </li>
      <li style="float:right;">
        <SearchBox></SearchBox>
      </li>
    </ul>
  </div>

</div>
</template>

<script>


import SearchBox from "@/components/navbar/SearchBox";
export default {
  name: "Navbar",
  components: {SearchBox},
  data(){
    return {
      classifyList:[],
      classifyListShow:false,
      tagList:[],
      tagListShow:false,
      adminListShow:false
    }
  },
  methods:{
    loadClassify(){
      this.$axios.post('/classify/getActiveClassify').then(response => {
        if(response.status == 200 && response.data.status == 'succeed'){
          this.classifyList = response.data.classifyList;
        }else {
          this.alert(response.data.status);
        }
      }).catch(e =>{
        this.alert('系统错误:'+e,'错误');
      })
    },
    loadTag(){
      this.$axios.post('/tag/getActiveTag').then(response => {
        if(response.status == 200 && response.data.status == 'succeed'){
          this.tagList = response.data.tagList;
        }else {
          this.alert(response.data.status);
        }
      }).catch(e =>{
        this.alert('系统错误:'+e,'错误');
      })
    }

  },
  created:function(){
    this.loadClassify();
    this.loadTag();
  }
}
</script>

<style scoped>
.navbar-div{
  position: fixed;
  top:0px;
  width: 100%;
  background-color: white;
  z-index: 1;
  box-shadow: 0 1px 8px 0 rgba(0,0,0,0.1);
}
.navbar-div:after {
  content: '';
  display: block;
  clear: both;
  visibility: hidden ;
}
.menu-ul{
  width: 100%;
  padding: 10px;
}
.menu-ul>li{
  list-style: none;
  cursor: pointer;
  margin: 0px 7px;
}
.menu-btn{
  font-size: 16px;
  transition: all 0.1s ease 0s;
}
.menu-btn a{
  text-decoration:none;
}
.menu-btn:hover{
  background-color: #eee;
  border-radius: 6px;
  transform: scale(1.12);
}

.iconfont{
  margin-right: 5px;
}

.title{
  margin: 0px;
  font-weight: bold;
  font-size: 19px;
  position: relative;
  top: 2px;
  color: #444;
}
.title a{
  outline: none;
}
.menu-btn{
  padding: 10px;
}

.menu-btn-down{
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 6px solid #666;
  border-bottom: 0;
  position: relative;
  top: 13px;
  left: 5px;
}
.menu-children-ul li{
  list-style: none;
  padding: 7px 7px;
  margin: 0px;
  font-size: 13px;
  text-align: center;
  border-radius: 3px;
}

.menu-children-ul li:hover{
  background-color: #f5f5f5;

}
.menu-children-ul{
  position:absolute;
  padding-left: 0px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 1px 4px 0 rgba(0,0,0,0.2);
  min-width: 150px;
  padding: 8px;
}

.title a{
  text-decoration: none;
}
</style>