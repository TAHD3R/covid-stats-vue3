<template>
    <el-table :data="data.tableData" v-loading="data.loading" stripe show-summary :summary-method="getSummaries"
        class="rounded-lg" style="width: 100%" :empty-text="loadInfo">
        <el-table-column prop="name" label="名称" class="font-bold">
        </el-table-column>
        <el-table-column prop="sum" label="人数">
            <template #default="scope">
                <div>
                    <el-link @click="detailsPush(props.table_usertype, scope.row.name, `all`)" target="_blank"
                        type="primary">
                        {{ scope.row.sum }}
                    </el-link>
                </div>
            </template>
        </el-table-column>
        <el-table-column prop="intime" label="三天内">
            <template #default="scope">
                <div>
                    <el-link @click="detailsPush(props.table_usertype, scope.row.name, `intime`)" target="_blank"
                        type="primary">
                        {{ scope.row.intime }}
                    </el-link>
                </div>
            </template>
        </el-table-column>
        <el-table-column prop="overtime" label="超过三天">
            <template #default="scope">
                <div>
                    <el-link @click="detailsPush(props.table_usertype, scope.row.name, `overtime`)" target="_blank"
                        type="primary">
                        {{ scope.row.overtime }}
                    </el-link>
                </div>
            </template>
        </el-table-column>
    </el-table>
</template>
<script setup>
import { reactive } from 'vue'
import { pullTableData } from '../api/tabledata'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const router = useRouter()
const props = defineProps({
    table_usertype: String
})
const loadInfo = "暂无数据"
const data = reactive(
    {
        tableData: [],
        loading: true
    }
)
pullTableData(props.table_usertype)
    .then(res => {
        data.tableData = res.data.data.data
        data.loading = false
    })


function detailsPush(usertype, name, query) {
    store.commit("SET_QUERY", { usertype, name, query })
    router.push({ path: '/details', })
}


function getSummaries(param) {
    // columns 是所有列的一个数组
    const { columns, data } = param;
    const sums = [];
    columns.forEach((column, index) => {
        // column 是每一列，index 表示列的索引，第一列的时候不计算合计，显示自定义的文字内容
        if (index === 0) {
            sums[index] = '合计';
            return;
        }
        //下面这一坨代码就是把每一列中的所有单元格中的值转化成Number型，
        //然后对转化后的结果进行判断，如果是number型，则进行累加，
        //如果NaN型，说明单元格里是一些无法转化成number型的值，则返回自定义的内容
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                    return prev + curr;
                } else {
                    return prev;
                }
            }, 0);

        } else {
            sums[index] = 'N/A';
        }
    });

    return sums;
}

</script>