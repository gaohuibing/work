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
            <el-input v-model="filter.search" placeholder="请输入"></el-input>
          </div>
        </div>
        <el-button class="filter-btn" type="success" size="small">筛选</el-button>
      </div>
      <div class="lab">
        <div class="buts">
          <span>商品分类：</span>
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
        <div class="buts">
          <span>价格：</span>
          <div class="inp-box" style="width:104px">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="inp-box" style="width:100px;margin-left:5px">
            <el-input v-model="filter.search" placeholder="¥ 最低"></el-input>
          </div>
          <em style="color:#999;margin:0 5px">-</em>
          <div class="inp-box" style="width:100px">
            <el-input v-model="filter.search" placeholder="¥ 最高"></el-input>
          </div>
        </div>
      </div>
    </div>
    <div class="toolbar">
      <div>
        <el-button type="success" size="small">新增商品</el-button>
        <el-button type="success" size="small">第三方导入</el-button>
      </div>
      <div class="export-btn">
        <el-button size="small">导出全部</el-button>
      </div>
    </div>
    <div class="table-content">
      <el-table
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
                <img src='../../../../assets/images/test.png'>
              </div>
              <div class="info">
                <h5>{{scope.row.name}}</h5>
                <p class="market-price">市场价：¥{{scope.row.marketPrice}}</p>
                <p class="normal-price">成本价：¥{{scope.row.normalPrice}}</p>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="分类" align="center"></el-table-column>
        <el-table-column prop="price" label="销售价" align="center"></el-table-column>
        <el-table-column prop="kucun" label="库存" align="center"></el-table-column>
        <el-table-column label="浏览/销量" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.liulan}}/{{scope.row.xiaolia}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="更新时间" align="center"></el-table-column>
        <el-table-column prop="date" label="操作" align="center" width="150">
          <template slot-scope="scope">
            <a @click.prevent="copy(scope.id)" style="padding:0 7px;cursor: pointer">复制</a>
            <a @click.prevent style="padding:0 7px;color:#44B549;cursor: pointer">编辑</a>
            <a @click.prevent style="padding:0 7px;color:#999;cursor: pointer">删除</a>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      filter: {
        search: ""
      },
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
      goodLists: {
        data: [
          {            
            name: "电脑电脑电脑",
            type: "服装/男装",
            marketPrice: "50.00",
            normalPrice: "30.00",
            price: "180.00",
            kucun: "12",
            liulan: "200",
            xiaolia: "100",
            date: "2019-02-03 00:00:00"
          },
          {
            user: "12",
            name: "13",
            type: "服装/男装",
            marketPrice: "50.00",
            normalPrice: "30.00",
            price: "180.00",
            kucun: "12",
            liulan: "200",
            xiaolia: "100",
            date: "2019-02-03 00:00:00"
          }
        ]
      }
    };
  },
  methods: {
    modifyHandle() {},
    handleSelectionChange() {},
    copy(id) {}
  }
};
</script>
<style scoped>
.goodinfo .pic{
  width: 80px;
  height: 80px;
  float: left;
}
.goodinfo .pic img{
  width: 100%;
  height: 100%;
}
.goodinfo .info{
  width: 140px;
  float: left;
  margin-left: 10px
}
.goodinfo .info h5{
  height: 40px;
  font-size: 14px;
  font-weight: normal;
  line-height: 20px
}
.goodinfo .info .market-price{
  color: #999999;
  text-decoration: line-through;
  font-size: 12px
}
.goodinfo .info .normal-price{
  color: #F76260; 
  font-size: 12px;
  margin-top: 8px
}
</style>
