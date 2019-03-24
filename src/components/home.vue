<template>
    <div class="home">
        <!-- vue-particles粒子特效 -->
        <!-- color: String类型。默认'#dedede'。粒子颜色。
        particleOpacity: Number类型。默认0.7。粒子透明度。
        particlesNumber: Number类型。默认80。粒子数量。
        shapeType: String类型。默认'circle'。可用的粒子外观类型有："circle","edge","triangle", "polygon","star"。
        particleSize: Number类型。默认80。单个粒子大小。
        linesColor: String类型。默认'#dedede'。线条颜色。
        linesWidth: Number类型。默认1。线条宽度。
        lineLinked: 布尔类型。默认true。连接线是否可用。
        lineOpacity: Number类型。默认0.4。线条透明度。
        linesDistance: Number类型。默认150。线条距离。
        moveSpeed: Number类型。默认3。粒子运动速度。
        hoverEffect: 布尔类型。默认true。是否有hover特效。
        hoverMode: String类型。默认true。可用的hover模式有: "grab", "repulse", "bubble"。
        clickEffect: 布尔类型。默认true。是否有click特效。
        clickMode: String类型。默认true。可用的click模式有: "push", "remove", "repulse", "bubble"。 -->
        <div class="searchBlock">
          <vue-particles color="#dedede" :particleOpacity="0.5" :particlesNumber="80" shapeType="circle" :particleSize="5" linesColor="#ffffff" :linesWidth="2" :lineLinked="true" :lineOpacity="0.4" :linesDistance="170" :moveSpeed="5" :hoverEffect="true" hoverMode="grab" :clickEffect="true" clickMode="push" class="lizi">
          </vue-particles>
          <div class="particles-text">
            <p>让感兴趣的客户</p>
            <p>看到您的广告</p>
          </div>
        </div>
        <div class="wrapper">
          <div class="content">
            <div class="title">
              <span class="num">01</span>
              <span class="text">通过AI技术让投放更简单</span>
            </div>
            <div class="img"></div>
          </div>
          <div class="content">
            <div class="title">
              <span class="num">02</span>
              <span class="text">把您的广告展现给精准的用户</span>
            </div>
            <div class="img1"></div>
          </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="stylus" scoped>
.home {
  .searchBlock {
    position: relative;
    margin-top: -82px;
    width: 100%;
    max-height: 550px;
    overflow: hidden;
    background-image: url("../assets/images/banner.png");
    background-repeat: no-repeat;
    background-size: cover;
    box-shadow: 0 5px 8px #999;
    .lizi {
      width: 100%;
      max-height: 550px;
    }
    .particles-text {
      color: #fff;
      font-size: 30px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%)
      p:last-of-type {
        font-size: 50px;
        font-weight: bold
        margin-top: 30px;
      }
    }
  }
  .wrapper {
    padding: 100px 50px;
    display: flex;
    .content {
      flex: 1;
      text-align: center;
      padding-bottom: 50px;
      .title {
        font-size: 0;
        .num {
          font-size: 32px;
          color: #999;
        }
        .text {
          font-size: 30px;
        }
      }
      .img {
        margin: 0 auto;
        width: 300px;
        height: 300px;
        background: url("../assets/images/AItoufan.png") no-repeat center center;
      }
      .img1 {
        margin: 0 auto;
        width: 300px;
        height: 300px;
        background: url("../assets/images/showUser.png") no-repeat center center;
      }
    }
  }
}
</style>



