const path = require('path');

module.exports = {
	configureWebpack: {
		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src/'),
			},
		},
		devtool: 'source-map',
		performance: {
			hints: false,
		},
		optimization: {
			splitChunks: {
				minSize: 10000,
				maxSize: 250000,
			},
		},
	},
};
