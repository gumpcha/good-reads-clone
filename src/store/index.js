import Vue from 'vue';
import Vuex from 'vuex';
import Api from '@/api';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		authStatus: null,
		accessToken: localStorage.getItem('accessToken') || null,
		user: JSON.parse(localStorage.getItem('user')) || {
			email: null,
		},
	},
	getters: {
		getAccessToken(state) {
			return state.accessToken;
		},
		getAuthStatus(state) {
			return state.authStatus;
		},
		isLoggedIn(state) {
			return state.accessToken ? true : false;
		},
	},
	mutations: {
		authRequest(state) {
			state.status = 'loading';
		},
		authSuccess(state, payload) {
			state.authStatus = 'success';
			state.accessToken = payload.access_token;
			state.user.email = payload.email;
		},
		authError(state) {
			state.authStatus = 'error';
			state.accessToken = null;
			state.user.email = null;
		},
		logout(state) {
			localStorage.removeItem('accessToken');
			localStorage.removeItem('user');
			state.authStatus = null;
			state.accessToken = null;
			state.user.email = null;
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
		async dispatchLogout(context) {
			await Api.logout({
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
