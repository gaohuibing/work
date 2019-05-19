<template>
  <div class="app-header">
    <div class="clearfix" style="width:1198px;margin:0 auto;">
      <div class="logo">
        <img src="../../assets/images/logo.png" alt>
      </div>
      <div class="nav">
        <ul>
          <router-link
            tag="li"
            v-for="(item, index) in navMenu"
            :key="index"
            :to="item.url"
            active-class="active"
          >{{item.name}}</router-link>
        </ul>
      </div>

      <div class="tools">
        <ul>
          <router-link
            tag="li"
            v-for="(item, index) in nav"
            :key="index"
            :to="item.url"
            active-class="active"
          ><i :class="item.icon"></i>{{item.name}}<span v-if='item.name=="消息"'>1</span></router-link>
     
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navMenu: [
        {
          name: "企业",
          url: "/"
        },
        {
          name: "活 动",
          url: "/activity"
        },
        {
          name: "商 城",
          url: "/shop"
        },
        {
          name: "供应商",
          url: "/supplier"
        },
        {
          name: "服 务",
          url: "/service"
        }
      ],
      nav:[
          {
              name:'消息',
              icon:'el-icon-bell',
              url:'/message'
          },
          {
              name:'帮助',
              icon:'',
              url:'/support'
          },
          {
              name:'退出',
              icon:'el-icon-switch-button',
              url:'/exit'
          }
      ]
    };
  }
};
</script>
<style scoped>
.app-header {
  background: #fff;
  height: 68px;
  line-height: 68px;
}
.logo {
  width: 161px;
  height: 49px;
  float: left;
  margin-right: 20px;
}
.logo img {
  width: 100%;
  height: 100%;
  display: block;
  margin-top: 10px;
}
.nav {
  width: 600px;
  float: left;
  padding: 0 40px;
}
.nav ul {
  display: flex;
}
.nav li {
  font-size: 16px;
  color: #1c1c1c;
  padding: 0 30px;
  font-weight: 500;
  cursor: pointer;
}
.nav li.active {
  color: #44b549;
}
.tools {
  width: 300px;
  float: right;
  margin-right: 30px;
}
.tools ul {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.tools li {
  margin-left: 30px;
  font-size: 12px;
  color: #1c1c1c;
  cursor: pointer;
}
.tools li.active{
    color:#44b549 
}
.tools li i{
    font-size: 14px;
    margin-right: 3px
}
.tools li span{
    color: #F76260
}
</style>

 