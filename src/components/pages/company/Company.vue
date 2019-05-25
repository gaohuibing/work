<template>
    <div class="clearfix full-height">
        <app-sider></app-sider>
        <div class="wrap full-height">
            <router-view></router-view>
        </div>        
    </div>
</template>
<script>
import AppSider from './Sider'
import VueScrollbar from 'vue2-scrollbar';
require("vue2-scrollbar/style/vue2-scrollbar.css")

export default {
    components:{AppSider,VueScrollbar},
    mounted(){},
    data(){
        return{}
    },
}
</script>
<style scoped>

</style>
