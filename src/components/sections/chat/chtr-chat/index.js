
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
    this.$('chtr-chat-aside').addEventListener('input', e => {
      if (!this.state.chat.call.calling) {
        this.emit('chat::users-search', e.detail)
      } else if (this.state.chat.call.init) {
        this.emit('chat::send-message')
      }
    })
    this.$('chtr-chat-aside').addEventListener('call-request', e => this.emit('chat::call-request', e.detail))
  }
  render () {
    return html`
      <section>
        <chtr-chat-main call=${this.state.call} emit=${this.emit}></chtr-chat-main>
        <chtr-chat-aside users=${this.state.users} calling=${this.state.call.calling}></chtr-chat-aside>
      </section>
    `
  }
}

