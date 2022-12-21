<template>
    <PullRefresh v-model="isLoading" head-height="50" @refresh="onRefresh">
        <UI_Navbar title="搜索结果" />
        <Space direction="vertical" fill class="m-4">
            <span class="font-bold text-2xl" style="color:#323232;">您搜索的内容:{{ store.state.search.query }}</span>
            <span class="font-bold text" style="color:#646566;">{{ data.sendTime }}</span>
            <UI_Tabbar_Search :query="store.state.search.query" />
        </Space>
    </PullRefresh>
    <UI_Tabbar />
</template>

<script setup>
import { reactive, onMounted, inject } from 'vue'
import UI_Tabbar from '~/components/tabbar.vue'
import UI_Navbar from '~/components/navbar.vue'
import UI_Tabbar_Search from '~/components/table_search.vue'
import { Space, PullRefresh, showNotify } from 'vant'
import { useStore } from 'vuex'

const reload = inject('reload')
const store = useStore()
const isLoading = true

const data = reactive({
    sendTime: "",
    query: ""
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
        reload()
        isLoading.value = false;
    }, 1000);
}

</script>