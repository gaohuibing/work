<template>
  <div class="clearfix">
    <app-sider></app-sider>

    <!-- <vue-scrollbar class="my-scrollbar full-height" ref="Scrollbar"> -->
      <div class="wrap">
        <router-view></router-view>
      </div>
    <!-- </vue-scrollbar> -->
  </div>
</template>
<script>
import AppSider from "./Sider";
import VueScrollbar from "vue2-scrollbar";

export default {
  components: { AppSider, VueScrollbar },
  mounted() {},
  data() {
    return {};
  }
};
</script>
<style scoped>
</style>
