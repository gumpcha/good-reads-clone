<template>
	<div id="app">
		<component :is="$route.meta.layout"></component>
	</div>
</template>

<script>
import ComplexLayout from '@/components/layout/ComplexLayout';
import SingleLayout from '@/components/layout/SingleLayout';
import { Message } from 'element-ui';
import { messageService } from '@/message';

// const message = function(opt) {
// 	return Message({
// 		showClose: true,
// 		dangerouslyUseHTMLString: true,
// 		type: opt.type,
// 		message: opt.message,
// 	});
// };

export default {
	name: 'App',
	components: {
		ComplexLayout,
		SingleLayout,
		Message,
	},
	data() {
		return {
			layout: ComplexLayout,
		};
	},
	created() {
		// subscribe to home component messages
		this.subscription = messageService.getMessage().subscribe(message => {
			console.log(message);

			if (message) {
				// add message to local state if not empty
				// this.messages.push(message);
				this.setMessage(message);
			} else {
				// clear messages when empty message received
				this.messages = [];
			}
		});
	},
	beforeDestroy() {
		// unsubscribe to ensure no memory leaks
		this.subscription.unsubscribe();
	},
	methods: {
		sendMessage() {
			// send message to subscribers via observable subject
			messageService.sendMessage(
				'Message from Home Page Component to App Component!',
			);
		},
		clearMessages() {
			// clear messages
			messageService.clearMessages();
		},
		setMessage(param) {
			this.$message({
				showClose: true,
				dangerouslyUseHTMLString: true,
				type: param.type,
				message: param.message,
			});
		},
	},
};
</script>

<style lang="scss" scoped>
#app {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	// text-align: center;
	color: #2c3e50;
}
</style>
