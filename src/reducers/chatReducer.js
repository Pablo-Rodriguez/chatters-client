
import {Chat, handleResponse} from '../api'

export default (state, emitter) => {
  const {chat} = state
  let callInterval

  emitter.on('chat::users-search', async (query) => {
    try {
      const response = await Chat.findUsers(query)
      handleResponse(response, emitter, () => {
        if (!response.error) {
          state.chat.users = response.data.users.map(user => user.name)
          emitter.emit('render')
        }
      })
    } catch (error) {
    }
  })

  emitter.on('chat::call-request', ({user}) => {
    state.chat.call.calling = true
    state.chat.call.user = user
    emitter.emit('render')
    callInterval = setTimeout(() => emitter.emit('chat::cancel-call'), 7000)
  })

  emitter.on('chat::cancel-call', () => {
    state.chat.call.calling = false
    state.chat.call.user = null
    emitter.emit('render')
  })
}

