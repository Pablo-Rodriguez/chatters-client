
import initialState from './initialState'
import userReducer from './userReducer'
import chatReducer from './chatReducer'

export default function reducer (state, emitter) {
  Object.assign(state, initialState)
  userReducer(state, emitter)
  chatReducer(state, emitter)
}

