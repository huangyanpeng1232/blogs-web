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
      <li style="float:right;" class="menu-btn">
          <router-link :to="{name:'add'}">
            <span class="iconfont icon-edit"></span>
            <span>创作</span>
          </router-link>
      </li>
      <li style="float:right;" class="menu-btn">
        <div >
          <span class="iconfont icon-icon-time"></span>
          <span>时间线</span>
        </div>
      </li>
      <li style="float:right;" class="menu-btn" @mouseenter="tagListShow = true" @mouseleave="tagListShow = false">
        <div>
          <span class="iconfont icon-tag"></span>
          <span>标签</span>
          <span v-if="tagList != undefined && tagList.length > 0" class="menu-btn-down"></span>
        </div>
        <ul class="menu-children-ul" v-show="tagListShow">
          <li v-for="item in tagList" :key="item.id">
            <router-link :to="{ name: 'tag', params: { tagId: item.id}}">
              {{item.name}}
            </router-link>
          </li>
        </ul>
      </li>
      <li style="float:right;" class="menu-btn" @mouseenter="classifyListShow = true" @mouseleave="classifyListShow = false">
        <div>
          <span class="iconfont icon-menu"></span>
          <span>分类</span>
          <span v-if="classifyList != undefined && classifyList.length > 0" class="menu-btn-down"></span>
        </div>
        <ul class="menu-children-ul" v-show="classifyListShow">
          <li v-for="item in classifyList" :key="item.id">
            <router-link :to="{ name: 'classify', params: { classifyId: item.id}}">
              {{item.name}}
            </router-link>
          </li>
        </ul>
      </li>
      <li style="float:right;" class="menu-btn">
        <router-link :to="'/'">
          <span class="iconfont icon-home"></span>
          <span>首页</span>
        </router-link>
      </li>
      <li style="float:right;" class="menu-search">
        <div class="search-div" :class="{searchFocus:search.focus,searchBlur:!search.focus}">
          <span class="iconfont icon-search"></span>
          <input type="text" v-model="search.intext" @keyup="searchText()" @focus="search.focus = true;searchText()" @blur="search.focus = false;search.resultShow = false" class="search-input" >
        </div>
        <ul class="menu-search-result-ul" v-show="search.resultShow" >
          <li v-for="result in search.result" :key="result.id">
            {{result.content}}
          </li>
        </ul>
      </li>
    </ul>
  </div>
  <Alert ref="alert"></Alert>
</div>
</template>

<script>

import Alert from "@/components/plugins/Alert";
export default {
  name: "Navbar",
  components: {Alert},
  data(){
    return {
      search:{
        focus:false,
        intext:'',
        resultShow:false,
        result:[
          {
            id:'1',
            content:'Spring Boot',
            url:'/'
          },
          {
            id:'2',
            content:'Mysql',
            url:'/'
          },
          {
            id:'3',
            content:'Java 异常体系',
            url:'/'
          },
          {
            id:'4',
            content:'Vue 为什么这么火',
            url:'/'
          }
        ]
      },
      classifyList:[],
      classifyListShow:false,
      tagList:[],
      tagListShow:false,
      searchWait:null
    }
  },
  methods:{
    loadClassify(){
      this.$axios.post('/classify/getActiveClassify').then(response => {
        if(response.status == 200 && response.data.status == 'succeed'){
          this.classifyList = response.data.classifyList;
        }else {
          this.$refs.alert.alert(response.data.status);
        }
      }).catch(e =>{
        this.$refs.alert.alert('系统错误:'+e);
      })
    },
    loadTag(){
      this.$axios.post('/tag/getActiveTag').then(response => {
        if(response.status == 200 && response.data.status == 'succeed'){
          this.tagList = response.data.tagList;
        }else {
          this.$refs.alert.alert(response.data.status);
        }
      }).catch(e =>{
        this.$refs.alert.alert('系统错误:'+e);
      })
    },
    searchText:function(){
      if(this.searchWait != null){
        window.clearTimeout(this.searchWait)
      }
      if(this.search.intext != ''){
        let this_ = this;
        this.searchWait = setTimeout(function(){
          this_.search.resultShow = true
        },250)
      }else{
        this.search.resultShow = false
      }
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
  color: rgb(255, 204, 0);
  transition: all 0.1s ease 0s;
}
.menu-btn a{
  color: rgb(255, 204, 0);
  text-decoration:none;
}
.menu-btn:hover{
  background-color: #eee;
  border-radius: 6px;
  transform: scale(1.12);
  color: rgb(255, 183, 0);
}
.menu-btn a:hover{
  color: rgb(255, 183, 0);
}
.iconfont{
  margin-right: 5px;
}
.search-div{
  border: 1px solid #eaecef;
  padding: 4px 8px;
  border-radius: 4px;
  margin-top: -5px;
  transition: all 0.15s ease 0s;
}
.search-div:hover{
  transform: scale(1.05);
}
.search-input{
  border:none;
  outline:medium;
  font-size: 16px;
  color: #666;

}

.searchFocus{
  animation-name: search-focus;
  animation-duration: 0.2s;
  animation-fill-mode : forwards
}
.searchBlur{
  animation-name: search-blur;
  animation-duration: 0.2s;
  animation-fill-mode : forwards
}
@keyframes search-focus {
  from {border-color: #eaecef;}
  to {border-color: #aaa;}
}
@keyframes search-blur {
  from {border-color: #aaa;}
  to {border-color: #eaecef;}
}
.title{
  margin: 0px;
  color: #333;
  font-weight: bold;
  font-size: 19px;
  position: relative;
  top: 2px;
}

.menu-search,.menu-btn{
  padding: 10px;
}
.menu-search{
  color: #6a6a6a;
}

.menu-btn-down{
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 6px solid rgb(255, 204, 0);
  border-bottom: 0;
  position: relative;
  top: 13px;
  left: 5px;
}
.menu-children-ul>li{
  list-style: none;
  padding: 10px;
  margin: 0px;
  font-size: 13px;
}
.menu-children-ul>li:hover{
  background-color: #f5f5f5;

}
.menu-children-ul,.menu-search-result-ul{
  position:absolute;
  padding-left: 0px;
  background-color: #fff;
  border-radius: 5px;
}
.menu-children-ul{
  box-shadow: 0 1px 4px 0 rgba(0,0,0,0.2);
  min-width: 140px;
}
.menu-search-result-ul{
  width: 300px;
  border: 1px solid #ccc;
  margin-top: 5px;
  padding: 6px;
}
.menu-search-result-ul>li{
  list-style: none;
  padding: 7px;
  border-radius: 3px;
  color: #555;
  font-size: 13px;
}
.menu-search-result-ul>li:hover{
  background-color: #efefef;
  color: rgb(255, 203, 0);
}
</style>