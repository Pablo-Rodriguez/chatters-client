
import {Component, tag, props, styles} from '../../../component'
import {html} from 'lit-html/lib/lit-extended'

import '../../../ui/chtr-input'
import style from './style'

@tag('chtr-chat-input')
@styles(style)
export class ChatInput extends Component {
  get value () {
    return this.$('#input').value
  }

  render () {
    return html`
      <div>
        <chtr-input><input
          id="input"
          placeholder="Busqueda de usuarios..."
          on-input=${this.onInput}
        /></chtr-input>
      </div>
    `
  }
}

