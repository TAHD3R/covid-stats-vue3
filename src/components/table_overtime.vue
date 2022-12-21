<template>
    <el-table :data="data.tableData.slice((data.currentPage - 1) * data.pageSize, data.currentPage * data.pageSize)"
        stripe class="rounded-lg" style="width: 100%" :empty-text="loadInfo">
        <el-table-column prop="uid" label="学工号">
        </el-table-column>
        <el-table-column prop="name" label="名称">
        </el-table-column>
        <el-table-column prop="days" label="天数">
            <template #default="scope">
                <div v-if="scope.row.days == '128'">
                    暂无数据
                </div>
                <div v-else>
                    {{ scope.row.days }}天
                </div>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination align='center' @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="data.currentPage" :page-size="data.pageSize" layout="prev, pager, next" :total="data.total"
        class="flex justify-center items-center mt-4 max-w-screen">
    </el-pagination>
</template>
<script setup>
import { reactive } from 'vue'
import { queryData } from '../api/tabledata'

const props = defineProps({
    table_usertype: String,
    table_usergroup: String,
    table_target: String,
})
const loadInfo = "暂无数据"
const data = reactive(
    {
        tableData: [],
        total: 0,
        currentPage: 1,
        pageSize: 10,
        loading: true
    }
)

queryData(props.table_usertype, props.table_usergroup, props.table_target)
    .then(res => {
        data.tableData = res.data.data.user
        data.total = res.data.data.user.length
        data.loading = false
    })

function handleSizeChange(val) {
    data.currentPage = 1;
    data.pageSize = val;
}

//当前页改变时触发 跳转其他页
function handleCurrentChange(val) {
    data.currentPage = val;
}

</script>