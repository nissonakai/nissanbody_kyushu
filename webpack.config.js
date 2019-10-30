const webpack = require("webpack");

module.exports = {
    entry: "./js_sources/main.js",
    output: {
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                ['env', {
                                    'modules': false
                                }]
                            ]
                        }
                    }
                ]
            }
        ]
    },
    devtool: 'source-map',
    mode: 'production'
};