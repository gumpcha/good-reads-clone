const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');

module.exports = {
	configureWebpack: {
		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src/'),
			},
		},
		devtool: 'source-map',
		plugins: [
			new HtmlWebpackPlugin(),
			new PreloadWebpackPlugin({
				rel: 'preload',
				as(entry) {
					if (/\.css$/.test(entry)) return 'style';
					if (/\.woff$/.test(entry)) return 'font';
					if (/\.png$/.test(entry)) return 'image';
					return 'script';
				},
			}),
		],
	},
};
