<template>
    <PullRefresh v-model="isLoading" head-height="50" @refresh="onRefresh">
        <UI_Navbar title="详情名单" />
        <Space direction="vertical" fill class="m-4">
            <span class="font-bold text-2xl" style="color:#323232;">{{ name }}</span>
            <span class="font-bold text" style="color:#646566;">{{ data.sendTime }}</span>
            <div v-if="query === 'all'">
                <UI_Tabbar_All :table_usertype="query" :table_usergroup="usertype" :table_target="name" />
            </div>
            <div v-else-if="query === 'intime'">
                <UI_Tabbar_Intime :table_usertype="query" :table_usergroup="usertype" :table_target="name" />
            </div>
            <div v-else-if="query === 'overtime'">
                <UI_Tabbar_Overtime :table_usertype="query" :table_usergroup="usertype" :table_target="name" />
            </div>
            <div v-else-if="query === 'three'">
                <UI_Tabbar_Threeshots :table_usertype="query" :table_usergroup="usertype" :table_target="name" />
            </div>
            <div v-else-if="query === 'other'">
                <UI_Tabbar_Others :table_usertype="query" :table_usergroup="usertype" :table_target="name" />
            </div>
        </Space>
    </PullRefresh>
    <UI_Tabbar />
</template>

<script setup>
import { ref, reactive, onMounted, inject } from 'vue'
import UI_Tabbar from '~/components/tabbar.vue'
import UI_Navbar from '~/components/navbar.vue'
import UI_Tabbar_All from '~/components/table_all.vue'
import UI_Tabbar_Intime from '~/components/table_intime.vue'
import UI_Tabbar_Overtime from '~/components/table_overtime.vue'
import UI_Tabbar_Threeshots from '~/components/table_threeshots.vue'
import UI_Tabbar_Others from '~/components/table_others.vue'
import { Space, PullRefresh, showNotify } from 'vant'
import { useStore } from 'vuex'

const store = useStore()
const reload = inject('reload')
const name = store.state.details.usertype.name
const usertype = store.state.details.usertype.usertype
const query = store.state.details.usertype.query
const isLoading = ref(false)

const data = reactive({
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
        reload()
        isLoading.value = false;
    }, 1000);
}
</script>