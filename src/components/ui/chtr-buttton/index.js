
import {Component, tag, styles, props} from 'Component'
import {html} from 'lit-html'

import style from './style'

@tag('chtr-button')
@styles(style)
@props({
  type: String,
  value: String
})
export class ChtrButton extends Component {
  styles () {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
    `
  }
  render () {
    return html`
      <input type="${this.type === 'submit' ? this.type : 'button'}" value="${this.value}" />
    `
  }
}

