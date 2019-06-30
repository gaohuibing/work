<template>
  <div>
    <div class="a-bread">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/company/warehouse' }">商品仓库</el-breadcrumb-item>
        <el-breadcrumb-item>添加用户</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="form-content" style="padding-top:60px">
      
      <div class="form-group">
        <div class="f-label">
          <span>*</span>
          成员姓名
        </div>
        <div>
          <el-input placeholder="请输入成员姓名"></el-input>
        </div>
      </div>
	<div class="form-group">
        <div class="f-label">
          <span>*</span>
          设置账户
        </div>
        <div>
          <el-input placeholder="请输入账户"></el-input>
        </div>
      </div>
	<div class="form-group">
        <div class="f-label">
          <span>*</span>
          设置密码
        </div>
        <div>
          <el-input placeholder="请输入密码"></el-input>
        </div>
      </div>

	<div class="form-group">
        <div class="f-label">
          <span>*</span>
          选择角色
        </div>
        <div>
          <el-select v-model="value" placeholder="请选择角色">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
	  <div style="color:#44B549;margin-left:10px;cursor: pointer;">新建</div>
      </div>
    </div>

    <div class="bot-tools-t">
      <el-button type="primary">确定</el-button>
      <el-button>取消</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: ""
    };
  }
};
</script>
<style scoped>

</style>
