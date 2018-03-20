const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
//const hotMiddlewareScript = "webpack-hot-middleware/client?reload=true";

function resolve(relativePath) {
    return path.resolve(__dirname, relativePath)
}
//提取package里依赖的包
function getVendors() {
    let pkg = require("./package.json");
    let _vendors = [];
    for (const key in pkg.dependencies) {
        _vendors.push(key);
    }
    return _vendors;
}
//优化配置，对于使用CDN作为包资源的引用从外到内的配置,为了加快打包速度
const externals = {
   /*  "axios": "axios",
    "react": "React",
    "react-dom": "ReactDOM",
    "tinper-bee": "TinperBee" */
}

module.exports = {
    entry: {
        vendors: getVendors(),
        app: "./src/index.jsx"
    },
    output: {
        path:resolve('./build'),
        publicPath: "/",
        filename: '[name].[hash:4].js',
        chunkFilename: 'chunks/[name].[hash:4].js'
    },
    externals: externals,
    resolve: {
        //默认加载扩展名、相对JS路径模块的配置,配置别名 
        extensions: [
            ".jsx", ".js", ".less", ".css", ".json"
        ],
        alias: {
            components: path.join(__dirname, './src/components'),
            actions: path.join(__dirname, './src/actions'),
            api: path.join(__dirname, './src/api'),
            reducers: path.join(__dirname, './src/reducers'),
            utils: path.join(__dirname, './src/utils'),
            controllers: path.join(__dirname, './src/controllers'),
            style: path.join(__dirname, './src/style'),
            images: path.join(__dirname, './src/images'),
        }
    },
    module: {
        rules: [{
            test: /\.js[x]?$/,
            exclude: /(node_modules)/,
            use: [{
                loader: "babel-loader"
            }]
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                use: [{
                    loader: "css-loader",
                    options: {
                        modules: false
                    }
                }, "postcss-loader"],
                fallback: "style-loader"
            })
        }, {
            test: /\.less$/,
            use: ExtractTextPlugin.extract({
                use: [{
                    loader: "css-loader",
                    options: {
                        modules: false
                    }
                }, 'postcss-loader', 'less-loader'],
                fallback: 'style-loader'
            })
        }, {
            test: /\.(png|jpg|jpeg|gif)(\?.+)?$/,
            exclude: /favicon\.png$/,
            use: [{
                loader: "url-loader",
                options: {
                    limit: 8196,
                    name: "images/[name].[ext]"
                }
            }]
        }, {
            test: /\.(eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
            use: [{
                loader: "file-loader",
                options: {
                    name: "images/[name].[ext]"
                }
            }]
        }]
    },
    plugins: [
     // 提取css
        new ExtractTextPlugin({
            filename: "[name].css"
          }),
        new webpack.NamedModulesPlugin(),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/index.html",
            inject: "body",
            hash: false,
            chunks: ["vendors", "app"]
        })
    ]
}






