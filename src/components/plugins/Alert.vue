<template>
  <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">{{alertContent}}</div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">好的</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
export default {
  name: "Alert",
  data(){
    return{
      alertContent: '1'
    }
  },
  methods:{
    alert:function (content){
      this.alertContent = content
      $('#myModal').modal('show')
    }
  }
}
</script>

<style scoped>

.modal-dialog{
  width: 400px;
  margin-top: 50px;
}
.modal-footer{
  padding: 10px;
}
.modal-body{
  padding: 20px;
  text-align: center;
  font-size: 18px;
  letter-spacing: 1px;
}
</style>