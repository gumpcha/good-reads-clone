import Vue from 'vue';
import {
	Container,
	Row,
	Col,
	Header,
	Button,
	Autocomplete,
	Tooltip,
	Avatar,
	Image,
	Drawer,
	Menu,
	MenuItem,
	Main,
	Card,
	Form,
	FormItem,
	Input,
	PageHeader,
} from 'element-ui';
import '@/assets/scss/reset.scss';
import '@/assets/scss/golbal.scss';
import router from '@/router';
import store from '@/store';
import App from '@/App.vue';
import Api from '@/api';

// ----------------------------------------------------------------
// NOTE: plugin
import customPlugin from '@/plugins/custom.js';
// ----------------------------------------------------------------

Vue.use(
	Container,
	Row,
	Col,
	Header,
	Button,
	Autocomplete,
	Tooltip,
	Avatar,
	Image,
	Drawer,
	Menu,
	MenuItem,
	Main,
	Card,
	Form,
	FormItem,
	Input,
	PageHeader,
);

Vue.use(customPlugin);

Vue.config.productionTip = false;
// TODO: replace vuex
Vue.prototype.$bus = new Vue();
Vue.prototype.$api = Api;

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app');
