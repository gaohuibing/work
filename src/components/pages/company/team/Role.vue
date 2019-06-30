<template>
  <div>
    <div class="tools">
      <el-button type="primary" size="small" style="margin-right:10px" @click="addUser">添加角色</el-button>说明：最多可添加10个角色
    </div>
    <div class="table-content">
      <el-table
        ref="multipleTable"
        :data="goodLists.data"
        stripe
        border
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column label="角色名称" prop="name" align="center"></el-table-column>
        <el-table-column prop="partment" label="所属部门" align="center"></el-table-column>
       
        <el-table-column label="状态" prop="state" align="center"></el-table-column>

        <el-table-column prop="date" label="操作" align="center" width="150">
          <template slot-scope="scope">          
            <a @click.prevent style="padding:0 7px;color:#44B549;cursor: pointer">编辑</a>
            <a
              @click.prevent="delHandle(scope.row.id,scope.row.name)"
              style="padding:0 7px;color:#999;cursor: pointer"
            >删除</a>
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
      goodLists: {
        data: [
          {
            name: "张三",
            partment: "技术部",
            role: "管理员",
            state: "未启用"
          },
          {
            name: "张三",
            partment: "技术部",
            role: "管理员",
            state: "未启用"
          },
          {
            name: "张三",
            partment: "技术部",
            role: "管理员",
            state: "未启用"
          },
          {
            name: "张三",
            partment: "技术部",
            role: "管理员",
            state: "未启用"
          }
        ]
      },
      isIndeterminate: false,

      page: "1"
    };
  },
  methods:{
	  //删除数据
    delHandle(id,name) {
      this.$confirm(`您将删除角色“${name}”?`, "确定删除吗", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        center: false,
        showClose: false,
        width: "271"
      }).then(() => {});
    },
    addUser(){
	    this.$router.push('/company/role_edit')
    }
  }
};
</script>

<style scoped>
.tools{
	padding: 10px 0;
}
</style>
