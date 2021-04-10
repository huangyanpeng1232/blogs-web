<template>
  <div id="BlogsAdmin">
    <div class="container blogsAdmin">
      <div class="row">
        <div class="blogs-div">
          <div class="list-title color1">博客列表</div>
          <table class="blogs-tab">
            <thead>
            <tr class="title-tr">
              <th style="width: 8%">序号</th>
              <th style="width: 30%">标题</th>
              <th>创建时间</th>
              <th>修改时间</th>
              <th>分类</th>
              <th>标签</th>
              <th>操作</th>
            </tr>
            </thead>
            <tbody v-if="dataList.length > 0">
            <tr v-for="blog in dataList" :key="blog.id">
              <td>{{ blog.id }}</td>
              <td>
                <span>{{ blog.title }}</span>
              </td>
              <td style="cursor: default">{{ blog.insert_time | dateTimeFormat }}</td>
              <td style="cursor: default">
                <template v-if="blog.update_time != undefined && blog.update_time != ''">
                  {{ blog.update_time | dateTimeFormat }}
                </template>
              </td>
              <td>
                {{blog.classify}}
              </td>
              <td>
                {{blog.tag}}
              </td>

              <td class="btns">
                <router-link :to="{ path: '/blog/'+blog.id,}">
                  <span class="iconfont icon-show"></span>
                </router-link>

                <router-link :to="{ path: '/edit/'+blog.id,}">
                  <span @click="blog.edit = true" class="iconfont icon-edit-blogs"></span>
                </router-link>

                <span class="iconfont icon-delete" @click="affirmDeleteBlog(blog)"></span>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="modal fade deleteAffirm" tabindex="-1" role="dialog" aria-labelledby="deleteAffirmLabel"
         aria-hidden="true">
      <div class="modal-dialog" v-if="affirmBlog != null">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h4 class="modal-title" id="deleteAffirmLabel">删除确认</h4>
          </div>
          <div class="modal-body">
            确认要删除{{ affirmBlog.name }}吗？
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            <button type="button" @click="deleteBlog()" class="btn btn-danger">删除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: "BlogsAdmin",
  data() {
    return {
      index:0,
      loading:false,
      dataList: [],
      affirmBlog: null,
      color_edit_blog:null
    }
  },
  methods: {
    loadData() {
      if (this.loading) {
        return;
      }
      this.index++;
      this.$axios.post('/blogs/getBlogs',{'index':this.index}).then(response => {
        if (response.status == 200 && response.data.status == 'succeed') {
          let list = response.data.blogs;
          for (let i = 0; i < list.length; i++) {
            list[i].edit = false
            this.dataList.push(list[i])
          }
        } else {
          vueApp.$refs.alert.alert(response.data.status);
        }
        if (response.data.blogs.length == response.data.pageSize) {
          this.loading = false;
        }
      }).catch(e => {
        vueApp.$refs.alert.alert('系统错误:' + e);
      })
    },
    affirmDeleteBlog(blog) {
      this.affirmBlog = blog;
      $('.deleteAffirm').modal('show')
    },
    deleteBlog() {
      $('.deleteAffirm').modal('hide')
      this.$axios.post('/blogs/delBlogById', {'id':this.affirmBlog.id}).then(response => {
        if (response.status == 200 && response.data.status == 'succeed') {
          this.toast('删除成功');
        } else {
          vueApp.$refs.alert.alert(response.data.status);
        }
      }).catch(e => {
        vueApp.$refs.alert.alert('系统错误:' + e);
      })
      for (let i = 0; i < this.dataList.length; i++) {
        if (this.dataList[i].id == this.affirmBlog.id) {
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

.blogs-tab {
  width: 100%;
  border-radius: 10px;
  margin-top: 15px;
}

.blogs-tab tr td, .blogs-tab tr th {
  text-align: center;
  padding: 5px 3px;
  border: 1px solid #ccc;
}

.blogs-tab th {
  border-bottom: 2px solid #ccc;
  padding: 8px 5px;
}

.blogs-tab tr td {
  height: 45px;
}

.blogs-div {
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
.btns a{
  text-decoration: none;
}
.title-tr th {
  text-align: center;
  cursor: default;
}
.blogs-tab tbody tr:hover{
  background-color: #f6f6f6;
}
</style>