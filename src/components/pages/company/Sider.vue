<template>
  <div class="sider">
    <ul>
      <router-link
        tag="li"
        v-for="(item, index) in sideMenu"
        :key="index"
        :to="item.path"
        active-class="active"
      >{{item.name}}</router-link>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      sideMenu: [
        {
          name: "首页",
          path: "/company/home"
        },
        {
          name: "商品仓库",
          path: "/company/warehouse"
        },
        {
          name: "商品订单",
	    path: "/company/shop_orders",
	 
        },
        {
          name: "服务订单",
          path: "/company/service_orders?id=0"
        },
        {
          name: "财务管理",
          path: "/company/financial"
        },
        {
          name: "团队管理",
          path: "/company/team"
        },
        {
          name: "地址管理",
          path: "/company/address"
        },
        {
          name: "安全设置",
          path: "/company/safetySetting"
        },
        {
          name: "企业认证",
          path: "/company/approve"
        },
        {
          name: "下载中心",
          path: "/company/download"
        }
      ]
    };
  }
};
</script>
<style scoped>
</style>
