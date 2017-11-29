
import {Component, tag, styles} from '../../../component'
import {html} from 'lit-html/lib/lit-extended'
import bacon from 'baconjs'

import '../chtr-chat-list'
import '../chtr-chat-input'
import style from './style'

@tag('chtr-chat-aside')
@styles(style)
export class ChatAside extends Component {
  connectedCallback () {
    super.connectedCallback()
    const input = this.$('chtr-chat-input')
    bacon.fromEvent(input, 'input')
      .doAction('.preventDefault')
      .doAction('.stopPropagation')
      .debounce(300)
      .map(e => input.value)
      .onValue((value) => this.dispatchEvent(new CustomEvent('input', {detail: value})))
  }

  render () {
    return html`
      <section>
        <chtr-chat-list></chtr-chat-list>
        <chtr-chat-input></chtr-chat-input>
      </section>
    `
  }
}

