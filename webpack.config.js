var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'eval',
    entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        './src/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
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
            }, {
                test: /\.json/,
                loaders: ['json-loader']
            }]
    }
};
