<template>
  <div>
    <div class="top-data">
      <div class="data-item">
        <h5>待开服务发票</h5>
        <p>
          <span>可开数量：20</span>
          <span>可开金额：￥2000</span>
        </p>
        <a @click.prevent>申请开票</a>
      </div>
      <div class="data-item">
        <h5>待开服务发票</h5>
        <p>
          <span>可开数量：20</span>
          <span>可开金额：￥2000</span>
        </p>
        <a @click.prevent>申请开票</a>
      </div>
      <div class="data-item">
        <div></div>
        <div>
          开票资料
          <a @click.prevent style="margin-left:20px">申请开票</a>
        </div>
        <div></div>
      </div>
    </div>
    <div class="list-tools">
      <div class="tool-1 clearfix" style="margin-bottom: 10px;">
        <div class="t">
          <span>发票类型：</span>
          <div class="inp-box">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="t">
          <span>开票状态：</span>
          <div class="inp-box">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="cz">
          <el-button type="primary" size="small">筛选</el-button>
          <el-button size="small">重置</el-button>
        </div>
      </div>
      <div class="tool-1 clearfix">
        <div class="t">
          <span>申请账号：</span>
          <div class="inp-box">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="t">
          <span>申请时间：</span>
          <div class="inp-box">
            <el-date-picker
              v-model="value"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </div>
        <p>单次查询间隔时间最长三个月</p>
        <div class="export">
          <a href="javascript:;" style="color:#999">导出报表</a>
        </div>
      </div>
    </div>
    <div class="toolbar">
      <div></div>
      <div>
        <el-button size="small">上一页</el-button>
        <el-button size="small">下一页</el-button>
      </div>
    </div>
    <div class="table-content">
      <el-table :data="serviceLists.data" stripe border tooltip-effect="dark" style="width: 100%">
        <el-table-column label="申请单号" prop="code" align="center"></el-table-column>
        <el-table-column prop="time" label="申请时间" align="center"></el-table-column>
        <el-table-column prop="time" label="完成时间" align="center"></el-table-column>
        <el-table-column prop="type" label="发票类型" align="center"></el-table-column>
        <el-table-column label="发票金额" align="center" prop="price"></el-table-column>
        <el-table-column prop="content" label="开票状态" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <a
              @click.prevent="copy(scope.row.id)"
              style="padding:0 7px;cursor: pointer;color:#44B549;"
            >详情</a>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- //底部操作 -->
    <div class="bot-tools">
      <div></div>
      <div class="flex-grow pagi-wrap">
        <div>共199条，每页20条</div>
        <el-pagination background layout="prev, pager, next" :total="1000" :pager-count="5"></el-pagination>
        <div>
          到第
          <el-input v-model="page" class="topage"></el-input>页
          <el-button size="small" class="pageBtn">GO</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: "",

      isIndeterminate: false,
      page: "1",
      serviceLists: {
        data: [
          {
            code: "1651313216546",
            time: "2019-05-20 18:12:12",
            type: "装修订单",
            content: "撒大家了看见啊",
            price: "￥5000",
            status: "待付款"
          },
          {
            code: "1651313216546",
            time: "2019-05-20 18:12:12",
            type: "装修订单",
            content: "撒大家了看见啊",
            price: "￥5000",
            status: "待付款"
          },
          {
            code: "1651313216546",
            time: "2019-05-20 18:12:12",
            type: "装修订单",
            content: "撒大家了看见啊",
            price: "￥5000",
            status: "待付款"
          },
          {
            code: "1651313216546",
            time: "2019-05-20 18:12:12",
            type: "装修订单",
            content: "撒大家了看见啊",
            price: "￥5000",
            status: "待付款"
          },
          {
            code: "1651313216546",
            time: "2019-05-20 18:12:12",
            type: "装修订单",
            content: "撒大家了看见啊",
            price: "￥5000",
            status: "待付款"
          },
          {
            code: "1651313216546",
            time: "2019-05-20 18:12:12",
            type: "装修订单",
            content: "撒大家了看见啊",
            price: "￥5000",
            status: "待付款"
          }
        ]
      }
    };
  },
  methods: {
    copy() {}
  }
};
</script>

<style scoped>
.top-data {
  background: #eef3f5;
  padding: 17px 0;
  display: flex;
  margin: 10px 0 8px 0;
}
.top-data .data-item {
  text-align: center;
  width: 33.33%;
  border-right: 1px solid #d0d0d9;
  display: flex;
  /* align-items: stretch; */
  justify-content: space-between;
  flex-direction: column;
  height: 122px;
}
.top-data .data-item:last-child {
  border: none;
}
.top-data .data-item h5 {
  font-size: 18px;
}
.top-data .data-item p {
  font-size: 16px;
}
.top-data .data-item p span {
  margin: 0 10px;
}
.top-data .data-item a {
  color: #44b549;
}

.list-tools {
  background: #f6f7ff;
  padding: 15px;
  margin-top: 20px;
}

.list-tools .tool-1 .t {
  width: 300px;
  display: flex;
  height: 34px;
  line-height: 34px;
  float: left;
}
.list-tools .tool-1 i {
  font-size: 12px;
  color: #999;
}
.list-tools .tool-1 .ls {
  width: 460px;
  float: left;
  display: flex;
  height: 34px;
  line-height: 34px;
  margin-left: 20px;
}
.list-tools .ls .input-group {
  width: 180px;
}
.list-tools .t .input-group,
.list-tools .t .btn-group {
  width: 220px;
}
.list-tools .t .btn-group button {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.cz {
  float: right;
  display: flex;
  width: 170px;
  justify-content: flex-end;
}
.list-tools .tool-1 p {
  width: 200px;
  float: left;
  line-height: 34px;
  color: #999;
  font-size: 12px;
  margin: 0;
}
.list-tools .tool-1 .export {
  width: 100px;
  float: right;
  line-height: 34px;
  text-align: right;
}

.table-tools {
  display: flex;
  padding: 20px 0;
}
</style>
