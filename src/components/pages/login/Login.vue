<template>
  <div class="login">
    <form>
      <div class="login-item">
        <img src="../../../assets/images/user.png" alt class="x-icon">
        <el-input v-model="mobile" placeholder="请输入手机号"></el-input>
      </div>
      <div class="login-item">
        <img src="../../../assets/images/pwd.png" alt class="x-icon">
        <el-input placeholder="请输入密码" v-model="password" show-password></el-input>
      </div>
      <div class="login-item">
        <img src="../../../assets/images/code.png" alt class="x-icon">
        <el-input placeholder="请输入验证码" v-model="captcha" style="width:140px"></el-input>
        <div class="getcode" @click="getImgCode">
          <img :src="imgCode" alt style="width:100%;height:100%">
        </div>
      </div>
      <div class>
        <el-button type="primary" size="small" style="width:100%;font-size:16px" @click="login">登录</el-button>
      </div>
      <div class="login-tools">
        <el-checkbox v-model="checked">记住账号</el-checkbox>
        <span class="findpwd" @click="findPwd">找回密码</span>
      </div>
    </form>
  </div>
</template>

<script>
let reg = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
export default {
  props: ["isGetPwd"],
  mounted() {
    this.getImgCode();
  },
  data() {
    return {
      mobile: "",
      password: "",
      captcha: "",
      checked: true,
      imgCode: "",
      key: ""
    };
  },
  methods: {
    //获取图形验证码
    getImgCode() {
      this.$api
        .get("user/captcha")
        .then(res => {
          if (res.data.code == 200) {
            this.imgCode = res.data.url.img;
            this.key = res.data.url.key;
          }
        })
        .catch(err => {
          this.$message.error({ message: err });
        });
    },
    login() {
      if (this.mobile == "") {
        this.$message.error({ message: "请输入手机号" });
        return false;
      }
      if (this.mobile.match(reg) == null) {
        this.$message.error({ message: "手机号格式错误" });
        return false;
      }
      if (this.password == "") {
        this.$message.error({ message: "请输入密码" });
        return false;
      }
      if (this.captcha == "") {
        this.$message.error({ message: "请输入图形验证码" });
        return false;
      }
      this.$api
        .post("user/user_login", {
          mobile: this.mobile,
          password: this.password,
          captcha: this.captcha,
          key: this.key
        })
        .then(res => {
          if (res.data.code == 200) {
            let token = res.data.token;
            if (!token) {
              this.$message.error({ message: "没有返回token" });
              return false;
            }
            this.$api.setToken(token);
            window.location.href = "/";
          } else {
            this.$message.error({ message: res.data.msg });
          }
        })
        .catch(err => {});
    },
    // 找回密码
    findPwd() {
      this.$emit("update:isGetPwd", true);
    }
  },
  watch: {}
};
</script>

<style scoped>
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
