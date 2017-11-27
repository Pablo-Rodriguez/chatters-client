
import {Component, tag, styles, props} from '../../../component'
import {html} from 'lit-html/lib/lit-extended'

import '../chtr-chat-main'
import '../chtr-chat-aside'
import style from './style'

@tag('chtr-chat')
@styles(style)
export class Chat extends Component {
  render () {
    return html`
      <section>
        <chtr-chat-main></chtr-chat-main>
        <chtr-chat-aside></chtr-chat-aside>
      </section>
    `
  }
}

