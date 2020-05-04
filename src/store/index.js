import Vue from 'vue';
import Vuex from 'vuex';
import Api from '@/api';

Vue.use(Vuex);

// const message = Vue.prototype.$message;

export default new Vuex.Store({
	state: {
		user: {
			access_token: null,
			email: null,
		},
	},
	getters: {
		getAccessToken(state) {
			return state.user.access_token;
		},
		loggedIn(state) {
			return state.user.access_token ? true : false;
		},
	},
	mutations: {
		validSignIn(state, payload) {
			state.user.access_token = payload;
			state.user.email = payload.email;
		},
		invalidSignIn(state) {
			state.user.access_token = null;
		},
	},
	actions: {
		async dispatchSignIn(context, payload) {
			await Api.signIn({
				email: payload.email,
				password: payload.password,
				context: context,
			});
		},
		async dispatchSignUp(context, payload) {
			await Api.signUp({
				email: payload.email,
				password: payload.password,
				context: context,
			});
		},
		async getUser(context) {
			await Api.getUser({
				context: context,
			});
		},
	},
	modules: {},
});
