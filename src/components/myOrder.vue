<template>
    <div>
        <div class="user_info">
            用户名：{{this.curUser}}
        </div>
        <el-table
            :data="tableData"
            style="width: 100%; padding: 40px">
            <el-table-column
                type="index"
                prop="id"
                label="订单id"
                width="180">
                    {{ index }}
            </el-table-column>
            <el-table-column
                prop="userName"
                label="投放者"
                width="180">
                <template slot-scope="scope">
                    {{ scope.row.user_name }}
                </template>
            </el-table-column>
            <el-table-column
                prop="adName"
                label="广告名称"
                width="280">
                <template slot-scope="scope">
                    {{ scope.row.ad_title }}
                </template>
            </el-table-column>
            <el-table-column
                prop="allTime"
                label="投放总时间">
                <template slot-scope="scope">
                    {{ scope.row.time }}
                </template>
            </el-table-column>
            <el-table-column
                prop="endTime"
                label="结束投放时间">
                <template slot-scope="scope">
                    {{ scope.row.ctime.split('.')[0] }}
                </template>
            </el-table-column>
            <el-table-column
                prop="caozuo"
                label="操作"
                width="200">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                    <el-button @click="delClick(scope.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            @current-change="pageClick">
        </el-pagination>
    </div>

</template>

<script>
import { mapState, mapMutations } from 'vuex';
import axios from 'axios';
export default {
    data() {
        return {
            tableData: [],
            total: 0
        }
    },
    created() {
        this.init();
    },
    computed: {
        ...mapState({
            curUser: state => state.curUser
        })
    },
    methods: {
        init(offset = 0, limit = 10) {
            axios.get(`/api/getOrder?userName=${this.curUser}&offset=${offset}&limit=${limit}`).then(res => {
                this.tableData = res.data.rows;
                this.total = res.data.total;
            })
        },
        handleClick(row) {

        },
        delClick(row) {

        },
        pageClick(curPage) {

        }  
    }
}
</script>

<style lang="stylus" scoped>

</style>