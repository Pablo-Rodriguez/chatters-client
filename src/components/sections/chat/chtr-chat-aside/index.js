
import {Component, tag, styles, observe} from '../../../component'
import {html} from 'lit-html/lib/lit-extended'
import bacon from 'baconjs'

import '../chtr-chat-list'
import '../chtr-chat-input'
import style from './style'

@tag('chtr-chat-aside')
@styles(style)
@observe(['data'])
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
    this.log(this.data)
    return html`
      <section>
        <chtr-chat-list></chtr-chat-list>
        <chtr-chat-input></chtr-chat-input>
      </section>
    `
  }
}

