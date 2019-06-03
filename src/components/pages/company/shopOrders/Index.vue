<template>
  <div>
    <div class="tabs">
      <ul>
        <li
          v-for="(item, index) in tabs"
          :key="index"
          :class="{'active':item.id==queryId}"
          @click="tabHandle(item.id)"
        >{{item.name}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tabs: [
        {
          name: "全部",
          id: 0
        },
        {
          name: "待受理",
          id: 1
	  },
	  {
          name: "有效单",
          id: 2
	  },
	  {
          name: "无效单",
          id: 3
	  },
	  {
          name: "待付款",
          id: 4
	  },
	  {
          name: "待发货",
          id: 5
	  },
	  {
          name: "已发货",
          id: 6
	  },
	  {
          name: "已完成",
          id: 7
	  },
	  {
          name: "已关闭",
          id: 8
	  },
	  {
          name: "待售后",
          id: 9
	  },
	  {
          name: "已售后",
          id: 10
	  },
	  {
          name: "待自提",
          id: 11
	  },
	  {
          name: "已自提",
          id: 12
        },
      ],
      queryId: ""
    };
  },
  mounted(){
	this.queryId = this.$route.query.id;  
  },
  methods: {
    tabHandle(id) {
      this.$router.push({
        path: "/company/shop_orders/index",
        query: {
          id: id
        }
      });
    }
  },
  watch: {
    $route(value) {
      this.queryId = value.query.id;
    }
  }
};
</script>
<style scoped>
.tabs li {
	width: 70px
}
</style>


