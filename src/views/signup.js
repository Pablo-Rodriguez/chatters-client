
import html from 'choo/html'

import '../components/sections/user/chtr-signup'

export default function signup (state, emit) {
  const {user} = state
  const error = user.error != null ? user.error.message : ''
  return html`
    <div id="root">
      <chtr-signup
        ${state.user.loading && 'loading'}
        error=${error}
        onemit=${emit}
      ></chtr-signup>
    </div>
  `
}

