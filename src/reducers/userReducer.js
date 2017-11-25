
import initialState from './initialState'
import {Account, handleResponse} from '../api'

export default function (state, emitter) {
  const {user} = state
  
  const networkError = (user) => {
    user.loading = false
    user.error = 'Error de conexión'
    emitter.emit('render')
  }
  
  emitter.on('user::signup', async ({name, password, repeated}) => {
    try {
      user.loading = true
      user.error = null
      user.message = null
      emitter.emit('render')
      const response = await Account.signup(name, password)
      user.loading = false
      if (response.error) {
        user.error = response.data
        emitter.emit('render')
      } else {
        emitter.emit(state.events.PUSHSTATE, '/login')
        user.message = 'La cuenta se ha creado con éxito. Logueate para poder entrar a Chatters.'
      }
    } catch (error) {
      networkError(user)
    }
  })
  
  emitter.on('user::login', async ({name, password}) => {
    try {
      user.loading = true
      user.error = null
      user.message = null
      emitter.emit('render')
      const response = await Account.login(name, password)
      user.loading = false
      if (response.error) {
        user.error = response.data
        emitter.emit('render')
      } else {
        user.logged = true
        user.data = response.data
        emitter.emit(state.events.PUSHSTATE, '/')
      }
    } catch (error) {
      networkError(user)
    }
  })

  emitter.on('user::logout', () => {
    Object.assign(user, initialState.user)
    emitter.emit(state.events.REPLACESTATE, '/login')
    emitter.emit('render')
  })

  emitter.on('user::requires-login', () => {
    emitter.on(state.events.DOMCONTENTLOADED, async () => { 
      try {
        const response = await Account.session()
        handleResponse(response, emitter, () => {
          if (!response.error) {
            user.data = response.data
            user.logged = true
            user.error = null
            user.loading = null
            user.message = null
            emitter.emit('render')
          } else {
            emitter.emit('user::logout')
          }
        })
      } catch (error) {
        emitter.emit('user::logout')
      }
    })
  })
}

