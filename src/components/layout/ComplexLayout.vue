<template>
	<div class="app-container">
		<app-header></app-header>
		<app-sidebar></app-sidebar>
		<el-main class="complex-main">
			<router-view></router-view>
		</el-main>
	</div>
</template>

<script>
// ----------------------------------------------------------------
// NOTE: work for element ui
import 'element-ui/lib/theme-chalk/main.css';
// ----------------------------------------------------------------
import AppHeader from '@/components/common/AppHeader';
import AppSidebar from '@/components/common/AppSidebar';

export default {
	name: 'ComplexLayout',
	components: {
		'el-main': () =>
			import(/* webpackChunkName: "el-main" */ 'element-ui/lib/main'),
		AppHeader,
		AppSidebar,
	},
};
</script>

<style lang="scss" scoped>
.app-container {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
</style>
