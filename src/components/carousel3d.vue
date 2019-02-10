<template>
    <div class="carouse-wrapper">
        <carousel-3d class="carouse" :count="slides.length">
            <slide v-for="(slide, i) in slides" :index="i" :key="i">
                <template slot-scope="{ index, isCurrent, leftIndex, rightIndex }">
                <img :data-index="index" :class="{ current: isCurrent, onLeft: (leftIndex >= 0), onRight: (rightIndex >= 0) }" :src="getImgURL(i)">
                </template>
            </slide>
        </carousel-3d>
    </div>
</template>

<script>
import { Carousel3d, Slide } from 'vue-carousel-3d'
export default {
    data () {
        return {
            slides: [
                {
                    title: 'Slide 1',
                    desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, maxime.',
                    src: 'http://s.e.baidu.com/sites/default/files/styles/case-cover/public/case_cover/Travelbytrain.png?itok=66vAbSzu'
                },
                {
                    title: 'Slide 2',
                    desc: 'Lorem ipsum dolor sit amet ',
                    src: 'http://s.e.baidu.com/sites/default/files/styles/case-cover/public/case_cover/zhuangxiu1.png?itok=u4n6HETM'
                },
                {
                    title: 'Slide 3',
                    desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. ',
                    src: 'http://s.e.baidu.com/sites/default/files/styles/case-cover/public/case_cover/tiaowei.png?itok=98zhJ3uj'
                },
                {
                    title: 'Slide 4',
                    desc: 'Lorem ipsum dolor sit amet,  Enim, maxime.',
                    src: 'http://s.e.baidu.com/sites/default/files/styles/case-cover/public/case_cover/baokemeng.png?itok=EMa9lfOo'
                },
                {
                    title: 'Slide 5',
                    desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, maxime.',
                    src: 'http://s.e.baidu.com/sites/default/files/styles/case-cover/public/case_cover/waijiao.png?itok=xrvajck3'
                },
                {
                    title: 'Slide 6',
                    desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, maxime.',
                    src: 'http://s.e.baidu.com/sites/default/files/styles/case-cover/public/case_cover/ef.png?itok=w2dNQXX7'
                },
                {
                    title: 'Slide 7',
                    desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, maxime.',
                    src: 'http://s.e.baidu.com/sites/default/files/styles/case-cover/public/case_cover/anjuke.png?itok=4qunFFBv'
                },
                {
                    title: 'Slide 8',
                    desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, maxime.',
                    src: 'http://s.e.baidu.com/sites/default/files/styles/case-cover/public/case_cover/chengshiguan.png?itok=klmMJwXb'
                },
                {
                    title: 'Slide 9',
                    desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, maxime.',
                    src: 'http://s.e.baidu.com/sites/default/files/styles/case-cover/public/case_cover/chezhan.png?itok=-6fEElUg'
                },
                {
                    title: 'Slide 10',
                    desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, maxime.',
                    src: 'http://s.e.baidu.com/sites/default/files/styles/case-cover/public/case_cover/libangqi.png?itok=t-sZkluQ'
                }
            ]
        }
    },
    // props: ["slides"],
    // created () {
    //     console.log(this.slides);
    // },
    methods: {
        getImgURL (imageId) {
            return this.slides[imageId].src;
        }
    },
    components: {
        Carousel3d,
        Slide
    }
}
</script>

<style lang="stylus" scoped>
.carouse-wrapper {
    margin: 30px 0 80px;
    .carouse {
        margin: 0;
        img {
            width: 360px;
            height: 270px;
        }
    }
}
</style>


