<template>
  <div>
    <el-dialog title="新建方案" :visible.sync="currentVisible" width="30%">
      <div class="form-content">
        <div class="form-group" style="align-items: flex-start;">
          <div class="f-label" style="width:100px">名称</div>
          <div style="width:300px">
            <el-input placeholder="请输入方案名称" v-model="plan_name"></el-input>
            <div class="tip">说明：最多可加入50个商品进行下载</div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="currentVisible=false">取 消</el-button>
        <el-button type="primary" @click="confirmHandle">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentVisible: false,
      plan_name: ""
    };
  },
  props: ["visible"],
  methods: {
    confirmHandle() {
      this.$api
        .get("merchant/create_plan", {
          plan_name: this.plan_name,
          api_token: this.$api.getToken()
        })
        .then(res => {
          if (res.data.code == 200) {
            this.$message({
              message: "创建成功",
              type: "success"
            });
            this.currentVisible = false;
            this.$bus.$emit("upload:painList");
          } else {
            this.$message.error({ message: res.data.msg });
          }
        })
        .catch(err => {
          this.$message.error({ message: err });
        });
    }
  },
  watch: {
    visible(value) {
      this.currentVisible = value;
    },
    currentVisible(value) {
      this.$emit("update:visible", value);
    }
  }
};
</script>

<style>
</style>
