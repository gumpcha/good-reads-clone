import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		user: {
			isLoggedIn: false,
		},
	},
	getters: {
		loggedIn: state => {
			return state.user.isLoggedIn;
		},
	},
	mutations: {},
	actions: {},
	modules: {},
});
