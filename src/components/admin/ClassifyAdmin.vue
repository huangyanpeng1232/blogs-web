<template>
  <div id="ClassifyAdmin">
    <div class="container classifyAdmin">
      <div class="row">
        <div class="classify-div">
          <div class="list-title color1">分类列表</div>
          <table class="classify-tab">
            <thead>
            <tr class="title-tr">
              <th style="width: 8%">序号</th>
              <th style="width: 30%">标题</th>
              <th>创建时间</th>
              <th>颜色</th>
              <th>推荐</th>
              <th>操作</th>
            </tr>
            </thead>
            <tbody v-if="dataList.length > 0">
            <tr v-for="classify in dataList" :key="classify.id">
              <td>{{ classify.id }}</td>
              <td>
                <span v-show="!classify.edit">{{ classify.name }}</span>
                <input v-show="classify.edit" type="text" class="form-control edit-classify-input"
                       :value="classify.name" placeholder="请填写分类名称">
              </td>
              <td style="cursor: default">{{ classify.insert_time | dateTimeFormat }}</td>
              <td>
                <div :style="{'background-color':classify.color}" @click="selectColor(classify)" class="colorBox">
                  {{ classify.color }}
                </div>
              </td>
              <td @click="classify.active = !classify.active;changeTuiJian(classify)" style="cursor: pointer" :class="{'recommend':classify.active,'not-recommend':!classify.active}">
                {{ classify.active ? '已推荐' : '未推荐' }}
              </td>
              <td class="btns">
                <router-link :to="{ name: 'classify', params: { classifyId: classify.id}}">
                  <span class="iconfont icon-show"></span>
                </router-link>
                <span v-if="!classify.edit" @click="classify.edit = true" class="iconfont icon-edit-blogs"></span>
                <span v-if="classify.edit" @click="classify.edit = false;save(classify)"
                      class="iconfont icon-gou"></span>
                <span class="iconfont icon-delete" @click="affirmDeleteClassify(classify)"></span>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <input class="selectColor-input" @change="colorChange()" type="color" style="display: none;" />
    <Alert ref="alert"></Alert>
    <div class="modal fade deleteAffirm" tabindex="-1" role="dialog" aria-labelledby="deleteAffirmLabel"
         aria-hidden="true">
      <div class="modal-dialog" v-if="affirmClassify != null">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h4 class="modal-title" id="deleteAffirmLabel">删除确认</h4>
          </div>
          <div class="modal-body">
            确认要删除{{ affirmClassify.name }}吗？
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            <button type="button" @click="deleteClassify()" class="btn btn-danger">删除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Alert from "@/components/plugins/Alert";

export default {
  name: "ClassifyAdmin",
  components: {Alert},
  data() {
    return {
      dataList: [],
      affirmClassify: null,
      color_edit_classify:null
    }
  },
  methods: {
    loadData() {
      this.$axios.post('/classify/getAllClassify').then(response => {
        if (response.status == 200 && response.data.status == 'succeed') {
          let list = response.data.classifyList;
          for (let i = 0; i < list.length; i++) {
            list[i].edit = false
          }
          this.dataList = list
        } else {
          this.$refs.alert.alert(response.data.status);
        }
      }).catch(e => {
        this.$refs.alert.alert('系统错误:' + e);
      })
    },
    selectColor(classify){
      $('.selectColor-input').trigger('click');
      this.color_edit_classify = classify;
    },
    colorChange(){
      let color = $('.selectColor-input').val()
      this.color_edit_classify.color = color;
      this.updateClassify(this.color_edit_classify)
    },
    save(classify) {
      this.updateClassify(classify)
    },
    changeTuiJian(classify) {
      this.updateClassify(classify)
    },
    updateClassify(classify) {
      this.$axios.post('/classify/updateClassify', classify).then(response => {
        if (response.status == 200 && response.data.status == 'succeed') {
          this.toast('修改成功');
        } else {
          this.$refs.alert.alert(response.data.status);
        }
      }).catch(e => {
        this.$refs.alert.alert('系统错误:' + e);
      })
    },
    affirmDeleteClassify(classify) {
      this.affirmClassify = classify;
      $('.deleteAffirm').modal('show')
    },
    deleteClassify() {
      $('.deleteAffirm').modal('hide')
      this.$axios.post('/classify/delClassifyById', {'id':this.affirmClassify.id}).then(response => {
        if (response.status == 200 && response.data.status == 'succeed') {
          this.toast('删除成功');
        } else {
          this.$refs.alert.alert(response.data.status);
        }
      }).catch(e => {
        this.$refs.alert.alert('系统错误:' + e);
      })
      for (let i = 0; i < this.dataList.length; i++) {
        if (this.dataList[i].id == this.affirmClassify.id) {
          this.dataList.splice(i, 1);
          break;
        }
      }
    }
  },
  created: function () {
    this.loadData();
  }
}
</script>

<style scoped>
.list-title {
  border-radius: 7px 7px 0px 0px;
  font-size: 18px;
  cursor: default;
}
.colorBox{
  border-radius: 5px;
  margin: 10px;
  color: white;
  padding: 5px 2px;
  cursor: pointer;
}

.classify-tab {
  width: 100%;
  border-radius: 10px;
  margin-top: 15px;
}

.classify-tab tr td, .classify-tab tr th {
  text-align: center;
  padding: 5px 3px;
  border: 1px solid #ccc;
}

.classify-tab th {
  border-bottom: 2px solid #ccc;
  padding: 8px 5px;
}

.classify-tab tr td {
  height: 45px;
}

.classify-div {
  background-color: white;
  border-radius: 7px;
  padding: 15px;
  box-shadow: 0 0 7px rgba(0, 0, 0, 0.3);
}

.btns .iconfont {
  margin: 0 4px;
  font-size: 20px;
  color: #888;
  cursor: pointer;
  border-radius: 3px;
  padding: 5px;
}

.btns .iconfont:hover {
  color: #111;
  background-color: #e7e7e7;
}

.title-tr th {
  text-align: center;
}

.edit-classify-input {
  text-align: center;
}

.recommend {
  background-color: #b4ffa8;
}

.not-recommend {
  background-color: #fff6a8;
}
</style>