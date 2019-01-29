<template>
    <div class="wrapper">
        <!-- 3d轮播插件 -->
        <carousel3d></carousel3d>

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
            adMsgArr: [],
            flag: true
        }
    },
    created() {
        axios.get('/api/serAd?offset=0&limit=9').then(res => {
            this.adMsgArr = res.data;
            console.log(this.adMsgArr)
        })
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll)
    },
    methods: {
        setStore(index) {
            this.$store.commit('setVal',this.adMsgArr[index]);
            // 让数据库中浏览量加一
            axios.get('/api/addViews?viewsNum='+this.adMsgArr[index].views+'&adId='+this.adMsgArr[index].ad_id);
        },
        // 滚动时触发
        handleScroll() {
            if(this.$refs.element) {
                var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop;
                var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
                var adBoxHeight = this.$refs.element.offsetHeight;
                if(scrollHeight + clientHeight >= adBoxHeight + 460 && this.flag) {
                    this.flag = false;
                    this.onSearch();
                    // 发送ajax
                    console.log(111)
                }
            }
            
        },
        // loading动画
        onSearch() {
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            setTimeout(() => {
                loading.close();
            }, 2000);
        }
    },
    components: {
        carousel3d
    }
}
</script>

<style lang="stylus" scoped>
.wrapper {
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



