
export default (state, emitter) => {
  emitter.on('chat::users-search', () => {
    state.users = ['other']
    emitter.emit('render')
  })
}

