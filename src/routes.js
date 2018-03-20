import React from 'react'
import { Router, Route, IndexRoute, hashHistory} from 'react-router'

import App from './base'
import Welcome from './pages/welcome'

/* 
 * webpack 在编译时，会静态地解析代码中的 require.ensure(dependencies: String[], callback: function(require), chunkName: String)，同时将模块添加到一个分开的 chunk 当中。这个新的 chunk 会被 webpack 通过 jsonp 来按需加载。

*/
// 表格列表
const table = (location, cb) => {
  require.ensure([], (require) => {
    cb(null, require('./pages/menu/table').default)
  }, 'table')
}

// 图表
const echarts = (location, cb) => {
  require.ensure([], (require) => {
    cb(null, require('./pages/menu/echarts').default)
  }, 'echarts')
}

// 登录
const Login = (location, cb) => {
  require.ensure([], (require) => {
    cb(null, require('./pages/login').default)
  }, 'login')
}

// 注册
const Register = (location, cb) => {
  require.ensure([], (require) => {
    cb(null, require('./pages/register').default)
  }, 'register')
}

// 测试
const chat = (location, cb) => {
  require.ensure([], (require) => {
    cb(null, require('./pages/chat').default)
  }, 'chat')
}
// 编辑器
const editor = (location, cb) => {
  require.ensure([], (require) => {
    cb(null, require('./pages/menu/editor').default)
  }, 'editor')
}

/* 进入路由的判断 */
function isLogin(nextState, replaceState) {
  const token = sessionStorage.getItem('token')
  if (!token) {
    replaceState('/login')
    // hashHistory.push('/login')
  }
}
/* 
 * react-router 3.x 通过getComponent按需异步加载
 * onEnter(nextState, replaceState, callback?)
 * 当 route 即将进入时调用。它提供了下一个路由的 state，一个函数重定向到另一个路径。
*/
export default () => (
  <Router history={hashHistory}>
   
    <Route path="/" component={App} onEnter={isLogin}>
      <IndexRoute component={Welcome} />
      <Route path="/table" getComponent={table} />
      <Route path="/echarts" getComponent={echarts} />
      <Route path="/editor" getComponent={editor} />
      <Route path="/chat" getComponent={chat} />
    </Route>
    <Route path="/login" getComponent={Login} />
    <Route path="/register" getComponent={Register} />
  </Router>
)

// export default routes
