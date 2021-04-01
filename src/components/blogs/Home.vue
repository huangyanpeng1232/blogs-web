<template>
  <div id="Home">
    <div class="container">
      <div class="row">
        <div class="col-md-9">
          <BlogList :list="dataList"></BlogList>
        </div>
        <div class="col-md-3">
          <Calendar></Calendar>
          <Classify></Classify>
          <Tag></Tag>
        </div>
      </div>
    </div>
    <Alert ref="alert"></Alert>
  </div>
</template>

<script>

import BlogList from "@/components/blogs/BlogList";
import Calendar from "@/components/plugins/Calendar";
import Classify from "@/components/plugins/Classify";
import Tag from "@/components/plugins/Tag";
import Alert from "@/components/plugins/Alert";

export default {
  name: "Home",
  data(){
    return{
      index:0,
      loading:false,
      dataList:[]
    }
  },
  components: {Alert, Tag, Classify, Calendar, BlogList},
  mounted() {
    window.addEventListener('scroll',this.handleScroll,true)
  },
  created() {
    if(this.loading){
      return;
    }
    this.loadData();
  },
  methods: {
    handleScroll() {
      if (this.loading) {
        return;
      }
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
      let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      if (scrollTop + windowHeight > scrollHeight - 500) {
        this.loading = true;
        this.loadData();
      }
    },
    loadData() {
      this.index++;
      this.$axios.post('/blogs/getBlogs', {'index': this.index}).then(response => {
        if (response.status == 200 && response.data.status == 'succeed') {
          for (let i = 0; i < response.data.blogs.length; i++) {
            this.dataList.push(response.data.blogs[i])
          }
        } else {
          this.$refs.alert.alert(response.data.status);
        }
        if (response.data.blogs.length == response.data.pageSize) {
          this.loading = false;
        }
      }).catch(e => {
        this.$refs.alert.alert('系统错误:' + e);
      })
    }
  }
}
</script>

<style scoped>

</style>