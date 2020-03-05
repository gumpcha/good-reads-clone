const path = require('path');

module.exports = {
	configureWebpack: {
		resolve: {
			alias: {
				Views: path.resolve(__dirname, './src/views'),
				Components: path.resolve(__dirname, './src/components/'),
				Assets: path.resolve(__dirname, './src/assets/'),
				'@': path.resolve(__dirname, './src/'),
			},
		},
	},
};
