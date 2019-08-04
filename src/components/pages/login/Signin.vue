<template>
  
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
    
  }
};
</script>

<style scoped>
.login-item {
  margin: 0;
}
</style>
