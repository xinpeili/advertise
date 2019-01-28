import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
	adArr: ''
}
const mutations = {
	setVal (state, adArr) {
		state.adArr = adArr
	}
}

export default new Vuex.Store({
	state,
	mutations
})
