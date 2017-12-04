
import io from 'socket.io-client'

const socket = io('http://localhost:5000')

export default (state, app) => {
  socket.on('connect', () => {
    
  })

  app.on('chat::call-request', ({user}) => socket.emit('chat::init-call', user))

  socket.on('chat::incoming-call', ({from}) => {
    app.emit('chat::incoming-call', from)
  })

  app.on('chat::accept-call', () => {
    console.log('Aceptando llamada')
    socket.emit('chat::accepted-call', state.chat.call.from)
  })

  app.on('chat::reject-call', () => {
    console.log('Rechazando llamada')
    socket.emit('chat::rejected-call', state.chat.call.from || state.chat.call.to)
  })

  socket.on('chat::accepted-call', () => {
    console.log('Conexion establecida')
    app.emit('chat::call-established')
  })

  socket.on('chat::rejected-call', ({msg}) => {
    console.log(`Llamada rechazada: ${msg}`)
    app.emit('chat::rejected-call')
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

