<template>
  <div>
    <div class="tabs">
      <ul>
        <router-link
          tag="li"
          v-for="(item, index) in tabs"
          :key="index"
          :to="item.path"
          active-class="active"
        >{{item.name}}</router-link>
      </ul>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabs: [
        { path: "/company/download/programme", name: "方案下载" },
        { path: "/company/download/Report", name: "报表下载" }   
      ]
    };
  }
};
</script>

<style scoped>
</style>
