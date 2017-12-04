
import {Component, tag, styles, props} from '../../../component'
import {html} from 'lit-html/lib/lit-extended'
import {repeat} from 'lit-html/lib/repeat'
import {conditional} from '../../../helpers/directives'
import bacon from 'baconjs'

import '../chtr-chat-list'
import '../chtr-chat-list-item'
import '../chtr-chat-message'
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
  call: {
    type: 'object',
    observe: true
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
    bacon.fromEvent(input, 'new-message')
      .doAction('.preventDefault')
      .doAction('.stopPropagation')
      .map(e => input.value)
      .filter(value => value !== '')
      .onValue((value) => {
        this.dispatchEvent(new CustomEvent('change', {detail: value}))
        input.clear()
      })
  }

  clickHandler (e) {
    if (e.target.tagName.toLowerCase() === 'chtr-chat-list-item') {
      this.dispatchEvent(new CustomEvent('call-request', {detail: {
        user: e.target.text
      }}))
      this.$('chtr-chat-input').clear()
    }
  }

  render () {
    let listContent = null
    if (this.call.calling === false) {
      listContent = html`
        ${repeat(this.users, name => name, name => html`
          <chtr-chat-list-item text=${name}></chtr-chat-list-item>
        `)}
      `
    } else if (this.call.init === true) {
      listContent = html`
        ${repeat(this.call.messages, message => html`
          <chtr-chat-message message=${message}></chtr-chat-message>
        `)}
      `
    }

    return html`
      <section>
        <chtr-chat-list on-click=${this.clickHandler.bind(this)}>
          ${conditional(listContent != null, listContent)}
        </chtr-chat-list>
        <chtr-chat-input></chtr-chat-input>
      </section>
    `
  }
}

