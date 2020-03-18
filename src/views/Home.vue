<template>
	<div>
		<h1>Home</h1>
		<el-button type="danger" plain @click="goToAddBook">
			새로운 책 추가합시다
		</el-button>
	</div>
</template>

<script>
export default {
	name: 'Home',
	methods: {
		goToAddBook() {
			this.$router.push({ name: 'AddBook' });
		},
	},
};
</script>
