<template>
<div id="BlogIndex">
<div class="container">
  <div class="row">
    <div class="col-md-9">
      <BlogInfo></BlogInfo>
    </div>
    <div class="col-md-3">
      <Calendar></Calendar>
      <Classify></Classify>
      <Tag></Tag>
    </div>
  </div>
</div>
</div>
</template>

<script>
import Calendar from "@/components/plugins/Calendar";
import Classify from "@/components/plugins/Classify";
import Tag from "@/components/plugins/Tag";
import BlogInfo from "@/components/blog/BlogInfo";
export default {
  name: "BlogIndex",
  components: {BlogInfo, Tag, Classify, Calendar}
}
</script>

<style scoped>

</style>