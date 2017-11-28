
import {Component, tag, styles, observe} from '../../../component'
import {html} from 'lit-html/lib/lit-extended'

import '../chtr-chat-main'
import '../chtr-chat-aside'
import style from './style'

@tag('chtr-chat')
@styles(style)
@observe(['state'])
export class Chat extends Component {
  connectedCallback () {
    super.connectedCallback()
    this.$('chtr-chat-aside').addEventListener('input', e => this.emit('chat::users-search', e.detail))
  }
  render () {
    return html`
      <section>
        <chtr-chat-main></chtr-chat-main>
        <chtr-chat-aside data=${this.state.users}></chtr-chat-aside>
      </section>
    `
  }
}

