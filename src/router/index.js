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
	{
		path: '/addBook',
		name: 'AddBook',
		component: () =>
			import(/* webpackChunkName: "addBook" */ '../views/AddBook.vue'),
		meta: { authRequired: true },
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

router.beforeEach((to, from, next) => {
	// to: 이동할 url에 해당하는 라우팅 객체
	if (
		to.matched.some(routeInfo => {
			return routeInfo.meta.authRequired;
		})
	) {
		// 이동할 페이지에 인증 정보가 필요하면 경고 창을 띄우고 페이지 전환은 하지 않음
		if (confirm('Get the fuck out of here🦶🦶🦶')) {
			console.log('ok');
		}
		// next({ name: '/' });
	} else {
		console.log("routing success : '" + to.path + "'");
		next(); // 페이지 전환
	}
});

export default router;
