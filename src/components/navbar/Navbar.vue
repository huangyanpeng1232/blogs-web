<template>
<div id="Navbar">
  <div class="navbar-div">
    <ul class="menu-ul">
      <li style="float: left" class="title">
        <router-link to="/">
            <span class="title" >
              浩瀚学者
            </span>
        </router-link>
      </li>
      <li style="float: left" class="title hidden-xs">
        <Weather></Weather>
      </li>
      <li style="float:right;" class="menu-btn color1 hidden">
        <div >
          <span class="iconfont icon-icon-time"></span>
          <span>时间线</span>
        </div>
      </li>
      <li style="float:right;" class="menu-btn color1">
        <router-link :to="'/'" style="outline: none">
          <span class="iconfont icon-home"></span>
          <span>首页</span>
        </router-link>
      </li>
      <li style="float:right;" class="menu-btn color1 hidden-xs" @mouseenter="tagListShow = true" @mouseleave="tagListShow = false">
        <div>
          <span class="iconfont icon-tag"></span>
          <span>标签</span>
          <span v-if="tagList != undefined && tagList.length > 0" class="menu-btn-down"></span>
        </div>
        <ul class="menu-children-ul" v-show="tagListShow">
          <template v-for="item in tagList">
            <router-link :key="item.id" :to="{ name: 'tag', params: { tagId: item.id}}">
              <li class="color1">
                  {{item.name}}
              </li>
            </router-link>
          </template>
        </ul>
      </li>
      <li style="float:right;" class="menu-btn color2 color1 hidden-xs" @mouseenter="classifyListShow = true" @mouseleave="classifyListShow = false">
        <div>
          <span class="iconfont icon-menu"></span>
          <span>分类</span>
          <span v-if="classifyList != undefined && classifyList.length > 0" class="menu-btn-down"></span>
        </div>
        <ul class="menu-children-ul" v-show="classifyListShow">

          <template v-for="item in classifyList" >
            <router-link :key="item.id" :to="{ name: 'classify', params: { classifyId: item.id}}">
            <li class="color1">
                {{item.name}}
            </li>
            </router-link>
          </template>
        </ul>
      </li>
      <li style="float:right;" class="menu-btn color1" @click="adminClick()" @mouseenter="adminSys()" @mouseleave="adminListShow = false">
        <div>
          <span class="iconfont icon-tianchongxing-"></span>
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
          <router-link :to="{name:'add'}">
            <li class="color1">
              新增文章
            </li>
          </router-link>
        </ul>
      </li>

      <li style="float:right;" class="col-xs-12 col-md-3">
        <SearchBox></SearchBox>
      </li>
    </ul>
  </div>

</div>
</template>

<script>

import SearchBox from "@/components/navbar/SearchBox";
import Weather from "@/components/navbar/Weather";
export default {
  name: "Navbar",
  components: {Weather, SearchBox},
  data(){
    return {
      classifyList:[],
      classifyListShow:false,
      tagList:[],
      tagListShow:false,
      adminListShow:false,
      verify:false
    }
  },
  methods:{
    adminClick(){
      if(!this.verify){
        let inpass = prompt('请输入密码');
        this.verifyPassword(inpass);
      }
    },
    verifyPassword(inpass){
      let this_ = this;
      this.$axios.post('/user/login',{'password':inpass}).then(response => {
        if(response.status == 200 && response.data.status == 'succeed'){
          this_.verify = true;
          $.cookie('password', inpass, { expires: 7 });
        }
      }).catch(e =>{
        this.alert('系统错误50:'+e,'错误');
      })
    },
    adminSys(){
      if(this.verify) {
        this.adminListShow = true;
      }
    },
    loadClassify(){
      this.$axios.post('/classify/getActiveClassify').then(response => {
        if(response.status == 200 && response.data.status == 'succeed'){
          this.classifyList = response.data.classifyList;
        }else {
          this.alert(response.data.status);
        }
      }).catch(e =>{
        this.alert('系统错误5:'+e,'错误');
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
        this.alert('系统错误4:'+e,'错误');
      })
    }

  },
  created:function(){
    this.loadClassify();
    this.loadTag();

    let inpass = $.cookie('password')
    if(inpass != undefined && inpass != ''){
      this.verifyPassword(inpass);
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
  font-size: 35px;
  position: relative;
  top: -3px;
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