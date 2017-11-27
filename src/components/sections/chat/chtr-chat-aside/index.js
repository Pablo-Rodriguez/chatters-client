
import {Component, tag, props, styles} from '../../../component'
import {html} from 'lit-html/lib/lit-extended'

import '../chtr-chat-list'
import '../chtr-chat-input'
import style from './style'

@tag('chtr-chat-aside')
@styles(style)
export class ChatAside extends Component {
  render () {
    return html`
      <section>
        <chtr-chat-list></chtr-chat-list>
        <chtr-chat-input></chtr-chat-input>
      </section>
    `
  }
}

