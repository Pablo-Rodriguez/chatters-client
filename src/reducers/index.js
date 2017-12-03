
import initialState from './initialState'
import socketReducer from './socketReducer'
import userReducer from './userReducer'
import chatReducer from './chatReducer'

export default function reducer (state, emitter) {
  Object.assign(state, initialState)
  socketReducer(state, emitter)
  userReducer(state, emitter)
  chatReducer(state, emitter)
}

