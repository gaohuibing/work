<template>
  <div>
    <app-header></app-header>
    <div class="welcome-box">
      <div class="title">
        <img src="../../assets/images/hi.png" alt />
        <span>欢迎登录</span>
      </div>
      <div class="wel-state">系统状态：未激活</div>
	<div style="padding-left:40px">
      <div class="wel-item">
        <span>激活条件</span>
        <div class="wel-right rz">
          企业认证
          <span class="rz-state">
            <i class="el-icon-error"></i>
            去完成
          </span>
        </div>
      </div>
      <div class="wel-item">
        <span>激活权益</span>
        <div class="wel-right qy-list">
          <p>自营商品管理</p>
          <p>PPT下载商品形成推荐方案</p>
          <p>购买、创建活动；访问小美市场</p>
          <p>购买、创建商城；访问小美市场</p>
          <p>其他服务</p>
        </div>
      </div>
	</div>
      <div class="wel-tools">
        <div class="jihuo-btn">立即激活</div>
        <div @click="toHome">体验一下</div>
      </div>
    </div>
  </div>
</template>
 <script>
let reg = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
import AppHeader from "@/components/common/header";

export default {
  components: { AppHeader },
  mounted() {},
  data() {
    return {};
  },
  methods: {
		toHome(){
			window.location.href='/'
		}
	},
  watch: {}
};
</script>
 <style scoped>
.welcome-box {
  position: absolute;
  top: 88px;
  left: 50%;
  margin-left: -600px;
  bottom: 20px;
  width: 1200px;
  background: #fff;
  border: 1px solid rgba(231, 231, 235, 1);
  padding: 74px;
}
.welcome-box .title {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  color: #222222;
  font-size: 44px;
  font-weight: 600;
}
.welcome-box img {
  width: 80px;
  height: 84px;
  margin-right: 10px;
}
.wel-state{
	color: #222222;
	font-size: 30px;
	font-weight: 600;
	padding-bottom: 20px;
	border-bottom: 1px solid #ccc;
	margin-top: 100px
}
.wel-item{
	display: flex;
	justify-content: space-between;
	flex-shrink: 1;
	padding: 16px 0;
	font-size: 20px;
	border-bottom: 1px solid #ccc; 
}
.wel-item:last-child{
	border: none
}
.wel-right{
	width: 300px;
	text-align: left;
	font-size: 16px;
}
.rz-state{
	margin-left: 20px;
	color: #44B549
}
.rz-state i{
	color: red
}
.qy-list p{
	margin-bottom: 20px
}
.wel-tools{
	padding-top: 40px
}
.jihuo-btn{	
	border-radius: 26px;
	background: #74A2FF;
	color: #fff;
}
.wel-tools>div{
	height: 49px;
	cursor: pointer;
	font-size: 16px;
	margin: 0 auto;
	width: 235px;
	text-align: center;
	line-height: 49px;
}
</style>
 