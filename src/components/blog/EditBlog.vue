<template>
<div id="EditBlog">
  <div class="editBlog">
    <mavon-editor
        v-if="blog != null"
        :value="blog.markdown"
        :ishljs="true"
        fontSize="20px"
        @save="save"
        codeStyle="androidstudio"
        style="height: 100vh;z-index: 0"
    />
  </div>
  <Alert ref="alert"></Alert>
  <SaveAlert ref="saveAlert" :blog="blog"></SaveAlert>

</div>
</template>

<script>
import Alert from "@/components/plugins/Alert";
import SaveAlert from "@/components/blog/SaveAlert";
export default {
  name: "EditBlog",
  components: {SaveAlert, Alert},
  data(){
    return{
      blogId:this.$route.params.blogId,
      blog:{
        id:'',
        title:'',
        description:'',
        insert_time:'',
        update_time:'',
        markdown:'',
        content:'',
        entry_type:'',
        entry_img:'',
        tag:'',
        classify:''
      }
    }
  },
  created() {
    if(this.blogId != undefined){
      this.$axios.post('/blogs/getBlogById',{'id':this.blogId}).then(response => {
        if(response.status == 200 && response.data.status == 'succeed'){
          this.blog = response.data.blog;
        }else {
          this.$refs.alert.alert(response.data.status);
        }
      }).catch(e =>{
        this.$refs.alert.alert('系统错误:'+e);
      })
    }
  },
  methods:{
    save:function (value,render){
      if(value.length == 0){
        this.$refs.alert.alert('请编辑内容后保存哦');
        return;
      }

      this.$refs.saveAlert.save(value,render)
    }
  }
}
</script>

<style scoped>
#EditBlog{
  margin-top: -22px;
}
</style>