import Vue from 'vue';
import VueRouter from 'vue-router';
import { Message } from 'element-ui';
// NOTE: add my component
import store from '@/store';
import SingleLayout from '@/components/layout/SingleLayout';
import ComplexLayout from '@/components/layout/ComplexLayout';
import Home from '@/views/Home';

Vue.use(VueRouter);

// -----------------------------------------------
// NOTE: Url convention hypen
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
		path: '*',
		name: 'NotFound',
		component: () =>
			import(/* webpackChunkName: "notFound" */ '@/views/NotFound.vue'),
		meta: { layout: SingleLayout },
	},
	{
		path: '/',
		alias: '/home',
		name: 'home',
		component: Home,
		meta: { layout: ComplexLayout },
	},
	{
		path: '/profile',
		name: 'profile',
		component: () =>
			import(/* webpackChunkName: "profile" */ '@/views/Profile.vue'),
		meta: { layout: ComplexLayout, requiresAuth: true },
	},
	{
		path: '/add-book',
		name: 'addBook',
		component: () =>
			import(/* webpackChunkName: "addBook" */ '@/views/AddBook.vue'),
		meta: { layout: ComplexLayout, requiresAuth: true },
	},
	// -----------------------------------------------
	// NOTE: From here it is a single component
	{
		path: '/',
		component: () =>
			import(/* webpackChunkName: "login" */ '@/views/Login.vue'),
		children: [
			{
				path: 'sign-in',
				name: 'signIn',
				component: () =>
					import(
						/* webpackChunkName: "signIn" */ '@/components/login/UserSignIn.vue'
					),
				meta: { layout: SingleLayout },
			},
			{
				path: 'sign-up',
				name: 'signUp',
				component: () =>
					import(
						/* webpackChunkName: "signUp" */ '@/components/login/UserSignUp.vue'
					),
				meta: { layout: SingleLayout },
			},
		],
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

const message = function(opt) {
	return Message({
		showClose: true,
		dangerouslyUseHTMLString: true,
		type: opt.type,
		message: opt.message,
	});
};

router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requiresAuth)) {
		// 이 라우트는 인증이 필요하며 로그인 한 경우 확인하십시오.
		// 그렇지 않은 경우 로그인 페이지로 리디렉션하십시오.
		const { access_token } = localStorage;
		console.log(access_token);

		if (!store.getters.loggedIn) {
			message({
				type: 'warning',
				message: '로그인이 필요합니다.',
			});
			next({ name: 'signIn' });
		}
	} else {
		next(); // 반드시 next()를 호출하십시오!
	}
});

export default router;
