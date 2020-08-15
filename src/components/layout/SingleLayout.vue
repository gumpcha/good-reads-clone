<template>
	<el-container>
		<el-main class="single-main">
			<router-view></router-view>
		</el-main>
	</el-container>
</template>

<script>
import { Main } from 'element-ui';

export default {
	name: 'SingleLayout',
	components: { 'el-main': Main },
};
</script>

<style lang="scss" scoped>
.single-main {
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
