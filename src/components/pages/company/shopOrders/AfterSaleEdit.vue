<template>
  <div>
    <div class="a-bread">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>售后</el-breadcrumb-item>
        <el-breadcrumb-item>售后待处理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="stepbox">
      <div class="step">
        <div class="circle" style="background:#44B549">1</div>
        <div class="line stepline1"></div>
        <div class="circle" style="background:#10AEFF">2</div>
        <div class="line stepline2"></div>
        <div class="circle" style="background:#D8D8D8">3</div>
      </div>
      <div class="des">
        <div>买家申请换货</div>
        <div class="active">卖家处理换货申请</div>
        <div style="margin-right:-8px">完成售后</div>
      </div>
    </div>
    <div class="details">
      <div class="main-tools">
        <div class="buts" style="margin-bottom:10px">
          <span>物流公司：</span>
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
        <div class="buts">
          <span>物流单号：</span>
          <div class="inp-box">
            <el-input v-model="value" placeholder="请输入"></el-input>
          </div>
        </div>

        <div class="tools">
          <el-button type="primary" size="small">确定</el-button>
          <el-button size="small">取消</el-button>
        </div>
        <div class="order-info">
          <div class="order-tit">
            <span>订单历史</span>
          </div>
          <div class="order-content">
            <p>1. 2019-5-19 15:34:24 待付款</p>
          </div>
        </div>
      </div>
      <div class="sale-details">
        <div class="order-info" style="margin-top:0">
          <div class="order-tit">
            <span>退款详情</span>
          </div>
          <ul class="goodslist">
            <li>
              <div class="img">
                <img src="../../../../assets/images/test.png" alt>
              </div>
              <div class="tit">的简历可视对讲弗兰克睡觉了色哥</div>
            </li>
            <li>
              <div class="img">
                <img src="../../../../assets/images/test.png" alt>
              </div>
              <div class="tit">的简历可视对讲弗兰克睡觉了色哥</div>
            </li>
          </ul>
          <div class="order-info">
            <div class="order-tit">
              <span>买家信息</span>
            </div>
            <div class="order-content" style="border-bottom:#E7E7EB 1px solid;padding-bottom:10px">
              <p>企业：小美科技</p>
              <p>姓名：小美科技</p>
              <p>电话：小美科技</p>
              <p>订单编号：小美科技</p>
              <p>订单时间：小美科技</p>
              <p>总价：121231</p>
            </div>
            <div class="order-content">
              <p>退款编号：小美科技</p>
              <p>退款金额：小美科技</p>
              <p>原因：小美科技</p>
              <p>要求：小美科技</p>
              <p>说明：小美科技</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
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
      ]
    };
  }
};
</script>

<style scoped>
.stepbox {
  padding: 20px 0;
}
.stepbox .step {
  padding: 0 20px;
  display: flex;
  align-items: center;
}
.stepbox .circle {
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  font-weight: bold;
  border-radius: 20px;
}
.stepbox .line {
  height: 3px;
  width: 410px;
}
.stepline1 {
  background: linear-gradient(left, #44b549, #10aeff);
}
.stepline2 {
  background: #d8d8d8;
}
.stepbox .des {
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
  color: #d8d8d8;
  padding-right: 20px;
}
.stepbox .des .active {
  color: #1c1c1c;
}
.order-info {
  margin-top: 30px;
}
.order-tit span {
  padding-left: 8px;

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
.details {
  margin-top: 20px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
}
.main-tools .title {
  font-size: 20px;
  font-weight: 600;
}
.main-tools .title span {
  color: #44b549;
  font-size: 14px;
  font-weight: 400;
  margin-left: 15px;
}
.main-tools .tip {
  color: #999999;
  line-height: 1.3;
  margin-top: 16px;
}
.main-tools .tools {
  margin-top: 40px;
  margin-bottom: 60px;
}
.sale-details {
  width: 280px;
  padding: 0 20px;
  border-left: 1px solid #e7e7eb;
}
.goodslist li {
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #e7e7eb;
}

.goodslist li .img {
  width: 60px;
  height: 60px;
  margin-right: 10px;
}
.goodslist li .img img {
  width: 100%;
}
.goodslist li .tit {
  width: 170px;
}
.sale-details .order-content {
  color: rgba(0, 0, 0, 0.65);
  padding-left: 20px;
}
</style>
