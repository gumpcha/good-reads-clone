import axios from 'axios';
import router from '@/router';
import { Message } from 'element-ui';
import { Observable } from 'rxjs';

// baseURL 기본값을 정의한다
axios.defaults.baseURL = 'https://good-reads-clone-api-express.herokuapp.com';
// 모든 요청에 추가할 헤더 설정
axios.defaults.headers.common['Authorization'] = 'Bearer';
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
		Observable.create(observer => {
			axios
				.post('/user/session', {
					email: param.email,
					password: param.password,
				})
				.then(res => {
					observer.next(res.data.access_token);
					observer.complete();
				})
				.catch(err => {
					observer.error(err);
				});
		}).subscribe({
			next(data) {
				param.context.commit('validSignIn', data);
				message({
					type: 'success',
					message: '로그인되었습니다',
				});
				router.push({ name: 'home' });
			},
			error(err) {
				console.error(err);
				param.context.commit('invalidSignIn');
				message({
					type: 'error',
					message:
						'로그인정보가 일치하지 않습니다.<br>이메일과 비밀번호를 확인해주세요',
				});
			},
		});
	},
	signUp(param) {
		Observable.create(observer => {
			axios
				.post('/user', {
					email: param.email,
					password: param.password,
				})
				.then(res => {
					observer.next(res.data);
					observer.complete();
				})
				.catch(err => {
					observer.error(err);
				});
		}).subscribe({
			next(data) {
				param.context.commit('validSignIn', data);
				message({
					type: 'success',
					message: '회원가입이 완료되었습니다.',
				});
			},
			error(err) {
				console.error(err);
				param.context.commit('invalidSignIn');
				message({
					type: 'error',
					message:
						'로그인정보가 일치하지 않습니다.<br>이메일과 비밀번호를 확인해주세요',
				});
			},
		});
	},
	getUser(param) {
		Observable.create(observer => {
			axios
				.get('/user', {
					headers: {
						Authorization: `Bearer ${param.context.getters.getAccessToken}`,
					},
				})
				.then(res => {
					observer.next(res.data);
					observer.complete();
				})
				.catch(err => {
					observer.error(err);
				});
		}).subscribe({
			next(data) {
				console.log(data);
			},
			error(err) {
				console.error(err);
				param.context.commit('invalidSignIn');
				message({
					type: 'error',
					message:
						'로그인정보가 일치하지 않습니다.<br>이메일과 비밀번호를 확인해주세요',
				});
			},
		});
	},
};
