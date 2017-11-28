
import {html, render} from 'lit-html/lib/lit-extended'

import '../components/sections/user/chtr-signup'

export default function signup (state, emit) {
  const {user} = state
  const error = user.error != null ? user.error.message : ''
  const template = html`
    <div id="root">
      <chtr-signup
        loading=${user.loading}
        error$=${error}
        emit=${emit}
      ></chtr-signup>
    </div>
  `
  render(template, state.root)
}

