
import {Component, tag, styles, props} from '../../../component'
import {html} from 'lit-html/lib/lit-extended'

import style from './style'

@tag('chtr-chat-call-request')
@styles(style)
@props({
  to: {
    type: 'string',
    observe: true
  }
})
export default class ChatCallRequest extends Component {
  render () {
    return html`
      <div>
        <h4>Llamando a ${this.to}</h4>
      <div/>
    `
  }
}

