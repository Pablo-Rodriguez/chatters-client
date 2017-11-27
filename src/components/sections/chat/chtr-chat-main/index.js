
import {Component, tag, props, styles} from '../../../component'
import {html} from 'lit-html/lib/lit-extended'

import '../../../ui/chtr-fullscreen-message'
import style from './style'

@tag('chtr-chat-main')
@styles(style)
export class ChatMain extends Component {
  render () {
    return html`
      <section>
        <chtr-fullscreen-message title text="Chatters" ></chtr-fullscreen-message>
      </section>
    `
  }
}

