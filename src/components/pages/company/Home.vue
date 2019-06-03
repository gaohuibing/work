<template>
  <div class="full-height">
    <div class="company-home">
      <!-- 第一行 -->
      <div class="c-about">
        <ul class="clearfix">
          <li class="c-info">
            <div class="c-name">
              <img src="../../../assets/images/Bitmap.png" alt>
              <span>苏州清风雨广告有限公司</span>
            </div>
            <div class="c-part">
              <div class="c-log">
                <img src="../../../assets/images/qi.png" alt>
                企业认证
              </div>
              <a @click.prevent style="color:#44B549">去认证</a>
            </div>
            <div class="c-part">
              <div class="c-log" style="border-color:#10AEFF;color:#10AEFF">
                <img src="../../../assets/images/gong.png" alt>
                供应商
              </div>
              <a @click.prevent>已升级</a>
            </div>
          </li>
          <li class="account">
            <p>
              账户余额：
              <span>￥5000.00</span>
              <a @click.prevent>充值</a>
            </p>
            <p>
              账户余额：
              <span>￥5000.00</span>
              <a @click.prevent>提现</a>
            </p>
          </li>
          <li class="statistics">
            <h5>登录统计</h5>
            <p>
              <span>总登录次数：</span>112次
            </p>
            <p>
              <span>上次登陆时间：</span>2019-02-05 9:00:00
            </p>
          </li>
        </ul>
      </div>
      <!-- 第二行 -->
      <div class="c-main">
        <div class="c-title">待办事项</div>
        <ul class="todo-list">
          <li>
            <h5>120</h5>
            <p>咨询订单</p>
            <div>
              <el-button type="primary" plain size="small">去受理</el-button>
            </div>
          </li>
          <li>
            <h5>39</h5>
            <p>商品订单</p>
            <div>
              <el-button type="primary" plain size="small">去发货</el-button>
            </div>
          </li>
          <li>
            <h5>120</h5>
            <p>服务订单</p>
            <div>
              <el-button type="primary" plain size="small">去续费</el-button>
            </div>
          </li>
        </ul>
      </div>
      <!-- 第三行 -->
      <div class="c-main">
        <div class="c-title">快捷入口</div>
        <ul class="extra-list">
          <li>
            <div>
              <img src="../../../assets/images/add-2.png" alt>
              <span>新增商品</span>
            </div>
          </li>
          <li>
            <div>
              <img src="../../../assets/images/download.png" alt>
              <span>下载中心</span>
            </div>
          </li>
          <li>
            <div>
              <img src="../../../assets/images/yizhanggui.png" alt>
              <span>易掌柜</span>
            </div>
          </li>
        </ul>
      </div>
      <!-- 第四行 -->
      <div class="c-main">
        <div class="c-title">常用功能</div>
        <ul class="normal-list">
          <li>
            <div>
              <img src="../../../assets/images/gift.png" alt>
              <div class="inp">
                <h5>活动</h5>
                <p>
                  <span>已创：2</span>
                  <span>可创：2</span>
                </p>
              </div>
            </div>
          </li>
          <li>
            <div>
              <img src="../../../assets/images/shop.png" alt>
              <div class="inp">
                <h5>活动</h5>
                <p>
                  <span>已创：2</span>
                  <span>可创：2</span>
                </p>
              </div>
            </div>
          </li>
          <li>
            <div>
              <img src="../../../assets/images/share.png" alt>
              <div class="inp">
                <h5>活动</h5>
                <p>
                  <span>已创：2</span>
                  <span>可创：2</span>
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted(){
	  console.log(this.$api.getToken())
  },
  methods:{
	  
  }
};
</script>
<style scoped>
.company-home {
  padding: 0 24px;
}
.company-home .c-about {
  height: 200px;
  padding: 36px 0;
  border-bottom: 1px solid rgba(208, 208, 217, 1);
}
.company-home .c-about ul {
  height: 100%;
  width: 100%;
}
.company-home .c-about li {
  width: 33.33%;
  float: left;
  border-right: 1px solid rgba(208, 208, 217, 1);

  height: 100%;
}
.company-home .c-about li:last-child {
  border: none;
}
.company-home .c-about .c-info {
  padding-left: 33px;
}
.company-home .c-about .c-name {
  display: flex;
  line-height: 56px;
  margin-bottom: 16px;
  margin-top: -16px;
}
.company-home .c-about .c-name img {
  margin-right: 8px;
  width: 56px;
  height: 56px;
}
.company-home .c-about .c-part {
  display: flex;
  line-height: 30px;
  font-size: 12px;
  margin-bottom: 8px;
}
.company-home .c-about .c-log {
  width: 104px;
  height: 30px;
  border: 1px solid rgba(255, 190, 0, 1);
  color: rgba(255, 190, 0, 1);
  text-align: center;
  line-height: 30px;
  border-radius: 4px;
  margin-right: 32px;
}
.company-home .c-about .c-log img {
  /* margin-top: 6px; */
  margin-right: 6px;
  vertical-align: middle;
  margin-top: -2px;
}
.company-home .account {
  padding: 28px 0;
  text-align: center;
  font-size: 18px;
}
.company-home .account p {
  margin-bottom: 35px;
}
.company-home .account p a {
  color: #44b549;
  font-size: 14px;
  margin-left: 24px;
}
.company-home .account p span {
  font-weight: 600;
}
.company-home .statistics {
  padding: 28px 0;
  padding-left: 56px;
}
.company-home .statistics h5 {
  font-size: 18px;
  margin-bottom: 18px;
  color: #1c1c1c;
}
.company-home .statistics p {
  font-size: 14px;
  margin-bottom: 8px;
}
.company-home .statistics p span {
  display: inline-block;
  width: 100px;
  color: #999;
  margin-right: 5px;
}
.c-title {
  font-size: 18px;
  margin: 15px 0 10px 0;
  font-weight: bold;
}
.todo-list {
  display: flex;
  justify-content: space-between;
}
.todo-list li {
  text-align: center;
  width: 33.33%;
}
.todo-list li h5 {
  font-size: 36px;
  color: rgba(28, 28, 28, 1);
  line-height: 50px;
  font-weight: normal;
}
.todo-list li p {
  margin-bottom: 10px;
}
.extra-list {
  display: flex;
  justify-content: space-between;
}
.extra-list li {
  text-align: center;
  width: 33.33%;
}
.extra-list li > div {
  width: 196px;
  height: 58px;
  line-height: 58px;
  border: 1px solid rgba(231, 231, 235, 1);
  border-radius: 4px;
  text-align: center;
  margin: 0 auto;
}
.extra-list li > div:hover {
  border-color: #44b549;
  cursor: pointer;
}
.extra-list li > div img {
  vertical-align: middle;
  margin-right: 24px;
}
.normal-list {
  display: flex;
}
.normal-list li {
  text-align: center;
  width: 33.33%;
}
.normal-list li > div {
  width: 241px;
  height: 112px;
  padding: 24px 0 24px 24px;
  border: 1px solid rgba(231, 231, 235, 1);
  border-radius: 4px;
  text-align: center;
  margin: 0 auto;
  display: flex;
}
.normal-list li > div:hover {
  border-color: #44b549;
  cursor: pointer;
}
.normal-list li > div img {
  width: 64px;
  vertical-align: middle;
  margin-right: 16px;
}
.normal-list li .inp {
  text-align: left;
}
.normal-list li .inp h5 {
  font-size: 15px;
  line-height: 32px;
}
.normal-list li .inp p {
  color: #999;
  font-size: 13px;
  line-height: 32px;
}
.normal-list li .inp p span {
  margin-right: 16px;
}
</style>
