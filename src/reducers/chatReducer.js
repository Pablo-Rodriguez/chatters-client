
import {Chat, handleResponse} from '../api'

export default (state, emitter) => {
  const {chat} = state

  function clearCall () {
    chat.call.calling = false
    chat.call.init = false
    chat.call.from = null
    chat.call.to = null
    chat.call.messages = []
  }

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
    chat.call.calling = true
    chat.call.to = user
    emitter.emit('render')
  })

  emitter.on('chat::incoming-call', (from) => {
    if (chat.call.calling === true) {
      emitter.emit('chat::reject-call')
    } else {
      chat.call.calling = true
      chat.call.from = from
      chat.call.to = null
      emitter.emit('render')
    }
  })

  emitter.on('chat::accept-call', () => {
    emitter.emit('chat::call-established')
  })

  emitter.on('chat::reject-call', () => {
    clearCall()
    emitter.emit('render')
  })

  emitter.on('chat::rejected-call', () => {
    clearCall()
    emitter.emit('render')
  })

  emitter.on('chat::call-established', () => {
    chat.call.calling = true
    chat.call.init = true
    emitter.emit('render')
  })

  emitter.on('chat::cancel-call', () => {
    chat.call.calling = false
    chat.call.user = null
    emitter.emit('render')
  })

  emitter.on('chat::send-message', (message) => {
    emitter.emit('chat::add-message', {
      by: null,
      message
    })
  })

  emitter.on('chat::add-message', ({by, message}) => {
    chat.call.messages.push({by, message})
    emitter.emit('render')
  })
}

