<template>
    <ConfigProvider :theme-vars="themeVars">
        <router-view v-if="isRouterActive"></router-view>
    </ConfigProvider>
</template>

<script setup>
import { ref, reactive, onMounted, provide, nextTick } from 'vue'
import { ConfigProvider,  } from 'vant'
import { useStore } from 'vuex'

const store = useStore()
const isRouterActive = ref(true)

onMounted(() => {
    // 操作DOM修改背景颜色
    document.body.style.backgroundColor = "#F1F2F3"
    store.dispatch("setBadgeInfo")
})

// 刷新函数
provide('reload', () => {
    isRouterActive.value = false
    nextTick(() => {
        isRouterActive.value = true
    })
})

// 全局主题配置器
const themeVars = {
    tabbarHeight: '64px',
    CircleTextColor: "#f7f8fa",
    ButtonSmallHeight: "36px",
    ButtonSmallPadding: "0px 30px"
    
};

</script>

<style>
#nprogress .bar {
    height: 4px !important;
}
</style>