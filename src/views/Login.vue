<template>
	<router-view></router-view>
</template>

<script>
export default {
	name: 'Login',
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
