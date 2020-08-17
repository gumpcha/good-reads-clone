<template>
	<el-container>
		<el-main class="single-main">
			<router-view></router-view>
		</el-main>
	</el-container>
</template>

<script>
// ----------------------------------------------------------------
// NOTE: work for element ui
import 'element-ui/lib/theme-chalk/container.css';
import 'element-ui/lib/theme-chalk/main.css';
// ----------------------------------------------------------------

export default {
	name: 'SingleLayout',
	components: {
		'el-container': () =>
			import(/* webpackChunkName: "el-container" */ 'element-ui/lib/container'),
		'el-main': () =>
			import(/* webpackChunkName: "el-main" */ 'element-ui/lib/main'),
	},
};
</script>

<style lang="scss" scoped>
.single-main {
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
