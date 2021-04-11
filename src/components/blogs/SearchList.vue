<template>
  <div id="SearchList">
    <div class="container">
      <div class="row">
        <div class="col-md-9">
          <BlogList ref="blogList" :list="dataList"></BlogList>
        </div>
        <div class="col-md-3">
          <CalendarPlugins></CalendarPlugins>
          <ClassifyPlugins></ClassifyPlugins>
          <TagPlugins></TagPlugins>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import BlogList from "@/components/blogs/BlogList";
import CalendarPlugins from "@/components/plugins/Calendar";
import ClassifyPlugins from "@/components/plugins/Classify";
import TagPlugins from "@/components/plugins/Tag";



export default {
  name: "SearchList",
  data(){
    return{
      index:0,
      searchText: this.$route.params.searchText,
      loading:false,
      dataList:[]
    }
  },
  watch:{
    "$route.params.searchText":{
      handler(val, oldVal){
        this.loading = false;
        this.index = 0;
        this.dataList= [];
        this.searchText = val
        this.loadData();
      },
      deep:true
    }
  },
  components: {TagPlugins, ClassifyPlugins, CalendarPlugins, BlogList},
  mounted() {
   window.addEventListener('scroll',this.handleScroll,true)
  },
  created() {
    this.loadData();
  },
  methods: {
    handleScroll() {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
      let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      if (scrollTop + windowHeight > scrollHeight - 500) {
        this.loadData();
      }
    },
    loadData() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      this.index++;
      this.$axios.post('/blogs/getBlogs', {'index':this.index,'searchText':this.searchText}).then(response => {

        if (response.status == 200 && response.data.status == 'succeed') {
          for (let i = 0; i < response.data.blogs.length; i++) {
            this.dataList.push(response.data.blogs[i])
          }
          if(this.dataList.length == 0){
            this.$refs.blogList.loadEnd = true;
          }
        } else {
          this.alert(response.data.status);
        }
        if (response.data.blogs.length == response.data.pageSize) {
          this.loading = false;
        }
      }).catch(e => {
        this.alert('系统错误:' + e,'错误');
      })
    }
  }
}
</script>

<style scoped>

</style>