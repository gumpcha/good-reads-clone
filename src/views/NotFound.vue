<template>
	<div class="not-found-wrapper">
		<div class="not-found">
			<p class="error-code">404</p>
			<p class="error-msg">Page not found</p>
		</div>
	</div>
</template>

<script>
export default {
	name: 'NotFound',
};
</script>

<style lang="scss" scoped>
.not-found-wrapper {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: url(../assets/img/bg-404.png) repeat;
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;

	.not-found {
		text-align: center;
		.error-code {
			margin-bottom: 20px;
			font-size: 147px;
			font-weight: 300;
			color: #999999;
			color: white;
		}
		.error-msg {
			margin-bottom: 80px;
			font-size: 36px;
			color: #999999;
		}
	}
}
</style>
