import { createApp } from 'vue'
// 根组件
import App from './App.vue'
// 路由
import router from './router'
import "./permission"
// 界面库
import 'virtual:windi.css'
import {ElTable, ElLink} from 'element-plus'
import 'element-plus/dist/index.css'
import 'vant/lib/index.css'
import "nprogress/nprogress.css"
// 状态管理
import store from './store'
// 挂载节点
const app = createApp(App)
// 使用
app.use(router)
app.use(store)
app.use(ElTable)
app.use(ElLink)
app.mount('#app')