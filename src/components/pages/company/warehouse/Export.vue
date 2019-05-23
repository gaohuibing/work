<template>
  <div>
    <div class="a-bread">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/company/warehouse' }">商品仓库</el-breadcrumb-item>
        <el-breadcrumb-item>第三方导入</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="form-content" style="padding-top:60px">
      <div class="form-group">
        <div class="f-label">
          <span>*</span>
          电商类别
        </div>
        <div>
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="form-group">
        <div class="f-label">
          <span>*</span>
          商品链接
        </div>
        <div>
          <el-input type="textarea"></el-input>
        </div>
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
