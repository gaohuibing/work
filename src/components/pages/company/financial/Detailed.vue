<template>
  <div>
    <div class="list-tools">
      <div class="tool-1 clearfix" style="margin-bottom: 10px;">
        <div class="t">
          <span>财务类型：</span>
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
          <span>订单来源</span>
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
          <span>账单筛选：</span>
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
          <span>入账时间：</span>
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
      <div></div>
      <div>
        <el-button size="small">上一页</el-button>
        <el-button size="small">下一页</el-button>
      </div>
    </div>
    <div class="table-content">
      <el-table :data="serviceLists.data" stripe border tooltip-effect="dark" style="width: 100%">
        <el-table-column label="订单编号" prop="code" align="center"></el-table-column>
        <el-table-column prop="type" label="交易编号" align="center"></el-table-column>
        <el-table-column prop="time" label="入账时间" align="center"></el-table-column>
        <el-table-column prop="type" label="财务类型" align="center"></el-table-column>
        <el-table-column label="订单来源" align="center" prop="price"></el-table-column>
        <el-table-column prop="content" label="交易内容" align="center"></el-table-column>
        <el-table-column label="订单金额" align="center" prop="price">
          
        </el-table-column>
      </el-table>
    </div>
    <!-- //底部操作 -->
    <div class="bot-tools">
      <div></div>
      <div class="flex-grow pagi-wrap">
        <div>共199条，每页20条</div>
        <el-pagination background layout="prev, pager, next" :total="1000" :pager-count="5"></el-pagination>
        <div>
          到第
          <el-input v-model="page" class="topage"></el-input>页
          <el-button size="small" class="pageBtn">GO</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {    
   
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
	page: "1",
	serviceLists:{
		data:[
			{
				code:'1651313216546',
				time:'2019-05-20 18:12:12',
				type:'装修订单',
				content:'撒大家了看见啊',
				price:'￥5000',
				status:'待付款',				
			},
			{
				code:'1651313216546',
				time:'2019-05-20 18:12:12',
				type:'装修订单',
				content:'撒大家了看见啊',
				price:'￥5000',
				status:'待付款',				
			},
			{
				code:'1651313216546',
				time:'2019-05-20 18:12:12',
				type:'装修订单',
				content:'撒大家了看见啊',
				price:'￥5000',
				status:'待付款',				
			},
			{
				code:'1651313216546',
				time:'2019-05-20 18:12:12',
				type:'装修订单',
				content:'撒大家了看见啊',
				price:'￥5000',
				status:'待付款',				
			},
			{
				code:'1651313216546',
				time:'2019-05-20 18:12:12',
				type:'装修订单',
				content:'撒大家了看见啊',
				price:'￥5000',
				status:'待付款',				
			},
			{
				code:'1651313216546',
				time:'2019-05-20 18:12:12',
				type:'装修订单',
				content:'撒大家了看见啊',
				price:'￥5000',
				status:'待付款',				
			}
		]
	}
    };
  },
  mounted() {
    this.queryId = this.$route.query.id;
  },
  methods: {
    tabHandle(id) {
      this.$router.push({
        path: "/company/service_orders/index",
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

