<template>
  <div>
    <div class="tabs">
      <ul>
        <li
          v-for="(item, index) in tabs"
          :key="index"
          :class="{'active':item.id==filter.status}"
          @click="tabHandle(item.id)"
        >{{item.name}}</li>
      </ul>
    </div>
    <div class="list-tools">
      <div class="tool-1 clearfix" style="margin-bottom: 10px;">
        <div class="t">
          <span>订单类型：</span>
          <div class="inp-box">
            <el-select v-model="filter.type" placeholder="请选择">
              <el-option v-for="(item,key) in orderTypes" :key="key" :label="item" :value="key"></el-option>
            </el-select>
          </div>
        </div>
        <div class="t">
          <span>订单状态：</span>
          <div class="inp-box">
            <el-select v-model="filter.status" placeholder="请选择">
              <el-option v-for="item in tabs" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </div>
        </div>
        <div class="cz">
          <el-button type="primary" size="small" @click="getGoodsOrder">筛选</el-button>
          <el-button size="small" @click="resetHandle">重置</el-button>
        </div>
      </div>
      <div class="tool-1 clearfix">
        <div class="t">
          <span>订单搜索：</span>
          <div class="inp-box">
            <el-input placeholder="关键字" v-model="filter.keyword" class="input-with-select">
              <el-select
                v-model="filter.category"
                slot="prepend"
                placeholder="请选择"
                style="width:100px"
              >
                <el-option v-for="(item,key) in category" :key="key" :label="item" :value="key"></el-option>
              </el-select>
            </el-input>
          </div>
        </div>
        <div class="t">
          <span>订单时间：</span>
          <div class="inp-box">
            <el-date-picker
              v-model="dateValue"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="dateRangeChange"
            ></el-date-picker>
          </div>
        </div>
        <p>单次查询间隔时间最长三个月</p>
        <div class="export">
          <a href="javascript:;" style="color:#999">导出报表</a>
        </div>
      </div>
    </div>
    <div class="toolbar">
      <div>
        <!-- <el-checkbox
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="handleCheckAllChange"
        >全选</el-checkbox>-->

        <p-check
          class="p-svg p-curve"
          color="success"
          v-model="checkAll"
          @change="handleCheckAllChange"
        >
          <!-- svg path -->
          <svg slot="extra" class="svg svg-icon" viewBox="0 0 20 20">
            <path
              d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"
              style="stroke: white;fill:white"
            />
          </svg>
          全选
        </p-check>
        <el-button size="small">导出选中</el-button>
        <el-button size="small">批量发货</el-button>
        <el-button size="small">批量受理</el-button>
        <el-button size="small">批量取消</el-button>
      </div>
      <div>
        <el-button size="small" :disabled="filter.page==1" @click="prevHandle">上一页</el-button>
        <el-button
          size="small"
          :disabled="goodOrderLists.total/filter.limits==filter.page"
          @click="nextHandle"
        >下一页</el-button>
      </div>
    </div>
    <div class="order-list-wrap" v-loading="loading">
      <ul class="list-header">
        <li class="len-a">商品</li>
        <li class="len-b">单价</li>
        <li class="len-c">数量</li>
        <li class="len-d">金额</li>
        <li class="len-e">售后</li>
        <li class="len-f">买家信息</li>
        <li class="len-g">订单状态</li>
        <li class="len-h">优惠码</li>
        <li class="len-i">分支机构</li>
      </ul>
      <ul class="list-main">
        <!-- 1 -->
        <template v-for="(item,index) in goodOrderLists.data">
          <li :key="index">
            <div class="top">
              <!-- <el-checkbox
                v-model="item.checked"
                style="line-height:46px;margin-right:10px"
                @change="itemCheckedChange"
              ></el-checkbox> -->
              <p-check
                class="p-svg p-curve"
                color="success"
                v-model="item.checked"
                @change="itemCheckedChange"
              >
              
                <svg slot="extra" class="svg svg-icon" viewBox="0 0 20 20">
                  <path
                    d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"
                    style="stroke: white;fill:white"
                  />
                </svg>             
              </p-check>
              <div class="order-num">
                <span>订单号：{{item.order_num}}</span>
                <span>订单时间：{{item.created_at}}</span>
                <span>{{item.enterprise}}</span>
              </div>
              <div class="order-type">{{orderTypes[item.order_type]}}</div>
            </div>
            <div class="order-info clearfix">
              <ul class="good-list" style="width: 505px;">
                <template v-for="(goodsData,key) in item.detail">
                  <li class="clearfix" :key="key">
                    <div class="good-pic">
                      <img :src="goodsData.goods_pic" />
                    </div>
                    <div class="good-name">{{goodsData.goods_name}}</div>
                    <div class="len-b">￥{{goodsData.sell_price}}</div>
                    <div class="len-c">{{goodsData.goods_num}}</div>
                    <div class="len-d">￥{{goodsData.total_fee}}</div>
                    <div class="len-e">/</div>
                  </li>
                </template>
              </ul>

              <div class="len-f">
                <p>企业：{{item.enterprise}}</p>
                <p>姓名：{{item.contacts}}</p>
                <p>电话：{{item.mobile}}</p>
                <p>所在地：{{$common.regionFormat(item.location)}}</p>
              </div>
              <div class="len-g">
                <p style="color:#F76260">
                  <template v-for="tab in tabs">{{tab.id==item.status?tab.name:''}}</template>
                </p>
                <p style="color:#44B549;cursor: pointer;" @click="toDetails">详情</p>
                <p style="color:#1C1C1C" v-if="item.status==2">关闭交易</p>
                <p v-if="item.status==1">
                  <el-button type="primary" size="mini">受理</el-button>
                </p>
                <p>
                  <el-button size="mini">取消</el-button>
                </p>
              </div>
              <div class="len-h">{{item.discount}}</div>
              <div class="len-i">{{item.branch}}</div>
            </div>
          </li>
        </template>
      </ul>
    </div>
    <!-- //底部操作 -->
    <div class="bot-tools">
      <div>
        <p-check
          class="p-svg p-curve"
          color="success"
          v-model="checkAll"
          @change="handleCheckAllChange"
        >
          <!-- svg path -->
          <svg slot="extra" class="svg svg-icon" viewBox="0 0 20 20">
            <path
              d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"
              style="stroke: white;fill:white"
            />
          </svg>
          全选
        </p-check>
        <el-button size="small">导出选中</el-button>
        <el-button size="small">批量发货</el-button>
        <el-button size="small">批量受理</el-button>
        <el-button size="small">批量取消</el-button>
      </div>
    </div>
    <div class="bot-tools">
      <div class="flex-grow pagi-wrap" v-if="goodOrderLists.total-0>0">
        <div>共{{goodOrderLists.total}}条，每页{{filter.limits}}条</div>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="goodOrderLists.total-0"
          :current-page="filter.page-0"
          :pager-count="5"
          :page-size="filter.limit-0"
          @current-change="handleCurrentChange"
        ></el-pagination>
        <div>
          到第
          <el-input v-model="page" class="topage"></el-input>页
          <el-button size="small" class="pageBtn" @click="toPage">GO</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PrettyCheck from "pretty-checkbox-vue/check";
Vue.component("p-check", PrettyCheck);
const orderTypes = {
  "1": "咨询订单",
  "2": "零售订单",
  "3": "积分订单",
  "4": "卡券订单"
};
const category = {
  "1": "订单号",
  "2": "交易号"
};

export default {
  data() {
    return {
      orderTypes: orderTypes,
      category: category,
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
          name: "待付款",
          id: 2
        },
        {
          name: "待发货",
          id: 3
        },
        {
          name: "已发货",
          id: 4
        },
        {
          name: "待售后",
          id: 5
        },
        {
          name: "待自提",
          id: 7
        },
        {
          name: "已完成",
          id: 9
        },
        {
          name: "已关闭",
          id: 10
        }
      ],

      filter: {
        api_token: this.$api.getToken(),
        type: "",
        status: 0,
        category: "",
        keyword: "",
        start: "",
        end: "",
        page: "1",
        limits: "10"
      },
      dateValue: [],
      goodOrderLists: {
        data: [],
        total: ""
      },
      isIndeterminate: false,
      checkAll: false,
      checked: false,
      loading: true,
      page: ""
    };
  },
  mounted() {
    this.filter.status = this.$route.query.id ? this.$route.query.id - 0 : 0;
    this.getGoodsOrder();    
  },
  methods: {
    tabHandle(id) {
      this.$router.push({
        path: "/company/shop_orders/index",
        query: {
          id: id
        }
      });
    },
    // 获取商品订单列表
    getGoodsOrder() {
      this.loading = true;
      this.filter.status = this.filter.status == "0" ? "" : this.filter.status;
      this.$api
        .get("merchant/activity_order", this.filter)
        .then(res => {
          if (res.data.code == 200) {
            this.goodOrderLists.data = res.data.data.item;
            this.goodOrderLists.total = res.data.data.total;
            this.loading = false;
          } else {
            this.$message.error({ message: res.data.msg });
          }
        })
        .catch(err => {
          this.$message.error({ message: err });
        });
    },
    resetHandle() {
      this.filter = {
        api_token: this.$api.getToken(),
        type: "",
        status: 0,
        category: "",
        keyword: "",
        start: "",
        end: "",
        page: "1",
        limits: "10"
      };
      this.getGoodsOrder();
    },
    // 时间change
    dateRangeChange(date) {
      this.filter.start = this.$moment(date[0]).format("YYYY-MM-DD");
      this.filter.end = this.$moment(date[1]).format("YYYY-MM-DD");
    },
    // 跳转订单详情
    toDetails() {
      this.$router.push("/company/shop_orders/order_details");
    },
    // 全选
    handleCheckAllChange(value) {
      // if (this.checkAll) {
      //   this.goodOrderLists.data.map((item, index) => {
      //     item.checked = this.checkAll;
      //   });
      // } else {
      //   this.goodOrderLists.data.map((item, index) => {
      //     item.checked = false;
      //   });
      // }
      this.goodOrderLists.data.map((item, index) => {
        item.checked = value;
      });
      console.log(this.goodOrderLists.data);
    },
    itemCheckedChange(value) {
      // 全选 这里有问题 怀疑两者change冲突
      for (let item of this.goodOrderLists.data) {
        if (!item.checked) {
          // 如果有一项为false全选就为false 然后跳出循环，不然就会炸掉
          this.checkAll = false;
          break;
        } else {
          this.checkAll = true;
        }
      }
    },
    /**
     * 分页
     */
    // 前往第几页
    toPage() {
      this.filter.page = this.page;
      this.getWarehouse();
    },
    handleCurrentChange(page) {
      this.filter.page = page;
      this.getGoodsOrder();
    },
    // 上一页
    prevHandle() {
      this.filter.page--;
      this.getGoodsOrder();
    },
    // 下一页
    nextHandle() {
      this.filter.page++;
      this.getGoodsOrder();
    }
  },
  watch: {
    $route(value) {
      this.filter.status = value.query.id;
    }
  }
};
</script>
<style scoped>
.tabs li {
  width: 70px;
}

.list-tools {
  background: #f6f7ff;
  padding: 15px;
  margin-top: 20px;
}

.list-tools .tool-1 .t {
  width: 300px;
  display: flex;
  height: 34px;
  line-height: 34px;
  float: left;
}
.list-tools .tool-1 i {
  font-size: 12px;
  color: #999;
}
.list-tools .tool-1 .ls {
  width: 460px;
  float: left;
  display: flex;
  height: 34px;
  line-height: 34px;
  margin-left: 20px;
}
.list-tools .ls .input-group {
  width: 180px;
}
.list-tools .t .input-group,
.list-tools .t .btn-group {
  width: 220px;
}
.list-tools .t .btn-group button {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.cz {
  float: right;
  display: flex;
  width: 170px;
  justify-content: flex-end;
}
.list-tools .tool-1 p {
  width: 200px;
  float: left;
  line-height: 34px;
  color: #999;
  font-size: 12px;
  margin: 0;
}
.list-tools .tool-1 .export {
  width: 100px;
  float: right;
  line-height: 34px;
  text-align: right;
}

.table-tools {
  display: flex;
  padding: 20px 0;
}
/* 可复用开始 */
.order-list-wrap {
  /* position: absolute;
	left: 24px;
	right: 14px;
    top: 246px;
	bottom: 80px;
	overflow-y: auto; */
}
.order-list-wrap .list-header {
  height: 46px;
  background: #f6f7ff;
}
.order-list-wrap .list-header li {
  height: 24px;
  line-height: 24px;
  text-align: center;
  color: #000;
  border-right: 1px solid #d9d9d9;
  float: left;
  margin-top: 11px;
}
.order-list-wrap .list-header li:last-child {
  border: none;
}
.order-list-wrap .len-a {
  width: 205px;
}
.order-list-wrap .len-b {
  width: 75px;
  float: left;
  text-align: center;
}
.order-list-wrap .len-c {
  width: 75px;
  float: left;
  text-align: center;
}
.order-list-wrap .len-d {
  width: 75px;
  float: left;
  text-align: center;
}
.order-list-wrap .len-e {
  width: 75px;
  float: left;
  text-align: center;
}
.order-list-wrap .len-f {
  width: 136px;
}
.order-list-wrap .len-g {
  width: 120px;
}
.order-list-wrap .len-h {
  width: 93px;
}
.order-list-wrap .len-i {
  width: 83px;
}
.order-list-wrap .list-main > li {
  width: 100%;
  border-radius: 4px 4px 0px 0px;
  border: 1px solid rgba(0, 0, 0, 0.09);
}
.order-list-wrap .list-main .top {
  height: 46px;
  background: #fafafa;
  color: #000000;
  font-size: 14px;
  padding: 0 15px;
  display: flex;
  align-items: center
}
.order-list-wrap .list-main .order-num {
  line-height: 46px;
}
.order-list-wrap .list-main .checkbox {
  margin-top: 12px;
}
.order-list-wrap .list-main .order-num span {
  margin-right: 20px;
}
.order-list-wrap .list-main .order-type {
  height: 20px;
  line-height: 20px;
  border-radius: 10px;
  border: 1px solid #ffbe00;
  color: #ffbe00;
  font-size: 12px;
  padding: 0 8px;
  margin-top: 13px;
}
.order-list-wrap .list-main .order-type-green {
  height: 20px;
  line-height: 20px;
  border-radius: 10px;
  border: 1px solid #44b549;
  color: #44b549;
  font-size: 12px;
  padding: 0 8px;
  margin-top: 13px;
}
.order-list-wrap .list-main .order-info > ul,
.order-list-wrap .list-main .order-info > div {
  float: left;
  color: rgba(0, 0, 0, 0.65);
}
.order-list-wrap .list-main .order-info p {
  color: rgba(0, 0, 0, 0.65);
  margin-bottom: 14px;
}
.order-list-wrap .list-main .order-info > ul {
  padding-left: 24px;
}
.order-list-wrap .list-main .order-info li {
  padding: 24px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.09);
}
.order-list-wrap .list-main .order-info li > div {
  color: rgba(0, 0, 0, 0.65);
}
.order-list-wrap .list-main .order-info li:last-child {
  border: none;
}
.order-list-wrap .list-main .order-info li .good-pic {
  width: 50px;
  height: 50px;
  float: left;
}
.order-list-wrap .list-main .order-info li .good-name {
  width: 121px;
  float: left;
  margin-left: 10px;
}
.order-list-wrap .list-main .order-info li .good-pic img {
  width: 100%;
  height: 100%;
}
.order-list-wrap .order-info .len-f {
  padding: 24px 0;
}
.order-list-wrap .order-info .len-g,
.order-list-wrap .order-info .len-h,
.order-list-wrap .order-info .len-i {
  text-align: center;
  padding: 24px 0;
}
</style>


