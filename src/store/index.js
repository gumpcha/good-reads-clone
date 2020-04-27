import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		user: {
			access_token: null,
		},
	},
	getters: {
		getAccessToken(state) {
			return state.user.access_token;
		},
		loggedIn: state => {
			return state.user.access_token ? true : false;
		},
	},
	mutations: {
		// payload 가 { value : 10 } 일 경우
		signIn(state, payload) {
			state.user.access_token = payload;
		},
	},
	actions: {
		// singIn(state) {},
	},
	modules: {},
});
