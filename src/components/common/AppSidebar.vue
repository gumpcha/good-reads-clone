<template>
	<el-drawer
		:visible.sync="drawer"
		:direction="direction"
		:before-close="handleClose"
		size="20%"
	>
		<el-menu
			:default-active="active"
			class="el-menu-vertical-demo"
			background-color="#545c64"
			text-color="#fff"
			active-text-color="#ffd04b"
		>
			<el-menu-item index="home" @click="goToPage('home')">
				<span class="icon-menu">
					<i class="fas fa-home"></i>
				</span>
				<span>Home</span>
			</el-menu-item>
			<el-menu-item index="profile" @click="goToPage('profile')">
				<span class="icon-menu">
					<i class="fas fa-user"></i>
				</span>
				<span>Profile</span>
			</el-menu-item>
			<el-menu-item index="addBook" @click="goToPage('addBook')">
				<span class="icon-menu">
					<i class="fas fa-book"></i>
				</span>
				<span>Add New Book</span>
			</el-menu-item>
		</el-menu>
	</el-drawer>
</template>

<script>
// ----------------------------------------------------------------
// NOTE: work for font awesome5
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faUser, faBook } from '@fortawesome/free-solid-svg-icons';
import { dom } from '@fortawesome/fontawesome-svg-core'; // This will kick of the initial replacement of i to svg tags and configure a MutationObserver
dom.watch(); // This will kick of the initial replacement of i to svg tags and configure a MutationObserver
library.add(faHome, faUser, faBook);
// ----------------------------------------------------------------

// ----------------------------------------------------------------
// NOTE: work for element ui
// import 'element-ui/lib/theme-chalk/drawer.css';
// import 'element-ui/lib/theme-chalk/menu.css';
// import 'element-ui/lib/theme-chalk/menu-item.css';
// ----------------------------------------------------------------

export default {
	name: 'AppSidebar',
	components: {
		'el-drawer': () =>
			import(/* webpackChunkName: "el-drawer" */ 'element-ui/lib/drawer'),
		'el-menu': () =>
			import(/* webpackChunkName: "el-menu" */ 'element-ui/lib/menu'),
		'el-menu-item': () =>
			import(/* webpackChunkName: "el-menu-item" */ 'element-ui/lib/menu-item'),
	},
	data() {
		return {
			drawer: false,
			direction: 'ltr',
			active: 'home',
		};
	},
	watch: {
		$route(to, from) {
			if (from.name && to.name) {
				this.active = to.name;
			}
		},
	},
	mounted() {
		// TODO: replace vuex
		this.$bus.$on('toggle', bool => {
			this.drawer = bool;
		});
	},
	methods: {
		handleClose(done) {
			done();
		},
		goToPage(name) {
			this.$router.push({ name: name }, () => {});
		},
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
.icon-menu {
	display: inline-block;
	width: 24px;
	margin-right: 5px;
	text-align: center;
	font-size: 16px;
	vertical-align: baseline;
}
</style>
