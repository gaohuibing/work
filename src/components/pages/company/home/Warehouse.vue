<template>
  <div>
    <div class="tabs">
        <ul>
            <li class="active">商品仓库</li>            
        </ul>
    </div>
    <div class="filters">
        <div class="lab" style="justify-content: space-between">
            <div class="buts">
                <span>商品筛选：</span>
                <el-input v-model="filter.search" placeholder="请输入"></el-input>
            </div>
            <el-button class="filter-btn" type="success" size='small'>筛选</el-button>
        </div>
    </div>
  </div>
</template>
<script>
export default {
    data(){
        return{
            filter:{
                search:''
            }
        }
    }
};
</script>
<style scoped>
.filter-btn{
    
}
</style>
