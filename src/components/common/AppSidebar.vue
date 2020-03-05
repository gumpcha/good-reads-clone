<template>
	<el-drawer
		:visible.sync="drawer"
		:direction="direction"
		:before-close="handleClose"
		size="20%"
	>
		<el-menu
			default-active="2"
			class="el-menu-vertical-demo"
			background-color="#545c64"
			text-color="#fff"
			active-text-color="#ffd04b"
		>
			<el-submenu index="1">
				<template slot="title">
					<i class="el-icon-location"></i>
					<span>Navigator One</span>
				</template>
				<el-menu-item-group title="Group One">
					<el-menu-item index="1-1">item one</el-menu-item>
					<el-menu-item index="1-2">item one</el-menu-item>
				</el-menu-item-group>
				<el-menu-item-group title="Group Two">
					<el-menu-item index="1-3">item three</el-menu-item>
				</el-menu-item-group>
				<el-submenu index="1-4">
					<template slot="title">item four</template>
					<el-menu-item index="1-4-1">item one</el-menu-item>
				</el-submenu>
			</el-submenu>
			<el-menu-item index="2">
				<i class="el-icon-menu"></i>
				<span>Navigator Two</span>
			</el-menu-item>
			<el-menu-item index="3" disabled>
				<i class="el-icon-document"></i>
				<span>Navigator Three</span>
			</el-menu-item>
			<el-menu-item index="4">
				<i class="el-icon-setting"></i>
				<span>Navigator Four</span>
			</el-menu-item>
		</el-menu>
	</el-drawer>
</template>

<script>
export default {
	name: 'AppSidebar',
	data() {
		return {
			drawer: false,
			direction: 'ltr',
		};
	},
	methods: {
		handleClose(done) {
			done();
			// this.$confirm('Are you sure you want to close this?')
			// 	.then(() => {
			// 		done();
			// 	})
			// 	.catch(() => {});
		},
	},
	mounted() {
		// TODO: replace vuex
		this.$bus.$on('toggle', bool => {
			this.drawer = bool;
		});
	},
};
</script>

<style lang="scss" scoped>
.app-el-menu-vertical {
	position: fixed;
	top: 0;
	left: 0;
	min-height: 100%;
}
.app-el-menu-vertical:not(.el-menu--collapse) {
	width: 200px;
	// min-height: 100%;
}
</style>
