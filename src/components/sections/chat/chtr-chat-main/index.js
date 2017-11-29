
import {Component, tag, props, styles} from '../../../component'
import {html} from 'lit-html/lib/lit-extended'
import {conditional} from '../../../helpers/directives'

import '../../chat/chtr-chat-call-request'
import '../../../ui/chtr-fullscreen-message'
import style from './style'

@tag('chtr-chat-main')
@styles(style)
@props({
  call: {
    type: 'object',
    observe: true,
    default: () => ({
      calling: false,
      user: null
    })
  }
})
export class ChatMain extends Component {
  render () {
    return html`
      <section>
        ${conditional(this.call.calling,
          html`<chtr-chat-call-request to=${this.call.user}></chtr-chat-call-request>`,
          html`<chtr-fullscreen-message title text="Chatters"></chtr-fullscreen-message>`)}
      </section>
    `
  }
}

