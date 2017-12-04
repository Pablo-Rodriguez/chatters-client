
import {Component, tag, styles, props} from '../../../component'
import {html} from 'lit-html/lib/lit-extended'
import {conditional} from '../../../helpers/directives'

import style from './style'

@tag('chtr-chat-message')
@styles(style)
@props({
  message: {
    type: 'object',
    observe: true,
    default: {}
  }
})
export default class ChatMessage extends Component {
  render () {
    const {by, message} = this.message
    return html`
      <li>
        ${conditional(by != null, html`<b>@${by}:</b>`)}
        ${message}
      </li>
    `
  }
}

