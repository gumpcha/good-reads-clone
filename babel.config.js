module.exports = {
	// presets: ['@vue/cli-plugin-babel/preset'],
	presets: [
		[
			'@babel/preset-env',
			{
				modules: false,
				targets: {
					esmodules: true,
				},
			},
		],
	],
	plugins: [
		[
			'component',
			{
				libraryName: 'element-ui',
				styleLibraryName: 'theme-chalk',
			},
		],
	],
};
