<template>
  <div id="BlogInfo">
    <div v-if="blogInfo != null" class="blogInfo">
      <div class="title">{{ blogInfo.title }}</div>
      <div class="info">
      <span class="iconfont icon-icon-time color1">
        <span>{{ blogInfo.insert_time | dateTimeFormat }}</span>
      </span>
        <span class="iconfont icon-menu color1">
        <span>{{ blogInfo.classify }}</span>
      </span>
      <router-link :to="'/edit/'+blogInfo.id">
        <span class="iconfont icon-edit edit color1" style="float: right;" title="编辑文章"></span>
      </router-link>
      </div>
      <hr>
      <div class="content " v-html="blogInfo.content"></div>
    </div>
  </div>
</template>

<script>

export default {
  name: "BlogInfo",
  props: ['blogInfo'],
  created() {

  },
  data() {
    return {
      color: 'red'
    }
  }
}
</script>

<style scoped>
@import "../../assets/css/github-markdown.min.css";
@import "../../assets/css/androidstudio.min.css";

.blogInfo {
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  padding: 15px;
  border-radius: 8px;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0);
  min-height: 500px;
}

.title {
  font-size: 25px;
  color: #666;
  font-weight: bold;
  text-align: center;
  cursor: default;
}

.info {
  margin-top: 15px;
  text-align: center;
  cursor: default;
}

.info > span {
  margin-left: 15px;
  margin-right: 15px;
}

.info > span > span {
  margin-left: 10px;
}

.edit {
  cursor: pointer;
  transition: all 0.2s ease 0s;
}

.edit:hover {
  transform: scale(1.2);
  color: #333;
}

.content {
  font-size: 17px;
  color: #666;
}

</style>