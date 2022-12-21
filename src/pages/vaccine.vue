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
        <Tabs v-model:active="active" color="#1989fa" sticky swipeable replace="true" :animated="isTrue"
            :lazy-render="isTrue">
            <Tab title="本科生" title-style="font-weight:700">
                <Space direction="vertical" fill class="m-4">
                    <span class="font-bold text-2xl" style="color:#323232;">本科生疫苗接种结果统计</span>
                    <span class="font-bold text" style="color:#646566;">{{ data.sendTime }}</span>
                    <UI_TableVac table_usertype="ungrad" />
                </Space>
            </Tab>
            <Tab title="研究生" title-style="font-weight:700">
                <Space direction="vertical" fill class="m-4">
                    <span class="font-bold text-2xl" style="color:#323232;">研究生疫苗接种结果统计</span>
                    <span class="font-bold text" style="color:#646566;">{{ data.sendTime }}</span>
                    <UI_TableVac table_usertype="grad" />
                </Space>
            </Tab>
            <Tab title="教职工(学院)" title-style="font-weight:700">
                <Space direction="vertical" fill class="m-4">
                    <span class="font-bold text-2xl" style="color:#323232;">学院教职工疫苗接种结果统计</span>
                    <span class="font-bold text" style="color:#646566;">{{ data.sendTime }}</span>
                    <UI_TableVac table_usertype="faculty_academy" />
                </Space>
            </Tab>
            <Tab title="教职工(部门)" title-style="font-weight:700">
                <Space direction="vertical" fill class="m-4">
                    <span class="font-bold text-2xl" style="color:#323232;">部门教职工疫苗接种结果统计</span>
                    <span class="font-bold text" style="color:#646566;">{{ data.sendTime }}</span>
                    <UI_TableVac table_usertype="faculty_dept" />
                </Space>
            </Tab>
        </Tabs>
    </PullRefresh>
    <UI_Tabbar />
</template>

<script setup>
import { ref, reactive, onMounted, inject } from 'vue'
import { Space, Tabs, Tab, showNotify, PullRefresh } from 'vant'
import UI_Tabbar from '~/components/tabbar.vue'
import UI_TableVac from '~/components/table_vac.vue'

const reload = inject('reload')
const isLoading = ref(false)

const isTrue = ref(true)
const isFalse = ref(false)
// Tab索引
const active = ref(0)

const data = reactive({
    ungrad: 0,
    grad: 0,
    faculty_academy: 0,
    faculty_dept: 0,
    sendTime: ""
})

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

const onRefresh = () => {
    setTimeout(() => {
        showNotify({ type: 'success', message: '已刷新数据', duration: 1000 })
        isLoading.value = false;
        reload()
    }, 1000);
}
</script> 