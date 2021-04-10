<template>
<div id="BlogIndex">
<div class="container">
  <div class="row">
    <div class="col-md-9">
      <BlogInfo :blogInfo="blog"></BlogInfo>
    </div>
    <div class="col-md-3">
      <Calendar></Calendar>
      <Classify></Classify>
      <Tag></Tag>
    </div>
  </div>
</div>
</div>
</template>

<script>
import Calendar from "@/components/plugins/Calendar";
import Classify from "@/components/plugins/Classify";
import Tag from "@/components/plugins/Tag";
import BlogInfo from "@/components/blog/BlogInfo";
export default {
  name: "BlogIndex",
  components: {BlogInfo, Tag, Classify, Calendar},
  data(){
    return{
      blogId:this.$route.params.blogId,
      blog:null
    }
  },
  created: function(){
    this.$axios.post('/blogs/getBlogById',{'id':this.blogId}).then(response => {
      if(response.status == 200 && response.data.status == 'succeed'){
        this.blog = response.data.blog;
      }else {
        this.alert(response.data.status);
      }
    }).catch(e =>{
      this.alert('系统错误:'+e);
    })
  }
}
</script>

<style scoped>

</style>