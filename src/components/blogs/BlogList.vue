<template>
  <div id="BlogList">
    <ul class="blogs-ul" v-if="list.length > 0">
      <li v-for="item in list" :key="item.id">
        <router-link class="title-a" title="查看全部" :to="'/blog/'+item.id">
          <div class="title">
              <span>{{ item.title }}</span>
          </div>
        </router-link>
        <hr class="title-hr">
        <div class="content">
          <span>{{ item.description }}</span>
        </div>
        <hr class="content-hr">
        <div class="info">
          <span class="iconfont icon-icon-time blogTime">
            <span>{{ item.insert_time | dateFormat }}</span>
          </span>
          <ul class="tags-ul">
            <template v-for="tag in item.tags">
              <router-link :key="tag.id" :to="{ name: 'tag', params: { tagId: tag.id}}">
                <li :style="{'background-color':tag.color}">
                  {{ tag.name }}
                </li>
              </router-link>
            </template>
          </ul>
          <div style="clear: both"></div>
        </div>
      </li>

    </ul>
    <div v-if="list.length == 0 && loadEnd" class="notBlogs text-center" >
      <img src="../../assets/images/notSearch.gif">
      <h3>抱歉，未找到匹配的文章!</h3>
    </div>
  </div>
</template>

<script>


export default {
  name: "BlogList",
  props:["list"],
  data() {
    return {
      loadEnd:false
    }
  }
}
</script>

<style scoped>

.blogs-ul {
  padding: 0px;
}

.blogs-ul > li,.notBlogs {
  list-style: none;
  margin-bottom: 20px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  padding: 13px 13px 10px 13px;
  border-radius: 8px;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0);
  transition: all 0.1s ease 0s;

}

.blogs-ul > li:hover,.notBlogs:hover {
  transform: scale(1.004);
  animation-name: mouse-in-blog;
  animation-duration: 0.1s;
  animation-fill-mode: forwards
}

.blogs-ul > li > a{
  text-decoration: none;
  outline: none;
}
@keyframes mouse-in-blog {
  from {
    box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.2);

  }
  to {
    box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.3);

  }
}
.lookAll{
  float: right;
  position: relative;
  top: 18px;
}
.lookAll a{
  text-decoration: none;
  outline: none;
}
.title {
  font-size: 19px;
  font-weight: bold;
  margin: 5px;
  cursor: pointer;
}

.title-a{
  color: #666;
  text-decoration: none;
  outline: none;
}
.content {
  font-size: 16px;
  color: #777;
  text-indent: 25px;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

.info {
  color: #888;
  cursor: pointer;
}

.info > span {
  margin-left: 10px;
  margin-right: 10px;
}
.info > span>span{
  font-size: 14px;
  margin-left: 5px;
}

.content-hr {
  margin-top: 15px;
  margin-bottom: 10px;
}

.title-hr {
  margin-top: 10px;
  margin-bottom: 20px;
}
.blogTime{
  float: left;
  position: relative;
  top: 7px;
}
.tags-ul{
  padding-left: 0px;
  float: right;
}
.tags-ul li{
  padding: 5px 8px;
  list-style: none;
  float: left;
  transition: all 0.1s ease 0s;
  margin: 5px;
  color: white;
  border-radius: 4px;
}
.tags-ul li:hover{
  transform: scale(1.04)
}

</style>