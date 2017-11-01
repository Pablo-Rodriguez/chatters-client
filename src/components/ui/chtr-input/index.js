
import {Component, tag, styles, props} from 'Component'
import {html} from 'lit-html'

import style from './style'

@tag('chtr-input')
@styles(style)
@props({
  type: String,
  placeholder: String,
  autofocus: Boolean
})
export default class ChtrInput extends Component {
  render () {
    return html`
      <input
        type="${this.type || 'text'}"
        placeholder="${this.placeholder || ''}"
        autofocus="${this.autofocus}"
      />
    `
  }
}
