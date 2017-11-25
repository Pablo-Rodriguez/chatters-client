
import initialState from './initialState'
import userReducer from './userReducer'

export default function reducer (state, emitter) {
  Object.assign(state, initialState)
  userReducer(state, emitter)
}

