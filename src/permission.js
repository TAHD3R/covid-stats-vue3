import router from './router'
import { showFullLoading, hideFullLoading } from '~/utils'



router.beforeEach(async (to, from, next) => {
    // 显示loading
    showFullLoading()

    // 设置页面标题
    let title = (to.meta.title ? to.meta.title : "") + "-核酸检测数据平台"
    document.title = title
    next()
})

// 全局后置守卫
router.afterEach((to, from) => {
    hideFullLoading()
})