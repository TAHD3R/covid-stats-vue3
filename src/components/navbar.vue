<template>
    <div class="van-safe-area-top">
        <NavBar :title="title" left-text="返回" left-arrow @click-left="onClickLeft" border />
    </div>
</template>

<script setup>
import { NavBar } from 'vant'
import { useRouter } from 'vue-router'
const router = useRouter()

defineProps({
    title: String
})

const onClickLeft = () => router.back()
</script>