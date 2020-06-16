<template>
	<el-card shadow="hover">
		<el-form class="login-form" :model="model" :rules="rules" ref="form">
			<!-- 이메일 입력단계가 아닌 비밀번호 입력단계로 넘어갔을 떄만 작동 -->
			<el-page-header
				:content="'회원가입'"
				:title="'로그인'"
				style="margin-bottom: 10px; font-size: 16px;"
				@back="goBack"
			></el-page-header>
			<el-form-item prop="email">
				<el-input
					v-model="model.email"
					placeholder="Email"
					prefix-icon="fas fa-envelope-square"
				>
					<el-button
						v-if="model.email"
						slot="append"
						icon="el-icon-close"
						@click="model.email = null"
					></el-button>
				</el-input>
			</el-form-item>
			<el-form-item prop="password">
				<el-input
					v-model="model.password"
					placeholder="Password"
					type="password"
					prefix-icon="fas fa-lock"
					show-password
				>
					<el-button
						v-if="model.password"
						slot="append"
						icon="el-icon-close"
						@click="model.password = null"
					></el-button>
				</el-input>
			</el-form-item>
			<el-form-item>
				<el-button
					:disabled="disabledButton"
					:loading="loading"
					class="signUp-button"
					type="success"
					@click="signUp"
					block
				>
					회원가입
				</el-button>
			</el-form-item>
		</el-form>
	</el-card>
</template>

<script>
import { mapMutations } from 'vuex';

// ----------------------------------------------------------------
// NOTE: work for font awesome5
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelopeSquare, faLock } from '@fortawesome/free-solid-svg-icons';
import { dom } from '@fortawesome/fontawesome-svg-core'; // This will kick of the initial replacement of i to svg tags and configure a MutationObserver
dom.watch(); // This will kick of the initial replacement of i to svg tags and configure a MutationObserver
library.add(faEnvelopeSquare, faLock);
// ----------------------------------------------------------------

export default {
	name: 'UserSignUp',
	data() {
		let emailValidate = (rule, value, callback) => {
			const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			if (value === null || value.length === 0) {
				this.validation.email = false;
				return callback(new Error('이메일을 입력하세요.'));
			} else if (!regex.test(value)) {
				this.validation.email = false;
				return callback(new Error('이메일 형식에 맞지 않습니다.'));
			}
			this.validation.email = true;
		};
		let passwordValidate = (rule, value, callback) => {
			const regex = /^(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9])(?=.*[0-9]).{8,16}$/;
			if (value === null || value.length === 0) {
				this.validation.password = false;
				return callback(new Error('비밀번호를 입력하세요.'));
			} else if (!regex.test(value)) {
				this.validation.password = false;
				return callback(
					new Error(
						'특수문자, 영문자, 숫자가 최소 하나이상이 되어야하며 8자이상 16자이하로 작성하세요',
					),
				);
			}
			this.validation.password = true;
		};
		return {
			title: 'signIn',
			activeName: 'signIn',
			validCredentials: {
				email: 'lightscope',
				password: 'lightscope',
			},
			model: {
				email: '',
				password: '',
			},
			loading: false,
			rules: {
				email: [
					{
						validator: emailValidate,
						trigger: 'blur',
					},
					{
						validator: emailValidate,
						trigger: 'change',
					},
				],
				password: [
					{
						validator: passwordValidate,
						trigger: 'blur',
					},
					{
						validator: passwordValidate,
						trigger: 'change',
					},
				],
			},
			validation: {
				email: false,
				password: false,
			},
		};
	},
	methods: {
		...mapMutations(['authRequest', 'authSuccess', 'authError']),
		async signUp() {
			this.authRequest;
			this.loading = true;
			await this.$api
				.signUp({
					email: this.model.email,
					password: this.model.password,
				})
				.then(res => {
					const user = {
						email: res.email,
					};
					this.authSuccess({
						access_token: res.access_token,
						email: res.email,
					});
					localStorage.setItem('accessToken', res.access_token);
					localStorage.setItem('user', JSON.stringify(user));
					this.sendMessage({
						type: 'success',
						message: '회원가입이 완료되었습니다.',
					});
					this.$router.push({ name: 'home' });
				})
				.catch(err => {
					console.error(err);
					this.authError();
					this.sendMessage({
						type: 'error',
						message:
							'회원가입 정보가 유효하지 않습니다.<br>이메일과 비밀번호를 확인해주세요',
					});
				});
			this.loading = false;
		},
		goBack() {
			this.$router.push({ name: 'signIn' });
		},
	},
	computed: {
		disabledButton() {
			return !this.validation.email || !this.validation.password;
		},
	},
};
</script>
