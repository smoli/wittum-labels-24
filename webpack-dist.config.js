var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'eval',
    entry: [
        './src/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({})
    ],
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            'react': 'react-lite',
            'react-dom': 'react-lite'
        }
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['babel-loader'],
                include: path.join(__dirname, 'src')
            }]
    }
};
