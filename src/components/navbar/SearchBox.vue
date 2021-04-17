<template>
  <div id="SearchBox" >
    <div class="search-div" :class="{searchFocus:search.focus,searchBlur:!search.focus}">
      <span class="iconfont icon-search"></span>
      <input type="text" v-model="search.inText" @keydown="searchInputKeydown($event)" @keyup="searchText()" @focus="search.focus = true;searchText()" @blur="inputBlur()"  class="search-input" >
    </div>
    <ul class="menu-search-result-ul" id="searchResultUl" v-show="search.resultShow" >
      <template v-for="result in search.result">
        <router-link :key="result.id" :to="{ name: 'search', params: { searchText: result.content}}">
          <li>
            {{result.content}}
          </li>
        </router-link>
      </template>
      <li v-show="search.result.length == 0">
        未找到匹配文章
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SearchBox",
  data(){
    return{
      searchWait:null,
      search:{
        focus:false,
        inText:'',
        resultShow:false,
        result:[]
      }
    }
  },
  methods:{
    searchInputKeydown(e){
      if (e.keyCode == 13) {
        this.$router.push({name: 'search', params: { searchText: this.search.inText}})
      }
    },
    inputBlur(){
      let this_ = this;
      setTimeout(function(){
        this_.search.focus = false;
        this_.search.resultShow = false
      }, 100);
    },
    searchText:function(){
      if(this.searchWait != null){
        window.clearTimeout(this.searchWait)
      }
      if(this.search.inText != ''){
        let this_ = this;
        this.searchWait = setTimeout(function(){
          this_.sendSearch()
        },150)
      }else{
        this.search.resultShow = false
      }
    },
    sendSearch:function(){
      let this_ = this;
      this.$axios.post('/search/searchBlog',{'searchText':this.search.inText}).then(response => {
        if(response.status == 200 && response.data.status == 'succeed'){
          this_.search.result = [];
          for (let i = 0; i < response.data.blogs.length; i++) {
            let obj = {
              'id':response.data.blogs[i].id,
              'content':response.data.blogs[i].title
            }
            this_.search.result.push(obj);
          }
          this_.search.resultShow = true
        }else {
          this.alert(response.data.status);
        }
      }).catch(e =>{
        this.alert('系统错误3:'+e,'错误');
      })
    }
  }
}
</script>

<style scoped>
.search-div{
  border: 1px solid #eaecef;
  padding: 4px 8px;
  border-radius: 4px;
  margin: 0 auto;
  margin-top: -5px;
  width: 220px;
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
  padding: 0px 5px;
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
.menu-search-result-ul{
  width: 300px;
  border: 1px solid #ccc;
  margin-top: 5px;
  padding: 6px;
  position:absolute;
  background-color: #fff;
  border-radius: 5px;
}
.menu-search-result-ul li{
  list-style: none;
  padding: 7px;
  border-radius: 3px;
  color: #666;
  font-size: 13px;
}
.menu-search-result-ul li:hover{
  background-color: #efefef;
  color: #666;
}
.menu-search-result-ul a{
  text-decoration: none;
  outline: none;
}
#SearchBox{
  padding: 10px;
  color: #6a6a6a;
}

</style>