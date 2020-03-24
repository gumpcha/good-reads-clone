<template>
	<div id="app">
		<component :is="$route.meta.layout"></component>
	</div>
</template>

<script>
import ComplexLayout from 'Components/layout/ComplexLayout';
import SingleLayout from 'Components/layout/SingleLayout';

export default {
	name: 'App',
	components: {
		ComplexLayout,
		SingleLayout,
	},
	data() {
		return {
			layout: ComplexLayout,
		};
	},
};
</script>

<style lang="scss" scoped>
#app {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	// text-align: center;
	color: #2c3e50;
}
</style>
