
import {Component, tag, styles} from 'Component'
import {html} from 'lit-html/lib/lit-extended'

import style from './style'

@tag('chtr-button')
@styles(style)
export class ChtrButton extends Component {
  render () {
    return html`
      <slot></slot>
    `
  }
}
