import { createRouter, createWebHistory } from 'vue-router'
// import Index from '~/pages/index.vue'
// import List from '~/pages/list.vue'
// import Vaccine from '~/pages/vaccine.vue'
// import Details from '~/pages/details.vue'
// import Search from '~/pages/search.vue'

// 路由配置

const routes = [{
    path: "/",
    name: "index",
    component: () => import('~/pages/index.vue'),
    meta: {
        title: "扫码统计",
    }
}, {
    path: "/lists",
    name: "lists",
    component: () => import('~/pages/list.vue'),
    meta: {
        title: "检测名单",
    }
}, {
    path: "/vaccine",
    name: "vaccine",
    component: () => import('~/pages/vaccine.vue'),
    meta: {
        title: "疫苗接种",
    }
}, {
    path: "/details",
    name: "details",
    component: () => import('~/pages/details.vue'),
    meta: {
        title: "详情名单",

    }
}, {
    path: "/search",
    name: "search",
    component: () => import('~/pages/search.vue'),
    meta: {
        title: "搜索",
    }
},
]

// 路由配置
const router = createRouter({
    history: createWebHistory("/nat/"),
    base: "/nat/",
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 } //期望滚动到哪个的位置
        }
    },
})

export default router