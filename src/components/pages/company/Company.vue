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

export default {
    components:{AppSider},
    mounted(){},
    data(){
        return{}
    },
}
</script>
<style scoped>

</style>
