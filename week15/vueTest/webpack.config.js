module.exports = {
    entry: './index.js',
    output: {
        filename: 'bundle.js',
    },
    mode: 'development',
    optimization: {
        minimize: false
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                    plugins: [['@babel/plugin-transform-react-jsx', {pragma: 'createElement'}]]
                }
            }
        }, {
            test: /\.view$/,
            use: {
                loader: require.resolve('./myLoader.js')
            }
        }]
    },
    devServer: {
        open: true,
        compress: false,
        contentBase: './'
    }
};