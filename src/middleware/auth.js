
import html from 'choo/html'

export default (view) => {
  return (state, emit) => {
    if (state.user.logged) {
      return view(state, emit)
    } else {
      emit('user::requires-login')
      const node = document.createElement('div')
      node.id = 'root'
      return html`<div id="root"></div>`
    }
  }
}

