<template>
  
</template>

<script>
let reg = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
export default {
  props: ["isGetPwd"],
  data() {
    return {
	    
    };
  },
  methods: {
     // 获取验证码
    getCode() {      
      if(!this.mobileBlur()){
		return false
	}
      if (this.isGet) {
        return false;
      }
      this.$api
        .post("user/send_code_pwd", {
          mobile: this.mobile
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
    // 重置密码
    resetPwd(){
	    if (this.mobileBlur() && this.passwordBlur()&& this.repasswordBlur() && this.captchaBlur()) {
		  this.$api
        .post("user/reset_pwd", {
	    mobile: this.mobile,
	    new_pwd:this.new_pwd,
	    re_pwd:this.re_pwd,
	    code:this.code
        })
        .then(res => {
          if (res.data.code == 200) {
            this.$message({
			message:'重置密码成功，请登录',
			type:'success'
		})
		setTimeout(h=>{this.goLogin()},1000)
          } else {
            this.$message.error({ message: res.data.msg });
          }
        })
        .catch(err => {
          this.$message.error({ message: err });
        }); 
	    }
    },
    goLogin() {
      this.$emit("update:isGetPwd", false);
    },
    mobileBlur() {
      if (this.mobile == "") {
        this.isMobile = false;
        this.mobileText = "请输入手机号";
        return false;
      } else if (this.mobile.match(reg) == null) {
        this.isMobile = false;
        this.mobileText = "手机号格式错误";
        return false;
      } else {
        this.isMobile = true;
        this.mobileText = "";
        return true;
      }
    },
    passwordBlur() {
      if (this.new_pwd == "") {
        this.isPassword = false;
        this.passwordText = "请输入密码";
        return false;
      } else {
        this.isPassword = true;
        this.passwordText = "";
        return true;
      }
    },
    repasswordBlur(){
	 if (this.new_pwd == "") {
        this.isRepassword = false;
        this.repasswordText = "请重复密码";
        return false;
	} else if(this.new_pwd!=this.re_pwd){
		this.isRepassword = false;
this.repasswordText = "密码不一致";
 return false;
	} else
	
	{
        this.isRepassword = true;
        this.repasswordText = "";
        return true;
      }   
    },
    captchaBlur() {
      if (this.code == "") {
        this.isCaptcha = false;
        this.captchaText = "请输入验证码";
        return false;
      } else {
        this.isCaptcha = true;
        this.captchaText = "";
        return true;
      }
    }
  }
};
</script>

<style scoped>
.login-item {
  margin: 0;
  margin-bottom: 10px
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
