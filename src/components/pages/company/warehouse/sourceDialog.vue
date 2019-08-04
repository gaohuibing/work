<template>
  <div class="sourcebox">
    <el-dialog :visible.sync="currentVisible" width="80%">
      <div class="tabs">
        <ul>
		  <template v-for="(item,key) in tabs">
<li :key="key" :class="{'active':tabId==item.value}" @click="titHandle(item.value)">
			  {{item.name}}
		  </li>
		  </template>		  
        
        </ul>
      </div>
      <div v-if='tabId==1'>
        <div class="sourcetools">
          <el-upload
            class="upload-demo"
            :action="apiUrl"
            :data="{api_token:$api.getToken(),group_id:leftGroupId}"
            multiple
            :show-file-list="false"
            :before-upload="beforeUpload"
            :on-success="uploadSuccess"
            :on-error="uploadError"
          >
            <el-button size="small" type="primary">上传图片</el-button>
          </el-upload>
          <div class="rt">
            <el-button size="small" style="margin-right:15px" @click="delImg">删除</el-button>
            <el-select
              v-model="groupId"
              slot="prepend"
              placeholder="移动到"
              style="width:100px"
              @change="groupChange"
            >
              <template v-for="(item,index) in groupData">
                <el-option :label="item.group_name" :value="item.id" :key="index"></el-option>
              </template>
            </el-select>
          </div>
        </div>
        <div class="source-conetent clearfix">
          <div class="side">
            <div class="tool" @click="addGroup">添加分组</div>
            <ul>
              <template v-for="item in groupDataAll">
                <li
                  :class="{'active':leftGroupId==item.id}"
                  :key="item.id"
                  @click.stop="itemGroupHandle(item.id)"
                >
                  <div class="tit">
                    <span>{{item.group_name}}</span>
                    <i class="el-icon-s-tools" @click.stop="toolHandle(item.id)" v-if="item.id-0"></i>
                  </div>
                  <div class="z-tool" v-if="item.isEdit">
                    <a @click.prevent="GroupEdit(item)" class="edit">编辑</a>
                    <a @click.prevent="GroupDel(item.id)" class="del">删除</a>
                  </div>
                </li>
              </template>
            </ul>
          </div>
          <div class="source-main" v-loading="loading">
            <ul class="s-main clearfix">
              <template v-for="(item,index) in goodsImgs.data">
                <li :key="index">
                  <div class="pic" @click.stop="itemHandle(index)">
                    <img :src="item.pic_path" :ref="`img_${index}`" />
                    <div class="bg" v-if="item.select">
                      <i class="el-icon-check"></i>
                    </div>
                    <i class="el-icon-delete delbtn" @click.stop="delImgHandle(item.id)"></i>
                  </div>
                  <template>
                    <div class="picname">
                      <!-- v-if='item.flag||!item.pic_name'  -->
                      <div
                        class="namedefalut"
                        v-if="item.flag"
                        @dblclick="picnameInp(item.id,index)"
                      >{{item.pic_name}}</div>

                      <div class="naminp" v-else>
                        <el-input v-model.lazy="item.pic_name" :ref="`input${index}`"></el-input>
                        <i class="el-icon-check" @click="picnameBlur(item.id,item.pic_name)"></i>
                      </div>
                    </div>
                  </template>
                </li>
              </template>
            </ul>
          </div>
        </div>
      </div>
	<div v-if='tabId==2' style="height:200px">
	</div>
	<div v-if='tabId==3' style="height:200px">
	</div>
      <span slot="footer" class="dialog-footer">
        <div class="flex-grow pagi-wrap" v-if="goodsImgs.total-0>0">
          <div>共{{goodsImgs.total}}条，每页{{filter.limits}}条</div>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="goodsImgs.total-0"
            :current-page="filter.page-0"
            :pager-count="5"
            :page-size="filter.limits-0"
            @current-change="handleCurrentChange"
          ></el-pagination>
          <div>
            到第
            <el-input v-model="page" class="topage" :change="limit('page',page)"></el-input>页
            <el-button size="small" class="pageBtn" @click="toPage">GO</el-button>
          </div>
        </div>
        <div style="margin-top:20px">
          <el-button @click="currentVisible = false">取 消</el-button>
          <el-button type="primary" @click="selectSubmit">确 定</el-button>
        </div>
      </span>
      <el-dialog width="30%" :title="groupTitle" :visible.sync="innerVisible" append-to-body>
        <el-form :model="leftGroup" :rules="rules" ref="ruleForm">
          <div style="display:flex;align-items:center;padding-right:60px">
            <span style="width:60px;text-align:right;margin-right:10px">名称</span>
            <el-form-item prop="group_name" style="flex-grow:1">
              <el-input v-model="leftGroup.group_name" placeholder></el-input>
            </el-form-item>
          </div>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="innerVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="groupSubmit('ruleForm')" size="small">确 定</el-button>
        </span>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["visible", "imgProps", "goodsImgsSelect", "size"],
  data() {
    return {
      apiUrl: this.$api.apiUrl + "merchant/upload_material",
      rules: {
        group_name: [
          { required: true, message: "请输入分组名称", trigger: "blur" },
          { max: 6, message: "不超过6个字符", trigger: "blur" }
        ]
	},
	tabs:[{
		value:'1',name:'素材',},
		{value:'2',name:'图片库',},
		{value:'3',name:'图标库',}
	],
	tabId:'1',
      currentVisible: false,
      filter: {
        page: 1,
        limits: 80,
        api_token: this.$api.getToken()
      },
      // 是否可以添加图片到商品图
      ifAdd: true,
      page: "",
      goodsImgs: {
        data: [],
        total: ""
      },
      currentGoodsImgsSelect: [],
      value: "",
      loading: true,

      innerVisible: false,
      groupTitle: "添加分组",
      groupData: [],
      groupDataDefault: [
        {
          id: "",
          group_name: "全部"
        },
        {
          id: "0",
          group_name: "未分组"
        }
      ],
      groupDataAll: [],
      // 下拉框的分组id
      groupId: "",
      // 左侧的分组id
      leftGroupId: "",
      // 左侧的分组
      leftGroup: {
        id: "",
        group_name: ""
      }
    };
  },
  mounted() {
    this.loadGroup();
  },
  methods: {
    beforeUpload(file) {
      let _this = this;
      if (file.type.indexOf("image") < 0) {
        _this.$message({ message: "图片格式不正确", type: "error" });
        return false;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
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
      if (!isLt2M) {
        this.$message.error("上传的图片尺寸不能超过2M");
        return false;
      }
      return true;
    },
    uploadSuccess(response, file, fileList) {
      // this.goodsImgs.data.push({ pic_path: response.data, select: false });
      this.loading = false;
      this.loadGroup();
    },
    uploadError() {
      this.loading = false;
    },
    // 获取素材
    getSourceData() {
      this.loading = true;
      this.$api
        .get("merchant/get_material", {
          ...this.filter,
          group_id: this.leftGroupId
        })
        .then(res => {
          if (res.data.code == 200) {
            let Imgsdata = res.data.data.item || [];
            this.goodsImgs.total = res.data.data.total || "0";
            Imgsdata.map(item => {
              if (item.pic_name) {
                // 不可输入状态
                item.flag = true;
              } else {
                item.flag = false;
              }
            });
            this.goodsImgs.data = Imgsdata;
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
      // let imgRef=this.$refs[`img_${index}`][0];
      // if(imgRef.naturalWidth/imgRef.naturalHeight!=this.size){
      // 	this.$message.error('图片长宽比必须为1:1');
      // 	return false
      // }
      // if(imgRef.naturalWidth>750||imgRef.naturalHeight>750){
      // 	this.$message.error('图片尺寸不能大于750');
      // 	return false
      // }
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
    // 提交
    selectSubmit() {
      let imgsArr = [];
      this.goodsImgs.data.map((item, index) => {
        if (item.select) {
          imgsArr.push(item);
        }
        this.$emit("update:imgProps", imgsArr);
      });
      this.currentVisible = false;
    },
    //     获取分组
    loadGroup() {
      this.$api
        .get("merchant/get_material_group", { api_token: this.$api.getToken() })
        .then(res => {
          if (res.data.code == 200) {
            let result = res.data.data;
            this.groupData = result;
            this.groupDataAll = [...this.groupDataDefault, ...result];
            this.groupDataAll.map(item => (item.isEdit = false));
            this.getSourceData();
          } else {
            this.$message.error({ message: res.data.msg });
          }
        })
        .catch(err => {
          this.$message.error({ message: err });
        });
    },
    // 点击分组
    itemGroupHandle(id) {
      this.leftGroupId = id;
      this.groupId = id == "0" ? "" : id;
      let data = JSON.parse(JSON.stringify(this.groupDataAll));

      data.map(item => {
        item.isEdit = false;
      });
      this.groupDataAll = data;
      this.getSourceData();
    },
    // 点击设置
    toolHandle(id) {
      let data = JSON.parse(JSON.stringify(this.groupDataAll));

      data.map(item => {
        if (item.id == id) {
          item.isEdit = !item.isEdit;
        } else {
          item.isEdit = false;
        }
      });
      this.groupDataAll = data;
    },
    // 添加分组
    addGroup() {
      this.leftGroup = {
        id: "",
        group_name: ""
      };
      this.innerVisible = true;
    },
    // 编辑分组
    GroupEdit(item) {
      this.innerVisible = true;
      this.leftGroup = item;
    },
    // 分组提交
    groupSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.leftGroup.id) {
            // 编辑
            this.$api
              .get("merchant/update_group_name", {
                api_token: this.$api.getToken(),
                group_id: this.leftGroup.id,
                group_name: this.leftGroup.group_name
              })
              .then(res => {
                if (res.data.code == 200) {
                  this.loadGroup();
                  this.$message({
                    message: "更新成功",
                    type: "success"
                  });
                  this.innerVisible = false;
                } else {
                  this.$message.error({ message: res.data.msg });
                }
              })
              .catch(err => {
                this.$message.error({ message: err });
              });
          } else {
            this.$api
              .get("merchant/add_material_group", {
                api_token: this.$api.getToken(),
                group_name: this.leftGroup.group_name
              })
              .then(res => {
                if (res.data.code == 200) {
                  this.loadGroup();
                  this.$message({
                    message: "添加分组成功",
                    type: "success"
                  });
                  this.innerVisible = false;
                } else {
                  this.$message.error({ message: res.data.msg });
                }
              })
              .catch(err => {
                this.$message.error({ message: err });
              });
          }
        } else {
        }
      });
    },
    // 删除分组
    GroupDel(id) {
      this.$confirm("确定删除此分组吗！", "确定删除!", {
        dangerouslyUseHTMLString: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        showClose: false
      }).then(() => {
        this.$api
          .get("merchant/delete_material_group", {
            api_token: this.$api.getToken(),
            group_id: id
          })
          .then(res => {
            if (res.data.code == 200) {
              this.$message({
                message: "删除成功",
                type: "success"
              });
            } else {
              this.$message.error({ message: res.data.msg });
            }
          })
          .catch(err => {
            this.$message.error({ message: err });
          });
      });
    },
    // 移动分组
    groupChange(id) {
      let arr = [];
      this.goodsImgs.data.map(item => {
        if (item.select) {
          arr.push(item.id);
        }
      });
      if (!arr.length) {
        this.$message.error("请选择图片");
        this.groupId = "";
        return;
      }
      this.$api
        .get("merchant/move_material", {
          api_token: this.$api.getToken(),
          group_id: id,
          id_str: arr.join(",")
        })
        .then(res => {
          if (res.data.code == 200) {
            this.$message({
              message: "操作成功",
              type: "success"
            });
            this.loadGroup();
            this.ifAdd = true;
          } else {
            this.$message.error({ message: res.data.msg });
          }
        })
        .catch(err => {
          this.$message.error({ message: err });
        });
    },
    // 单个删除
    delImgHandle(id) {
      this.$confirm(
        "若删除，不会对目前已使用该图片的相关业务造成影响",
        "确定删除该图片？",
        {
          dangerouslyUseHTMLString: true,
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          showClose: false
        }
      ).then(() => {
        this.$api
          .get("merchant/delete_material", {
            api_token: this.$api.getToken(),
            id_str: id + ""
          })
          .then(res => {
            if (res.data.code == 200) {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.loadGroup();
              this.ifAdd = true;
            } else {
              this.$message.error({ message: res.data.msg });
            }
          })
          .catch(err => {
            this.$message.error({ message: err });
          });
      });
    },
    // 删除素材
    delImg() {
      let arr = [];
      this.goodsImgs.data.map(item => {
        if (item.select) {
          arr.push(item.id);
        }
      });
      if (!arr.length) {
        this.$message.error("请选择图片");
        return;
      }
      this.$confirm(
        "若删除，不会对目前已使用该图片的相关业务造成影响",
        "确定删除该图片？",
        {
          dangerouslyUseHTMLString: true,
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          showClose: false
        }
      ).then(() => {
        this.$api
          .get("merchant/delete_material", {
            api_token: this.$api.getToken(),
            id_str: arr.join(",")
          })
          .then(res => {
            if (res.data.code == 200) {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.loadGroup();
              this.ifAdd = true;
            } else {
              this.$message.error({ message: res.data.msg });
            }
          })
          .catch(err => {
            this.$message.error({ message: err });
          });
      });
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
    },
    // 前往第几页
    toPage() {
      let pageCount =
        this.goodsImgs.total % this.filter.limits
          ? (this.goodsImgs.total / this.filter.limits).toFixed("0") - 0 + 1
          : this.goodsImgs.total / this.filter.limits;

      if (this.page > pageCount || this.page < 1 || this.page == "") {
        this.$message.error("无对应页码");
        return false;
      }
      if (this.page == this.filter.page) {
        return false;
      }
      this.filter.page = this.page;
      this.getSourceData();
    },
    handleCurrentChange(page) {
      this.filter.page = page;
      this.getSourceData();
    },
    picnameInp(id, index) {
      let data = JSON.parse(JSON.stringify(this.goodsImgs.data));

      data.map((item, key) => {
        if (item.id == id) {
          item.flag = !item.flag;
        }
      });
      this.goodsImgs.data = data;
      this.$nextTick(() => {
        this.$refs[`input${index}`].focus;
      });
    },
    picnameBlur(id, name) {
      if (!name) {
        this.$message.error("请输入图片名称");
        return false;
      }
      let data = JSON.parse(JSON.stringify(this.goodsImgs.data));

      data.map((item, key) => {
        if (item.id == id) {
          item.flag = !item.flag;
        }
      });
      this.goodsImgs.data = data;
      this.$api
        .get("merchant/update_material_name", {
          api_token: this.$api.getToken(),
          id: id,
          pic_name: name
        })
        .then(res => {
          if (res.data.code == 200) {
            //   this.$message({
            //     message: "删除成功",
            //     type: "success"
            //   });
            //   this.loadGroup();
            //   this.ifAdd = true;
          } else {
            this.$message.error({ message: res.data.msg });
          }
        })
        .catch(err => {
          this.$message.error({ message: err });
        });
    },
    titHandle(value){
	    this.tabId=value
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
  width: 150px;
  background: #f2f2f2;
  font-size: 16px;
  flex-shrink: 0;
}
.side .tool {
  height: 48px;
  background: #fff;
  padding-left: 15px;
  padding-right: 15px;
  position: relative;
  color: #44b549;
  line-height: 48px;
  cursor: pointer;
}
.side .tool i {
  position: absolute;
  right: 15px;
  top: 16px;
  color: #999;
  cursor: pointer;
}
.side li {
  text-align: center;
  /* padding-right: 20px; */
  /* line-height: 48px; */
  cursor: pointer;
}
.side li .tit {
  height: 38px;
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
  align-items: center;
}
.side li.active .tit {
  border-left: #44b549 3px solid;
  padding-left: 12px;
  background: #fff;
}
.side li .tit i {
  font-size: 14px;
  display: none;
}
.side li:hover .tit i {
  display: block;
}
.side li .z-tool {
  padding: 0 15px;
  background: #fff;
  display: flex;
  justify-content: space-around;
  height: 30px;
  align-items: center;
  font-size: 14px;
}
.side li .z-tool .edit {
  color: #44b549;
}
.side li .z-tool .del {
  color: red;
}
.source-main {
  padding: 10px 15px;
  flex-grow: 1;
}
.source-main .s-main li {
  width: 80px;
  float: left;
  margin-right: 10px;
  margin-bottom: 10px;
  cursor: pointer;
}
.source-main .s-main li .pic {
  width: 100%;
  height: 80px;
  position: relative;
}
.source-main .s-main li .pic .delbtn {
  position: absolute;
  bottom: 5px;
  right: 5px;
  z-index: 99;
  display: none;
  color: #999;
  /* color: #44b549 */
}
.source-main .s-main li .pic:hover .delbtn {
  display: block;
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
<style>
.picname .el-input__inner {
  border-left: 0;
  border-top: 0;
  border-radius: 0;
  border-right: 0;
  height: 30px;

  padding: 0;
}
.namedefalut {
  height: 30px;
  line-height: 30px;
  padding: 0;
  border-bottom: 1px #fff solid;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  -webkit-user-select: none;
  user-select: none;
}
.naminp {
  display: flex;
  align-items: center;
}
.naminp i {
  visibility: hidden;
}
.naminp:hover i {
  visibility: visible;
}
.naminp .el-input {
  flex-grow: 1;
  margin-top: 1px;
}
</style>
