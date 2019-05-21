import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/pages/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: h => import('@/components/pages/Layout.vue'),
      redirect: '/company',
      children: [
        {
          path: 'company',
          component: h => import('@/components/pages/company/Company.vue'),
          // 企业
          redirect: '/company/home',
          children:[
            // 首页
            {
              path:'home',
              component:h=>import('@/components/pages/company/Home')
            },
            // 商品仓库
            {
              path:'warehouse',
              component: h => import('@/components/pages/company/RouteBox'),
              redirect:'/company/warehouse/warehouse',
              children:[
                {
                  path:'warehouse',
                  component:h=>import('@/components/pages/company/warehouse/Warehouse')
                },
                {
                  path:'export',
                  component:h=>import('@/components/pages/company/warehouse/Export')
                },
                {
                  path:'edit',
                  component:h=>import('@/components/pages/company/warehouse/Edit')
                }
              ]
             
            }
          ]
        }
      ]
    }
  ]
})
