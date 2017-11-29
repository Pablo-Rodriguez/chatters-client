
import {Component, tag, styles, props} from '../../../component'
import {html} from 'lit-html/lib/lit-extended'
import {conditional} from '../../../helpers/directives'
import bacon from 'baconjs'

import '../chtr-chat-list'
import '../chtr-chat-list-item'
import '../chtr-chat-input'
import style from './style'

@tag('chtr-chat-aside')
@styles(style)
@props({
  users: {
    type: 'object',
    observe: true,
    default: () => []
  },
  calling: {
    type: 'boolean',
    observe: true,
    default: false
  }
})
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

  clickHandler (e) {
    if (e.target.tagName.toLowerCase() === 'chtr-chat-list-item') {
      this.dispatchEvent(new CustomEvent('call-request', {detail: {
        user: e.target.text
      }}))
    }
  }

  render () {
    return html`
      <section>
        <chtr-chat-list on-click=${this.clickHandler.bind(this)}>
          ${conditional(!this.calling, html`
            ${this.users.map((name) => html`<chtr-chat-list-item text=${name}></chtr-chat-list-item>`)}
          `)}
        </chtr-chat-list>
        <chtr-chat-input></chtr-chat-input>
      </section>
    `
  }
}

