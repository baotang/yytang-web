import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const ROUTER_SETTING = {
	mode: 'history', // default value 'hash'
    base: '/',
	routes: [
        {
            path: '/',
            component: resolve => require(['./pages/main/index.vue'], resolve),
            children: [
                {
                    path: '',
                    name: 'home',
                    component: resolve => require(['./pages/main/content.vue'], resolve),
                    meta: {
                        title: '主页'
                    }
                },
                {
                    path: 'welcom/:category?',
                    component: resolve => require(['./pages/main/content.vue'], resolve),
                    meta: {
                        title: 'welcom'
                    }
                },
                {
                    path: '/:column(timeline|special|collection|discover)/:category?',
                    component: resolve => require(['./pages/column/index.vue'], resolve)
                },
                {
                    path: 'notes',
                    component: resolve => require(['./pages/notes/index.vue'], resolve),
                    meta: {
                         title: '笔记'
                    },
                    children: [
                        {
                            path: 'write',
                            component: resolve => require(['./pages/notes/write.vue'], resolve)
                        },
                        {
                            path: 'edit',
                            component: resolve => require(['./pages/notes/edit.vue'], resolve)
                        }
                    ]
                }
            ]
        },
        {
            path: '/entrance',
            component: resolve => require(['./pages/entrance/index.vue'], resolve),
            redirect: '/entrance/login',
            children: [
                {
                     path: 'login', 
                     component: resolve => require(['./pages/entrance/Login.vue'], resolve),
                     meta: {
                         title: 'sign in'
                    } 
                },
                { 
                    path: 'register', 
                    component: resolve => require(['./pages/entrance/Register.vue'], resolve),
                    meta: {
                         title: 'sign up'
                    } 
                },
                { path: '*', redirect: 'login' }
            ]
        },
        {
            path: '*',
            component: resolve => require(['./pages/error/404.vue'], resolve)
        }
    ],
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }
};
const router = new VueRouter(ROUTER_SETTING)
const title = '弹枪';
router.beforeEach((to, from, next) => {
    let titleStr = ''
    // 倒序遍历数组获取匹配到的路由节点，拼接各部分title
    for (let i = to.matched.length - 1; i >= 0; i--) {
        titleStr += `${to.matched[i].meta.title ? to.matched[i].meta.title : ''}`
    }
    // 添加站点名
    titleStr += `-${title}`;
    // 更新title
    document.title = titleStr;
    next();
});

export default router;
