
import {Component, tag, styles, props} from '../../../component'
import {html} from 'lit-html/lib/lit-extended'

import '../chtr-chat-main'
import '../chtr-chat-aside'
import style from './style'

@tag('chtr-chat')
@styles(style)
@props({
  state: {
    type: 'object',
    observe: true
  }
})
export class Chat extends Component {
  connectedCallback () {
    super.connectedCallback()
    this.$('chtr-chat-aside').addEventListener('input', (e) => {
      if (this.state.call.calling !== true) {
        this.emit('chat::users-search', e.detail)
      }
    })
    this.$('chtr-chat-aside').addEventListener('change', (e) => {
      if (this.state.call.calling === true && this.state.call.init === true) {
        this.emit('chat::send-message', e.detail)
      }
    })
    this.$('chtr-chat-aside').addEventListener('call-request', e => this.emit('chat::call-request', e.detail))
  }
  render () {
    return html`
      <section>
        <chtr-chat-main call=${this.state.call} emit=${this.emit}></chtr-chat-main>
        <chtr-chat-aside users=${this.state.users} call=${this.state.call}></chtr-chat-aside>
      </section>
    `
  }
}

