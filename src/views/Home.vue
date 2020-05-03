<template>
	<div>
		<h1>Home</h1>
		<p>Is login in: {{ loggedIn }}</p>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'Home',
	computed: {
		...mapGetters(['loggedIn']),
	},
};
</script>
