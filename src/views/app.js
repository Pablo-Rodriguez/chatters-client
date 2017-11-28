
import {html, render} from 'lit-html/lib/lit-extended'

import '../components/sections/chat/chtr-chat'

export default function app (state, emit) {
  const template = html`
    <div id="root">
      <chtr-chat state=${state} emit=${emit}>
      </chtr-chat>
    </div>
  `
  render(template, state.root)
}

