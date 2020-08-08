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

Vue.use(Container);
Vue.use(Row);
Vue.use(Col);
Vue.use(Header);
Vue.use(Button);
Vue.use(Autocomplete);
Vue.use(Tooltip);
Vue.use(Avatar);
Vue.use(Image);
Vue.use(Drawer);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Main);
Vue.use(Card);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(PageHeader);
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
