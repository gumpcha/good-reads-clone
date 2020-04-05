<template>
	<el-card>
		<!-- <h2>Login</h2> -->
		<el-form
			class="login-form"
			:model="model"
			:rules="rules"
			ref="form"
			@submit.native.prevent="login"
		>
			<!-- 이메일 입력단계가 아닌 비밀번호 입력단계로 넘어갔을 떄만 작동 -->
			<el-page-header
				v-if="activeName !== 'getEmail'"
				@back="goBack"
				:content="getTitle"
			></el-page-header>
			<el-tabs v-model="activeName">
				<el-tab-pane label="sign-in" name="getEmail">
					<el-form-item prop="email">
						<el-input
							v-model="model.email"
							placeholder="Email"
							prefix-icon="fas fa-envelope-square"
						></el-input>
					</el-form-item>
					<el-form-item>
						<el-button
							:disabled="disabledEmail"
							:loading="loading"
							class="login-button"
							type="primary"
							@click="validateEmail"
							block
						>
							계속하기
						</el-button>
					</el-form-item>
				</el-tab-pane>
				<el-tab-pane label="sign-up" name="getPassword">
					<el-form-item prop="password">
						<el-input
							v-model="model.password"
							placeholder="Password"
							type="password"
							prefix-icon="fas fa-lock"
							show-password
						></el-input>
					</el-form-item>
					<el-form-item>
						<el-button
							:disabled="disabledPassword"
							:loading="loading"
							class="login-button"
							type="primary"
							@click="signIn"
							block
						>
							로그인
						</el-button>
					</el-form-item>
				</el-tab-pane>
			</el-tabs>

			<!-- <el-form-item prop="email">
				<el-input
					v-model="model.email"
					placeholder="Email"
					prefix-icon="fas fa-envelope-square"
				></el-input>
			</el-form-item>
			<el-form-item prop="password">
				<el-input
					v-model="model.password"
					placeholder="Password"
					type="password"
					prefix-icon="fas fa-lock"
					show-password
				></el-input>
			</el-form-item>
			<el-form-item>
				<el-button
					:disabled="disabled"
					:loading="loading"
					class="login-button"
					type="primary"
					@click="signIn"
					block
				>
					Sign In
				</el-button>
			</el-form-item>
			<el-form-item>
				<el-button
					:loading="loading"
					class="signup-button"
					type="success"
					@click="signUp"
					block
				>
					Sign Up
				</el-button>
			</el-form-item> -->
		</el-form>
	</el-card>
</template>

<script>
export default {
	name: 'Login',
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
			activeName: 'getEmail',
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
		simulateLogin() {
			// return this.$https
			// 	.get('/user/session', {
			// 		email: this.model.email,
			// 		password: this.model.password,
			// 	})
			// 	.then(res => {
			// 		console.log(res);
			// 	});
			return new Promise(resolve => {
				setTimeout(resolve, 800);
			});
		},
		async validateEmail() {
			this.loading = true;
			await this.simulateLogin();
			this.activeName = 'getPassword';
			this.loading = false;
		},
		async signIn() {
			this.loading = true;
			await this.simulateLogin();
			this.loading = false;
			if (
				this.model.email === this.validCredentials.email &&
				this.model.password === this.validCredentials.password
			) {
				this.$message.success('Login successfull');
			} else {
				this.$message.error('Email or password is invalid');
			}
		},
		async signUp() {
			this.loading = true;
		},
		goBack() {},
	},
	computed: {
		disabledEmail() {
			return !this.validation.email;
		},
		disabledPassword() {
			return !this.validation.password;
		},
		// isSignInOrSignUp() {
		// 	return this.title ===
		// },
		getTitle() {
			return this.title === 'signIn' ? '로그인' : '회원가입';
		},
	},
};
</script>

<style lang="scss">
.login-button,
.signup-button {
	width: 100%;
	margin-top: 20px;
}
.login-form {
	width: 290px;
}
.forgot-password {
	margin-top: 10px;
}
.login .el-input__prefix {
	background: rgb(238, 237, 234);
	left: 0;
	height: calc(100% - 2px);
	left: 1px;
	top: 1px;
	border-radius: 3px;
	.el-input__icon {
		width: 30px;
	}
}
.login .el-input input {
	padding-left: 35px;
}
.login .el-card {
	padding-top: 0;
	padding-bottom: 30px;
}
h2 {
	font-family: 'Open Sans';
	letter-spacing: 1px;
	font-family: Roboto, sans-serif;
	padding-bottom: 20px;
}
.login .el-card {
	width: 340px;
	display: flex;
	justify-content: center;
}
.el-tabs__header {
	display: none;
}
</style>
