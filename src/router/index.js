import Vue from 'vue'
import Router from 'vue-router'
import api from '../utils/api';
import Login from '@/components/pages/Login';
import sigin from '@/components/pages/Sigin';
import reset from '@/components/pages/Reset';
import welcome from '@/components/pages/welcome';

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
            path: '/sigin',
            component: sigin
        },
        {
            path: '/reset',
            component: reset
        },
        {
            path: '/welcome',
            component: welcome
        },
        {
            path: '/goods_preview_tel',
            component: h =>
                import ('@/components/pages/goodsPreviewTel')
        },
        {
            path: '/',
            component: h =>
                import ('@/components/pages/Layout.vue'),
            redirect: '/company',
            beforeEnter: requireAuth,
            children: [{
                    path: '/goods_preview',
                    component: h =>
                        import ('@/components/pages/company/goodsPreview')
                },
                {
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

                            children: [{
                                    path: 'index',
                                    component: h =>
                                        import ('@/components/pages/company/shopOrders/Index'),


                                },
                                {
                                    path: 'order_details',
                                    component: h =>
                                        import ('@/components/pages/company/shopOrders/OrderDetails'),

                                },
                                {
                                    path: 'after_sale',
                                    component: h =>
                                        import ('@/components/pages/company/shopOrders/AfterSale'),

                                },
                                {
                                    path: 'after_sale_edit',
                                    component: h =>
                                        import ('@/components/pages/company/shopOrders/AfterSaleEdit'),

                                },
                            ]
                        },
                        // 服务订单
                        {
                            path: 'service_orders',
                            component: h =>
                                import ('@/components/pages/company/RouteBox'),
                            redirect: '/company/service_orders/index',
                            query: {
                                id: 0
                            },
                            children: [{
                                path: 'index',
                                component: h =>
                                    import ('@/components/pages/company/serviceOrders/Index'),

                            }]
                        },
                        // 财务管理
                        {
                            path: 'financial',
                            component: h =>
                                import ('@/components/pages/company/financial/Financial'),
                            redirect: '/company/financial/survey',
                            children: [
                                // 财务概况
                                {
                                    path: 'survey',
                                    component: h =>
                                        import ('@/components/pages/company/financial/Survey'),
                                },
                                // 收支明细
                                {
                                    path: 'Detailed',
                                    component: h =>
                                        import ('@/components/pages/company/financial/Detailed'),

                                },
                                // 财务汇总
                                {
                                    path: 'summary',
                                    component: h =>
                                        import ('@/components/pages/company/financial/Summary'),
                                },
                                // 发票管理
                                {
                                    path: 'invoice',
                                    component: h =>
                                        import ('@/components/pages/company/financial/Invoice'),
                                },
                                // 充值管理
                                {
                                    path: 'recharge',
                                    component: h =>
                                        import ('@/components/pages/company/financial/Recharge'),
                                },
                                // 提现管理
                                {
                                    path: 'cash',
                                    component: h =>
                                        import ('@/components/pages/company/financial/Cash'),
                                },
                            ]

                        },
                        // 团队管理
                        {
                            path: 'team',
                            component: h =>
                                import ('@/components/pages/company/team/Team'),
                            redirect: '/company/team/user',

                            children: [
                                // 用户
                                {
                                    path: 'user',
                                    component: h =>
                                        import ('@/components/pages/company/team/User'),
                                },

                                // 角色
                                {
                                    path: 'role',
                                    component: h =>
                                        import ('@/components/pages/company/team/Role'),
                                },
                            ]
                        },
                        // 添加/编辑用户
                        {
                            path: 'user_edit',
                            component: h =>
                                import ('@/components/pages/company/team/addUser'),
                        },
                        // 添加/编辑角色
                        {
                            path: 'role_edit',
                            component: h =>
                                import ('@/components/pages/company/team/addRole'),
                        },
                        // 地址管理
                        {
                            path: 'address',
                            component: h =>
                                import ('@/components/pages/company/address/Address'),
                        },
                        // 安全设置
                        {
                            path: 'safetySetting',
                            component: h =>
                                import ('@/components/pages/company/safetySetting/SafetySetting'),
                        },
                        // 企业认证
                        {
                            path: 'approve',
                            component: h =>
                                import ('@/components/pages/company/approve/Approve'),
                        },
                        // 下载中心
                        {
                            path: 'download',
                            component: h =>
                                import ('@/components/pages/company/download/Download'),
                            redirect: '/company/download/programme',
                            children: [
                                // 方案下载
                                {
                                    path: 'programme',
                                    component: h =>
                                        import ('@/components/pages/company/download/Programme'),
                                },
                                // 报表下载
                                {
                                    path: 'report',
                                    component: h =>
                                        import ('@/components/pages/company/download/Report'),
                                }
                            ]
                        },
                    ]
                }
            ]
        },
        {
            path: '/test',
            component: h =>
                import ('@/components/pages/test')
        }
    ]
})