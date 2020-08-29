<template>
	<div class="app-container">
		<app-header></app-header>
		<app-sidebar v-if="isShowDrawer"></app-sidebar>
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

export default {
	name: 'ComplexLayout',
	components: {
		'el-main': () =>
			import(/* webpackChunkName: "el-main" */ 'element-ui/lib/main'),
		'app-sidebar': () => import('@/components/common/AppSidebar'),
		AppHeader,
	},
	data() {
		return {
			isShowDrawer: false,
		};
	},
	mounted() {
		// 첫번째 이벤트만 수신
		this.$bus.$once('showDrawer', () => {
			this.isShowDrawer = true;
			const vm = this;
			setTimeout(() => {
				vm.$bus.$emit('toggleDrawer', true);
			}, 100);
		});
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
