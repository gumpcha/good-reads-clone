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
				v-if="activeName !== 'signIn'"
				@back="goSignIn"
				:content="'회원가입'"
				style="margin-bottom: 10px;"
			></el-page-header>
			<h2 v-if="activeName === 'signIn'">로그인</h2>
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
			<el-form-item class="mt-3" v-if="activeName === 'signIn'">
				<el-button
					:disabled="disabledButton"
					:loading="loading"
					class="signIn-button"
					type="primary"
					@click="signIn"
					block
				>
					로그인
				</el-button>
			</el-form-item>
			<el-form-item v-if="activeName === 'signIn'">
				<el-button
					:loading="loading"
					class="signUp-button"
					type="success"
					@click="activeName = 'signUp'"
					block
				>
					회원가입
				</el-button>
			</el-form-item>
			<el-form-item v-if="activeName === 'signUp'">
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
		async signIn() {
			this.loading = true;
			await this.$axios
				.post('/user/session', {
					email: this.model.email,
					password: this.model.password,
				})
				.then(res => {
					this.$store.commit('signIn', res.data.access_token);
					this.$message.success('Login successfull');
				})
				.catch(err => {
					if (err.code == 401) {
						this.$message.error(err.message);
					} else {
						this.$message.error(
							'유효하지 않은 정보입니다. 확인 후 다시 로그인해주세요.😱',
						);
					}
				});
			this.loading = false;
		},
		async signUp() {
			this.loading = true;
			await this.$axios
				.post('/user', {
					email: this.model.email,
					password: this.model.password,
				})
				.then(res => {
					console.log(res);
				})
				.catch(err => {
					console.error(err);
					this.$notify({
						title: '주의',
						dangerouslyUseHTMLString: true,
						message: `<strong><i>${this.model.email}</i></strong> 등록되지 않은 이메일입니다.`,
						duration: 3000,
						customClass: 'notification-danger',
					});
					this.activeName = 'signUp';
				});
			this.loading = false;
		},
		goSignIn() {
			this.activeName = 'signIn';
		},
		test() {
			console.log(this.model.email);
		},
	},
	computed: {
		disabledButton() {
			if (this.activeName === 'signIn') {
				return !this.validation.email || !this.validation.password;
			}
			return !this.validation.email || !this.validation.password;
		},
	},
};
</script>

<style lang="scss">
.signIn-button,
.signUp-button {
	width: 100%;
}
.signIn-button {
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
