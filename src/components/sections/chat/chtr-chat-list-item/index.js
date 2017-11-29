
import {Component, tag, styles, props} from '../../../component'
import {html} from 'lit-html/lib/lit-extended'

import style from './style'

@tag('chtr-chat-list-item')
@styles(style)
@props({
  text: {
    type: 'string',
    observe: true
  }
})
export default class ChatListItem extends Component {
  render () {
    return html`<li>${this.text}</li>`
  }
}

