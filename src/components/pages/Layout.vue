<template>
  <div>
    <app-header></app-header>
    <div class="main">
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
 <script>
import AppHeader from "@/components/common/header";
export default {
  components: { AppHeader },
  mounted() {},
  data() {
    return {};
  },
  methods: {},
  watch: {}
};
</script>
 <style scoped>
</style>
 