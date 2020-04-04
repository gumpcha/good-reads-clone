import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import './plugins/element.js';

// baseURL 기본값을 정의한다
axios.defaults.baseURL = 'https://good-reads-clone-api-express.herokuapp.com';
// 모든 요청에 추가할 헤더 설정
axios.defaults.headers.common['Authorization'] = 'Bearer';
// GET 요청에 추가할 헤더 설정
axios.defaults.headers.get['Accepts'] = 'application/json';

Vue.prototype.$https = axios;

// ----------------------------------------------------------------
// NOTE: work for font awesome5
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { dom } from '@fortawesome/fontawesome-svg-core'; // This will kick of the initial replacement of i to svg tags and configure a MutationObserver
dom.watch(); // This will kick of the initial replacement of i to svg tags and configure a MutationObserver
library.add(fas);

Vue.component('font-awesome-icon', FontAwesomeIcon);
// ----------------------------------------------------------------

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
