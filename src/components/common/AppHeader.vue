<template>
	<el-container>
		<el-header class="app-header">
			<div class="header-wrapper">
				<el-row>
					<el-row>
						<el-col :xs="4" :sm="2" :md="2" :lg="2" :xl="2">
							<el-button
								icon="fas fa-bars"
								@click="toggleDrawer"
								circle
							></el-button>
						</el-col>
						<el-col :xs="16" :sm="16" :md="16" :lg="16" :xl="16">
							<div class="search-box-wrapper">
								<el-autocomplete
									class="search-book-box"
									popper-class="search-book-dropdown"
									placeholder="Please input"
									v-model="search"
									:clearable="true"
									:fetch-suggestions="querySearch"
									:trigger-on-focus="false"
									@select="handleSelect"
								>
									<el-button
										@click="handleIconClick"
										slot="append"
										icon="fas fa-search"
									></el-button>
									<template slot-scope="{ item }">
										<el-image
											class="image"
											:srcset="item.srcset"
											fit="cover"
										></el-image>
										<div>
											<p class="name">{{ item.name }}</p>
											<p class="name">{{ item.name }}</p>
										</div>
									</template>
								</el-autocomplete>
							</div>
						</el-col>
						<el-col
							:xs="4"
							:sm="6"
							:md="6"
							:lg="6"
							:xl="6"
							class="avatar-wrapper"
						>
							<el-dropdown
								v-if="isLoggedIn"
								trigger="click"
								@command="handleCommand"
							>
								<el-avatar
									class="avatar"
									:size="avatar.size"
									:src="avatar.src"
									:icon="avatar.src ? null : 'fas fa-user'"
								></el-avatar>
								<el-dropdown-menu slot="dropdown" size="mini" split-button>
									<el-dropdown-item
										v-for="(menu, index) in dropdownMenu"
										:key="index"
										:command="menu.command"
									>
										{{ menu.name }}
									</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
							<el-tooltip
								v-else
								class="item"
								effect="dark"
								content="로그인"
								placement="bottom-end"
							>
								<el-avatar
									style="background-color: red;"
									class="avatar"
									:size="avatar.size"
									@click.native="goToLogin"
								>
									<i class="fas fa-sign-in-alt"></i>
								</el-avatar>
							</el-tooltip>
						</el-col>
					</el-row>
				</el-row>
			</div>
		</el-header>
	</el-container>
</template>

<script>
// import {
// 	Avatar,
// 	Autocomplete,
// 	Button,
// 	Col,
// 	Container,
// 	Header,
// 	Image,
// 	Row,
// 	Tooltip,
// } from 'element-ui';
import { mapGetters } from 'vuex';
import { mapMutations } from 'vuex';

// ----------------------------------------------------------------
// NOTE: work for font awesome5
import { library } from '@fortawesome/fontawesome-svg-core';
import {
	faSignInAlt,
	faBars,
	faSearch,
	faUser,
} from '@fortawesome/free-solid-svg-icons';
import { dom } from '@fortawesome/fontawesome-svg-core'; // This will kick of the initial replacement of i to svg tags and configure a MutationObserver
dom.watch(); // This will kick of the initial replacement of i to svg tags and configure a MutationObserver
library.add(faSignInAlt, faBars, faSearch, faUser);
// ----------------------------------------------------------------

// ----------------------------------------------------------------
// NOTE: work for element ui
// import 'element-ui/lib/theme-chalk/avatar.css';
// import 'element-ui/lib/theme-chalk/autocomplete.css';
// import 'element-ui/lib/theme-chalk/button.css';
// import 'element-ui/lib/theme-chalk/col.css';
// import 'element-ui/lib/theme-chalk/container.css';
// import 'element-ui/lib/theme-chalk/header.css';
// import 'element-ui/lib/theme-chalk/image.css';
// import 'element-ui/lib/theme-chalk/row.css';
// import 'element-ui/lib/theme-chalk/tooltip.css';
// ----------------------------------------------------------------

export default {
	name: 'AppHeader',
	components: {
		'el-avatar': () =>
			import(/* webpackChunkName: "el-avatar" */ 'element-ui/lib/avatar'),
		'el-autocomplete': () =>
			import(
				/* webpackChunkName: "el-autocomplete" */ 'element-ui/lib/autocomplete'
			),
		'el-button': () =>
			import(/* webpackChunkName: "el-button" */ 'element-ui/lib/button'),
		'el-col': () =>
			import(/* webpackChunkName: "el-col" */ 'element-ui/lib/col'),
		'el-container': () =>
			import(/* webpackChunkName: "el-container" */ 'element-ui/lib/container'),
		'el-header': () =>
			import(/* webpackChunkName: "el-header" */ 'element-ui/lib/header'),
		'el-image': () =>
			import(/* webpackChunkName: "el-image" */ 'element-ui/lib/image'),
		'el-row': () =>
			import(/* webpackChunkName: "el-row" */ 'element-ui/lib/row'),
		'el-tooltip': () =>
			import(/* webpackChunkName: "el-tooltip" */ 'element-ui/lib/tooltip'),
	},
	data() {
		return {
			links: [],
			search: '',
			avatar: {
				size: 'large',
				src: null,
			},
			dropdownMenu: [
				{
					command: 'profile',
					name: '프로필',
				},
				{
					command: 'addBook',
					name: '책 추가',
				},
				{
					command: 'logout',
					name: '로그아웃',
				},
			],
		};
	},
	computed: {
		// getter를 객체 전개 연산자(Object Spread Operator)로 계산하여 추가합니다.
		...mapGetters(['isLoggedIn', 'getAccessToken']),
	},
	mounted() {
		this.links = this.loadAll();
	},
	methods: {
		...mapMutations(['authRequest', 'authSuccess', 'authError', 'logout']),
		createFilter(queryString) {
			return link => {
				return link.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
			};
		},
		handleSelect(item) {
			console.log(item);
		},
		handleIconClick() {
			console.log(this.search);
		},
		loadAll() {
			return [
				{
					name: 'vue',
					writer: 'Jim',
					keyword: 'programming',
					srcset:
						'https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/p640x640/71006480_175939810121322_3164432933571965742_n.jpg?_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=106&_nc_ohc=fWN11w3Y-00AX_37q4l&oh=e435dfe4d098aec6c7150207886062df&oe=5E9269BD 640w,https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/p750x750/71006480_175939810121322_3164432933571965742_n.jpg?_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=106&_nc_ohc=fWN11w3Y-00AX_37q4l&oh=f3c3b0c992c0102963c2bc3c5841c6a0&oe=5E8D39BD 750w,https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/e35/p1080x1080/71006480_175939810121322_3164432933571965742_n.jpg?_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=106&_nc_ohc=fWN11w3Y-00AX_37q4l&oh=14e8168415816d2a2ff21bcc161f669b&oe=5E910C58 1080w',
				},
				{
					name: 'element',
					writer: 'Bob',
					keyword: 'Sience',
					srcset:
						'https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/p640x640/72167258_470589843668518_6970069065673758139_n.jpg?_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=110&_nc_ohc=d5hffek9JO8AX-VR9DC&oh=4bde5344380a40e73fc7434c2f6b0019&oe=5E942EC8 640w,https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/p750x750/72167258_470589843668518_6970069065673758139_n.jpg?_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=110&_nc_ohc=d5hffek9JO8AX-VR9DC&oh=a63c0aa6a9d4cf63550f30b1495977ef&oe=5E8D4DC8 750w,https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/e35/p1080x1080/72167258_470589843668518_6970069065673758139_n.jpg?_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=110&_nc_ohc=d5hffek9JO8AX-VR9DC&oh=8c12ada057ca6c3e1ff4d37f0e1b2eed&oe=5E90012D 1080w',
				},
				{
					name: 'cooking',
					writer: 'Ponlansky',
					keyword: 'Animation',
					srcset:
						'https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/p640x640/69992497_385676179020759_4028648086009377818_n.jpg?_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=103&_nc_ohc=w8wBMBGaQT8AX_tNRR0&oh=fd7acc2c61ae5c0d1752e76ef00aef4a&oe=5E8E0EDA 640w,https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/p750x750/69992497_385676179020759_4028648086009377818_n.jpg?_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=103&_nc_ohc=w8wBMBGaQT8AX_tNRR0&oh=d5a2b9bab70d07c422e86882418f62e6&oe=5E971CDA 750w,https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/e35/p1080x1080/69992497_385676179020759_4028648086009377818_n.jpg?_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=103&_nc_ohc=w8wBMBGaQT8AX_tNRR0&oh=74c57b31430ae2500e54d70b24c64e69&oe=5E93C33F 1080w',
				},
				{
					name: 'mint-ui',
					writer: 'James Adward',
					keyword: 'Music',
					srcset:
						'https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/p640x640/71800727_123761118663986_3051477457954849072_n.jpg?_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=102&_nc_ohc=tHDrNp6ICcwAX_Xj7ej&oh=ba74ceaf7ae832ba4ebc7c02e168ab98&oe=5E9483CB 640w,https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/p750x750/71800727_123761118663986_3051477457954849072_n.jpg?_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=102&_nc_ohc=tHDrNp6ICcwAX_Xj7ej&oh=118932e200703054c52342f506d2f905&oe=5E8D9ECB 750w,https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/e35/p1080x1080/71800727_123761118663986_3051477457954849072_n.jpg?_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=102&_nc_ohc=tHDrNp6ICcwAX_Xj7ej&oh=a0d4078f6844a1f92c763f07c83e3e62&oe=5E98372E 1080w',
				},
				{
					name: 'vuex',
					writer: 'King Jones',
					keyword: 'Math',
					srcset:
						'https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/p640x640/69710357_2349536752042008_5281295307517262369_n.jpg?_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=100&_nc_ohc=nGIs1id3HXQAX8k-Shx&oh=bcce963b735f5c012dda8d1287ce75f3&oe=5E91257B 640w,https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/p750x750/69710357_2349536752042008_5281295307517262369_n.jpg?_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=100&_nc_ohc=nGIs1id3HXQAX8k-Shx&oh=615b8056c4eddda50884703f2a4116c4&oe=5E99B7BF 750w,https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/e35/p1080x1080/69710357_2349536752042008_5281295307517262369_n.jpg?_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=100&_nc_ohc=nGIs1id3HXQAX8k-Shx&oh=7a461f23db640dfcb903d5cc7bee286f&oe=5E91F4BE 1080w',
				},
				{
					name: 'vue-router',
					writer: 'Natallie',
					keyword: 'Movie',
					srcset:
						'https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/p640x640/70767298_836762420054560_6368285805261402358_n.jpg?_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=104&_nc_ohc=M5S9_igPlSgAX9HtxoP&oh=a4b0bb993ed6b1d71b10a47c4cc89ddf&oe=5E9A0809 640w,https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/p750x750/70767298_836762420054560_6368285805261402358_n.jpg?_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=104&_nc_ohc=M5S9_igPlSgAX9HtxoP&oh=19d6a58185f298e2954a23a0dec5f381&oe=5E9A2D09 750w,https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/e35/p1080x1080/70767298_836762420054560_6368285805261402358_n.jpg?_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=104&_nc_ohc=M5S9_igPlSgAX9HtxoP&oh=fe5bc12c50ffbfbc9b10c4447d2f492f&oe=5E9402EC 1080w',
				},
				{
					name: 'babel',
					writer: 'Tony Stark',
					keyword: 'Software',
					srcset:
						'https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/p640x640/69718565_280883232868948_8941909795310594672_n.jpg?_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=104&_nc_ohc=vhPg7lTzV6AAX_P-pxE&oh=6287b96788003589a5e060fb15f545be&oe=5E8F1A41 640w,https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/p750x750/69718565_280883232868948_8941909795310594672_n.jpg?_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=104&_nc_ohc=vhPg7lTzV6AAX_P-pxE&oh=c24f0b177b8086bdb0c76a8736dbbcde&oe=5E940F41 750w,https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/e35/p1080x1080/69718565_280883232868948_8941909795310594672_n.jpg?_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=104&_nc_ohc=vhPg7lTzV6AAX_P-pxE&oh=a96fff0ff1223bdcffe7e511143b34cc&oe=5E8FF5A4 1080w',
				},
			];
		},
		querySearch(queryString, cb) {
			let links = this.links;
			let results = queryString
				? links.filter(this.createFilter(queryString))
				: links;
			// call callback function to return suggestion objects
			cb(results);
		},
		toggleDrawer() {
			// TODO: replace vuex
			this.$bus.$emit('toggle', true);
		},
		goToLogin() {
			this.$router.push({ name: 'signIn' });
		},
		handleCommand(command) {
			if (command === 'logout') {
				this.$api
					.logout({
						access_token: this.getAccessToken,
					})
					.then(() => {
						this.logout();
						this.sendMessage({
							type: 'success',
							message: '로그아웃 되었습니다.',
						});
					})
					.catch(err => {
						console.error(err);
						this.authError();
						this.sendMessage({
							type: 'error',
							message: '서버오류로 인해 로그아웃이 되지 않았습니다.',
						});
					});
			} else {
				this.$router.push({ name: command });
			}
		},
	},
};
</script>

<style lang="scss">
.search-box-wrapper {
	.el-input-group__append {
		background-color: #409eff;
	}
	.fa-search {
		color: #fff;
	}
}

.search-book-dropdown {
	li {
		display: flex;
		align-items: center;
		padding: 3px 5px !important;
		.image {
			width: 30px;
			height: 30px;
		}
	}
}
@media screen and (min-width: 768px) {
	.search-book-dropdown {
		li {
			padding: 5px 10px !important;
			.image {
				width: 50px;
				height: 50px;
			}
		}
	}
}
</style>

<style lang="scss" scoped>
$variable-top: 60px;

.app-header {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: $variable-top;
	.header-wrapper {
		padding: 10px 0;
		.search-book-box {
			width: 100%;
		}
		.avatar-wrapper {
			text-align: right;
			.avatar {
				cursor: pointer;
			}
		}
	}
}
</style>
