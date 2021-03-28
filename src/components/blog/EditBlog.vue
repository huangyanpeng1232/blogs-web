<template>
<div id="EditBlog">
  <div class="editBlog">
    <mavon-editor
        :ishljs="true"
        fontSize="20px"
        @save="save"
        codeStyle="androidstudio"
        style="height: 100vh"
    />
  </div>
  <Alert ref="alert"></Alert>
  <SaveAlert ref="saveAlert"></SaveAlert>

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

    }
  },methods:{
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

</style>