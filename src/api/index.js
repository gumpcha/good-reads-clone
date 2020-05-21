import axios from 'axios';
import router from '@/router';
import { Message } from 'element-ui';
// import { Observable } from 'rxjs';

// baseURL 기본값을 정의한다
axios.defaults.baseURL = 'https://good-reads-clone-api-express.herokuapp.com';
// 모든 요청에 추가할 헤더 설정
// axios.defaults.headers.common['Authorization'] = 'Bearer';
// GET 요청에 추가할 헤더 설정
axios.defaults.headers.get['Accepts'] = 'application/json';

const message = function(opt) {
	return Message({
		showClose: true,
		dangerouslyUseHTMLString: true,
		type: opt.type,
		message: opt.message,
	});
};

export default {
	signIn(param) {
		param.context.commit('authRequest');
		axios
			.post('/user/session', {
				email: param.email,
				password: param.password,
			})
			.then(res => {
				const user = {
					email: res.data.email,
				};
				localStorage.setItem('accessToken', res.data.access_token);
				localStorage.setItem('user', JSON.stringify(user));
				param.context.commit('authSuccess', res.data);
				message({
					type: 'success',
					message: '로그인되었습니다',
				});
				router.push({ name: 'home' });
			})
			.catch(err => {
				console.error(err);
				param.context.commit('authError');
				message({
					type: 'error',
					message:
						'로그인정보가 일치하지 않습니다.<br>이메일과 비밀번호를 확인해주세요',
				});
			});
	},
	signUp(param) {
		param.context.commit('authRequest');
		axios
			.post('/user', {
				email: param.email,
				password: param.password,
			})
			.then(res => {
				const user = {
					email: res.data.email,
				};
				localStorage.setItem('accessToken', res.data.access_token);
				localStorage.setItem('user', JSON.stringify(user));
				param.context.commit('authSuccess', res.data);
				message({
					type: 'success',
					message: '회원가입이 완료되었습니다.',
				});
				router.push({ name: 'home' });
			})
			.catch(err => {
				console.error(err);
				param.context.commit('authError');
				message({
					type: 'error',
					message:
						'회원가입 정보가 유효하지 않습니다.<br>이메일과 비밀번호를 확인해주세요',
				});
			});
	},
	logout(param) {
		axios
			.delete('/user/session', {
				headers: {
					Authorization: `Bearer ${param.context.getters.getAccessToken}`,
				},
			})
			.then(() => {
				param.context.commit('logout');
				message({
					type: 'success',
					message: '로그아웃 되었습니다.',
				});
			})
			.catch(err => {
				console.error(err);
				param.context.commit('authError');
				message({
					type: 'error',
					message: '서버오류로 인해 로그아웃이 되지 않았습니다.',
				});
			});
	},
	getUser(param) {
		param.context.commit('authRequest');
		axios
			.get('/user', {
				headers: {
					Authorization: `Bearer ${param.context.getters.getAccessToken}`,
				},
			})
			.then(res => {
				console.log(res.data);
				param.context.commit('authSuccess', res.data);
			})
			.catch(err => {
				console.error(err);
				param.context.commit('authError');
				message({
					type: 'error',
					message:
						'로그인정보가 일치하지 않습니다.<br>이메일과 비밀번호를 확인해주세요',
				});
			});
	},
};

// export default {
// 	signIn(param) {
// 		param.context.commit('authRequest');
// 		Observable.create(observer => {
// 			axios
// 				.post('/user/session', {
// 					email: param.email,
// 					password: param.password,
// 				})
// 				.then(res => {
// 					observer.next(res.data);
// 					observer.complete();
// 				})
// 				.catch(err => {
// 					observer.error(err);
// 				});
// 		}).subscribe({
// 			next(data) {
// 				const user = {
// 					email: data.email,
// 				};
// 				localStorage.setItem('accessToken', data.access_token);
// 				localStorage.setItem('user', JSON.stringify(user));
// 				param.context.commit('authSuccess', data);
// 				message({
// 					type: 'success',
// 					message: '로그인되었습니다',
// 				});
// 				router.push({ name: 'home' });
// 			},
// 			error(err) {
// 				console.error(err);
// 				param.context.commit('authError');
// 				message({
// 					type: 'error',
// 					message:
// 						'로그인정보가 일치하지 않습니다.<br>이메일과 비밀번호를 확인해주세요',
// 				});
// 			},
// 		});
// 	},
// 	signUp(param) {
// 		param.context.commit('authRequest');
// 		Observable.create(observer => {
// 			axios
// 				.post('/user', {
// 					email: param.email,
// 					password: param.password,
// 				})
// 				.then(res => {
// 					observer.next(res.data);
// 					observer.complete();
// 				})
// 				.catch(err => {
// 					observer.error(err);
// 				});
// 		}).subscribe({
// 			next(data) {
// 				const user = {
// 					email: data.email,
// 				};
// 				localStorage.setItem('accessToken', data.access_token);
// 				localStorage.setItem('user', JSON.stringify(user));
// 				param.context.commit('authSuccess', data);
// 				message({
// 					type: 'success',
// 					message: '회원가입이 완료되었습니다.',
// 				});
// 				router.push({ name: 'home' });
// 			},
// 			error(err) {
// 				console.error(err);
// 				param.context.commit('authError');
// 				message({
// 					type: 'error',
// 					message:
// 						'회원가입 정보가 유효하지 않습니다.<br>이메일과 비밀번호를 확인해주세요',
// 				});
// 			},
// 		});
// 	},
// 	logout(param) {
// 		Observable.create(observer => {
// 			axios
// 				.delete('/user/session', {
// 					headers: {
// 						Authorization: `Bearer ${param.context.getters.getAccessToken}`,
// 					},
// 				})
// 				.then(() => {
// 					observer.next();
// 					observer.complete();
// 				})
// 				.catch(err => {
// 					observer.error(err);
// 				});
// 		}).subscribe({
// 			next() {
// 				param.context.commit('logout');
// 				message({
// 					type: 'success',
// 					message: '로그아웃 되었습니다.',
// 				});
// 			},
// 			error(err) {
// 				console.error(err);
// 				param.context.commit('authError');
// 				message({
// 					type: 'error',
// 					message: '서버오류로 인해 로그아웃이 되지 않았습니다.',
// 				});
// 			},
// 		});
// 	},
// 	getUser(param) {
// 		param.context.commit('authRequest');
// 		Observable.create(observer => {
// 			axios
// 				.get('/user', {
// 					headers: {
// 						Authorization: `Bearer ${param.context.getters.getAccessToken}`,
// 					},
// 				})
// 				.then(res => {
// 					observer.next(res.data);
// 					observer.complete();
// 				})
// 				.catch(err => {
// 					observer.error(err);
// 				});
// 		}).subscribe({
// 			next(data) {
// 				console.log(data);
// 				param.context.commit('authSuccess', data);
// 			},
// 			error(err) {
// 				console.error(err);
// 				param.context.commit('authError');
// 				message({
// 					type: 'error',
// 					message:
// 						'로그인정보가 일치하지 않습니다.<br>이메일과 비밀번호를 확인해주세요',
// 				});
// 			},
// 		});
// 	},
// };
