import axios from 'axios';

// baseURL 기본값을 정의한다
axios.defaults.baseURL = 'https://good-reads-clone-api-express.herokuapp.com';
// 모든 요청에 추가할 헤더 설정
axios.defaults.headers.common['Authorization'] = 'Bearer';
// GET 요청에 추가할 헤더 설정
axios.defaults.headers.get['Accepts'] = 'application/json';

export default {
	signIn(param) {
		return axios
			.post('/user/session', {
				headers: {
					Authorization: 'Bearer',
				},
				email: param.email,
				password: param.password,
			})
			.then(res => res.data.access_token);
	},
	signUp(param) {
		return axios
			.post('/user', {
				email: param.email,
				password: param.password,
			})
			.then(res => res.data);
	},
	withdrawal() {
		return axios.delete('/user').then(res => res.data);
	},
};
