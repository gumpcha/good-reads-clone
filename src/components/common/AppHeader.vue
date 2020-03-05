<template>
	<el-header class="app-header">
		<el-button @click="toggleDrawer" type="primary">
			open
		</el-button>
		<search-book></search-book>
	</el-header>
</template>

<script>
import SearchBook from 'Components/common/SearchBook';

export default {
	name: 'AppHeader',
	component: {
		SearchBook,
	},
	data() {
		return {
			current: '',
		};
	},
	methods: {
		toggleDrawer() {
			// TODO: replace vuex
			this.$bus.$emit('toggle', true);
		},
	},
	mounted() {
		console.log(`${this.$options.name}`);
	},
};
</script>

<style lang="scss" scoped>
$variable-top: 60px;

.app-header {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: $variable-top;
}
</style>
