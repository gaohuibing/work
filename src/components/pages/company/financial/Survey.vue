<template>
  <div>
    <div class="part1">
      <!-- left -->
      <div class="yue-box">
        <div class="m-tit-box">
          <span class="m-tit">余额账户</span>
          <div class="m-content">
            <p>
              账户余额预警
              <el-switch v-model="value" style="margin-left:15px"></el-switch>
            </p>
            <p>
              预警阈值值为：￥{{lvValue}}
              <el-popover placement="top" width="270" v-model="visible">
                <div style="display:flex;align-items:center;margin:30px 0;justify-content:center">请输入预警阈值：<el-input v-model="lvValue" placeholder="" style='width:60px;margin:0 10px'></el-input>元</div>
                <div style="text-align: center; padding:10px 0">
                  <el-button size="small" type="primary" @click="visible = false">确定</el-button>
                  <el-button size="small" @click="visible = false">取消</el-button>
                </div>
                <span slot="reference">修改</span>
              </el-popover>
            </p>
          </div>
        </div>
        <div class="price-box">
          <div>
            <p class="ky">可用余额（元）</p>
            <p class="pri-num">50000.00</p>
          </div>
        </div>
      </div>
      <!-- right -->
      <div class="yue-box">
        <div class="m-tit-box">
          <span class="m-tit">分销账户</span>
        </div>
        <div class="price-box">
          <div>
            <p class="ky">可提现金额（元）</p>
            <p class="pri-num">50000.00</p>
          </div>
          <div>
            <p class="ky">冻结金额（元）</p>
            <p class="pri-num">50000.00</p>
          </div>
          <div class="tixian">
            <el-button type="primary" size="small">提现</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="part1" style="margin:8px 0">
      <!-- left -->
      <div class="yue-box">
        <div class="m-tit-box">
          <span class="m-tit">余额账户</span>
        </div>
        <div class="price-box" style="padding:0 9px;">
          <div>
            <p class="ky">日（元）</p>
            <p class="pri-num" style="color:#1c1c1c">￥500.00</p>
          </div>
          <div>
            <p class="ky">月（元）</p>
            <p class="pri-num" style="color:#1c1c1c">￥500.00</p>
          </div>
          <div>
            <p class="ky">总（元）</p>
            <p class="pri-num" style="color:#1c1c1c">￥500.00</p>
          </div>
        </div>
      </div>
      <!-- right -->
      <div class="yue-box">
        <div class="m-tit-box">
          <!-- <span class="m-tit"></span>          -->
        </div>
        <div class="price-box" style="padding:0 9px ">
          <div>
            <p class="ky">日（元）</p>
            <p class="pri-num" style="color:#1c1c1c">￥500.00</p>
          </div>
          <div>
            <p class="ky">月（元）</p>
            <p class="pri-num" style="color:#1c1c1c">￥500.00</p>
          </div>
          <div>
            <p class="ky">总（元）</p>
            <p class="pri-num" style="color:#1c1c1c">￥500.00</p>
          </div>
        </div>
      </div>
    </div>
    <div class="part1">
      <div class="sms">
        可索取发票数：
        <span class="val">2</span>
        <span class="do">申请开票</span>
      </div>
      <div class="sms">
        短信剩余条数：
        <span class="val">2</span>
        <span class="do">购买短信</span>
      </div>
    </div>
    <div class="tips">备注：财务板块仅统计资金交易，不统计积分</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
	value: true,
	visible: false,
	lvValue:'-1'
    };
  }
};
</script>
<style scoped>
.part1 {
  background: #eef3f5;
  margin-top: 16px;
  padding: 24px 0;
  display: flex;
  line-height: 1;
}
.part1 .yue-box {
  width: 50%;
  padding: 0 24px;
}
.part1 .yue-box:first-child {
  border-right: 1px solid #d0d0d9;
}
.part1 .m-tit-box {
  display: flex;
  height: 50px;
}
.part1 .m-tit-box > * {
  width: 50%;
}
.part1 .m-tit {
  font-size: 18px;
  font-weight: 600;
  line-height: 1;
  border-left: 3px solid #44b549;
  padding-left: 6px;
  height: 18px;
}
.part1 .m-content p {
  margin-bottom: 8px;
}
.part1 .m-content p span {
  color: #44b549;
  margin-left: 10px;
  cursor: pointer;
}
.price-box {
  display: flex;
  justify-content: space-between;
  padding: 0 50px;
  margin-top: 20px;
}
.price-box .ky {
  font-weight: 600;
  margin-bottom: 24px;
}
.price-box .pri-num {
  font-size: 22px;
  font-weight: 600;
  color: #44b549;
  line-height: 34px;
}
.tixian {
  display: flex;
  align-items: flex-end;
}
.price-box .ky1 {
  font-weight: 600;
  margin-bottom: 24px;
}
.price-box .pri-num1 {
  font-size: 22px;
  font-weight: 600;
  color: #44b549;
  line-height: 34px;
}
.sms {
  width: 50%;
  display: flex;
  justify-content: center;
}
.sms .val {
  width: 100px;
  text-align: center;
}
.sms .do {
  color: #44b549;
  cursor: pointer;
}
.tips {
  padding: 17px 30px;
  color: #999;
}
</style>

