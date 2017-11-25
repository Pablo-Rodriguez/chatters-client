
import {Component, tag, styles, props, observe} from '../../component'
import {html} from 'lit-html/lib/lit-extended'

import style from './style'

@tag('chtr-message')
@styles(style)
@props({
  value: 'string'
})
@observe(['value'])
export class Message extends Component {
  render () {
    return html`
      <span>${this.value}</span>
    `
  }
}

