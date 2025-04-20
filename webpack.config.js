const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'accessibility-plugin.min.js',
        library: {
            name: 'AccessibilityPlugin',
            type: 'umd',
            export: 'default',
            umdNamedDefine: true
        },
        globalObject: 'this'
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            __SERVER_URL__: JSON.stringify("http://163.43.224.214:3000"),
            __API_KEY__: JSON.stringify("sk_7a9cJXh8LQmN3vP2Zy5RtKdWgVBf0A1")
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser'
        })
    ],
    resolve: {
        fallback: {
            "path": require.resolve("path-browserify"),
            "os": require.resolve("os-browserify/browser"),
            "crypto": require.resolve("crypto-browserify"),
            "stream": require.resolve("stream-browserify"),
            "vm": require.resolve("vm-browserify"),
            "process": require.resolve("process/browser")
        }
    }
};
