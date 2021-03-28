<template>
<div id="SaveAlert" v-if="blog != null">
  <div class="modal fade" id="save-alert-div" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
          <h4 class="modal-title" id="myModalLabel">保存文章</h4>
        </div>
        <div class="modal-body">
          <form class="form-horizontal save-form">
            <div class="form-group">
              <div class="col-md-2 name">标题</div>
              <div class="col-md-9">
                <input type="text" v-model="blog.title" class="form-control" placeholder="文章标题">
              </div>
            </div>
            <div class="form-group">
              <div class="col-md-2 name">分类</div>
              <div class="col-md-9">
                <input type="text" class="form-control" placeholder="文章类型">
              </div>
            </div>
            <div class="form-group">
              <div class="col-md-2 name">标签</div>
              <div class="col-md-9">
                <input type="text" class="form-control" placeholder="标签">
              </div>
            </div>
            <div class="form-group">
              <div class="col-md-2 name">简介</div>
              <div class="col-md-9">
                <textarea class="form-control description" v-model="blog.description" placeholder="文章简介"></textarea>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
          <button type="button" class="btn btn-info">暂存</button>
          <button type="button" @click="affirmSave()" class="btn btn-info">保存</button>
        </div>
      </div>
    </div>
  </div>
  <Alert ref="alert"></Alert>
</div>
</template>

<script>
import Alert from "@/components/plugins/Alert";

export default {
  name: "SaveAlert",
  props:["blog"],
  components: {Alert},
  methods:{
    save(value,render){
      this.blog.markdown = value;
      this.blog.content = render;
      $('#save-alert-div').modal('show');
    },
    affirmSave(){

      let url = '';
      if(this.blog.id == ''){
        url = '/blogs/saveBlog'
      }else{
        url = '/blogs/updateBlog'
      }

      this.$axios.post(url,this.blog).then(response => {
        if(response.status == 200 && response.data.status == 'succeed'){
          $('#save-alert-div').modal('hide');
          this.$router.push({path:'/'})
        }else {
          this.$refs.alert.alert(response.data.status);
        }
      }).catch(e =>{
        this.$refs.alert.alert('系统错误:'+e);
      })
    }
  }
}
</script>

<style scoped>
.save-form .name{
  font-size: 16px;
  text-align: right;
  position: relative;
  top: 3px;
  padding-right: 0px;
}
.description{
  resize: vertical;
  min-height: 60px;
  max-height: 260px;
}
</style>