import Vue from 'vue';
import Vuex from 'vuex';
import Api from '@/api';

Vue.use(Vuex);

const message = Vue.prototype.$message;

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
		signIn(state, payload) {
			state.user.access_token = payload;
		},
	},
	actions: {
		async dispatchSignIn(context, payload) {
			await Api.signIn({
				email: payload.email,
				password: payload.password,
			}).then(res => {
				context.commit('signIn', res);
				message.success('로그인되었습니다.');
			});
		},
		async dispatchSignUp(context, payload) {
			await Api.signUp({
				email: payload.email,
				password: payload.password,
			}).then(res => {
				context.commit('signIn', res);
				message.success('회원가입이 완료되었습니다.');
			});
		},
	},
	modules: {},
});
