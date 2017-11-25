
import html from 'choo/html'

import '../components/sections/user/chtr-login'

export default function login (state, emit) {
  const {user} = state
  const error = user.error != null ? user.error.message : ''
  return html`
    <div id="root">
      <chtr-login
        ${state.user.loading ? 'loading' : ''}
        error=${error}
        message=${user.message || ''}
        onemit=${emit}
      ></chtr-login>
    </div>
  `
}

