<template>
  <div>
    <div class="tabs">
      <ul>
        <li style="font-weght:600;font-size:18px">订单详情</li>
      </ul>
    </div>
    <div style="padding-bottom:30px">
      <div class="order-state">当前订单状态：待付款</div>
      <div class="head-tit">订单信息</div>
      <!-- 1 -->
      <div class="order-info">
        <div class="order-tit">
          <span>买家信息</span>
        </div>
        <div class="order-content">
          <p>企业：苏州清枫语科技有限公司</p>
          <p>联系人：苏州清枫语科技有限公司</p>
          <p>电话：16546131315</p>
        </div>
      </div>
      <!-- 2 -->
      <div class="order-info">
        <div class="order-tit">
          <span>订单信息</span>
        </div>
        <div class="order-content">
          <p>
            <span>订单编号：202512115453</span>
            <span>订单时间：2019-5-20</span>
            <span>积分-清枫语是的</span>
            <span class="order-type">积分订单</span>
          </p>
          <p>
            <span>交易单号：--</span>
            <span>支付时间：--</span>
          </p>
        </div>
      </div>
      <!-- table -->
      <div class="table-content">
        <el-table
          ref="multipleTable"
          :data="goodLists.data"
          stripe
          border
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column label="商品" width="250" align="center">
            <template slot-scope="scope">
              <div class="goodinfo clearfix">
                <div class="pic">
                  <img src="../../../../assets/images/test.png">
                </div>
                <div class="info">
                  <p>{{scope.row.name}}</p>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="type" label="售后" align="center"></el-table-column>
          <el-table-column prop="price" label="单价" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.liulan}}积分</span>
            </template>
          </el-table-column>
          <el-table-column prop="kucun" label="数量" align="center"></el-table-column>
          <el-table-column prop="price" label="金额" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.liulan}}积分</span>
            </template>
          </el-table-column>
          <el-table-column prop="date" label="优惠码" align="center"></el-table-column>
          <el-table-column prop="date" label="分支机构" align="center"></el-table-column>
        </el-table>
        <div class="table-tip">备注信息：能不能快点发货</div>
      </div>
      <!-- total-price -->
      <div class="total-price">订单总额：￥800.00</div>
      <!-- 3 -->
      <div class="order-info">
        <div class="order-tit">
          <span>物流和发货信息</span>
        </div>
        <div class="order-content">
          <p>收货信息：清风雨，17515151541，江苏省 苏州市 吴中区 吴中大道2588号，000000</p>
          <p>物流公司：-</p>
          <p>物流单号：-</p>
          <div class="od-tools">
            <el-button size="small">关闭交易</el-button>
          </div>
        </div>
      </div>
      <!-- 4 -->
      <div class="order-info">
        <div class="order-tit">
          <span>订单历史</span>
        </div>
        <div class="order-content">
          <p>1. 2019-5-19 15:34:24 待付款</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goodLists: {
        data: [
          {
            user: "12",
            name: "13",
            type: "服装/男装",
            marketPrice: "50.00",
            normalPrice: "30.00",
            price: "180.00",
            kucun: "12",
            liulan: "200",
            xiaolia: "100",
            date: "2019-02-03 00:00:00"
          },
          {
            name: "电脑电脑电脑",
            type: "服装/男装",
            marketPrice: "50.00",
            normalPrice: "30.00",
            price: "180.00",
            kucun: "12",
            liulan: "200",
            xiaolia: "100",
            date: "2019-02-03 00:00:00"
          }
        ]
      }
    };
  }
};
</script>

<style scoped>
.goodinfo {
  display: flex;
  align-items: center;
  justify-content: center;
}
.goodinfo .pic {
  width: 80px;
  height: 80px;
  float: left;
}
.goodinfo .pic img {
  width: 100%;
  height: 100%;
}
.goodinfo .info {
  width: 140px;
  float: left;
  margin-left: 15px;
  font-weight: normal;
  text-align: left;
}
.order-state {
  margin-top: 10px;
  padding: 20px 15px;
  background: #f6f7ff;
}
.head-tit {
  margin-top: 10px;
  padding: 10px 15px;
  background: #f6f7ff;
  font-weight: 600;
}
.order-info {
  margin-top: 30px;
}
.order-tit span {
  padding-left: 8px;
  border-left: 3px solid #44b549;
  font-weight: 600;
}
.order-content {
  padding-left: 40px;
}
.order-content p {
  line-height: 1;
  margin-top: 15px;
}
.order-content p span {
  display: inline-block;
  width: 200px;
}
.order-content p span.order-type {
  display: inline;
  padding: 3px 10px;
  color: #10aeff;
  border: 1px solid #10aeff;
  border-radius: 20px;
}
.table-content {
  margin-top: 15px;
}
.table-tip {
  color: #999;
  line-height: 2;
}
.total-price{
	font-size: 18px;
	font-weight: 600;
	text-align: right
}
.od-tools{
	padding: 10px 0;
	text-align: center
}
</style>
