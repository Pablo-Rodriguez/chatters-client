
import {Component, tag, props, styles} from '../../../component'
import {html} from 'lit-html/lib/lit-extended'

import '../../../ui/chtr-input'
import style from './style'

@tag('chtr-chat-input')
@styles(style)
@props({
  placeholder: {
    type: 'string',
    observe: true,
    default: ''
  }
})
export class ChatInput extends Component {
  get value () {
    return this.$('#input').value
  }

  onKeydown (e) {
    if (e.keyCode === 13) {
      this.dispatchEvent(new CustomEvent('new-message', {}))
    }
  }

  clear () {
    this.$('#input').value = ''
  }

  render () {
    return html`
      <div>
        <chtr-input><input
          id="input"
          placeholder="${this.placeholder}"
          on-input=${this.onInput}
          on-keydown=${this.onKeydown.bind(this)}
        /></chtr-input>
      </div>
    `
  }
}

