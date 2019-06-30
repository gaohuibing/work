<template>
  <div class="login">
    <form>
      <div class="login-item">
        <img src="../../../assets/images/user.png" alt class="x-icon">
        <el-input v-model="input" placeholder="请输入手机号"></el-input>
      </div>
      <div class="login-item">
        <img src="../../../assets/images/code.png" alt class="x-icon">
        <el-input placeholder="请输入验证码" v-model="input" style="width:140px"></el-input>
        <div class="getcode" @click="getCode">获取验证码</div>
      </div>
      <div class="login-item">
        <img src="../../../assets/images/pwd.png" alt class="x-icon">
        <el-input placeholder="请输入密码" v-model="input" show-password></el-input>
      </div>
      <div class="login-item">
        <img src="../../../assets/images/pwd.png" alt class="x-icon">
        <el-input placeholder="确认密码" v-model="input" show-password></el-input>
      </div>
      <div class style="margin-top:13px">
        <el-button type="primary" size="small" style="width:100%;font-size:16px">登录</el-button>
      </div>
      <div class="login-tools">
        <span></span>
        <span class="findpwd" @click="goLogin">返回登录</span>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: ["isGetPwd"],
  data() {
    return {
      input: "",
      checked: true
    };
  },
  methods: {
    getCode() {
      // this.$message({
      //   showClose: true,
      //   message: "抱歉，该功能尚未开放",
      //   type: "warning"
      // });
    },
    goLogin() {
      this.$emit("update:isGetPwd", false);
    }
  }
};
</script>

<style scoped>
.login-item {
  margin: 0;
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
