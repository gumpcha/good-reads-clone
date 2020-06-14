import Vue from 'vue';
// import Element from 'element-ui';
import {
	Container,
	Row,
	Col,
	Header,
	Button,
	Autocomplete,
	Tooltip,
	Avatar,
	Drawer,
	Main,
} from 'element-ui';
import locale from 'element-ui/lib/locale/lang/ko';
import '../element-variables.scss';

Vue.use(Container, { locale });
Vue.use(Row, { locale });
Vue.use(Col, { locale });
Vue.use(Header, { locale });
Vue.use(Button, { locale, size: 'small' });
Vue.use(Autocomplete, { locale });
Vue.use(Tooltip, { locale });
Vue.use(Avatar, { locale });
Vue.use(Drawer, { locale });
Vue.use(Main, { locale });
