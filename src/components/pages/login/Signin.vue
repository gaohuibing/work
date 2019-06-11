<template>
  <div class="login">
    <form>
      <div class="login-item">
        <img src="../../../assets/images/user.png" alt class="x-icon">
        <el-input v-model="form.mobile" placeholder="请输入手机号"></el-input>
      </div>
      <div class="login-item">
        <img src="../../../assets/images/code.png" alt class="x-icon">
        <el-input placeholder="请输入验证码" v-model="form.code" style="width:140px"></el-input>
        <div
          class="getcode"
          @click="getCode"
          :style="{'color':isGet?'#ddd':'','border-color':isGet?'#ddd':''}"
        >{{codeBtn}}</div>
      </div>
      <div class="login-item">
        <img src="../../../assets/images/pwd.png" alt class="x-icon">
        <el-input placeholder="请输入密码" v-model="form.password" show-password></el-input>
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
    </form>
  </div>
</template>

<script>
import { regionData } from "element-china-area-data";
let reg = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
export default {
  props: ["isLogin"],
  mounted() {},
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
    handleChange(e) {
      this.form.province = this.selectedOptions[0];
      this.form.city = this.selectedOptions[1];
      this.form.county = this.selectedOptions[2];
    },
    // 获取验证码
    getCode() {
      // this.$message({
      //   showClose: true,
      //   message: "抱歉，该功能尚未开放",
      //   type: "warning"
      // });
      // return;
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
  }
};
</script>

<style scoped>
.login-item {
  margin: 0;
}
</style>
