import { messageService } from '@/message';

export default {
	install(Vue) {
		// TODO: global method error
		// Vue.myGlobalMethod = function() {
		// 	// console.log('myGlobalMethod');
		// };
		Vue.mixin({
			methods: {
				// 모든 하위 컴포넌트에서 호출할 수 있음
				sendMessage(param) {
					// send message to subscribers via observable subject
					messageService.sendMessage(param);
				},
			},
		});
	},
};
