<template>
  <div class="Index">
    <Navbar></Navbar>
    <div style="margin-top: 80px;z-index: 1;position: sticky;">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>


import Navbar from "@/components/navbar/Navbar";
export default {
  name: 'Index',
  components: {Navbar}
}
</script>

<style scoped>
</style>
