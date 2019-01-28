<template>
    <div class="login">
        <!-- <div class="mask"></div> -->
        <div class="content">
            <div class="close el-icon-close" @click="emitIsFlag"></div>
            <div class="content-box">
                <div class="text-box">
                    <span>用户名：</span>
                    <input v-model="userName" type="text" placeholder="请输入用户名" @keydown.enter="login">
                </div>
                <div class="password-box">
                    <span>密码：</span>
                    <input v-model="password" type="password" placeholder="请输入密码" @keydown.enter="login">
                </div>
                <input class="login" type="button" value="登录" @click="login">
                <input class="add" type="button" value="注册" @click="add">
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
      data () {
        return {
            userName: '',
            password: ''
        }
      },
      methods:{
        emitIsFlag () {
            this.$emit("isEmit");
        },
        login () {
            console.log(111)
            if(this.userName==""){
                alert("用户名不能为空");
            }else if(this.password.length < 6){
                alert("密码不能少于6位");
            }else{
                axios.get('/api/serLogin?userName='+this.userName).then(res => {
                    // console.log(res.data[0])
                    if(res.data[0] && res.data[0].password === this.password) {
                        alert("登陆成功，欢迎您：" + this.userName);
                        this.emitIsFlag();
                        this.$emit("helloLogin", this.userName);
                    } else {
                        alert("用户名或密码不正确");
                        this.password = '';
                    }
                })
            }
        },
        add () {
          if(this.userName==""){
            alert("用户名不能为空");
          }else if(this.password.length < 6){
            alert("密码不能少于6位");
          }else{
            axios.get('/api/addLogin?userName='+this.userName+'&password='+this.password+'&static=0').then(res => {
                alert(res.data);
            })
          }
          this.password = '';
        }
      }
    }
</script>

<style lang="stylus" scoped>
.login {
    color: #000;
    .content {
        width: 500px;
        height: 350px;
        background-color: rgb(255,255,255);
        border-radius: 8px;
        position: absolute
        z-index: 1000;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        .close {
            position: absolute;
            right: 10px;
            top: 10px;
            font-size: 20px;
            padding: 5px;
            cursor: pointer;
        }
        .content-box {
            position: absolute;
            width: 100%;
            text-align: center;
            top: 50%;
            transform: translateY(-50%);
            .text-box, .password-box {
                margin-bottom: 20px;
                span {
                    font-size: 20px;
                }
                input {
                    border: 1px solid #ccc;
                    height: 26px;
                    padding: 5px 5px;
                    border-radius: 5px;
                    font-size: 18px;
                }
            }
            .login, .add {
                background-color: #4581fb;
                width: 100px;
                height: 40px;
                text-align: center;
                line-height: 40px;
                color: #fff;
                border: 0;
                border-radius: 8px;
                cursor: pointer;
            }
        }
    }
}
</style>
