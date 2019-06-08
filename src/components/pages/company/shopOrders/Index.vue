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
    <div class="list-tools">
      <div class="tool-1 clearfix" style="margin-bottom: 10px;">
        <div class="t">
          <span>订单类型：</span>
          <div class="inp-box">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="t">
          <span>订单状态：</span>
          <div class="inp-box">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="cz">
          <el-button type="primary" size="small">筛选</el-button>
          <el-button size="small">重置</el-button>
        </div>
      </div>
      <div class="tool-1 clearfix">
        <div class="t">
          <span>订单搜索：</span>
          <div class="inp-box">
            <el-input placeholder="关键字" v-model="value" class="input-with-select">
              <el-select v-model="value" slot="prepend" placeholder="请选择" style="width:100px">
                <el-option label="餐厅名" value="1"></el-option>
                <el-option label="订单号" value="2"></el-option>
                <el-option label="用户电话" value="3"></el-option>
              </el-select>
            </el-input>
          </div>
        </div>
        <div class="t">
          <span>订单时间：</span>
          <div class="inp-box">
            <el-date-picker
              v-model="value"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
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
        <el-checkbox
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="handleCheckAllChange"
        >全选</el-checkbox>
        <el-button size="small">导出选中</el-button>
        <el-button size="small">批量发货</el-button>
        <el-button size="small">批量受理</el-button>
        <el-button size="small">批量取消</el-button>
      </div>
      <div>
        <el-button size="small">上一页</el-button>
        <el-button size="small">下一页</el-button>
      </div>
    </div>
    <div class="order-list-wrap">
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
        <li>
          <div class="top">
            <el-checkbox v-model="checked" style="line-height:46px;margin-right:10px"></el-checkbox>
            <div class="order-num">
              <span>订单号：412413541541</span>
              <span>订单时间：2019-10-15 12：12：12</span>
              <span>清枫语科技有限公司</span>
            </div>
            <div class="order-type">零售订单</div>
          </div>
          <div class="order-info clearfix">
            <ul class="good-list" style="width: 505px;">
              <li class="clearfix">
                <div class="good-pic">
                  <img src="img/hd_ewm.jpg">
                </div>
                <div class="good-name">得力-A544笔记本笔记本</div>
                <div class="len-b">￥100</div>
                <div class="len-c">100</div>
                <div class="len-d">￥1000</div>
                <div class="len-e">/</div>
              </li>
              <li class="clearfix">
                <div class="good-pic">
                  <img src="img/hd_ewm.jpg">
                </div>
                <div class="good-name">得力-A544笔记本笔记本</div>
                <div class="len-b">￥100</div>
                <div class="len-c">100</div>
                <div class="len-d">￥1000</div>
                <div class="len-e">/</div>
              </li>
            </ul>

            <div class="len-f">
              <p>企业：小美科技</p>
              <p>姓名：小美</p>
              <p>电话：176454132112</p>
              <p>所在地：江苏苏州</p>
            </div>
            <div class="len-g">
              <p style="color:#F76260">待付款</p>
              <p style="color:#44B549">详情</p>
              <p style="color:#1C1C1C">关闭交易</p>
              <p>
                <el-button type="primary" size="mini">受理</el-button>
              </p>
              <p>
                <el-button size="mini">取消</el-button>
              </p>
            </div>
            <div class="len-h">1265sdf1e</div>
            <div class="len-i">01</div>
          </div>
        </li>
        <!-- 2 -->
        <li>
          <div class="top">
            <el-checkbox v-model="checked" style="line-height:46px;margin-right:10px"></el-checkbox>
            <div class="order-num">
              <span>订单号：412413541541</span>
              <span>订单时间：2019-10-15 12：12：12</span>
              <span>清枫语科技有限公司</span>
            </div>
            <div class="order-type-green">咨询订单</div>
          </div>
          <div class="order-info clearfix">
            <ul class="good-list" style="width: 505px;">
              <li class="clearfix">
                <div class="good-pic">
                  <img src="img/hd_ewm.jpg">
                </div>
                <div class="good-name">得力-A544笔记本笔记本</div>
                <div class="len-b">￥100</div>
                <div class="len-c">100</div>
                <div class="len-d">￥1000</div>
                <div class="len-e">/</div>
              </li>
              <li class="clearfix">
                <div class="good-pic">
                  <img src="img/hd_ewm.jpg">
                </div>
                <div class="good-name">得力-A544笔记本笔记本</div>
                <div class="len-b">￥100</div>
                <div class="len-c">100</div>
                <div class="len-d">￥1000</div>
                <div class="len-e">/</div>
              </li>
            </ul>

            <div class="len-f">
              <p>企业：小美科技</p>
              <p>姓名：小美</p>
              <p>电话：176454132112</p>
              <p>所在地：江苏苏州</p>
            </div>
            <div class="len-g">
              <p style="color:#F76260">待付款</p>
              <p style="color:#44B549">详情</p>
              <p style="color:#1C1C1C">关闭交易</p>
            </div>
            <div class="len-h">1265sdf1e</div>
            <div class="len-i">01</div>
          </div>
        </li>
	  <!-- 2 -->
        <li>
          <div class="top">
            <el-checkbox v-model="checked" style="line-height:46px;margin-right:10px"></el-checkbox>
            <div class="order-num">
              <span>订单号：412413541541</span>
              <span>订单时间：2019-10-15 12：12：12</span>
              <span>清枫语科技有限公司</span>
            </div>
            <div class="order-type-green">咨询订单</div>
          </div>
          <div class="order-info clearfix">
            <ul class="good-list" style="width: 505px;">
              <li class="clearfix">
                <div class="good-pic">
                  <img src="img/hd_ewm.jpg">
                </div>
                <div class="good-name">得力-A544笔记本笔记本</div>
                <div class="len-b">￥100</div>
                <div class="len-c">100</div>
                <div class="len-d">￥1000</div>
                <div class="len-e">/</div>
              </li>
              <li class="clearfix">
                <div class="good-pic">
                  <img src="img/hd_ewm.jpg">
                </div>
                <div class="good-name">得力-A544笔记本笔记本</div>
                <div class="len-b">￥100</div>
                <div class="len-c">100</div>
                <div class="len-d">￥1000</div>
                <div class="len-e">/</div>
              </li>
            </ul>

            <div class="len-f">
              <p>企业：小美科技</p>
              <p>姓名：小美</p>
              <p>电话：176454132112</p>
              <p>所在地：江苏苏州</p>
            </div>
            <div class="len-g">
              <p style="color:#F76260">待付款</p>
              <p style="color:#44B549">详情</p>
              <p style="color:#1C1C1C">关闭交易</p>
            </div>
            <div class="len-h">1265sdf1e</div>
            <div class="len-i">01</div>
          </div>
        </li>
      </ul>
    </div>
     <!-- //底部操作 -->
    <div class="bot-tools">
      <div>
        <el-checkbox
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="handleCheckAllChange"
        >全选</el-checkbox>
        <el-button size="small">导出选中</el-button>
        <el-button size="small">批量发货</el-button>
        <el-button size="small">批量受理</el-button>
        <el-button size="small">批量取消</el-button>
      </div>
      
    </div>
    <div class="bot-tools"><div class="flex-grow pagi-wrap">
        <div>共199条，每页20条</div>
        <el-pagination background layout="prev, pager, next" :total="1000" :pager-count="5"></el-pagination>
        <div>
          到第
          <el-input v-model="page" class="topage"></el-input>页
          <el-button size="small" class="pageBtn">GO</el-button>
        </div>
      </div></div>
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
        }
      ],
      queryId: "",
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: "",
      isIndeterminate: false,
      checkAll: false,
	checked: false,
	page: "1"
    };
  },
  mounted() {
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
  justify-content: flex-end
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


