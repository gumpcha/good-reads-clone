import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins/element.js';

import 'Assets/scss/reset.scss';
import 'Assets/scss/golbal.scss';

Vue.config.productionTip = false;
// TODO: replace vuex
Vue.prototype.$bus = new Vue();

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app');
