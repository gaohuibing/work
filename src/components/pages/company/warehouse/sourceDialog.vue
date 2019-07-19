<template>
  <div class="sourcebox">
    <el-dialog :visible.sync="currentVisible" width="80%">
      <div class="tabs">
        <ul>
          <li class="active">商品图片</li>
          <li>装修图片</li>
          <li>图片素材</li>
          <li>图标库</li>
        </ul>
      </div>
      <div class="sourcetools">
        <el-upload
          class="upload-demo"
          :action="apiUrl"
          :data="{api_token:$api.getToken()}"
          multiple
          :show-file-list="false"
          :before-upload="beforeUpload"
          :on-success="uploadSuccess"
          :on-error="uploadError"
        >
          <el-button size="small" type="primary">上传图片</el-button>
        </el-upload>
        <div class="rt">
          <el-button size="small" style="margin-right:15px">删除</el-button>
          <el-select v-model="value" slot="prepend" placeholder="移动到" style="width:100px">
            <el-option label="分组一" value="1"></el-option>
            <el-option label="分组二" value="2"></el-option>
            <el-option label="分组三" value="3"></el-option>
          </el-select>
        </div>
      </div>
      <div class="source-conetent clearfix">
        <div class="side">
          <div class="tool">
            添加分组
            <i class="el-icon-s-tools"></i>
          </div>
          <ul>
            <li>全部</li>
            <li>未分组</li>
            <li>分组一</li>
          </ul>
        </div>
        <div class="source-main" v-loading="loading">
          <ul class="s-main clearfix">
            <template v-for="(item,index) in goodsImgs.data">
              <li @click="itemHandle(index)" :key="index" >
                <img :src="item.pic_path" :ref="`img_${index}`"/>
                <div class="bg" v-if="item.select">
                  <i class="el-icon-check"></i>
                </div>
              </li>
            </template>
          </ul>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="currentVisible = false">取 消</el-button>
        <el-button type="primary" @click="selectSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["visible", "imgProps", "goodsImgsSelect",'size'],
  data() {
    return {
      apiUrl: this.$api.apiUrl + "merchant/upload_material",
      currentVisible: false,
      filter: {
        page: 1,
        limits: 20,
        api_token: this.$api.getToken()
      },
      ifAdd: true,
      goodsImgs: {
        data: [],
        total: ""
      },
      currentGoodsImgsSelect: [],
      value: "",
	loading: true,	
    };
  },
  mounted() {	  
    this.getSourceData();
  },
  methods: {
    beforeUpload(file) {
      this.loading = true;
      let _this = this;
      if (file.type.indexOf("image") < 0) {
	  _this.$message({ message: "图片格式不正确", type: "error" });
	   this.loading = false;
        return false;
      }
      // const isLt2M = file.size / 1024 / 1024 < 2;
      // const isSize = new Promise(function(resolve, reject) {
      //   let width = 751;
      //   let height = 751;
      //   let _URL = window.URL || window.webkitURL;
      //   let img = new Image();
      //   img.onload = function() {
      //     let valid = img.width / img.height == 1 && img.width < height;
      //     valid ? resolve() : reject();
      //   };
      //   img.src = _URL.createObjectURL(file);
      // }).then(
      //   () => {
      //     return file;
      //   },
      //   () => {
      //     _this.$message({ message: "上传的图片尺寸错误!", type: "error" });
      //     this.loading = false;
      //     return Promise.reject();
      //   }
      // );
	// return isSize;
	return true
    },
    uploadSuccess(response, file, fileList) {
      this.goodsImgs.data.push({ pic_path: response.data, select: false });
      this.loading = false;
      // this.getSourceData();
    },
    uploadError() {
      this.loading = false;
    },
    // 获取素材
    getSourceData() {
      this.$api
        .get("merchant/material_management", this.filter)
        .then(res => {
          if (res.data.code == 200) {
            this.goodsImgs.data = res.data.data.item || [];
            this.goodsImgs.total = res.data.data.total || "0";
            this.loading = false;
          } else {
            this.$message.error({ message: res.data.msg });
          }
        })
        .catch(err => {
          this.$message.error({ message: err });
        });
    },
    // 选择图片
    itemHandle(index) {
	let imgRef=this.$refs[`img_${index}`][0];	
	if(imgRef.naturalWidth/imgRef.naturalHeight!=this.size){
		this.$message.error('图片长宽比必须为1:1');
		return false
	}
	if(imgRef.naturalWidth>750||imgRef.naturalHeight>750){
		this.$message.error('图片尺寸不能大于750');
		return false
	}	
      if (!this.goodsImgs.data[index].select) {
        if (this.ifAdd) {
          let data = JSON.parse(JSON.stringify(this.goodsImgs.data));

          data.map((item, key) => {
            if (key == index) {
              item.select = !item.select;
            }
          });
          this.goodsImgs.data = data;
          let selectLen = this.goodsImgs.data.filter(item => item.select)
            .length;
          if (selectLen + this.goodsImgsSelect.length == 5) {
            this.ifAdd = false;
          }
        } else {
          this.$message.error("选择图片不能超过5张");
        }
      } else {
        let data = JSON.parse(JSON.stringify(this.goodsImgs.data));
        data.map((item, key) => {
          if (key == index) {
            item.select = !item.select;
          }
        });
        this.goodsImgs.data = data;
        this.ifAdd = true;
      }
    },
    selectSubmit() {
      let imgsArr = [];
      this.goodsImgs.data.map((item, index) => {
        if (item.select) {
          imgsArr.push(item);
        }
        this.$emit("update:imgProps", imgsArr);
      });
      this.currentVisible = false;
    }
  },
  watch: {
    visible(v) {
      if (v) {
        let imgs = JSON.parse(JSON.stringify(this.goodsImgs.data));
        if (imgs.length) {
          imgs.map((item, index) => {
            item.select = false;
          });
          this.goodsImgs.data = imgs;
        }
      }
      this.currentVisible = v;
      this.ifAdd = true;
    },
    currentVisible(v) {
      this.$emit("update:visible", v);
    }
  }
};
</script>

<style scoped>
.tabs li {
  width: 70px;
}
.sourcetools {
  display: flex;
  justify-content: space-between;
  padding: 15px 20px;
  background: #f6f7ff;
}
.sourcetools .rt {
  display: flex;
  justify-content: flex-end;
}
.source-conetent {
  display: flex;
}
.side {
  width: 140px;
  float: left;
  background: #f2f2f2;
  font-size: 16px;
}
.side .tool {
  height: 48px;
  background: #fff;
  text-align: center;
  padding-right: 20px;
  position: relative;
  color: #44b549;
  line-height: 48px;
}
.side .tool i {
  position: absolute;
  right: 15px;
  top: 16px;
  color: #999;
  cursor: pointer;
}
.side li {
  height: 48px;
  text-align: center;
  padding-right: 20px;
  line-height: 48px;
  cursor: pointer;
}
.source-main {
  padding: 10px 15px;
  flex-grow: 1;
}
.source-main .s-main li {
  width: 80px;
  height: 80px;
  position: relative;
  float: left;
  margin-right: 10px;
  margin-bottom: 10px;
  cursor: pointer;
}
.source-main .s-main li img {
  width: 100%;
  height: 100%;
}
.source-main .s-main li .bg {
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100%;
  line-height: 80px;
  text-align: center;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
}
</style>
