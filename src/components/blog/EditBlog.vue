<template>
<div id="EditBlog">
  <div class="editBlog">
    <mavon-editor
        v-if="blog != null"
        :value="blog.markdown"
        :ishljs="true"
        fontSize="20px"
        ref="md"
        @save="save"
        @change="change"
        @imgAdd="imgAdd"
        @imgDel="imgDel"
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
      img_index:1,
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
    },
    change:function(value,render){
      console.log(render)
    },
    imgAdd:function(name,file){

      let headers = {
        'Content-Type':'multipart/form-data'
      }
      let param = new FormData(); //创建form对象
      param.append('file',file);
      this.$axios.post('/blogs/uploadFile',param,{headers:headers}).then(response => {

        if(response.status == 200 && response.data.status == 'succeed'){
          this.$refs.md.$img2Url(this.img_index++, response.data.url);
        }else {
          this.$refs.alert.alert(response.data.status);
        }
      }).catch(e =>{
        this.$refs.alert.alert('系统错误:'+e);
      })
      return "1233"
    },
    imgDel:function(name){

    }
  }
}
</script>

<style scoped>
#EditBlog{
  margin-top: -22px;
}
</style>