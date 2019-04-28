<template>
    <div class="my_order">
        <div class="user_info">
            用户名：{{this.curUser}}
        </div>
        <el-table
            :data="tableData"
            style="width: 100%; margin: 40px;">
            <el-table-column
                type="index"
                prop="id"
                label="序号"
                width="180">
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
                prop="addViews"
                label="投放状态下增加的浏览数">
                <template slot-scope="scope">
                    {{ scope.row.ad_views }}
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

        <el-dialog title="查看投放详情" :visible.sync="dialogFormVisible">
            <el-form :model="curTableData">
                <el-form-item label="订单id" :label-width="formLabelWidth">
                    <el-input :disabled="true" v-model="curTableData.id" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="投放者" :label-width="formLabelWidth">
                    <el-input :disabled="true" v-model="curTableData.user_name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="广告名称" :label-width="formLabelWidth">
                    <el-input :disabled="true" v-model="curTableData.ad_title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="投放总时间" :label-width="formLabelWidth">
                    <el-input :disabled="true" v-model="curTableData.time" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="结束投放时间" :label-width="formLabelWidth">
                    <el-input :disabled="true" v-model="curTableData.ctime" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="投放状态下增加的浏览数" :label-width="formLabelWidth">
                    <el-input :disabled="true" v-model="curTableData.ad_views" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button plain type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>

        <el-pagination
            class="page"
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
            curTableData: {},
            total: 0,
            formLabelWidth: '100px',
            dialogFormVisible: false
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
            this.curTableData = row;
            this.dialogFormVisible = true;
        },
        delClick(row) {

        },
        pageClick(curPage) {
            var curOffset = 10 * (curPage - 1);
            this.init(curOffset);
            window.scrollTo(0, 0);
        }  
    }
}
</script>

<style lang="stylus" scoped>
.my_order {
    padding: 10px;
    .user_info {
        font-size: 30px;
        margin: 20px 0 0 40px;
        color: #999;
    }
    .page {
        padding: 0 20px 20px 0;
        text-align: center;
    }
}
</style>