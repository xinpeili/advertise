<template>
    <div class="ad-msg">
        <div class="title-wrapper">
            <div class="title">{{adArr.title}}</div>
            <div class="company">{{adArr.company}}</div>
            <ul>
                <li>
                    <div class="views-num">{{adArr.views}}</div>
                    <div class="views">浏览量</div>
                </li>
                <li>
                    <div class="comments-num">{{adArr.comments}}</div>
                    <div class="comments">评论数</div>
                </li>
            </ul>
        </div>
        <div class="content-wrapper">
            <div class="about-box">
                <div class="about-text">关于品牌</div>
                <div class="about">{{adArr.about}}</div>
            </div>
            <div class="type-box">
                <div class="type-text">企业类型</div>
                <ul>
                    <li>{{adArr.type}}</li>
                </ul>
            </div>
            <div class="target-box">
                <div class="target-text">营销目标</div>
                <ul>
                    <li v-for="(item, index) in targetArr" :key="index">{{item}}</li>
                </ul>
            </div>
            <div class="user">
                <div class="target-text">发布者：{{adArr.user_name}}</div>
            </div>
            <div class="timing" v-if="isShow">
                <el-button type="primary" :disabled="!flag" @click="startTime">立即投放</el-button>
                <div class="time_box">
                    <el-input v-model="time" :disabled="true"></el-input>
                </div>
                <el-button type="primary" :disabled="flag" @click="endTime">停止计时</el-button>
            </div>
        </div>
        <el-dialog title="投放报告" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="广告名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="投放时间" :label-width="formLabelWidth">
                    <el-input :disabled="true" v-model="form.time" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <!-- <el-button @click="dialogFormVisible = false">取 消</el-button> -->
                <el-button plain type="primary" @click="inTheOrder">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import axios from 'axios';
export default {
    data() {
        return {
            time: 0,
            timer: null,
            dialogTableVisible: false,
            dialogFormVisible: false,
            form: {
                name: '',
                time: '',
                type: [],
            },
            formLabelWidth: '70px',
            subFlag: 'true'
        }
    },
    computed: {
        ...mapState({
            curUser: state => state.curUser
        }),
        // curUser () {
        //     // 有问题，不能及时刷新
        //     return this.$cookieStore.getCookie("userName");
        // },
        isShow () {
            return this.adArr.user_name == this.curUser;
        },
        adArr () {
            return this.$store.state.adArr;
        },
        targetArr () {
            return this.adArr.target.split("；");
        },
        flag () {
            if(this.time !== 0) {
                return false;
            }
            return true;
        }
    },
    // https://blog.csdn.net/buyaopingbixiazai/article/details/80584441
    // 数据库增加两个字段：isStart、adMsgAdd
    // 1.后端写一个接口，根据新加的isStart判断刚进入页面时按钮样式，每一个详情页created里都调用
    // 2.重写startTime和endTime
    // 3.endTime时清除local
    // 4.根据新加的isStart判断浏览量变化时，增加数传到后端adMsgAdd
    methods: {
        startTime () {
            this.$message({
                message: '投放成功',
                type: 'success'
            });
            this.timer = setInterval(() => {
                this.time ++;
            }, 1000)
            // 记录开始计时时的时间戳，并进行存储
            // let startDate = new Date().getTime();
            // localStorage.setItem('startTime', startDate);
        },
        async endTime () {
            this.dialogFormVisible = true;
            clearInterval(this.timer);
            this.form.name = this.adArr.title;
            if (this.time < 60) {
                this.form.time = this.time + '秒';
            } else if (this.time > 60 && this.time < 3600) {
                this.form.time = parseInt(this.time / 60) + '分' + parseInt(this.time % 60) + '秒';
            }
            try {
                this.subFlag = true;
                const data = await axios.get(`/api/order?userName=${this.curUser}&adName=${this.form.name}&time=${this.form.time}`)
                console.log(data)
                if (data.statusText != 'OK') {
                    this.$message({
                        showClose: true,
                        message: '投放失败了！请重新开始投放',
                        type: 'error'
                    });
                    return;
                } 
            } catch (error) {
                this.subFlag = false
                this.$message({
                    showClose: true,
                    message: '网络错误',
                    type: 'error'
                });
            }
            this.time = 0;

            // 结束时获取当前时间戳，并减去开始的
            // let endDate = new Date().getTime();
            // this.form.time = turnFormat( endDate - parseInt(localStorage.getItem('startTime')) );
        },
        // turnFormat(time) {
        //     if (time < 60) {
        //         return time + '秒';
        //     } else if (time > 60 && time < 3600) {
        //         return parseInt(time / 60) + '分' + parseInt(time % 60) + '秒';
        //     }
        // },
        inTheOrder () {
            this.dialogFormVisible = false;
            if(!this.subFlag) return;
            const h = this.$createElement;
            this.$notify({
                title: '提交成功',
                message: h('i', { style: 'color: teal'}, '已将订单放入“我的订单”中，请到“我的订单”中查看')
            });
        }
    }
}
</script>

<style lang="stylus" scoped>
.ad-msg{
    background-color: #f9f9f9;
    .title-wrapper {
        width: 100%;
        height: 450px;
        background-image: linear-gradient(224deg, #00C1DF 0%, #0D6AF2 53%, #182FEC 100%);
        color: #fff;
        text-align: center;
        .title {
            padding-top: 75px;
            font-size: 40px;
            line-height: 50px;
            width: 1000px;
            margin: 0 auto 15px;
            // overflow: hidden;
        }
        .company {
            font-size: 18px;
            line-height: 28px;
        }
        ul {
            position: relative;
            width: 500px;
            display: flex;
            padding-top: 40px;
            margin: 40px auto 0;
            &::before {
                content: '';
                position: absolute;
                width: 40px;
                height: 1px;
                top: 0;
                left: calc(50% - 20px);
                background-color: rgba(255, 255, 255, 0.6);
            }
            li {
                flex: 1;
                div:first-of-type {
                    font-size: 24px;
                    margin-bottom: 5px;
                }
            }
        }
    }
    .content-wrapper {
        background-color: #fff;
        width: 1180px;
        margin: -60px auto 0;
        padding: 60px;
        box-sizing: border-box;
        .about-box {
            margin-bottom: 50px;
            .about-text {
                font-size: 24px;
                color: #4581fb;
                line-height: 36px;
                margin-bottom: 20px;
                font-weight: bold;
            }
            .about {
                font-size: 18px;
                color: #393939;
                line-height: 28px;
                margin-bottom: 1.5em;
            }
        }
        .type-box {
            .type-text {
                font-size: 24px;
                color: #4581fb;
                line-height: 36px;
                margin-bottom: 20px;
                font-weight: bold;
            }
            ul {
                li {
                    font-size: 18px;
                    color: #393939;
                    line-height: 28px;
                    margin-bottom: 1.5em;
                    list-style: disc;
                    margin-left: 20px;
                }
            }
        }
        .target-box {
            .target-text {
                font-size: 24px;
                color: #4581fb;
                line-height: 36px;
                margin-bottom: 20px;
                font-weight: bold;
            }
            ul {
                li {
                    font-size: 18px;
                    color: #393939;
                    line-height: 28px;
                    margin-bottom: 1.5em;
                    list-style: disc;
                    margin-left: 20px;
                }
            }
        }
        .user {
            color: #999;
            margin-bottom: 30px;
        }
        .timing {
            width: 100%;
            .time_box {
                display: inline-block;
                width: 100px;
            }
        }
    }
}
</style>


