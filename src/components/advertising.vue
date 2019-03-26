<template>
    <div class="wrapper">
        <!-- 3d轮播插件 -->
        <carousel3d :slides="Slides3dPic"></carousel3d>

        <el-tabs class="tab" v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="全部广告" name="first"></el-tab-pane>
            <el-tab-pane label="我发布的" name="second"></el-tab-pane>
        </el-tabs>

        <div ref="element" class="ad-box">
            <router-link v-for="(item,index) in adMsgArr" :key="index" class="ad-list" tag="div" :to="{name: 'AdMsg', params: {id: '2019' + item.ad_id}}">
                <div class="box" @click="setStore(index)">
                    <!-- 350px * 220px -->
                    <div class="img-box">
                        <div class="box"></div>
                        <img :src="'/api/serPicMsg?path=' + item.pic_path" alt="">
                    </div>
                    <div class="content">
                        <h1>{{item.title}}</h1>
                        <div class="comp">{{item.company}}</div>
                    </div>
                    <div class="msg">
                        <ul>
                            <li>
                                <div>{{item.views}}</div>
                                <div>浏览量</div>
                            </li>
                            <li>
                                <div>{{item.comments}}</div>
                                <div>评论数</div>
                            </li>
                        </ul>
                    </div>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
import carousel3d from './carousel3d'
import axios from 'axios'
export default {
    data() {
        return {
            activeName: 'first',
            adMsgArr: [],
            Slides3dPic: [],
            allAdNum: 0,
            times: 0,
            flag: true
        }
    },
    created() {
        axios.get('/api/serAd?offset=0&limit=9').then(res => {
            this.adMsgArr = res.data.rows;
            this.allAdNum = res.data.total;
            console.log(this.adMsgArr)
        })
        axios.get('/api/serAllPic').then(result => {
            this.Slides3dPic = result.data;
        })
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll)
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
            if (tab.label == "全部") {
                axios.get('/api/serAd?offset=0&limit=9').then(res => {
                    this.adMsgArr = res.data.rows;
                    this.allAdNum = res.data.total;
                    console.log(this.adMsgArr)
                })
                axios.get('/api/serAllPic').then(result => {
                    this.Slides3dPic = result.data;
                })
            } else {
                
            }
        },
        setStore(index) {
            this.$store.commit('setVal',this.adMsgArr[index]);
            // 让数据库中浏览量加一
            axios.get('/api/addViews?viewsNum='+this.adMsgArr[index].views+'&adId='+this.adMsgArr[index].ad_id);
        },
        // 滚动时触发
        handleScroll() {
            console.log(this.adMsgArr.length, this.allAdNum);
            if(this.$refs.element && this.adMsgArr.length < this.allAdNum) {
                var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop;
                var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
                var adBoxHeight = this.$refs.element.offsetHeight;
                // console.log(scrollHeight + clientHeight >= adBoxHeight + 460)
                if(scrollHeight + clientHeight >= adBoxHeight + 460 && this.flag) {
                    this.flag = false;
                    // loading动画
                    const loading = this.$loading({
                        lock: true,
                        text: 'Loading',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    });
                    // 发送ajax
                    axios.get(`/api/serAd?offset=${9 + this.times * 6}&limit=6`).then(res => {
                        loading.close();
                        console.log(res)
                        this.times ++;
                        this.adMsgArr = this.adMsgArr.concat(res.data.rows);
                        this.flag = true;
                    })
                }
            }
            
        }
    },
    components: {
        carousel3d
    }
}
</script>

<style lang="stylus" scoped>
.wrapper {
    .tab {
        padding: 0 100px 20px 100px;
    }
    .ad-box {
        width: 1240px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: space-around;
        margin: 0 auto;
        .ad-list {
            width: 350px;
            border: 1px solid #E7E7E7;
            border-radius: 5px;
            margin-bottom: 50px;
            box-shadow: 0 10px 20px 0 rgba(37,39,95,0.06);
            transition: all 0.5s;
            cursor: pointer;
            &:hover {
                box-shadow: 0 10px 20px 0 rgba(37,39,95,0.3);
            }
            .box {
                width: 100%;
                height: 100%;
                .img-box {
                    width: 350px;
                    height: 220px;
                    position: relative;
                    div, img {
                        width: 100%;
                        height: 100%;
                    }
                    img {
                        border-radius: 5px;
                    }
                    div {
                        position: absolute;
                        top: 0;
                        left: 0;
                    }
                }
                .content {
                    padding: 20px;
                    box-sizing: border-box;
                    h1 {
                        font-size: 20px;
                        color: #333333;
                        line-height: 30px;
                        margin-bottom: 15px;
                    }
                    .comp {
                        font-size: 16px;
                        color: #87878A;
                        line-height: 24px;
                    } 
                }
                .msg {
                    border-top: 1px solid #E7E7E7;
                    ul {
                        padding: 20px 0;
                        margin: 0 36px;
                        display: flex;
                        justify-content: space-around;
                        li {
                            text-align: center;
                            div:first-of-type {
                                font-size: 20px;
                                color: #4581fb;
                                line-height: 24px;
                                margin-bottom: 5px;
                                font-weight: bold;
                            }
                            div:last-of-type {
                                font-size: 12px;
                                color: #87878A;
                                line-height: 18px;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>



