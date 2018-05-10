const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	mode: 'development',
	entry: path.resolve(__dirname, 'examples/dev/index.js'),
	output: {
		path: path.resolve(__dirname, 'examples/dev/dist'),
		filename: '[name].js'
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Dev'
		})
	]
}