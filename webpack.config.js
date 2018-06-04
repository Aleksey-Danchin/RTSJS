const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	mode: 'development',
	entry: path.resolve(__dirname, 'examples/dev/index.js'),
	output: {
		path: path.resolve(__dirname, 'examples/dev/dist'),
		filename: '[name].js'
	},
	module: {
		rules: [
			{
				test: /\.(png|jpg|gif)$/,
				use: [{
					// loader: 'file-loader',
					// loader: "url-loader?mimetype=image/png",
					loader: "url-loader",
					options: {
						mimetype: 'image/png',
						name: '[path][name].[ext]'
					}
				}]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Dev'
		})
	]
}