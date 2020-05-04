<template>
	<el-card>
		<el-form class="login-form" :model="model" :rules="rules" ref="form">
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
			<el-form-item>
				<el-button class="signUp-button" type="success" block>
					회원가입
				</el-button>
			</el-form-item>
		</el-form>
	</el-card>
</template>

<script>
import { mapActions } from 'vuex';

export default {
	name: 'SignIn',
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
	mounted() {},
	methods: {
		...mapActions(['dispatchSignIn']),
		signIn() {
			this.loading = true;
			this.dispatchSignIn({
				email: this.model.email,
				password: this.model.password,
			});
			this.loading = false;
		},
		goSignIn() {
			this.activeName = 'signIn';
		},
	},
	computed: {
		disabledButton() {
			return !this.validation.email || !this.validation.password;
		},
	},
};
</script>
