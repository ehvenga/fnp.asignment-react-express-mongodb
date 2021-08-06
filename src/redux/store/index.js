import { createStore, compose, applyMiddleware } from 'redux'
import reducers from '../reducers'
import thunk from 'redux-thunk'

const composer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const middleware = [
    thunk
]

const appMiddleware = applyMiddleware(...middleware)

export default createStore(reducers, composer(appMiddleware))