import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'//负责提供全局的store，原理是利用react的context属性，store放在了上下文对象context上面，每个子组件都可以通过this.props.store=context方式得到store
import './config'//初始store
import Routes from './routes'
import configure from './store/configureStore'

const store = configure({ config: global.gconfig })//在初始state基础上通过redux及redux的中间件生成全局唯一的store

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root'),
)
