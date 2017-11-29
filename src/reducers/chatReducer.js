
export default (state, emitter) => {
  const {chat} = state
  let callInterval

  emitter.on('chat::users-search', () => {
    state.chat.users = ['other', 'another', 'hal']
    emitter.emit('render')
  })

  emitter.on('chat::call-request', (username) => {
    state.chat.call.calling = true
    state.chat.call.user = username
    emitter.emit('render')
    callInterval = setTimeout(() => emitter.emit('chat::cancel-call'), 7000)
  })

  emitter.on('chat::cancel-call', () => {
    state.chat.call.calling = false
    state.chat.call.user = null
    emitter.emit('render')
  })
}

