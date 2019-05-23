<template>
  <div class="full-height" style="position:relative">
    <app-header></app-header>
    <div class="main">
      <div class="content full-height">
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
 