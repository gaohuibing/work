<template>
  <div>
    <div>
      <div class="tools">
        <el-button type="primary" size="small" style="margin-right:10px" @click="addHandle">新建方案</el-button>
	  <span>说明：最多新建10条方案，单个方案最多可加入50个商品，方案保存7天（商品下载可以通过自有商品仓库、活动-展
		  业活动、商城-展业活动的商品列表加入下载）</span>
      </div>
      <div class="table-content">
        <el-table
          ref="multipleTable"
          :data="planList.data"
          stripe
          border
          tooltip-effect="dark"
          style="width: 100%"
          v-loading="loading"
        >
          <el-table-column type="index" width="50">
            <template slot="header">序号</template>
          </el-table-column>
          <el-table-column label="报表名称" align="center">
            <template slot-scope="scope">
              {{scope.row.plan_name}}
              <span
                v-if="scope.row.expired_at-0<Timestamp-0"
                style="color:#F76260;margin-left:10px"
              >失效</span>
            </template>
          </el-table-column>
          <el-table-column prop="goods_num" label="商品数量" align="center"></el-table-column>
          <el-table-column prop="created_at" label="创建日期" align="center"></el-table-column>
          <el-table-column prop="expire_day" label="有效期" align="center"></el-table-column>

          <el-table-column prop="date" label="操作" align="center" width="300">
            <template slot-scope="scope">
              <a
                @click.prevent="scope.row.expired_at-0<Timestamp-0?'':downloadExcel(scope.row.id)"
                style="padding:0 7px;color:#44B549;cursor: pointer"
                :style="{greyStyle:scope.row.expired_at-0<Timestamp-0}"
              >下载表格</a>

              <a
                @click.prevent="scope.row.expired_at-0<Timestamp-0?'':downloadPPT(scope.row.id)"
                style="padding:0 7px;color:#44B549;cursor: pointer"
                :style="{greyStyle:scope.row.expired_at-0<Timestamp-0}"
              >下载PPT</a>
              <a
                @click.prevent="delHandle(scope.row.id,scope.row.plan_name)"
                :style="{greyStyle:scope.row.expired_at-0<Timestamp-0}"
                style="padding:0 7px;color:#999;cursor: pointer"
              >删除</a>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- //底部操作 -->
      <div class="bot-tools" v-if="planList.total>0">
        <div></div>
        <div class="flex-grow pagi-wrap">
          <div>共{{planList.total}}条，每页{{filter.limits}}条</div>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="planList.total-0"
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
    </div>
    <painDialog :visible.sync="visible"></painDialog>
  </div>
</template>

<script>
import painDialog from "./planDialog";
export default {
  mounted() {
    this.getPlanList();
    this.$bus.$on("upload:painList", h => {
      this.getPlanList();
    });
  },
  components: { painDialog },
  data() {
    return {
      filter: {
        api_token: this.$api.getToken(),
        page: "1",
        limits: "10"
      },
      planList: {
        total: "",
        data: []
      },
      page: "",
      greyStyle: {
        color: "#999"
      },
      // 当前时间戳
      Timestamp: this.$moment().format("X"),
     
      visible: false,
      loading: true
    };
  },
  methods: {
    addHandle() {
      this.visible = true;
      this.plan_name = "";
    },

    getPlanList() {
      this.loading = true;
      this.$api
        .get("merchant/plan_list", this.filter)
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
    handleCurrentChange(page) {
      this.filter.page = page;
      this.getPlanList();
    },
    // 前往第几页
    toPage() {
      this.filter.page = this.page;
      this.getPlanList();
    },
    // 下载excel
    downloadExcel(id) {
      window.location.href = `${this.$api.apiUrl}merchant/download_report?plan_id=${id}&api_token=${this.filter.api_token}`;
    },
    // 下载excel
    downloadPPT(id) {
      window.location.href = `${this.$api.apiUrl}merchant/download_plan?plan_id=${id}&api_token=${this.filter.api_token}`;
    },
    // 删除
    delHandle(id, name) {
      this.$confirm(`您将删除方案“${name}”?`, "确定删除吗", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        center: false,
        showClose: false,
        width: "271"
      }).then(() => {
        this.$api
          .get("merchant/delete_plan", {
            plan_id: id,
            api_token: this.filter.api_token
          })
          .then(res => {
            if (res.data.code == 200) {
              this.getPlanList();
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
    }
  }
};
</script>

<style scoped>
.tools {
  padding: 10px 0;
  display: flex
}
.tools span{
	display: inline-block
}
</style>
