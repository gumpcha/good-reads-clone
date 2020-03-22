<template>
	<el-container>
		<el-main class="single-main">
			<router-view></router-view>
		</el-main>
	</el-container>
</template>

<script>
export default {
	name: 'SingleLayout',
};
</script>

<style lang="scss" scoped>
.single-main {
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
