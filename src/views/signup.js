
import html from 'choo/html'

import '../components/themes/theme'
import '../components/sections/user/chtr-signup'

export default function signup (state, emit) {
  return html`
    <body>
      <main-theme></main-theme>
      <chtr-signup></chtr-signup>
    </body>
  `
}

