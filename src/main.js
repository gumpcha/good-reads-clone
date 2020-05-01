import Vue from 'vue';
import '@/plugins/element.js';
import router from '@/router';
import store from '@/store';
import App from '@/App.vue';

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

import '@/assets/scss/reset.scss';
import '@/assets/scss/golbal.scss';

Vue.config.productionTip = false;
// TODO: replace vuex
Vue.prototype.$bus = new Vue();

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app');
