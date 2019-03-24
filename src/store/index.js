import Vue from 'vue'
import Vuex from 'vuex'
import { setCookie, getCookie } from '@/assets/js/cookie.js'

Vue.use(Vuex)
const state = {
	adArr: '',
	curUser: getCookie("userName")
}
const mutations = {
	setVal (state, adArr) {
		state.adArr = adArr;
	},
	setCurUser (state, data) {
		state.curUser = data;
	}
}

export default new Vuex.Store({
	state,
	mutations
})
