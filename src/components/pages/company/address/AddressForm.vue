<template>
  <div>
    <el-dialog title="添加地址" :visible.sync="currentVisible" width="50%">
      <div class="form-content">
        <div class="form-group">
          <div class="f-label">         
            收货人姓名
          </div>
          <div style="width:300px">
            <el-input placeholder="请输入收货人姓名"></el-input>
          </div>
        </div>
        <div class="form-group">
          <div class="f-label">            
            手机号码
          </div>
          <div style="width:300px">
            <el-input placeholder="请输入手机号码"></el-input>
          </div>
        </div>
        <div class="form-group">
          <div class="f-label">     
            邮编
          </div>
          <div style="width:300px">
            <el-input placeholder="请输入邮编"></el-input>
          </div>
        </div>
	  <div class="form-group">
          <div class="f-label">     
            地址信息
          </div>
          <div style="width:300px">
            <el-cascader
          :options="options"
          
          placeholder="省/市/区"
          v-model="selectedOptions"
          @change="handleChange"
        ></el-cascader>
          </div>
        </div>
		<div class="form-group">
          <div class="f-label">     
            详细地址
          </div>
          <div style="width:300px">
            <el-input placeholder="请输入详细地址"></el-input>
          </div>
        </div>
       
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { regionData } from "element-china-area-data";
export default {
  props: ["visible"],
  data() {
    return {
	currentVisible: false,
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
    cancel() {
      this.currentVisible = false;
    },
    confirm() {
      this.currentVisible = false;
    },
     handleChange(e) {
      this.form.province = this.selectedOptions[0];
      this.form.city = this.selectedOptions[1];
      this.form.county = this.selectedOptions[2];
    },
  },
  watch: {
    visible(v) {
      this.currentVisible = v;
    },
    currentVisible(v) {
      this.$emit("update:visible", v);
    }
  }
};
</script>

<style scoped>
.dialog-footer{
	text-align: center
}
</style>
