<template>
    <div id="chat">
        <div class="head">聊天机器人</div>
        <div class="content">
            <div v-for="(ele,index) in list" :key="index" style="overflow: hidden; margin-top: 15px;">
                <img v-if="ele.type == 1" :src="ele.url" alt="" style="float: right; width: 35px; height: 35px; margin-right: 5px;">
                <img v-if="ele.type == 2" :src="ele.url" alt="" style="float: left; width: 35px; height: 35px; margin-left: 5px;">
                <span :class="ele.chat">{{ele.val}}</span>
            </div>
        </div>
        <div class="input">
            <input type="text" id="chatArea" v-model="val" @keydown="send"/>
            <div id="sendBtn" @click="send">发送</div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            list: [],
            val: '',
        }
    },
    methods: {
        send(event) {
            if (event instanceof KeyboardEvent && event.key != "Enter") {
                return;
            }
            var val = this.val;
            if (val == null || val == "") {
                return;
            }
            this.creatChat(this.val, 1, '../static/img/panda.jpeg', 'myChat');
            this.val = '';

            axios.get(`/api/chat?text=${val}`).then((res) => {
                this.creatChat(res.data.text, 2, '../static/img/shan.jpeg', 'robotChat')
            })
        },
        creatChat(val, type, url, chat) {
            var chatObj = {
                val: '',
                type: 1,
                url: '',
                chat: ''
            }
            chatObj.val = val;
            chatObj.type = type;
            chatObj.url = url;
            chatObj.chat = chat;
            this.list.push(chatObj);
        }
    }
}
</script>

<style lang="stylus" scoped>
#chat {
    width: 450px;
    position: relative;
    margin-left: auto;
    margin-right: auto;
    .head {
        width: 100%;
        height: 50px;
        background: #5e5e5e;
        line-height: 50px;
        text-align: center;
        color: white;
        font-size: 20px;
    }
    .content {
        width: 100%;
        height: calc(100vh - 200px);
        background: #EBEBEB;
        overflow-y:scroll;
        div {
            .myChat {
                position: relative;
                display: inline-block;
                float: right;
                background: rgb(158,234,106);
                padding: 5px 10px;
                line-height: 25px;
                border-radius: 5px;
                margin-right: 10px;
                max-width: 60%;
                &::after {
                    content: "";
                    position: absolute;
                    display: block;
                    right: -10px;
                    top: 8px;
                    width: 0;
                    height: 0;
                    line-height: 0;
                    font-size: 0;
                    border-width: 5px;
                    border-style: solid;
                    border-color: #EBEBEB #EBEBEB #EBEBEB rgb(158,234,106);
                }
            }
            .robotChat {
                position: relative;
                display: inline-block;
                float: left;
                background: white;
                padding: 5px 10px;
                line-height: 25px;
                border-radius: 5px;
                margin-left: 10px;
                max-width: 60%;
                &::after {
                    content: "";
                    position: absolute;
                    display: block;
                    left: -10px;
                    top: 8px;
                    width: 0;
                    height: 0;
                    line-height: 0;
                    font-size: 0;
                    border-width: 5px;
                    border-style: solid;
                    border-color: #EBEBEB white #EBEBEB #EBEBEB;
                }
            }
        }
    }
    .input {
        width: 100%;
        height: 50px;
        background: #D3D3D3;
        position: relative;
        #chatArea {
            width: 350px;
            height: 25px;
            border: 0px;
            position: absolute;
            top: 50%;
            margin-top: -12px;
            margin-left: 10px;
            outline: none;
            border-radius: 5px;
        }
        #sendBtn {
            width: 65px;
            height: 25px;
            background: rgb(158,234,106);
            border-radius: 5px;
            color: white;
            text-align: center;
            line-height: 25px;
            position: absolute;
            margin-left: 370px;
            top: 50%;
            margin-top: -12px;
            cursor: pointer;
        }
    }
}
</style>



