<template>
	<el-card>
		<h2>Login</h2>
		<el-form
			class="login-form"
			:model="model"
			:rules="rules"
			ref="form"
			@submit.native.prevent="login"
		>
			<el-form-item prop="email">
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
				></el-input>
			</el-form-item>
			<el-form-item>
				<el-button
					:disabled="disabled"
					:loading="loading"
					class="login-button"
					type="primary"
					native-type="submit"
					block
				>
					Login
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
			if (!regex.test(value)) {
				this.validation.email = false;
				return callback(new Error('Email format does not fit'));
			}
			this.validation.email = true;
		};
		let passwordValidate = (rule, value, callback) => {
			const regex = /^(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9])(?=.*[0-9]).{8,16}$/;
			if (!regex.test(value)) {
				this.validation.password = false;
				return callback(
					new Error(
						'PPlease write your password in a combination of English letters, numbers and special characters with a minimum of 8 characters and a maximum of 16 characters',
					),
				);
			}
			this.validation.password = true;
		};
		return {
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
						required: true,
						message: 'Email is required',
						trigger: 'blur',
					},
					{
						validator: emailValidate,
						trigger: 'change',
					},
				],
				password: [
					{
						required: true,
						message: 'Password is required',
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
			return new Promise(resolve => {
				setTimeout(resolve, 800);
			});
		},
		async login() {
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
	},
	computed: {
		disabled() {
			return !(this.validation.email && this.validation.password);
		},
	},
};
</script>

<style lang="scss" scoped>
.login-button {
	width: 100%;
	margin-top: 40px;
}
.login-form {
	width: 290px;
}
.forgot-password {
	margin-top: 10px;
}
$teal: rgb(0, 124, 137);
.el-button--primary {
	background: $teal;
	border-color: $teal;

	&:hover,
	&.active,
	&:focus {
		background: lighten($teal, 7);
		border-color: lighten($teal, 7);
	}
}
.login .el-input__inner:hover {
	border-color: $teal;
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
a {
	color: $teal;
	text-decoration: none;
	&:hover,
	&:active,
	&:focus {
		color: lighten($teal, 7);
	}
}
.login .el-card {
	width: 340px;
	display: flex;
	justify-content: center;
}
</style>
