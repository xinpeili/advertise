<template>
  <div id="app">
    <!-- nav -->
    <div class="back"></div>
    <ul class="nav">
      <router-link tag="li" :to="{name: 'Home'}">主页</router-link>
      <router-link tag="li" :to="{name: 'Advertising'}">广告浏览</router-link>
      <router-link tag="li" :to="{name: 'About'}">关于我们</router-link>
      <li class="btn-active" @click="isFlag">{{login}}</li>
      <span class="hello-name" v-show="userName">你好：{{userName}}</span>
    </ul>

    <!-- login遮罩层 -->
    <div class="mask" v-if="flag"></div>
    <!-- 动画插件 -->
    <transition enter-active-class="animated zoomIn" leave-active-class="animated zoomOut" :duration="{enter:600,leave:500}">
      <login v-if="flag" @isEmit="emitFlag" @helloLogin="helloLogin"></login>
    </transition>

    <!-- content -->
    <div class="content-wrapper">
      <router-view/>
    </div>

    <!-- footer -->
    <footer-wrapper class="footer"></footer-wrapper>
  </div>
</template>

<script>

import login from './components/login'
import footerWrapper from './components/footer'
import { mapState, mapMutations } from 'vuex';

export default {
  data () {
    return {
      flag: false,
      login: '登陆'
      // userName: ''
    }
  },
  computed: {
    ...mapState({
      userName: state => state.curUser
    })
  },
  created() {
    if (this.userName) {
      this.helloLogin(this.userName);
    }
  },
  methods: {
    ...mapMutations({
      setCurUser: 'setCurUser'
    }),
    isFlag() {
      this.flag = !this.flag;
      // this.userName = '';
      this.$cookieStore.delCookie('userName');
      this.setCurUser('');
      this.login = '登录';
    },
    emitFlag() {
      this.flag = !this.flag;
    },
    helloLogin(data) {
      this.setCurUser(data);
      this.login = '登出';
    }
  },
  components: {
    login,
    footerWrapper
  }
}
</script>

<style lang="stylus" scoped>
  #app {
    position: relative;
    min-width: 1300px;
    height: 100%;
    .back {
      width: 100%;
      height: 82px;
      background-color: #000;
      opacity: 0.8;
    }
    .nav {
      width: 80%;
      min-width: 1300px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      z-index: 1;
      top: 0;
      color: #fff;
      span {
        float: right;
        display: inline-block;
        line-height: 82px;
      }
      li {
        display: inline-block;
        cursor: pointer;
        text-align: center;
        line-height: 40px;
        font-size: 16px;
        margin: 20px 20px;
        padding: 0 10px;
        &.router-link-active {
          border-bottom: 2px solid #fff;
        }
        &.btn-active {
          float: right;
          border: 1px solid #b1b2b3;
          padding: 0 40px;
          transition: all 0.5s;
          &:hover {
            background-color: #4581fb;
            border: 1px solid #4581fb;
          }
        }
      }
    }
    .mask {
      position: absolute;
      z-index: 100;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.7);
    }
    .animated {
      position: absolute;
      z-index: 1000;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%)
    }
    .content-wrapper {
      width: 100%;
    }
    .footer {
      // position: absolute;
      // bottom: 0;
      width: 100%;
      padding: 20px;
      box-sizing: border-box;
      background-color: #1a1a1a;
    }
  }
</style>


