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
import AppHeader from 'Components/common/AppHeader';
import AppSidebar from 'Components/common/AppSidebar';

export default {
	name: 'ComplexLayout',
	components: {
		AppHeader,
		AppSidebar,
	},
	methods: {},
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
