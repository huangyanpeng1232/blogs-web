<template>
<div id="SaveAlert">
  <div class="modal fade" id="save-alert-div" style="z-index: 1600" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
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
                <input type="text" class="form-control" placeholder="文章标题">
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
                <textarea class="form-control description" placeholder="文章简介"></textarea>
              </div>
            </div>
          </form>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
          <button type="button" class="btn btn-info">暂存</button>
          <button type="button" class="btn btn-info">保存</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "SaveAlert",
  methods:{
    save(value,render){
      $('#save-alert-div').modal('show');
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