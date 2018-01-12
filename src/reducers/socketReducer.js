
import io from 'socket.io-client'

import {ChatPeer} from '../lib/chtr-chat'

const socket = io()

export default (state, app) => {
  const call = state.chat.call
  socket.on('connect', () => {
    
  })

  app.on('chat::call-request', async ({user}) => {
    call.peers.self = new ChatPeer()
    await call.peers.self.initMedia()
    const constraints = call.peers.self.getOutputConstraints()
    call.peers.self.createPeer()
    const signalInfo = await call.peers.self.getSignalInfo()
    socket.emit('chat::init-call', {name: user, signalInfo, constraints})
  })

  socket.on('chat::incoming-call', async ({from, signalInfo, constraints}) => {
    call.peers.self = new ChatPeer()
    await call.peers.self.initMedia()
    call.peers.self.createPeer(false)
    call.signalInfo = signalInfo
    app.emit('chat::incoming-call', from)
  })

  app.on('chat::accept-call', async () => {
    console.log('Aceptando llamada')
    setTimeout(() => call.peers.self.peer.signal(call.signalInfo), 0)
    const otherStream = call.peers.self.getParticipantStream()
    const signalInfo = await call.peers.self.getSignalInfo()
    const constraints = call.peers.self.getOutputConstraints()
    app.emit('chat::call-established', {otherStream, constraints})
    socket.emit('chat::accepted-call', {from: state.chat.call.from, signalInfo, constraints})
  })

  app.on('chat::reject-call', () => {
    console.log('Rechazando llamada')
    app.emit('chat::free-resources')
    socket.emit('chat::rejected-call', state.chat.call.from || state.chat.call.to)
  })

  socket.on('chat::accepted-call', ({signalInfo, constraints}) => {
    console.log('Conexion establecida')
    call.peers.self.peer.signal(signalInfo)
    app.emit('chat::call-established', {constraints})
  })

  socket.on('chat::rejected-call', ({msg}) => {
    console.log(`Llamada rechazada: ${msg}`)
    app.emit('chat::free-resources')
    app.emit('chat::rejected-call')
  })

  app.on('chat::free-resources', () => {
    try {
      if (state.chat.call.peers.self) {
        state.chat.call.peers.self.close()
        state.chat.call.peers.self = null
      }
      if (state.chat.call.peers.other) {
        state.chat.call.peers.other.close()
        state.chat.call.peers.other = null
      }
    } catch (e) {console.log(e)}
  })

  app.on('user::login-success', () => {
    socket.connect()
  })

  app.on('chat::send-message', (message) => {
    socket.emit('chat::send-message', {
      to: state.chat.call.to || state.chat.call.from,
      by: state.user.data.name,
      message: message
    })
  })

  socket.on('chat::message', ({by, message}) => {
    app.emit('chat::add-message', {by, message})
  })
}

