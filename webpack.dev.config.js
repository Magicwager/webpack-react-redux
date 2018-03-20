const webpack = require('webpack')
const OpenBrowserPlugin = require("open-browser-webpack-plugin");
const Jarvis = require("webpack-jarvis");
const merge = require('webpack-merge');
const webpackConfigCommon = require('./webpack.common.config')
const svrConfig = require("./pmm.config.js").svrConfig;

const webpackConfigDev = {
    devtool: "cheap-module-eval-source-map",
    plugins: [
        // 定义环境变量为开发环境
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
            IS_DEVELOPMETN: true,
        }),
        new OpenBrowserPlugin({
            url: `http://${svrConfig.host}:${svrConfig.port}/#/login`,
        }),
        new Jarvis({
            port: 8888
        })
    ]
}

module.exports = merge(webpackConfigCommon, webpackConfigDev)
   