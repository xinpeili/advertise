<template>
    <div class="footer">
        <div class="footer-wrapper">
            <ul>
                <li>产品及服务</li>
                <li>平台优势</li>
                <li>广告类型</li>
            </ul>
            <ul>
                <li>动态资讯</li>
                <li>新闻资讯</li>
                <li>往期活动</li>
            </ul>
            <ul>
                <li>帮助与支持</li>
                <li>帮助中心</li>
                <li>代理商查询</li>
            </ul>
            <ul>
                <li>关注我们</li>
                <li>（字体图标）</li>
            </ul>
            <ul>
                <li>联系我们</li>
                <li>qq：843345627</li>
                <li>邮箱：xinpei_li968@163.com</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="stylus" scoped>
.footer{
    .footer-wrapper {
        display: inline-block;
        color: #fff;
        display: flex;
        justify-content: center;
        ul {
            padding: 25px 50px;
            li {
                line-height: 30px;
                &:first-of-type {
                    font-size: 20px;
                    font-weight: bold;
                }
                &:nth-of-type(2), &:nth-of-type(3) {
                    color: #b1b1b1;
                    cursor: pointer;
                }
            }
        }
    }
}
</style>
