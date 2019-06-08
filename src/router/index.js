import Vue from 'vue'
import Router from 'vue-router'
import api from '../utils/api';
import Login from '@/components/pages/Login'

Vue.use(Router)

function requireAuth(to, from, next) {
    if (api.getToken())
        next();
    else
        next('/login');
}
export default new Router({
    routes: [{
            path: '/Login',
            component: Login
        },
        {
            path: '/',
            component: h =>
                import ('@/components/pages/Layout.vue'),
            redirect: '/company',
            // beforeEnter: requireAuth,
            children: [{
                path: 'company',
                component: h =>
                    import ('@/components/pages/company/Company.vue'),
                // 企业
                redirect: '/company/home',
                children: [
                    // 首页
                    {
                        path: 'home',
                        component: h =>
                            import ('@/components/pages/company/Home')
                    },
                    // 商品仓库
                    {
                        path: 'warehouse',
                        component: h =>
                            import ('@/components/pages/company/RouteBox'),
                        redirect: '/company/warehouse/warehouse',
                        children: [{
                                path: 'warehouse',
                                component: h =>
                                    import ('@/components/pages/company/warehouse/Warehouse')
                            },
                            {
                                path: 'export',
                                component: h =>
                                    import ('@/components/pages/company/warehouse/Export')
                            },
                            {
                                path: 'edit',
                                component: h =>
                                    import ('@/components/pages/company/warehouse/Edit')
                            }
                        ]

                    },
                    // 商品订单
                    {
                        path: 'shop_orders',
                        component: h =>
                            import ('@/components/pages/company/RouteBox'),
                        redirect: '/company/shop_orders/index',
                        query: {
                            id: 0
                        },
                        children: [{
                            path: 'index',
                            component: h =>
                                import ('@/components/pages/company/shopOrders/Index'),

                        }]
                    }
                ]
            }]
        }
    ]
})