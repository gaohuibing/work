<template>
  <div>
    <el-dialog title="设置运费" :visible.sync="dialogVisible" width="30%">
      <div class="radiobox">
        <div>
          <el-radio v-model="formData.postage" label="0">包邮</el-radio>
        </div>
        <div>
          <el-radio v-model="formData.postage" label="1">另计（批发模式默认）</el-radio>
        </div>
        <div style="display:flex;align-items:center">
          <el-radio v-model="formData.postage" label="2">买家承担</el-radio>
          <el-input
            v-model="formData.first_piece"
            :disabled="formData.postage!='2'"
            placeholder="首件：0:00"
		style="margin-right:10px"
          ></el-input>
          <el-input
            v-model="formData.more_piece"
            :disabled="formData.postage!='2'"
            placeholder="续件：0:00"
          ></el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitHandle">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["deliverVisible", "deliverForm"],
  data() {
    return {
      dialogVisible: false,
	formData: {
		
	},
	dataDefault:{},
    };
  },
  methods: {
    submitHandle() {
      if (this.formData.postage == "2") {
        if (this.formData.first_piece == "") {
          this.$messgae.error("请输入首件运费");
          return false;
        }
        if (this.formData.more_piece == "") {
          this.$messgae.error("请输入续件运费");
          return false;
        }
      }
      this.dialogVisible = false;
    }
  },
  watch: {
    deliverVisible(value) {
      this.dialogVisible = value;
    },
    dialogVisible(value) {
      this.$emit("update:deliverVisible", value);
    },
    deliverForm(value) {
	this.formData = value;	
    }
  }
};
</script>

<style scoped>
.radiobox {
  display: flex;
  flex-direction: column;
}
.radiobox>div{
	margin-bottom: 30px
}
</style>
