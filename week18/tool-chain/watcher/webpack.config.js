module.exports = {
    entry: './src/a.js',
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
                    presets: ['@babel/preset-env']
                }
            }
        }]
    },
    devServer: {
        open: true,
        compress: false,
        contentBase: './src'
    }
};