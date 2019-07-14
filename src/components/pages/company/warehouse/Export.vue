<template>
  <div v-loading="loading">
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
          <el-select v-model="formData.store_type" placeholder="请选择">
            <el-option v-for="(item,key) in storeTypes" :key="key" :label="item" :value="key"></el-option>
          </el-select>
        </div>
      </div>
      <div class="form-group">
        <div class="f-label">
          <span>*</span>
          商品链接
        </div>
        <div>
          <el-input type="textarea" v-model="formData.url"></el-input>
        </div>
      </div>
    </div>

    <div class="bot-tools-t">
      <el-button type="primary" @click="goodsExport">确定</el-button>
      <el-button @click="$router.go(-1)">取消</el-button>
    </div>
  </div>
</template>
<script>
const STORE_TYPE = {
  1: "淘宝",
  2: "天猫",
  3: "1688",
  4: "京东"
};
export default {
  data() {
    return {
      storeTypes: STORE_TYPE,
      formData: {
        store_type: "",
        url: "",
        api_token: this.$api.getToken()
      },
      loading: false
    };
  },
  methods: {
    goodsExport() {
      if (!this.formData.store_type) {
        this.$message.error("请选择电商类别");
        return false;
      }
      if (!this.formData.url) {
        this.$message.error("请输入商品路径");
        return false;
      }
      this.loading = true;
      this.$api
        .post("merchant/goods_helper", this.formData)
        .then(res => {
          if (res.data.code == 200) {
            this.loading = false;
            let data = res.data.data;
            this.$router.push({
              path: "/company/warehouse/edit",
              query: {
                description: data.description,
                goodsImgs: JSON.stringify(data.goods_images.slice(0,5)),
		    goodsDetail: data.goods_detail,
		    goodsName:data.goods_name,
		    isExport:true
              }
            });
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
</style>
