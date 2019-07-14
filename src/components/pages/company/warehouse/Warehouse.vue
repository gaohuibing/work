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
          <el-button size="small">导出</el-button>
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
          </div>
          <div class="inp-box" style="width:100px;margin-left:5px">
            <el-input v-model="filter.min_price" placeholder="¥ 最低"></el-input>
          </div>
          <em style="color:#999;margin:0 5px">-</em>
          <div class="inp-box" style="width:100px">
            <el-input v-model="filter.max_price" placeholder="¥ 最高"></el-input>
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
        <el-table-column prop="id" type="selection"></el-table-column>
        <el-table-column label="商品" width="250">
          <template slot-scope="scope">
            <div class="goodinfo clearfix">
              <div class="pic">
                <img :src="scope.row.goods_pic" />
              </div>
              <div class="info">
                <h5>{{scope.row.goods_name}}</h5>
                <p class="market-price">市场价：¥{{scope.row.s_market_price}}</p>
                <p class="normal-price">成本价：¥{{scope.row.s_cost_price}}</p>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="分类" align="center">
          <template slot-scope="scope">{{scope.row.first_sort}} / {{scope.row.second_sort}}</template>
        </el-table-column>
        <el-table-column prop="s_sell_price" label="销售价" align="center"></el-table-column>
        <el-table-column prop="s_stock" label="库存" align="center"></el-table-column>
        <el-table-column label="浏览/销量" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.view_num}}/{{scope.row.sell_num}}</span>
          </template>
        </el-table-column>
        <el-table-column label="更新时间" align="center">
          <template slot-scope="scope">
            {{$moment(scope.row.updated_at?scope.row.updated_at:scope.row.created_at).format('YYYY-MM-DD HH:mm:ss').split(' ')[0]}}
            <br />
            {{$moment(scope.row.updated_at?scope.row.updated_at:scope.row.created_at).format('YYYY-MM-DD HH:mm:ss').split(' ')[1]}}
          </template>
        </el-table-column>
        <el-table-column prop="date" label="操作" align="center" width="180">
          <template slot-scope="scope">
            <a @click.prevent="copy(scope.row.id)" style="padding:0 7px;cursor: pointer">复制</a>
            <a
              @click.prevent="editHandle(scope.row.id)"
              style="padding:0 7px;color:#44B549;cursor: pointer"
            >编辑</a>
            <a
              @click.prevent="delHandle(scope.row.id)"
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
          width="400"
          trigger="click"
          v-model="dvisilbe"
          style="margin:0 10px"
        >
          <div class="downitem">
            <span>选择分组：</span>
            <el-select v-model="planId" placeholder="请选择" style="width:200px;margin:0 10px">
              <el-option
                v-for="item in planList.data"
                :key="item.id"
                :label="item.plan_name"
                :value="item.id"
              ></el-option>
            </el-select>
            <a style="color:#69c46d;cursor:pointer" @click="visible = true">新建</a>
          </div>
          <div class="botd-tools" style="text-align:center;margin:20px 0">
            <el-button type="primary" @click="downloadConfirm" size="small">确定</el-button>
            <el-button @click="dvisilbe=false" size="small">取消</el-button>
          </div>
          <el-button slot="reference" size="small">加入下载</el-button>
        </el-popover>
        <el-button size="small" @click="delHandle(multipleSelection.join(','))">删除</el-button>
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
          <el-input v-model="page" class="topage"></el-input>页
          <el-button size="small" class="pageBtn" @click="toPage">GO</el-button>
        </div>
      </div>
    </div>
    <!-- // 添加方案 -->
    <painDialog :visible.sync="visible"></painDialog>
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
      selectGoodsType: [],
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
      visible: false
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
        this.multipleSelection = undefined;
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
    delHandle(ids) {
      this.$confirm(
        "您所选商品有正在被活动使用，如确定 删除，活动中的商品也将被强制删除， 并且不可恢复?",
        "确定删除!",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          center: false,
          showClose: false,
          width: "271"
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
            this.goodsType = res.data.data;
            // 避免父级id与子级id一样 无法渲染
            this.goodsType.map((item, index) => {
              item.second_sort.map((value, key) => {
                value.id = value.id + value.father_id;
              });
            });
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
      this.filter.first_sort = data[0];
      this.filter.second_sort = data[1] - data[0];
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
      this.getWarehouse();
    },
    // 前往第几页
    toPage() {
      this.filter.page = this.page;
      this.getWarehouse();
    },
    handleCurrentChange(page) {
      this.filter.page = page;
      this.getWarehouse();
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
            this.multipleSelection = [];
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
    }
  },
  watch: {
    multipleSelection(v) {
      console.log(v);
    }
  }
};
</script>
<style scoped>
.goodinfo .pic {
  width: 80px;
  height: 80px;
  float: left;
}
.goodinfo .pic img {
  width: 100%;
  height: 100%;
}
.goodinfo .info {
  width: 140px;
  float: left;
  margin-left: 10px;
}
.goodinfo .info h5 {
  height: 40px;
  font-size: 14px;
  font-weight: normal;
  line-height: 20px;
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
