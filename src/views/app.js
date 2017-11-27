
import html from 'choo/html'

import '../components/sections/chat/chtr-chat'

export default function app (state, emit) {
  return html`
    <div id="root">
      <chtr-chat></chtr-chat>
    </div>
  `  
}

