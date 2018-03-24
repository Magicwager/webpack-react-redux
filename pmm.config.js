//在webpack中的配置
const svrConfig = {
  host: "127.0.0.1",
  port: 3000,
  mockenable: true,
  buildTool:"webpack",//使用的构建工具名称，只能是'webpack'或'gulp'
  webpackCfgName: "webpack.dev.config.js"//webpack的开发配置文件，buildTool参数为‘webpack’时才配置
};

const proxyConfig = [
  /* {
    enable : false,
    router: "/test",
    url: ""
  }, */
]

const mockConfig = {
  "GET": [{}],
  "POST": [{

  }]

};
module.exports = {
  svrConfig: svrConfig,
  proxyConfig: proxyConfig,
  mockConfig : mockConfig 
};