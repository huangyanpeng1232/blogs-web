const webpack = require("webpack");

module.exports = {
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $: 'jquery',
                jquery: 'jquery',
                'window.jQuery': 'jquery',
                jQuery: 'jquery'
            })
        ]
    },
    devServer: {
        host: '0.0.0.0',
        port: 80,
        open: true
    },
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = '浩瀚学者'
                return args
            })
    }
}

