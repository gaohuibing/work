<template>
  <div class="login">
    <form>
      <div class="login-item">
        <img src="../../../assets/images/user.png" alt class="x-icon">
        <el-input v-model="input" placeholder="请输入手机号"></el-input>
      </div>
      <div class="login-item">
        <img src="../../../assets/images/pwd.png" alt class="x-icon">
        <el-input placeholder="请输入密码" v-model="input" show-password></el-input>
      </div>
      <div class="login-item">
        <img src="../../../assets/images/code.png" alt class="x-icon">
        <el-input placeholder="请输入验证码" v-model="input" style="width:140px"></el-input>
        <div class="getcode">123</div>
      </div>
      <div class>
        <el-button type="primary" size="small" style="width:100%;font-size:16px">登录</el-button>
      </div>
      <div class="login-tools">
        <el-checkbox v-model="checked">记住账号</el-checkbox>
        <span class="findpwd" @click="findPwd">找回密码</span>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: ["isGetPwd"],
  mounted() {
    console.log(this.isGetPwd);
  },
  data() {
    return {
      input: "",
      checked: true,
     
    };
  },
  methods: {
    findPwd() {
	
	this.$emit('update:isGetPwd', true)
    }
  },
  watch: {
    
  }
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
