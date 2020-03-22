import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from 'Views/Home.vue';
import store from '../store';
import { Message } from 'element-ui';

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
		name: 'home',
		component: Home,
	},
	{
		path: '/login',
		name: 'login',
		component: () =>
			import(/* webpackChunkName: "login" */ '../views/Login.vue'),
	},
	{
		path: '/profile',
		name: 'profile',
		component: () =>
			import(/* webpackChunkName: "profile" */ '../views/Profile.vue'),
		meta: { requiresAuth: true },
	},
	{
		path: '/addBook',
		name: 'addBook',
		component: () =>
			import(/* webpackChunkName: "addBook" */ '../views/AddBook.vue'),
		meta: { requiresAuth: true },
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requiresAuth)) {
		// 이 라우트는 인증이 필요하며 로그인 한 경우 확인하십시오.
		// 그렇지 않은 경우 로그인 페이지로 리디렉션하십시오.
		if (!store.getters.loggedIn) {
			Message({
				showClose: true,
				message: 'Warning, this is a warning message.',
				type: 'warning',
			});
			next({ name: 'login' });
		} else {
			next();
		}
	} else {
		next(); // 반드시 next()를 호출하십시오!
	}
});

export default router;
