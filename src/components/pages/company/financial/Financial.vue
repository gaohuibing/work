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
        { path: "/company/financial/survey", name: "财务概况" },
        { path: "/company/financial/detailed", name: "收支明细" },
        { path: "/company/financial/summary", name: "财务汇总" },
        { path: "/company/financial/invoice", name: "发票管理" },
        { path: "/company/financial/recharge", name: "充值管理" },
        { path: "/company/financial/cash", name: "提现管理" }
      ]
    };
  }
};
</script>

<style scoped>
</style>
