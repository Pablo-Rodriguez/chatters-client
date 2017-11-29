
export default (state, emitter) => {
  emitter.on('chat::users-search', () => {
    state.users = ['other', 'another', 'hal']
    emitter.emit('render')
  })
}

