<template>
<div id="Navbar">
  <div class="navbar-div">
    <ul class="menu-ul">
      <li v-for="menu in menus" :style="{'float':menu.float}" :class="[menu.type]" :key="menu.id">
        <template v-if="menu.type == 'menu-btn'">
          <div @mouseover="menu.childrenShow = true" @mouseout="menu.childrenShow = false">
            <router-link :to="menu.url">
              <span class="iconfont" :class="[menu.icon]"></span>
              <span>{{menu.text}}</span>

              <span v-if="menu.children != undefined && menu.children.length > 0" class="menu-btn-down"></span>
              <ul class="menu-children-ul" v-show="menu.childrenShow" v-if="menu.children != undefined && menu.children.length > 0">
                <li v-for="item in menu.children" :key="item.id">
                  {{item.text}}
                </li>
              </ul>
            </router-link>
          </div>

        </template>
        <template v-if="menu.type == 'menu-search'">
          <div class="search-div" :class="{searchFocus:search.focus,searchBlur:!search.focus}">
            <span class="iconfont icon-search"></span>
            <input type="text" v-model="search.intext" @keyup="searchText()" @focus="search.focus = true;searchText()" @blur="search.focus = false;search.resultShow = false" class="search-input" >
          </div>
          <ul class="menu-search-result-ul" v-show="search.resultShow" >
            <li v-for="result in search.result" :key="result.id">
              {{result.content}}
            </li>
          </ul>
        </template>
        <template v-if="menu.type == 'title'">
          <span class="title" >
            {{menu.text}}
          </span>
        </template>
        <template v-if="menu.type == 'menu-colors'">
          <span class="iconfont icon-Colorpalette-Filled"></span>
        </template>
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
      menus:[
        {
          id:'5',
          url:'/',
          text:'个人博客',
          type:'title',
          icon:'icon-tag',
          float:'left',
          childrenShow:false
        },{
          id:'100',
          url:'/edit',
          text:'创作',
          type:'menu-btn',
          icon:'icon-edit',
          float:'right',
          childrenShow:false
        },
        {
          id:'6',
          url:'/',
          text:'时间线',
          type:'menu-btn',
          icon:'icon-icon-time',
          float:'right',
          childrenShow:false
        },{
          id:'7',
          url:'/',
          text:'标签',
          type:'menu-btn',
          icon:'icon-tag',
          float:'right',
          childrenShow:false
        },{
          id:'8',
          url:'/',
          text:'分类',
          type:'menu-btn',
          icon:'icon-menu',
          float:'right',
          childrenShow:false,
          children:[
            {
              id:'9',
              url:'/',
              type:'menu-btn',
              text:'Mysql'
            },{
              id:'10',
              url:'/',
              type:'menu-btn',
              text:'Redis'
            },{
              id:'11',
              url:'/',
              type:'menu-btn',
              text:'Spring Boot'
            }
          ]
        },
        {
          id:'12',
          url:'/',
          text:'首页',
          type:'menu-btn',
          icon:'icon-home',
          float:'right',
          childrenShow:false
        },
        {
          id:'13',
          url:'/',
          type:'menu-search',
          float:'right',
          childrenShow:false
        }
      ],
      searchWait:null

    }
  },
  methods:{
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
  margin: 0px 5px;
}
.menu-btn{
  font-size: 15px;
  transition: all 0.1s ease 0s;
}
.menu-btn div a{
  color: #19a9ff;
}
.menu-btn div a:hover{
  color: #1692d7;
  transform: scale(1.1);
}
.menu-btn div a:active{
  color: #1080bb;
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
.icon-Colorpalette-Filled{
  font-size: 20px;
  color: #4fbdff;
  padding-top: 10px;
}
.menu-search,.menu-btn{
  padding: 10px;
}
.menu-search{
  color: #6a6a6a;
}
.menu-colors{
  padding-top: 10px;
}
.menu-btn-down{
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 6px solid #4fbdff;
  border-bottom: 0;
  position: relative;
  top: 13px;
  left: 5px;
}
.menu-children-ul>li{
  list-style: none;
  padding: 10px;
  margin: 0px;
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
  color: #33b4ff;
}
</style>