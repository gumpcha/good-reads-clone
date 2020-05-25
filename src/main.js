import Vue from 'vue';
import '@/plugins/element.js';
import router from '@/router';
import store from '@/store';
import App from '@/App.vue';
import Api from '@/api';

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

// ----------------------------------------------------------------
// NOTE: plugin
import customPlugin from '@/plugins/custom.js';
Vue.use(customPlugin);
// ----------------------------------------------------------------

import '@/assets/scss/reset.scss';
import '@/assets/scss/golbal.scss';

Vue.config.productionTip = false;
// TODO: replace vuex
Vue.prototype.$bus = new Vue();
Vue.prototype.$api = Api;

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app');
