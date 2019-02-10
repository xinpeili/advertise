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
            <div class="timing">
                <el-button type="primary" :disabled="!flag" @click="startTime">立即投放</el-button>
                <div class="time_box">
                    <el-input v-model="time" :disabled="true"></el-input>
                </div>
                <el-button type="primary" :disabled="flag" @click="endTime">停止计时</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            time: 0,
            timer: null
        }
    },
    computed: {
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
    methods: {
        startTime () {
            this.timer = setInterval(() => {
                this.time ++;
            }, 1000)
        },
        endTime () {
            clearInterval(this.timer);
            this.time = 0;
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


