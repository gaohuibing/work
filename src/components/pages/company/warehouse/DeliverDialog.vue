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
            type="number"
            :change="limit('formData.first_piece',formData.first_piece)"
          ></el-input>
          <el-input
            v-model="formData.more_piece"
            :disabled="formData.postage!='2'"
            placeholder="续件：0:00"
            type="number"
            :change="limit('formData.more_piece',formData.more_piece)"
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
    },
    limit(obj, value) {
      // 通过正则过滤小数点后两位
      //     this.s_sell_price= this.s_sell_price.replace(/[^\a-\z\A-\Z0-9]/g, '');
      var price = "" + value;
      price = price
        .replace(/[^\d.]/g, "") // 清除“数字”和“.”以外的字符
        .replace(/\.{2,}/g, ".") // 只保留第一个. 清除多余的
        .replace(".", "$#$")
        .replace(/\./g, "")
        .replace("$#$", ".")
        .replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3"); // 只能输入两个小数
      if (price.indexOf(".") < 0 && price != "") {
        // 以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
        price = parseFloat(price);
      }
      price = price + "";
      if (price.split(".")[0].length > 7) {
        price = `
          ${price.split(".")[0].slice(0, 7)}`;
      }
      if (obj.split(".")[1]) {
        this[`${obj.split(".")[0]}`][`${obj.split(".")[1]}`] = price;
      } else {
        this[obj] = price;
	}
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
.radiobox > div {
  margin-bottom: 30px;
}
</style>
