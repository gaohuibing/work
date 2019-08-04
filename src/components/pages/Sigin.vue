<template>
  <div>
    <app-header></app-header>
    <div class="login-main">
      <div class="left-normal">
        <img src="../../assets/images/login-pic.png" alt />
        <p>让个体成为平台&nbsp;&nbsp;&nbsp;&nbsp;用平台成就个体</p>
      </div>
      <div class="right-main">
        <div class="title">商户注册</div>
        <div class="login">
          <form>
            <div class="login-item">
              <img src="../../assets/images/user.png" alt class="x-icon" />
              <el-input v-model="form.mobile" placeholder="请输入手机号"></el-input>
            </div>
            <div class="login-item">
              <img src="../../assets/images/code.png" alt class="x-icon" />
              <el-input placeholder="请输入验证码" v-model="form.code" style="width:140px"></el-input>
              <div
                class="getcode"
                @click="getCode"
                :style="{'color':isGet?'#ddd':'','border-color':isGet?'#ddd':''}"
              >{{codeBtn}}</div>
            </div>
            <div class="login-item">
              <img src="../../assets/images/pwd.png" alt class="x-icon" />
              <el-input
                placeholder="请输入密码"
                v-model="form.password"
                show-password
                auto-complete="new-password"
              ></el-input>
            </div>
            <div class="login-item nopad">
              <el-input v-model="form.enterprise" placeholder="企业名称" style="width:100%"></el-input>
            </div>
            <div class="login-item" style="display:flex;line-height:40px;">
              <span style="color:#44B549">所在地</span>
              <el-cascader
                :options="options"
                style="width:220px;"
                placeholder="省/市/区"
                v-model="selectedOptions"
                @change="handleChange"
              ></el-cascader>
            </div>
            <div style="margin-top:13px">
              <el-button
                type="primary"
                size="small"
                style="width:100%;font-size:16px"
                @click="siginHandle"
              >注册</el-button>
            </div>
            <div class="login-tools">
              <span class="findpwd" @click="toLogin">返回登录</span>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- footer -->
    <div class="s-footer">
      <p>
        2017 &#169; 小美网（苏州）网络信息科技有限公司 版权所有 Copyright &#169; 2017-2019 Xiaomei. All Rights Reserved.
        <a
          href="
http://www.beian.miit.gov.cn/state/outPortal/loginPortal.action;jsessionid=Z-JEYbBYGAGHOD2D9DU5DuZRoavPKb4tR0nsxi0c5Rx8t2k-ZyLO!285674180
"
          style="color:#929292"
        >苏ICP备17067525号-2</a>
      </p>
    </div>
  </div>
</template>
 <script>
let reg = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
import AppHeader from "@/components/common/header";
import { regionData } from "element-china-area-data";

export default {
  components: { AppHeader },
  mounted() {
    
  },
  data() {
    return {
      codeBtn: "获取验证码",
      isGet: false,
      codeTime: 60,
      options: regionData,
      selectedOptions: [],
      form: {
        mobile: "",
        code: "",
        password: "",
        enterprise: "",
        province: "",
        city: "",
        county: ""
      }
    };
  },
  methods: {
    toLogin() {
	    this.$router.push('./Login')
    },   
    handleChange(e) {
      this.form.province = this.selectedOptions[0];
      this.form.city = this.selectedOptions[1];
      this.form.county = this.selectedOptions[2];
    },
    // 获取验证码
    getCode() {
      if (this.form.mobile == "") {
        this.$message.error({ message: "请输入手机号" });
        return false;
      }
      if (this.form.mobile.match(reg) == null) {
        this.$message.error({ message: "手机号格式错误" });
        return false;
      }
      if (this.isGet) {
        return false;
      }
      this.$api
        .post("user/send_code", {
          mobile: this.form.mobile
        })
        .then(res => {
          if (res.data.code == 200) {
            this.codeBtn = `${this.codeTime}s`;
            this.isGet = true;

            let timer = setInterval(h => {
              this.codeBtn = `${this.codeTime - 1}s`;
              this.codeTime--;
              if (this.codeTime <= 0) {
                clearInterval(timer);
                this.isGet = false;
                this.codeBtn = "重新获取";
              }
            }, 1000);
          } else {
            this.$message.error({ message: res.data.msg });
          }
        })
        .catch(err => {
          this.$message.error({ message: err });
        });
    },

    // 注册
    siginHandle() {
      this.$api
        .post("user/register", this.form)
        .then(res => {
          if (res.data.code == 200) {
            this.$message({
              message: "注册成功，请登录",
              type: "success"
            });
            this.form = {
              mobile: "",
              code: "",
              password: "",
              enterprise: "",
              province: "",
              city: "",
              county: ""
            };
            this.selectedOptions = [];
            this.$emit("update:isLogin", true);
          } else {
            this.$message.error({ message: res.data.msg });
          }
        })
        .catch(err => {
          this.$message.error({ message: err });
        });
    }
  },
  watch: {}
};
</script>
 <style scoped>
.login-main {
  position: absolute;
  top: 88px;
  left: 50%;
  margin-left: -600px;
  bottom: 60px;
  width: 1200px;
  display: flex;
  flex-shrink: 1;
  background: #fff;
  border: 1px solid rgba(231, 231, 235, 1);
  align-items: center;
}
.left-normal {
  flex-grow: 1;
  text-align: center;
}
.left-normal p {
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  margin-top: 80px;
}
.right-main {
  width: 400px;
  box-shadow: 0px 2px 20px rgba(150, 193, 152, 0.19);
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  margin-right: 80px;
  padding: 60px;
}
.right-main .title {
  font-size: 32px;
  color: #44b549;
  text-align: center;
  margin-bottom: 40px;
}
.s-footer {
  text-align: center;
  position: absolute;
  bottom: 0;
  left: 50%;
  margin-left: -600px;
  width: 1200px;
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

.login-tools {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}
.findpwd {
  color: #999999;
  cursor: pointer;
}
</style>
 