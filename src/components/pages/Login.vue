<template>
  <div>
    <app-header></app-header>
    <div class="login-main">
      <div class="center">
        <!-- banner -->
        <div class="banner-wrap">
          <div class="form-wrap">
            <div class="l-tabs">
              <template v-if="isGetPwd">
                <span style="color:#1c1c1c;font-weight:600">重置密码</span>
              </template>
              <template v-else>
                <span :class="{'active':isLogin}" @click="toLogin">登录</span>|
                <span :class="{'active':isSignin}" @click="toSignin">注册</span>
              </template>
            </div>
            <div class="tab-content">
              <template v-if="isGetPwd">
                <get-pwd :isGetPwd.sync="isGetPwd"></get-pwd>
              </template>
              <template v-else>
                <app-login v-if="isLogin" :isGetPwd.sync="isGetPwd"></app-login>
                <app-signin v-if="isSignin" :isLogin.sync="isLogin"></app-signin>
              </template>
            </div>
          </div>
        </div>
        <!-- main -->
        <div class="content">
          <div class="content-center">
            <div class="message">
              <div class="list">
                系统公告
                <div class="list-item">
                  <ul>
                    <li>
                      <span>中秋送好礼活动上线</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="readmore">
                查看更多
                <i class="el-icon-arrow-right"></i>
              </div>
            </div>
            <div class="service-wrap">
              <div class="service-tit">服务项目</div>
              <ul class="service-list">
                <li>
                  <div class="pic">
                    <img src="../../assets/images/gift.png" alt>
                  </div>
                  <h5>活动</h5>
                  <p>展业活动</p>
                  <p>零售活动</p>
                  <p>积分活动</p>
                  <p>卡券活动</p>
                </li>
                <li>
                  <div class="pic">
                    <img src="../../assets/images/shop.png" alt>
                  </div>
                  <h5>商城</h5>
                  <p>营销商城</p>
                  <p>个性定制</p>
                  <p>积分系统</p>
                </li>
                <li>
                  <div class="pic">
                    <img src="../../assets/images/share.png" alt>
                  </div>
                  <h5>供应链</h5>
                  <p>自有商品</p>
                  <p>批发市场</p>
                  <p>营销活动</p>
                  <p>营销商城</p>
                </li>
              </ul>
            </div>
            <!-- 定制 -->
            <div class="dz-wrap">
              <div class="pic">
                <img src="../../assets/images/dingzhikaifa.png" alt>
              </div>
              <div class="dz-list">
                <h5>定制开发</h5>
                <p>
                  管理系统：
                  <a>商户管理</a>
                  <a href>市场运营</a>
                  <a href>营销运营</a>
                  <a href>财务管理</a>
                  <a href>系统维护</a>
                </p>
                <p>
                  营销系统：
                  <a>商品助手</a>
                  <a href>商家中心</a>
                  <a href>活动</a>
                  <a href>商城</a>
                  <a href>公众号</a>
                  <a href>小程序</a>
                </p>
                <p>
                  供应系统：
                  <a href>批发市场</a>
                  <a href>分销市场</a>
                </p>
              </div>
            </div>
            <!-- footer -->
            <div class="s-footer">
              <div class="about">
                <a>关于小美</a>|
                <a style="padding-left:10px;">小美客服</a>
              </div>
              <p>2017 &#169; 小美网（苏州）网络信息科技有限公司 版权所有 Copyright &#169; 2017-2019 Xiaomei. All Rights Reserved. 苏ICP备17067525号-2</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
 <script>
import AppHeader from "@/components/common/header";
import AppLogin from "@/components/pages/login/Login";
import AppSignin from "@/components/pages/login/Signin";
import GetPwd from "@/components/pages/login/GetPwd";
export default {
  components: { AppHeader, AppLogin, AppSignin, GetPwd },
  mounted() {},
  data() {
    return {
      isLogin: true,
      isSignin: false,
      isGetPwd: false
    };
  },
  methods: {
    toLogin() {
      if (this.isLogin) {
        return;
      } else {
        this.isLogin = true;
        this.isSignin = false;
      }
    },
    toSignin() {
      if (this.isSignin) {
        return;
      } else {
        this.isLogin = false;
        this.isSignin = true;
      }
    }
  },
  watch: {
    isLogin(v) {
      if (v) {
        this.isSignin = false;
      } else {
        this.isSignin = true;
      }
    }
  }
};
</script>
 <style scoped>
.login-main {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding-top: 99px;
  padding-bottom: 30px;
}
.center {
  width: 1200px;
  margin: 0 auto;
}
.banner-wrap {
  width: 100%;
  height: 360px;
  background: url(../../assets/images/banner.png) 100% no-repeat;
  position: relative;
}
.form-wrap {
  width: 400px;
  height: 336px;
  background: #fff;
  position: absolute;
  right: 146px;
  top: 12px;
  box-shadow: 0px 2px 20px 0px rgba(150, 193, 152, 0.19);
}
.l-tabs {
  margin: 16px 0 0 24px;
  font-size: 16px;
  color: #ccc;
}
.l-tabs span {
  font-size: 20px;
  padding: 0 10px;
  cursor: pointer;
}
.l-tabs span.active {
  font-size: 24px;
  color: #44b549;
  font-weight: 600;
}
.tab-content {
  width: 280px;
  margin: 15px auto;
}
.login-main .content {
  background: #fff;
  border: 1px solid #e7e7eb;
}
.login-main .content-center {
  width: 906px;
  margin: 0 auto;
}
.login-main .message {
  width: 100%;
  height: 30px;
  line-height: 28px;
  border: 1px solid #e8e8ec;
  padding: 0 20px;
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
  color: #27272b;
  font-size: 12px;
}
.login-main .message .list {
  display: flex;
}
.login-main .list-item {
  margin-left: 30px;
}
.login-main .list-item li {
  list-style: disc;
  color: #d8d8d8;
}
.login-main .list-item li::after {
  content: "";
  width: 19px;
  height: 8px;
  background: url(../../assets/images/new.png) 100% center;
  display: inline-block;
  margin-left: 5px;
}
.login-main .list-item li span {
  color: #27272b;
}
.login-main .service-tit {
  padding: 0 0 12px 0;
  font-size: 16px;
  font-weight: 500;
}
.readmore {
  cursor: pointer;
}
.service-list {
  display: flex;
  justify-content: space-between;
}
.service-list li {
  width: 295px;
  height: 305px;
  border: 1px solid #e8e8ec;
  text-align: center;
}
.service-list li .pic {
  margin-top: 32px;
}
.service-list li h5 {
  font-size: 15px;
  margin: 16px 0;
}
.service-list li p {
  line-height: 22px;
  color: #929292;
}
.dz-wrap {
  padding: 24px;
  border: 1px solid rgba(232, 232, 236, 1);
  display: flex;
  margin-top: 10px;
}
.dz-list {
  margin-left: 24px;
}
.dz-list h5 {
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 12px;
}
.dz-list p {
  color: #929292;
  line-height: 1.5;
}
.dz-list p a {
  color: #929292;
  margin-right: 10px;
}
.s-footer .about {
  height: 37px;
  border-bottom: 1px solid rgba(232, 232, 236, 1);
  line-height: 36px;
  color: #929292;
  font-size: 12px;
}
.s-footer .about a {
  color: #929292;
  font-size: 12px;
  padding-right: 12px;
}
.s-footer p {
  color: #929292;
  font-size: 12px;
  padding: 10px 0 30px 0;
}
</style>
 