<template>
  <div>
    <div class="a-bread">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/company/team/role' }">角色</el-breadcrumb-item>
        <el-breadcrumb-item>添加角色</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="form-content" style="padding-top:20px">
      <div class="role-item">
        角色名称：
        <el-input placeholder="请输入角色名称" style="width:200px"></el-input>
      </div>
      <div class="checkwrap">
        <div>选择角色权限：</div>
        <div class="checkmain" style='margin-top:20px'>
          <el-checkbox label="企业"></el-checkbox>
          <div style="padding-left:20px;margin-top:20px">
            <el-checkbox
              :indeterminate="isIndeterminate"
              v-model="checkAll"
              @change="handleCheckAllChange"
            >商品仓库</el-checkbox>
            <div style="margin: 15px 0;padding-left:20px;">
              <el-checkbox-group v-model="checked" @change="handleCheckedCitiesChange">
                <el-checkbox v-for="item in checkedData" :label="item" :key="item">{{item}}</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
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
      checkAll: false,
      checked: ["新增商品", "第三方导入"],
      checkedData: ["新增商品", "第三方导入", "编辑商品", "删除商品"],
      isIndeterminate: true
    };
  },
  methods: {
    handleCheckAllChange(val) {
      this.checked = val ? checkedData : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.checkedData.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.checkedData.length;
    }
  }
};
</script>
<style scoped>
.role-item {
  display: flex;
  align-items: center;
}
.checkwrap {
  margin-top: 20px;
}
</style>
