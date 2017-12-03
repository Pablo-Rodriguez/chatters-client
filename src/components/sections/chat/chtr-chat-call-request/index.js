
import {Component, tag, styles, props} from '../../../component'
import {html} from 'lit-html/lib/lit-extended'

import '../../../ui/chtr-fullscreen-message'
import '../../../ui/chtr-fab'
import style from './style'

@tag('chtr-chat-call-request')
@styles(style)
@props({
  to: {
    type: 'object',
    observe: true
  },
  from: {
    type: 'object',
    observe: true
  }
})
export default class ChatCallRequest extends Component {
  render () {
    if (this.to != null) {
      return html`
        <div>
          <div class="header">
            <chtr-fullscreen-message title text="Llamando a ${this.to}"></chtr-fullscreen-message>
          </div>
          <div class="buttons">
            <chtr-fab error on-click="${this.reject}">R</chtr-fab>
          </div>
        </div>
      `
    } else if (this.from != null) {
      return html`
        <div>
          <div class="header">
            <chtr-fullscreen-message title text="Llamada de ${this.from}"></chtr-fullscreen-message>
          </div>
          <div class="buttons">
            <chtr-fab success on-click="${this.accept}">A</chtr-fab>
            <chtr-fab error on-click="${this.reject}">R</chtr-fab>
          </div>
        </div>
      `
    } else {
      return html`<div></div>`
    }
  }
}

