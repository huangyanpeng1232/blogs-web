<template>
  <div id="Home">
    <div class="container">
      <div class="row">
        <div class="col-md-9">
          <BlogList></BlogList>
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

import BlogList from "@/components/blogs/BlogList";
import Calendar from "@/components/plugins/Calendar";
import Classify from "@/components/plugins/Classify";
import Tag from "@/components/plugins/Tag";
export default {
  name: "Home",
  components: {Tag, Classify, Calendar, BlogList},
}
</script>

<style scoped>
#Home {
  margin-top: 60px;
}

#Home .container {
  z-index: 1;
  position: sticky;
}

</style>