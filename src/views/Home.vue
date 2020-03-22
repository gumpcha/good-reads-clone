<template>
	<div>
		<h1>Home</h1>
		<!-- <el-button type="danger" plain>
			<router-link :to="{ name: 'profile' }">새로운 책 추가합시다</router-link>
		</el-button> -->
		<el-button type="danger" plain @click="goToProfile">
			프로필 페이지
		</el-button>
		<!-- <el-button type="danger" plain @click="goToAddBook">
			책 추가
		</el-button> -->
	</div>
</template>

<script>
export default {
	name: 'Home',
	methods: {
		goToProfile() {
			this.$router.push({ name: 'profile' }, () => {});
		},
		goToAddBook() {
			this.$router.push({ name: 'addBook' }, () => {});
		},
	},
};
</script>
