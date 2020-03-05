import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from 'Views/Home.vue';

Vue.use(VueRouter);

// -----------------------------------------------
// Page
//   Log In(Sign Up)
//   List
//   Detail
//   Profile(after login)
// Reuse Component
//   Header
//   Footer
//   Search
//   Add New(after login)
//   Rate or Review(after login)
//   Want to Read(after login)
// -----------------------------------------------

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/login',
		name: 'Login',
		component: () =>
			import(/* webpackChunkName: "login" */ '../views/Login.vue'),
	},
	{
		path: '/list',
		name: 'List',
		component: () => import(/* webpackChunkName: "list" */ '../views/List.vue'),
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
