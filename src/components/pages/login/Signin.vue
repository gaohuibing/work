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
        <div class="getcode">获取验证码</div>
      </div>
      <div class="login-item">
        <img src="../../../assets/images/pwd.png" alt class="x-icon">
        <el-input placeholder="请输入密码" v-model="input" show-password></el-input>
      </div>
      <div class="login-item nopad">
        <el-input v-model="input" placeholder="企业名称" style="width:100%"></el-input>
      </div>
      <div class="login-item" style="display:flex;line-height:40px;">
        <span style="color:#44B549">所在地</span>
        <el-cascader :options="options" style='width:220px;' placeholder="省/市/区"></el-cascader>
      </div>
      <div style="margin-top:13px">
        <el-button type="primary" size="small" style="width:100%;font-size:16px">注册</el-button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",
      options: [
        {
          value: "zhinan",
          label: "指南",         
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
              children: [
                {
                  value: "yizhi",
                  label: "一致"
                },
                {
                  value: "fankui",
                  label: "反馈"
                },
                {
                  value: "xiaolv",
                  label: "效率"
                },
                {
                  value: "kekong",
                  label: "可控"
                }
              ]
            }
          ]
        }
      ]
    };
  }
};
</script>

<style scoped>
.login-item {
  margin: 0;
}

</style>
