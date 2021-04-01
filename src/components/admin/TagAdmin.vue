<template>
  <div id="TagAdmin">
    <div class="container tagAdmin">
      <div class="row">
        <div class="tag-div">
          <div class="list-title color1">分类列表</div>
          <table class="tag-tab">
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
            <tr v-for="tag in dataList" :key="tag.id">
              <td>{{ tag.id }}</td>
              <td>
                <span v-show="!tag.edit">{{ tag.name }}</span>
                <input v-show="tag.edit" type="text" class="form-control edit-tag-input"
                       :value="tag.name" placeholder="请填写分类名称">
              </td>
              <td style="cursor: default">{{ tag.insert_time | dateTimeFormat }}</td>
              <td>
                <div :style="{'background-color':tag.color}" @click="selectColor(tag)" class="colorBox">
                  {{ tag.color }}
                </div>
              </td>
              <td @click="tag.active = !tag.active;changeTuiJian(tag)" style="cursor: pointer" :class="{'recommend':tag.active,'not-recommend':!tag.active}">
                {{ tag.active ? '已推荐' : '未推荐' }}
              </td>
              <td class="btns">
                <router-link :to="{ name: 'tag', params: { tagId: tag.id}}">
                  <span class="iconfont icon-show"></span>
                </router-link>
                <span v-if="!tag.edit" @click="tag.edit = true" class="iconfont icon-edit-blogs"></span>
                <span v-if="tag.edit" @click="tag.edit = false;save(tag)"
                      class="iconfont icon-gou"></span>
                <span class="iconfont icon-delete" @click="affirmDeleteTag(tag)"></span>
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
      <div class="modal-dialog" v-if="affirmTag != null">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h4 class="modal-title" id="deleteAffirmLabel">删除确认</h4>
          </div>
          <div class="modal-body">
            确认要删除{{ affirmTag.name }}吗？
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            <button type="button" @click="deleteTag()" class="btn btn-danger">删除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Alert from "@/components/plugins/Alert";

export default {
  name: "TagAdmin",
  components: {Alert},
  data() {
    return {
      dataList: [],
      affirmTag: null,
      color_edit_tag:null
    }
  },
  methods: {
    loadData() {
      this.$axios.post('/tag/getAllTag').then(response => {
        if (response.status == 200 && response.data.status == 'succeed') {
          let list = response.data.tagList;
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
    selectColor(tag){
      $('.selectColor-input').trigger('click');
      this.color_edit_tag = tag;
    },
    colorChange(){
      let color = $('.selectColor-input').val()
      this.color_edit_tag.color = color;
      this.updateTag(this.color_edit_tag)
    },
    save(tag) {
      this.updateTag(tag)
    },
    changeTuiJian(tag) {
      this.updateTag(tag)
    },
    updateTag(tag) {
      this.$axios.post('/tag/updateTag', tag).then(response => {
        if (response.status == 200 && response.data.status == 'succeed') {
          this.toast('修改成功');
        } else {
          this.$refs.alert.alert(response.data.status);
        }
      }).catch(e => {
        this.$refs.alert.alert('系统错误:' + e);
      })
    },
    affirmDeleteTag(tag) {
      this.affirmTag = tag;
      $('.deleteAffirm').modal('show')
    },
    deleteTag() {
      $('.deleteAffirm').modal('hide')
      this.$axios.post('/tag/delTagById', {'id':this.affirmTag.id}).then(response => {
        if (response.status == 200 && response.data.status == 'succeed') {
          this.toast('删除成功');
        } else {
          this.$refs.alert.alert(response.data.status);
        }
      }).catch(e => {
        this.$refs.alert.alert('系统错误:' + e);
      })
      for (let i = 0; i < this.dataList.length; i++) {
        if (this.dataList[i].id == this.affirmTag.id) {
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

.tag-tab {
  width: 100%;
  border-radius: 10px;
  margin-top: 15px;
}

.tag-tab tr td, .tag-tab tr th {
  text-align: center;
  padding: 5px 3px;
  border: 1px solid #ccc;
}

.tag-tab th {
  border-bottom: 2px solid #ccc;
  padding: 8px 5px;
}

.tag-tab tr td {
  height: 45px;
}

.tag-div {
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

.edit-tag-input {
  text-align: center;
}

.recommend {
  background-color: #b4ffa8;
}

.not-recommend {
  background-color: #fff6a8;
}
</style>