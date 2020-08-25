const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// TODO: remove
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
	.BundleAnalyzerPlugin;

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
				cacheGroups: {
					// vendor: {
					// 	chunks: 'initial',
					// 	name: 'vendor',
					// 	enforce: true,
					// },
					commons: {
						test: /[\\/]node_modules[\\/]/,
						name: 'vendors',
						enforce: true,
					},
					// commons: {
					// 	name: 'vendor',
					// 	test: /[\\/]node_modules[\\/]/,
					// 	minChunks: 2,
					// },
					// shared: {
					// 	test: /[\\/]node_modules[\\/]/,
					// 	name: 'vendor',
					// 	enforce: true,
					// 	chunks: 'all',
					// },
				},
			},
			// 	splitChunks: {
			// 		minSize: 10000,
			// 		maxSize: 250000,
			// 		chunks: 'all',
			// 	},
			// 	usedExports: true,
		},
		plugins: [
			new CleanWebpackPlugin(),
			new MiniCssExtractPlugin({
				filename: '[name].css',
			}),
			// TODO: remove
			new BundleAnalyzerPlugin({
				analyzerMode: 'static',
			}),
		],
	},
};
