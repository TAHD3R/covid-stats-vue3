<template>
    <PullRefresh v-model="isLoading" head-height="50" @refresh="onRefresh">
        <template #pulling>
            <div>向下滑动刷新页面</div>
        </template>
        <template #loosing>
            <div>释放即可刷新页面</div>
        </template>
        <template #loading>
            <div>信息中心 提供技术支持</div>
        </template>
        <form action="/">
            <Search v-model="value" show-action shape="round" placeholder="请输入搜索关键词（学院/部门）" @search="onSearch">
                <template #action>
                </template>
            </Search>

            <Popup v-model:show="searchShow" round position="bottom" :style="{ height: '30%' }" />
        </form>
        <Tabs v-model:active="active" color="#1989fa" sticky swipeable replace="true" :animated="isTrue"
            :lazy-render="isTrue">
            <Tab title="本科生" :badge="store.state.badge.ungrad" title-style="font-weight:700">
                <Space direction="vertical" fill class="m-4">
                    <span class="font-bold text-2xl" style="color:#323232;">本科生核酸检测结果统计</span>
                    <span class="font-bold text" style="color:#646566;">{{ data.sendTime }}</span>
                    <UI_Table table_usertype="ungrad" />
                </Space>
            </Tab>
            <Tab title="研究生" :badge="store.state.badge.grad" title-style="font-weight:700">
                <Space direction="vertical" fill class="m-4">
                    <span class="font-bold text-2xl" style="color:#323232;">研究生核酸检测结果统计</span>
                    <span class="font-bold text" style="color:#646566;">{{ data.sendTime }}</span>
                    <UI_Table table_usertype="grad" />
                </Space>
            </Tab>
            <Tab title="教职工(学院)" :badge="store.state.badge.faculty_academy" title-style="font-weight:700">
                <Space direction="vertical" fill class="m-4">
                    <span class="font-bold text-2xl" style="color:#323232;">学院教职工核酸检测结果统计</span>
                    <span class="font-bold text" style="color:#646566;">{{ data.sendTime }}</span>
                    <UI_Table table_usertype="faculty_academy" />
                </Space>
            </Tab>
            <Tab title="教职工(部门)" :badge="store.state.badge.faculty_dept" title-style="font-weight:700">
                <Space direction="vertical" fill class="m-4">
                    <span class="font-bold text-2xl" style="color:#323232;">部门教职工核酸检测结果统计</span>
                    <span class="font-bold text" style="color:#646566;">{{ data.sendTime }}</span>
                    <UI_Table table_usertype="faculty_dept" />
                </Space>
            </Tab>
        </Tabs>
    </PullRefresh>
    <UI_Tabbar />
</template>

<script setup>
import { ref, reactive, onMounted, inject } from 'vue'
import { Button, Space, Tabs, Tab, Search, showNotify, Popup, PullRefresh, Loading } from 'vant'
import UI_Tabbar from '~/components/tabbar.vue'
import UI_Table from '~/components/table.vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const route = useRouter()
const reload = inject('reload')
const isTrue = ref(true)
const isFalse = ref(false)
// Tab索引
const active = ref(0)
// 输入栏内容
const value = ref('')

const data = reactive({
    ungrad: 0,
    grad: 0,
    faculty_academy: 0,
    faculty_dept: 0,
    sendTime: ""
})

const searchShow = ref(false)
const isLoading = ref(false)

onMounted(() => {
    const nowDate = new Date();
    const date = {
        year: nowDate.getFullYear(),
        month: nowDate.getMonth() + 1,
        date: nowDate.getDate(),
        arr: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
        day: nowDate.getDay()
    }
    const newmonth = date.month > 9 ? date.month : '0' + date.month
    const day = date.date > 9 ? date.date : '0' + date.date

    data.sendTime = date.year + '年' + newmonth + '月' + day + '日 ' + date.arr[date.day]

})

const onSearch = (val) => {
    showNotify({ type: 'warning', message: '目前仅支持模糊搜索' });
    store.commit("SET_SEARCH", val)
    route.push('/search')
}

const onRefresh = () => {
    setTimeout(() => {
        showNotify({ type: 'success', message: '已刷新数据', duration: 1000 })
        isLoading.value = false;
        reload()
    }, 1000);
}
</script> 