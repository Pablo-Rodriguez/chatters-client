
import {Component, tag, styles} from 'Component'
import {html} from 'lit-html/lib/lit-extended'

import style from './style'

@tag('chtr-input')
@styles(style)
export default class ChtrInput extends Component {
  render () {
    return html`
      <slot></slot>
    `
  }
}
