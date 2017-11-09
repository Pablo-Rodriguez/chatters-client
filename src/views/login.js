
import html from 'choo/html'

import '../components/themes/theme'
import '../components/sections/user/chtr-login'

export default function login (state, emit) {
  return html`
    <body>
      <main-theme></main-theme>
      <chtr-login onemit=${emit}></chtr-login>
    </body>
  `
}

