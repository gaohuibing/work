<template>
  <div>
    <div class="sum-tools">
      <div class="left">
        <el-radio-group v-model="dateType" size="small" style="margin-right:60px">
          <el-radio-button label="month">日汇总</el-radio-button>
          <el-radio-button label="year">月汇总</el-radio-button>
        </el-radio-group>
        <el-date-picker v-model="valueDate" type="month" placeholder="选择日期" :hidden='dateType=="year"'></el-date-picker>
	  <el-date-picker v-model="valueDate" type="year" placeholder="选择日期" :hidden='dateType=="month"'></el-date-picker>
      </div>
      <el-button type="primary" size="small">{{dateType=="month"?'下载月账单':'下载年账单'}}</el-button>
    </div>
    <div class="table-content">
      <el-table :data="serviceLists.data" stripe border tooltip-effect="dark" style="width: 100%">
        <el-table-column prop="time" label="日期" align="center"></el-table-column>
        <el-table-column label="收入" prop="price" align="center"></el-table-column>
        <el-table-column label="支出" prop="price" align="center"></el-table-column>
        <el-table-column label="账户余额" prop="price" align="center"></el-table-column>
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
      value: true,
      dateType: "month",
      valueDate: "",
      serviceLists: {
        data: [
          {
            time: "2019-05-20 18:12:12",
            price: "￥5000"
          },
          {
            time: "2019-05-20 18:12:12",
            price: "￥5000"
          },
          {
            time: "2019-05-20 18:12:12",
            price: "￥5000"
          },
          {
            time: "2019-05-20 18:12:12",
            price: "￥5000"
          },
          {
            time: "2019-05-20 18:12:12",
            price: "￥5000"
          },
          {
            time: "2019-05-20 18:12:12",
            price: "￥5000"
          }
        ]
      },
      isIndeterminate: false,
      page: "1"
    };
  }
};
</script>

<style scoped>
.sum-tools{
	background: #F6F7FF;
	padding: 20px;
	display: flex;
	justify-content: space-between;
	margin: 10px 0 8px 0
	
}
.sum-tools .left{
	display: flex;
align-items: center
}
</style>

