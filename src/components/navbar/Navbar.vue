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
      <li style="float:right;" class="menu-btn color2">
          <router-link class="color1" :to="{name:'add'}">
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
            <li class="color2">
              文章管理
            </li>
          </router-link>
          <router-link :to="{ name: 'ClassifyAdmin'}">
            <li class="color2">
              分类管理
            </li>
          </router-link>
          <router-link :to="{ name: 'TagAdmin'}">
            <li class="color2">
              标签管理
            </li>
          </router-link>
        </ul>
      </li>
      <li style="float:right;" class="menu-btn color2">
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

</div>
</template>

<script>


export default {
  name: "Navbar",
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
      searchWait:null,
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
  font-weight: bold;
  font-size: 19px;
  position: relative;
  top: 2px;
  color: #444;
}
.title a{
  outline: none;
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
  border-top: 6px solid #666;
  border-bottom: 0;
  position: relative;
  top: 13px;
  left: 5px;
}
.menu-children-ul li{
  list-style: none;
  padding: 10px;
  margin: 0px;
  font-size: 13px;
}
.menu-children-ul a{
  border-top: 6px solid #666;
  outline: none;
}
.menu-children-ul li:hover{
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
.menu-children-ul a:link {
  color: #666;
}
.menu-children-ul a:visited {
  color: #666;
}
.menu-children-ul a:hover {
  color: #444;
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
  color: #666;
  font-size: 13px;
}
.menu-search-result-ul>li:hover{
  background-color: #efefef;
  color: #666;
}
.title a{
  text-decoration: none;
}
</style>