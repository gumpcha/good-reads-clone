const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// TODO: remove
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
// 	.BundleAnalyzerPlugin;

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
				// chunks: 'all',
			},
			usedExports: true,
		},
		plugins: [
			new CleanWebpackPlugin(),
			// TODO: remove
			// new BundleAnalyzerPlugin({
			// 	analyzerMode: 'static',
			// }),
		],
	},
};
