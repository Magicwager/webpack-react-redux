/* createStore : 创建一个Redux store来存放应用中所有的state，一个应用只能有个store。三个参数reducer（Function，传入state与action）, preloadedState（初始state）, enhancer（中间件）
 * applyMiddleware : 作用是将所有中间件组成一个数组，依次执行
*/
import { createStore, applyMiddleware } from 'redux'
/* 
 * redux 中间件
 */

/* 
 *使用 redux-thunk（中间件） 之后，可以dispatch一个函数了，这个函数会接收dispatch, getState作为参数，在这个函数里你就可以干你想干的事情，在任何地方随意dispatch了 
*/
import thunkMiddleware from 'redux-thunk'

/* react-router-redux 是将react-router 和 redux 集成到一起的库，让你可以用redux的方式去操作react-router。
 * 例如，react-router 中跳转需要调用 router.push(path)，
 * 集成了react-router-redux 你就可以通过dispatch的方式使用router，例如跳转可以这样做 store.dispatch(push(url))。
 * 本质上，是把react-router自己维护的状态，例如location、history、path等等，也交给redux管理

 * A middleware you can apply to your Redux store to capture dispatched actions created by the action creators.
 * It will redirect those actions to the provided history instance.
 */
import { routerMiddleware } from 'react-router-redux'

/* redux-logger 打印日志
 */
import { createLogger } from 'redux-logger';
import { browserHistory } from 'react-router'
/* 
 *
*/
import rootReducer from '../reducers'

const nextReducer = require('../reducers')

const logger = createLogger();
const router = routerMiddleware(browserHistory)

export default function configure(initialState) {
  // console.log('initialState', initialState)
  /* 
   * 判断是否安装有redux开发调试插件，该工具主要依赖浏览器插件完成
  */
  const create = window.devToolsExtension
    ? window.devToolsExtension()(createStore)
    : createStore
  /* 源码里头applyMiddleware函数其实是一个 柯里化（Curry）的函数 */
  const createStoreWithMiddleware = applyMiddleware(thunkMiddleware, logger, router)(create)

  const store = createStoreWithMiddleware(rootReducer, initialState)

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
