<template>
  <div id="BlogList">
    <ul class="blogs-ul" v-if="list.length > 0">
      <li v-for="item in list" :key="item.id">
        <router-link :to="'/blog/'+item.id">
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
          <span class="iconfont icon-icon-time">
            <span>{{ item.insert_time | dateFormat }}</span>
          </span>
          <span class="iconfont icon-tag">
            <span>{{ item.tag }}</span>
          </span>
        </div>
      </li>
    </ul>
    <Alert ref="alert"></Alert>
  </div>
</template>

<script>
import Alert from "@/components/plugins/Alert";

export default {
  name: "BlogList",
  components: {Alert},
  props:["list"],
  data() {
    return {

    }
  }
}
</script>

<style scoped>

.blogs-ul {
  padding: 0px;
}

.blogs-ul > li {
  list-style: none;
  margin-bottom: 20px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  padding: 15px;
  border-radius: 8px;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0);
  transition: all 0.1s ease 0s;
}

.blogs-ul > li:hover {
  transform: scale(1.01);
  animation-name: mouse-in-blog;
  animation-duration: 0.6s;
  animation-fill-mode: forwards
}

@keyframes mouse-in-blog {
  from {
    box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(0, 0, 0, 0);
  }
  to {
    box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(10, 10, 10, 0.2);
  }
}

.title {
  font-size: 19px;
  font-weight: bold;
  margin: 5px;
  color: #666;
  cursor: pointer;
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
  margin-left: 17px;
  margin-right: 17px;
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
</style>