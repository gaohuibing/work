<template>
  <div class="full-height">
    <div class="company-home">
      <!-- 第一行 -->
      <div class="c-about">
        <ul class="clearfix">
          <li class="c-info">
            <div class="img">
							<img src="../../../assets/images/Bitmap.png" alt>
						</div>
						<div class="info-m">
							<h5>苏州清枫语广告有限公司</h5>
							<p>系统状态：未激活</p>
							<div class="jh-btn">免费激活系统</div>
						</div>
          </li>
          <li class="statistics">
            <h5>资产统计</h5>
            <p>
              <span>账户余额：</span><i><em>￥200.00</em><a @click.prevent="">充值</a></i>
            </p>
            <p>
              <span>分销账户：</span><i><em>￥200.00</em><a @click.prevent="">充值</a></i>
            </p>
          </li>
          <li class="statistics statistics1">
            <h5>登录统计</h5>
            <p>
              <span>总登录次数：</span><i>112次</i>
            </p>
            <p>
              <span>上次登陆时间：</span><i>2019-02-05 9:00:00</i>
            </p>
          </li>
        </ul>
      </div>
      <!-- 第二行 -->
      <div class="c-main">
        <div class="c-title">待办事项</div>
        <ul class="todo-list">
          <li>
            <h5>120</h5>
            <p>咨询订单</p>
            <div>
              <el-button type="primary" plain size="mini">去受理</el-button>
            </div>
          </li>
          <li>
            <h5>39</h5>
            <p>商品订单</p>
            <div>
              <el-button type="primary" plain size="mini">去发货</el-button>
            </div>
          </li>
          <li>
            <h5>120</h5>
            <p>服务订单</p>
            <div>
              <el-button type="primary" plain size="mini">去续费</el-button>
            </div>
          </li>
        </ul>
      </div>
      <!-- 第三行 -->
      <div class="c-main">
        <div class="c-title">快捷入口</div>
        <ul class="extra-list">
          <li>
            <div>
              <img src="../../../assets/images/add-2.png" alt>
              <span>新增商品</span>
            </div>
          </li>
          <li>
            <div>
              <img src="../../../assets/images/download.png" alt>
              <span>批量发货</span>
            </div>
          </li>
          <li>
            <div>
              <img src="../../../assets/images/yizhanggui.png" alt>
              <span>易掌柜</span>
            </div>
          </li>
        </ul>
      </div>
      <!-- 第四行 -->
      <div class="c-main">
        <div class="c-title">常用功能</div>
        <ul class="profile-list clearfix">
					<li>
						<div>39</div>
						<p>昨日新增商品</p>
					</li>
					<li>
						<div>39</div>
						<p>昨日新增自营订单</p>
					</li>
					<li>
						<div>￥39</div>
						<p>昨日交易流水</p>
					</li>
					<li>
						<div>39</div>
						<p>昨日新增会员</p>
					</li>
					<li>
						<div>39</div>
						<p>自有商品总数</p>
					</li>
					<li>
						<div>39</div>
						<p>自营订单总数</p>
					</li>
					<li>
						<div>￥39</div>
						<p>交易流水总额</p>
					</li>
					<li>
						<div>39</div>
						<p>会员总数</p>
					</li>
				</ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted(){
	
  },
  methods:{
	  
  }
};
</script>
<style scoped>
.company-home {
  padding: 0 24px;
}
.company-home .c-about {
  height: 200px;
  padding: 36px 0;
  border-bottom: 1px solid rgba(208, 208, 217, 1);
}
.company-home .c-about ul {
  height: 100%;
  width: 100%;
}
.company-home .c-about li {
  width: 33.33%;
  float: left;
  border-right: 1px solid rgba(208, 208, 217, 1);

  height: 100%;
}
.company-home .c-about li:last-child {
  border: none;
}
.company-home .c-about .c-info {
  padding-left: 10px;
	padding-top: 28px;
	display: flex;
	flex-shrink: 1
}
.company-home .c-info .img{
	width: 56px;	
}
.company-home .c-info .img image{
	width: 100%
}
.company-home .info-m{
	width: 200px;
	text-align: center
}
.company-home .info-m h5{
	font-size: 16px;
	font-weight: 600;
	margin-bottom: 20px
}
.company-home .info-m p{
	font-size: 16px
}
.company-home .info-m .jh-btn{
	width: 128px;
	height: 23px;
	text-align: center;
	background: #44B549;
	line-height: 23px;
	border-radius: 12px;
	font-size: 12px;
	color: #ffffff;
	margin: 10px auto
}

.company-home .account {
  padding: 28px 0;
  text-align: center;
  font-size: 18px;
}
.company-home .account p {
  margin-bottom: 35px;
}
.company-home .account p a {
  color: #44b549;
  font-size: 14px;
  margin-left: 24px;
}
.company-home .account p span {
  font-weight: 600;
}
.company-home .statistics {
  padding: 28px 0;
  padding-left: 56px;
}
.company-home .statistics h5 {
  font-size: 16px;
  margin-bottom: 18px;
  color: #1c1c1c;
	font-weight: normal
}
.company-home .statistics p {
  font-size: 14px;
  margin-bottom: 8px;

}
.company-home .statistics p span {
  display: inline-block;
  width: 100px;
  color: #999;
  margin-right: 5px;
}
.company-home .statistics1 p{
	display: flex;
	justify-content: space-between
} 
.company-home .statistics p i{
	font-style: normal
}
.company-home .statistics p a{
	color: #44B549
}
.company-home .statistics p em{
	width: 80px;
	display: inline-block;
	font-style: normal
}
.c-title {
  font-size: 18px;
  margin: 30px 0;
  font-weight: bold;
}
.todo-list {
  display: flex;
  justify-content: space-between;
}
.todo-list li {
  text-align: center;
  width: 33.33%;
}
.todo-list li h5 {
  font-size: 36px;
  color: rgba(28, 28, 28, 1);
  line-height: 50px;
  font-weight: normal;
}
.todo-list li p {
  margin-bottom: 10px;
}
.extra-list {
  display: flex;
  justify-content: space-between;
}
.extra-list li {
  text-align: center;
  width: 33.33%;
}
.extra-list li > div {
  width: 196px;
  height: 58px;
  line-height: 58px;
  border: 1px solid rgba(231, 231, 235, 1);
  border-radius: 4px;
  text-align: center;
  margin: 0 auto;
}
.extra-list li > div:hover {
  border-color: #44b549;
  cursor: pointer;
}
.extra-list li > div img {
  vertical-align: middle;
  margin-right: 24px;
}
.extra-list span{
	font-size: 18px
}
.normal-list {
  display: flex;
}
.normal-list li {
  text-align: center;
  width: 33.33%;
}
.normal-list li > div {
  width: 241px;
  height: 112px;
  padding: 24px 0 24px 24px;
  border: 1px solid rgba(231, 231, 235, 1);
  border-radius: 4px;
  text-align: center;
  margin: 0 auto;
  display: flex;
}
.normal-list li > div:hover {
  border-color: #44b549;
  cursor: pointer;
}
.normal-list li > div img {
  width: 64px;
  vertical-align: middle;
  margin-right: 16px;
}
.normal-list li .inp {
  text-align: left;
}
.normal-list li .inp h5 {
  font-size: 15px;
  line-height: 32px;
}
.normal-list li .inp p {
  color: #999;
  font-size: 13px;
  line-height: 32px;
}
.normal-list li .inp p span {
  margin-right: 16px;
}
.c-main .el-button{
	width: 120px
}
.profile-list{
	display: flex;
	flex-shrink: 1;
	flex-wrap: wrap; 
}
.profile-list li{
	width: 25%;

	margin-bottom: 30px;
	text-align: center
}
.profile-list li div{
	font-size: 36px;
	margin-bottom: 15px
}
.profile-list li p{

}
</style>
