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
        <Space direction="vertical" fill class="m-4">
            <span class="font-bold text-xl" style="color:#646566;">{{ data.sendTime }}</span>
            <span class="font-bold text-2xl" style="color:#323232;">概要</span>
            <div class="flex flex-row h-12rem rounded-lg bg-neutral-800 shadow-xl shadow-dark-800/30">
                <Skeleton title :row="4" animate round title-width="300px" row-width="200px" :loading="skeletonLoading"
                    class="flex items-center justify-center">
                    <div class="flex flex-col p-4 justify-center text-neutral-300">
                        <div>应扫码</div>
                        <div class="font-bold">{{ data.qrcode.total }}人</div>
                        <div>已扫码</div>
                        <div class="font-bold">{{ data.qrcode.valid }}人</div>
                        <div>未扫码</div>
                        <div class="font-bold">{{ data.qrcode.invalid }}人</div>
                    </div>
                    <div class="flex flex-row ml-auto mr-4 items-center justify-end">
                        <Circle v-model:current-rate="data.qrcode.rate" :speed="100" :rate="data.qrcode.rate"
                            :color="gradientColor" :text="data.qrcode.text" stroke-width="100" size="160px"
                            layer-color="#323232"></Circle>
                    </div>
                </Skeleton>
            </div>
        </Space>
        <Space direction="vertical" fill class="mb-4">
            <span class="font-bold text-2xl m-4" style="color:#323232;">详情</span>
            <CellGroup title="各点位情况" inset>
                <Cell title="核酸检测点A" is-link center label="东区—高精尖大厦" @click="showPopup" />
                <Popup v-model:show="show" round position="bottom" :style="{ height: '35%' }">
                    <Space direction="vertical" fill class="mt-4 mx-4">
                        <span class="font-bold text-xl" style="color:#323232;">东区—高精尖大厦</span>
                    </Space>
                    <Divider />
                    <Cell title="已扫码人数" :value="data.qrcode.valid" />
                    <Cell title="未扫码人数" :value="data.qrcode.invalid" />
                    <Space direction="vertical" fill class="mt-4 mx-4">
                        <Button size="large" icon="arrow" icon-position="right" block
                            color="linear-gradient(to right, #ff6034, #ee0a24)">
                            未扫码人员详情
                        </Button>
                    </Space>
                </Popup>
            </CellGroup>
        </Space>
    </PullRefresh>
    <UI_Tabbar></UI_Tabbar>
</template>

<script setup>
import { ref, onMounted, reactive, inject } from 'vue'
import { Button, Cell, CellGroup, Popup, Space, Circle, PullRefresh, showNotify, Divider, Skeleton } from 'vant';
import UI_Tabbar from '~/components/tabbar.vue'
import { qrcodeData } from '../api/tabledata'

const isLoading = ref(false)
const show = ref(false)
const skeletonLoading = ref(true)

const reload = inject('reload')

const gradientColor = {
    '0%': '#3fecff',
    '100%': '#6149f6',
}

const data = reactive({
    sendTime: "",
    qrcode: {}
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

qrcodeData()
    .then(res => {
        console.log(res)
        data.qrcode.total = res.data.data.total
        data.qrcode.valid = res.data.data.valid
        data.qrcode.invalid = res.data.data.invalid
        data.qrcode.rate = res.data.data.percent
        data.qrcode.text = data.qrcode.rate + "%"
        skeletonLoading.value = false
    })

const onRefresh = () => {
    setTimeout(() => {
        showNotify({ type: 'success', message: '已刷新数据', duration: 1000 })
        reload()
        isLoading.value = false;
    }, 1000);
}

const showPopup = () => {
    show.value = true;
}

</script>

<style scoped>

</style>