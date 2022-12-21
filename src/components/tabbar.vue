<template>
        <Tabbar route class="font-bold" placeholder fixed replace="true">
            <TabbarItem replace to="/" icon="graphic">扫码统计</TabbarItem>
            <TabbarItem replace to="/lists" icon="todo-list" :badge="store.state.badge.total">检测名单</TabbarItem>
            <TabbarItem replace to="/vaccine" icon="friends">疫苗接种</TabbarItem>
        </Tabbar>
</template>

<script setup>
import { Tabbar, TabbarItem } from 'vant'
import { useStore } from 'vuex'
const store = useStore()
</script>
