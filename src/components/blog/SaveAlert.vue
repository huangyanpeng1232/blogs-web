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
                <input type="text" v-model="blog.classify" class="form-control" placeholder="文章类型">
              </div>
            </div>
            <div class="form-group">
              <div class="col-md-2 name">标签</div>
              <div class="col-md-9">
                <ul class="tag-ul">
                  <li v-for="tag in blog.tags" @click="removeTag(tag)" :key="tag.name" title="点击删除">
                    {{tag.name}}
                  </li>
                </ul>
                <div v-show="addTagIng">
                  <div class="row">
                    <div class="col-md-9">
                      <input type="text" v-model="addTagText" class="form-control">
                    </div>
                    <div class="col-md-3">
                      <input value="添加" @click="addTag()" style="width: 100%;" class="btn btn-info">
                    </div>
                  </div>
                </div>
                <input value="添加" @click="addTagIng = !addTagIng" v-show="!addTagIng" class="btn btn-info">
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
          <span id="err_info" v-text="err_info" style="color: #ff6363;font-size: 17px;float: left;margin-left: 100px"></span>
          <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
          <button type="button" @click="affirmSave()" class="btn btn-info">保存</button>
        </div>
      </div>
    </div>
  </div>

</div>
</template>

<script>


export default {
  name: "SaveAlert",
  props:["blog"],
  data(){
    return{
      err_info:'',
      tagSelectShow:false,
      addTagIng:false,
      addTagText:''
    }
  },
  methods:{
    save(value,render){
      this.blog.markdown = value;
      this.blog.content = render;

      $('#save-alert-div').modal('show');
    },
    addTag(){
      this.blog.tags.push({name:this.addTagText})
      this.addTagText = '';
      this.addTagIng = false;
    },
    removeTag(tag){
      for (let i = 0; i < this.blog.tags.length; i++) {
        if(this.blog.tags[i].name == tag.name){
          this.blog.tags.splice(i, 1);
        }
      }
    },
    alertErr(text){
      this.err_info = text;
      let this_ = this;
      setTimeout(function(){
        this_.err_info = '';
      },1000)
    },
    affirmSave(){
      if(this.blog.title == ''){
        this.alertErr('请填写标题')
        return;
      }
      if(this.blog.classify == ''){
        this.alertErr('请填写分类');
        return;
      }

      let url = '';
      if(this.blog.id == ''){
        url = '/blogs/saveBlog'
      }else{
        url = '/blogs/updateBlog'
      }

      this.$axios.post(url,this.blog).then(response => {
        $('#save-alert-div').modal('hide');
        if(response.status == 200 && response.data.status == 'succeed'){
          this.$router.push({path:'/'})
        }else {
          this.alert(response.data.status);
        }
      }).catch(e =>{
        $('#save-alert-div').modal('hide');
        this.alert('系统错误:'+e);
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
.tag-ul{
  padding-left: 0px;
  width: 100%;
  min-height: 60px;
  margin-bottom: 0px;
}
.tag-ul li{
  list-style: none;
  float: left;
  padding: 3px 7px;
  margin: 3px;
  color: #666;
  border: 1px solid #666;
  border-radius: 4px;
  cursor: pointer;
}
.tag-ul li:hover{
  background-color: #555555;
  color: white;
  border: 1px solid white;
}
</style>