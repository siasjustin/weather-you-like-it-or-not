var webpack = require('webpack');
var path = require('path');
if(!process.env.NODE_ENV === 'prod') {
	var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
}
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CompressionPlugin = require("compression-webpack-plugin");

var BUILD_DIR = path.resolve(__dirname, 'public/build');
var APP_DIR = path.resolve(__dirname, 'js');
var SCSS_DIR = path.resolve(__dirname, 'scss');

var config = {
	entry: [
		'babel-polyfill',
		APP_DIR + '/index.jsx',
		SCSS_DIR + '/main.scss'
	],
	output: {
		path: BUILD_DIR,
		filename: 'bundle.js'
	},
	plugins: [
		new webpack.ProvidePlugin({
			'globals': 'globals'
		}),
		new webpack.ProvidePlugin({
			'meta': 'meta'
		}),
		new ExtractTextPlugin('main.bundle.css'),
	],
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				enforce: 'pre',
				loader: 'eslint-loader',
				exclude: /node_modules/
			},
			{
			 	test:/\.jsx?$/,
				include : APP_DIR,
				loader : 'babel-loader',
				exclude: /node_modules/
			},
			{
				test:/\.css$/,
				use: ExtractTextPlugin.extract({
				  fallback: "style-loader",
		          use: 'css-loader',
		        }),
			},
			{
				test: /\.css$/,
				loader: 'style!css!postcss',
				include: path.join(__dirname, 'node_modules'), // oops, this also includes flexboxgrid
				exclude: /flexboxgrid/, // so we have to exclude it
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
				  fallback: "style-loader",
				  use: ['css-loader','sass-loader']
				}),
				// loader: ['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap']
			},
			{
				test:/\.png$/,
				loader: 'url-loader?limit=100000'
			},
			{
				test:/\.jpg$/,
				loader: 'file-loader'
			},
			{
		        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, 
		        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
		    },
		    {
		        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, 
		        loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
		    },
		    {
		        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, 
		        loader: 'file'
		    },
		    {
		        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, 
		        loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
		    },
		]
	},
	resolve: {
		extensions: ['.js', '.jsx', '.json'],
		alias: {
			'globals': path.resolve(__dirname, './js/globals'),
			'meta': path.resolve(__dirname, './js/meta')
		},
	    modules: [ "node_modules" ]
	},
};

if(process.env.NODE_ENV === 'prod') {
	config.plugins.push(new webpack.DefinePlugin({ // <-- key to reducing React's size
		'process.env': {
		'NODE_ENV': JSON.stringify('production')
		}
	})),
	config.plugins.push(new webpack.optimize.UglifyJsPlugin()), //minify everything
	config.plugins.push(new webpack.optimize.AggressiveMergingPlugin()), //Merge chunks 
//	 config.plugins.push(new BundleAnalyzerPlugin()),
	config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)),
	config.plugins.push(new CompressionPlugin({
		asset: "[path].gz[query]",
		algorithm: "gzip",
		test: /\.(js|html|css)$/,
		//threshold: 10240,
		minRatio: 0.8
	}))
}

module.exports = config;