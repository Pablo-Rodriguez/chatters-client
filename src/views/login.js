
import {html, render} from 'lit-html/lib/lit-extended'

import '../components/sections/user/chtr-login'

export default function login (state, emit) {
  const {user} = state
  const error = user.error != null ? user.error.message : ''
  console.log(user.message)
  const template = html`
    <div id="root">
      <chtr-login
        loading=${user.loading}
        error$=${error}
        message$=${user.message || ''}
        emit=${emit}
      ></chtr-login>
    </div>
  `
  render(template, state.root)
}

