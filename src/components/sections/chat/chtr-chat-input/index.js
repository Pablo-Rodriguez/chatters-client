
import {Component, tag, props, styles} from '../../../component'
import {html} from 'lit-html/lib/lit-extended'

import '../../../ui/chtr-input'
import style from './style'

@tag('chtr-chat-input')
@styles(style)
export class ChatInput extends Component {
  render () {
    return html`
      <div>
        <chtr-input><input></chtr-input>
      </div>
    `
  }
}

