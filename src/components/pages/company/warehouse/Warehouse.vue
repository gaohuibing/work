<template>
  <div>
    <div class="tabs">
      <ul>
        <li class="active">商品仓库</li>
      </ul>
    </div>
    <!-- 删选 1 -->
    <div class="filters">
      <div class="lab" style="justify-content: space-between">
        <div class="buts">
          <span>商品筛选：</span>
          <div class="inp-box">
            <el-input v-model="filter.goods_name" placeholder="请输入"></el-input>
          </div>
        </div>
        <div>
          <el-button class="filter-btn" type="primary" size="small" @click="getWarehouse">筛选</el-button>
          <!-- <el-button size="small">导出</el-button> -->
        </div>
      </div>
      <div class="lab clearfix" style="display:block">
        <div class="buts" style="float:left">
          <span>商品分类：</span>
          <div class="inp-box">
            <el-cascader
              v-model="selectGoodsType"
              :options="goodsType"
              @change="handleGoodsTypeChange"
              :props="defaultProps"
              placeholder="请选择"
            ></el-cascader>
          </div>
        </div>
        <div class="buts" style="float:left">
          <span>价格：</span>
          <div class="inp-box" style="width:104px">
            <el-select v-model="filter.price_type" placeholder="请选择">
              <el-option v-for="(item,key) in price_types" :key="key" :label="item" :value="key"></el-option>
            </el-select>
          </div>￥
          <div class="inp-box" style="width:100px;margin-left:5px;">
            <el-input
              v-model="filter.min_price"
              placeholder="最低"
              :change="limit('filter.min_price',filter.min_price)"
            >2</el-input>
          </div>
          <em style="color:#999;margin:0 5px">-</em>￥
          <div class="inp-box" style="width:100px;">
            <el-input
              v-model="filter.max_price"
              placeholder="最高"
              :change="limit('filter.max_price',filter.max_price)"
            >1</el-input>
          </div>
        </div>
        <div class="reset">
          <a @click.prevent="resetHandle">重置</a>
        </div>
      </div>
    </div>
    <div class="toolbar">
      <div>
        <el-button type="primary" size="small" @click="addHandle">新增商品</el-button>
        <el-button type="primary" size="small" @click="toExport">第三方导入</el-button>
      </div>
    </div>
    <div class="table-content">
      <el-table
        v-loading="loading"
        ref="multipleTable"
        :data="goodLists.data"
        stripe
        border
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column prop="id" type="selection" width="30"></el-table-column>
        <el-table-column label="商品" width="240">
          <template slot-scope="scope">
            <div class="goodinfo clearfix">
              <div class="pic">
                <img :src="scope.row.goods_pic" />
              </div>
              <div class="info">
                <h5>{{scope.row.goods_name}}</h5>

                <p class="normal-price">
                  <span style="color:#1c1c1c">自营成本价：</span>
                  ¥{{scope.row.s_cost_price}}
                </p>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="分类" align="center">
          <template slot-scope="scope">{{scope.row.first_sort}} / {{scope.row.second_sort}}</template>
        </el-table-column>
        <el-table-column label="市场价" align="center" width="100">
          <template slot-scope="scope">￥{{scope.row.s_market_price}}</template>
        </el-table-column>
        <el-table-column label="销售价" align="center" width="100">
          <template slot-scope="scope">￥{{scope.row.s_sell_price}}</template>
        </el-table-column>
        <el-table-column prop="s_stock" label="库存" align="center"></el-table-column>
        <el-table-column label="浏览/销量" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.view_num}}/{{scope.row.sell_num}}</span>
          </template>
        </el-table-column>
        <el-table-column label="更新时间" align="center" width="100">
          <template slot-scope="scope">
            {{$moment(scope.row.updated_at?scope.row.updated_at:scope.row.created_at).format('YYYY-MM-DD HH:mm:ss').split(' ')[0]}}
            <br />
            {{$moment(scope.row.updated_at?scope.row.updated_at:scope.row.created_at).format('YYYY-MM-DD HH:mm:ss').split(' ')[1]}}
          </template>
        </el-table-column>
        <el-table-column prop="date" label="操作" align="center" width="154">
          <template slot-scope="scope">
            <a @click.prevent="copy(scope.row.id)" style="padding:0 7px;cursor: pointer">复制</a>
            <a
              @click.prevent="editHandle(scope.row.id)"
              style="padding:0 7px;color:#44B549;cursor: pointer"
            >编辑</a>
            <a
              @click.prevent="delHandle(scope.row.id,all=false)"
              style="padding:0 7px;color:#999;cursor: pointer"
            >删除</a>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- //底部操作 -->
    <div class="bot-tools">
      <div>
        <el-checkbox
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="handleCheckAllChange"
        >全选</el-checkbox>
        <el-popover
          placement="top"
          title="加入下载"
          width="300"
          trigger="manual"
          v-model="dvisilbe"
          style="margin:0 10px"
        >
          <div class="downitem">
            <span style="width:96px">选择分组：</span>
            <el-select v-model="planId" placeholder="请选择" style="width:200px;margin:0 10px">
              <el-option
                v-for="item in planList.data"
                :key="item.id"
                :label="item.plan_name"
                :value="item.id"
              ></el-option>
            </el-select>
            <a style="color:#69c46d;cursor:pointer;width:40px" @click="newDownload">新建</a>
          </div>
          <div class="botd-tools" style="text-align:center;margin:20px 0">
            <el-button type="primary" @click="downloadConfirm" size="small">确定</el-button>
            <el-button @click="dvisilbe=false" size="small">取消</el-button>
          </div>
          <el-button slot="reference" size="small" @click="downloadAdd">加入下载</el-button>
        </el-popover>
        <el-button size="small" @click="delHandle(multipleSelection.join(','),all=true)">删除</el-button>
      </div>
      <div class="flex-grow pagi-wrap" v-if="goodLists.total-0>0">
        <div>共{{goodLists.total}}条，每页{{filter.limits}}条</div>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="goodLists.total-0"
          :current-page="filter.page-0"
          :pager-count="5"
          :page-size="filter.limit-0"
          @current-change="handleCurrentChange"
        ></el-pagination>
        <div>
          到第
          <el-input v-model="page" class="topage" :change='limit("page",page)'></el-input>页
          <el-button size="small" class="pageBtn" @click="toPage">GO</el-button>
        </div>
      </div>
    </div>
    <!-- // 添加方案 -->
    <painDialog :visible.sync="visible"></painDialog>
    <!-- 加入下载成功后弹窗 -->
    <el-dialog :visible.sync="submitVisible" title="商品加入下载成功" width="30%" class="submitDialog">
      <div style="display:flex;align-items:center">
        <i class="el-icon-success" style="color:#44B549;font-size:20px;margin-right:6px"></i>
        商品加入下载成功，你可以进行以下快捷操作
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitVisible=false" size="small">确认完成</el-button>
        <el-button
          @click="submitVisible=false;$router.replace('/company/download/programme');"
          size="small"
        >查看下载中心</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import painDialog from "../download/planDialog";
const GOODS_TYPE = {
  "1": "实体商品",
  "2": "虚拟商品"
};
export default {
  mounted() {
    this.getGoodsType();
    this.getWarehouse();
    this.loadPlanList();
    this.$bus.$on("upload:painList", h => {
      this.loadPlanList();
    });
  },
  components: { painDialog },
  data() {
    return {
      GOODS_TYPE: GOODS_TYPE,
      // 价格类型
      price_types: {
        1: "市场价",
        2: "销售价",
        3: "成本价"
      },
      // 商品分类
      selectGoodsType: [0],
      // 一级分类
      firstSort: [],
      // 二级分类
      secondSort: [],
      goodsType: [],
      defaultProps: {
        label: "sort_name",
        children: "second_sort",
        value: "id"
      },
      filter: {
        api_token: this.$api.getToken(),
        goods_name: "",
        first_sort: "",
        second_sort: "",
        price_type: "",
        min_price: "",
        max_price: "",
        page: 1,
        limits: 10
      },
      multipleSelection: [], //选择的ids

      goodLists: {
        data: [],
        total: ""
      },
      isIndeterminate: false,
      checkAll: false,
      page: "",

      loading: true,
      planList: {
        data: [],
        total: ""
      },
      planId: "",
      dvisilbe: false,
      visible: false,
      submitVisible: false
    };
  },

  methods: {
    modifyHandle() {},
    // 表格中全选
    handleSelectionChange(data) {
      let length = data.length;
      let multipleSelection = data.map(item => {
        return item.id;
      });
      if (0 === multipleSelection.length) {
        this.multipleSelection = [];
      } else {
        this.multipleSelection = multipleSelection;
      }
      this.checkAll = length === this.goodLists.data.length;
      this.isIndeterminate = length > 0 && length < this.goodLists.data.length;
    },
    copy(id) {
      this.loading = true;
      let goodsId = id - 0;
      this.$api
        .post("merchant/copy_goods", {
          api_token: this.$api.getToken(),
          goods_id: goodsId
        })
        .then(res => {
          if (res.data.code == 200) {
            this.$message({
              message: "复制成功",
              type: "success"
            });
            this.getWarehouse();
          } else {
            this.$message.error({ message: res.data.msg });
          }
        })
        .catch(err => {
          this.$message.error({ message: err });
        });
    },
    //删除数据
    delHandle(ids, all) {
      if (all && this.multipleSelection.length < 1) {
        this.$message.error("请先选择商品");
        return false;
      }
      this.$confirm(
        "<span style='color:red'>谨慎操作，删除后所有活动中均无此商品！</span>",
        "确定删除!",
        {
          dangerouslyUseHTMLString: true,
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          center: true,
          showClose: false
        }
      ).then(() => {
        this.$api
          .post("merchant/delete_goods", {
            api_token: this.$api.getToken(),
            goods_id: ids + ""
          })
          .then(res => {
            if (res.data.code == 200) {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.getWarehouse();
            } else {
              this.$message.error({ message: res.data.msg });
            }
          })
          .catch(err => {
            this.$message.error({ message: err });
          });
      });
    },
    // 底部全选
    handleCheckAllChange(val) {
      let idsArr = this.goodLists.data.map((item, index) => {
        return item.id;
      });
      this.$refs.multipleTable.toggleAllSelection();
      this.multipleSelection = val ? idsArr : [];
      this.isIndeterminate = false;
    },
    toExport() {
      this.$router.push({
        path: "/company/warehouse/export"
      });
    },
    // 上传商品
    addHandle() {
      this.toEdit();
    },
    toEdit() {
      this.$router.push({
        path: "/company/warehouse/edit"
      });
    },
    // 获取一级分类
    getFirstSort(id) {
      this.$api
        .get("sort/get_first_sort")
        .then(res => {
          if (res.data.code == 200) {
            this.firstSort = res.data.data;
            this.firstSort.map((item, index) => {
              if (item.index == id) {
              }
            });
          } else {
            this.$message.error({ message: res.data.msg });
          }
        })
        .catch(err => {
          this.$message.error({ message: err });
        });
    },
    // 获取二级分类
    getSecondSort() {
      this.$api
        .get("sort/get_second_sort")
        .then(res => {
          if (res.data.code == 200) {
            this.secondSort = res.data.data;
          } else {
            this.$message.error({ message: res.data.msg });
          }
        })
        .catch(err => {
          this.$message.error({ message: err });
        });
    },
    // 获取商品分类
    getGoodsType() {
      this.$api
        .get("sort/get_sort")
        .then(res => {
          if (res.data.code == 200) {
            let goodsType = res.data.data;
            // 避免父级id与子级id一样 无法渲染
            goodsType.map((item, index) => {
              item.second_sort.map((value, key) => {
                value.id = value.id + value.father_id;
              });
            });
            this.goodsType = [
              { id: 0, is_enable: 1, second_sort: "", sort_name: "全部" },
              ...goodsType
            ];
          } else {
            this.$message.error({ message: res.data.msg });
          }
        })
        .catch(err => {
          this.$message.error({ message: err });
        });
    },
    //  商品分类选择
    handleGoodsTypeChange(data) {
      if (data[0]) {
        this.filter.first_sort = data[0];
        this.filter.second_sort = data[1] - data[0];
      } else {
        this.filter.first_sort = "";
        this.filter.second_sort = "";
      }
    },
    // 获取商品仓库列表
    getWarehouse() {
      this.loading = true;
      this.$api
        .get("merchant/ware_house", this.filter)
        .then(res => {
          if (res.data.code == 200) {
            this.goodLists.data = res.data.data.item;
            this.goodLists.total = res.data.data.total;
            this.loading = false;
          } else {
            this.$message.error({ message: res.data.msg });
          }
        })
        .catch(err => {
          this.$message.error({ message: err });
        });
    },
    // 重置
    resetHandle() {
      this.filter = {
        api_token: this.$api.getToken(),
        goods_name: "",
        first_sort: "",
        second_sort: "",
        price_type: "",
        min_price: "",
        max_price: "",
        page: "1",
        limits: "10"
      };
      this.selectGoodsType = [0];
      this.getWarehouse();
    },
    // 前往第几页
    toPage() {
      let pageCount =
        this.goodLists.total % this.filter.limits
          ? (this.goodLists.total / this.filter.limits).toFixed("0") - 0 + 1
          : this.goodLists.total / this.filter.limits;

      if (this.page > pageCount || this.page < 1 || this.page == "") {
        this.$message.error("无对应页码");
        return false;
      }
      if (this.page == this.filter.page) {
        return false;
      }
      this.filter.page = this.page;
      this.getWarehouse();
    },
    handleCurrentChange(page) {
      this.filter.page = page;
      this.getWarehouse();
    },
    // 加入下载弹窗
    downloadAdd() {
      if (this.multipleSelection.length < 1) {
        this.$message.error("请至少选择一个商品");
        return false;
      } else {
        this.dvisilbe = !this.dvisilbe;
      }
    },
    // 新建下载
    newDownload() {
      if (this.planList.total >= 10) {
        this.$message.error("最多可创建10条方案");
        return false;
      }
      this.visible = true;
    },
    // 下载方案列表
    loadPlanList() {
      this.$api
        .get("merchant/plan_list", {
          api_token: this.filter.api_token,
          page: 1,
          limits: 50
        })
        .then(res => {
          if (res.data.code == 200) {
            this.planList.data = res.data.data.item;
            this.planList.total = res.data.data.total;
            this.loading = false;
          } else {
            this.$message.error({ message: res.data.msg });
          }
        })
        .catch(err => {
          this.$message.error({ message: err });
        });
    },
    // 确定添加下载
    downloadConfirm() {
      if (this.multipleSelection.length < 1) {
        this.$message.error("请至少选择一个商品");
        return false;
      }
      if (!this.planId) {
        this.$message.error("请选择下载方案");
        return false;
      }
      this.$api
        .get("merchant/add_plan_list", {
          api_token: this.filter.api_token,
          plan_id: this.planId,
          goods_id: this.multipleSelection.join(",")
        })
        .then(res => {
          if (res.data.code == 200) {
            this.$message({
              message: "操作成功",
              type: "success"
            });
            this.dvisilbe = false;
            this.getWarehouse();
            this.submitVisible = true;
          } else {
            this.$message.error({ message: res.data.msg });
          }
        })
        .catch(err => {
          this.$message.error({ message: err });
        });
    },
    addPlan() {},
    // 编辑
    editHandle(id) {
      this.$router.push({
        path: "/company/warehouse/edit",
        query: {
          goodsId: id
        }
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
    }
  },
  watch: {
    "goodLists.total"(value) {
      if (value == (this.filter.page - 1) * this.filter.limits && value != 0) {
        this.filter.page -= 1;
        this.getWarehouse(); //获取列表数据
      }
    }
  }
};
</script>
<style scoped>
.goodinfo .pic {
  width: 80px;
  height: 80px;
  float: left;
  display: flex;
  align-items: center;
  justify-content: center;
}
.goodinfo .pic img {
  width: 100%;
  height: 100%;
}
.goodinfo .info {
  width: 130px;
  float: left;
  margin-left: 10px;
  display: flex;
  justify-content: space-between;
  height: 80px;
  padding: 5px 0;
  flex-direction: column;
}
.goodinfo .info h5 {
  font-size: 14px;
  font-weight: normal;
  line-height: 18px;
  height: 36px;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  margin-bottom: 3px;
}
.goodinfo .info .market-price {
  color: #999999;
  text-decoration: line-through;
  font-size: 12px;
}
.goodinfo .info .normal-price {
  color: #f76260;
  font-size: 12px;
  margin-top: 8px;
}
.reset {
  float: right;
}
.reset a {
  color: #999999;
  line-height: 32px;
  padding: 0 15px;
  font-size: 14px;
}
.downitem {
  display: flex;
  width: 100%;
  align-items: center;
  margin: 20px 0;
  margin-top: 40px;
}
</style>
