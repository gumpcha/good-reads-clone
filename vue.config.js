const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
	.BundleAnalyzerPlugin;
const TerserPlugin = require('terser-webpack-plugin');

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
				chunks: 'all',
			},
			usedExports: true,
			minimize: true,
			minimizer:
				process.env.NODE_ENV === 'production'
					? [
							new TerserPlugin({
								terserOptions: {
									ecma: 6,
									compress: { drop_console: true },
									output: { comments: false, beautify: false },
								},
							}),
					  ]
					: [],
		},
		plugins: [
			new CleanWebpackPlugin(),
			new BundleAnalyzerPlugin({
				analyzerMode: 'static',
			}),
		],
	},
};
