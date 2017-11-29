
import {Component, tag, props, styles} from '../../../component'
import {html} from 'lit-html/lib/lit-extended'

import style from './style'

@tag('chtr-chat-list')
@styles(style)
export class ChatList extends Component {
  render () {
    return html`
      <ul>
        <slot></slot>
      </ul>
    `
  }
}

