
import html from 'choo/html'

import '../components/sections/user/chtr-login'

export default function login (state, emit) {
  return html`
    <body>
      <chtr-login name="Pablo"></chtr-login>
    </body>
  `
}

