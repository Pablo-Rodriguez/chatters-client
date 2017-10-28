
import html from 'choo/html'

import '../components/sections/user/chtr-login'
import '../components/themes/theme'

export default function login (state, emit) {
  return html`
    <body>
      <main-theme></main-theme>
      <chtr-login name="Pablo"></chtr-login>
    </body>
  `
}

