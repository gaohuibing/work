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
          redirect: '/company/home',
          children:[
            {
              path:'home',
              component:h=>import('@/components/pages/company/home/Home')
            },
            {
              path:'warehouse',
              component:h=>import('@/components/pages/company/home/Warehouse')
            }
          ]
        }
      ]
    }
  ]
})
