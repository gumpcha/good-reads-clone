import Vue from 'vue';
import VueRouter from 'vue-router';
import { Message } from 'element-ui';
// NOTE: add my component
import store from '@/store';
import SingleLayout from '@/components/layout/SingleLayout';
import ComplexLayout from '@/components/layout/ComplexLayout';
import Home from '@/views/Home.vue';

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
		meta: { layout: ComplexLayout },
	},
	{
		path: '/profile',
		name: 'profile',
		component: () =>
			import(/* webpackChunkName: "profile" */ '../views/Profile.vue'),
		meta: { layout: ComplexLayout, requiresAuth: true },
	},
	{
		path: '/addBook',
		name: 'addBook',
		component: () =>
			import(/* webpackChunkName: "addBook" */ '../views/AddBook.vue'),
		meta: { layout: ComplexLayout, requiresAuth: true },
	},
	// -----------------------------------------------
	// NOTE: From here it is a single component
	{
		path: '/login',
		name: 'login',
		component: () =>
			import(/* webpackChunkName: "login" */ '../views/Login.vue'),
		meta: { layout: SingleLayout },
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
				message: 'Available after login.',
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
