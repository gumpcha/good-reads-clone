<template>
	<div>
		<h1>Home</h1>
		<p>Is login in: {{ isLoggedIn }}</p>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'Home',
	computed: {
		...mapGetters(['isLoggedIn']),
	},
};
</script>
