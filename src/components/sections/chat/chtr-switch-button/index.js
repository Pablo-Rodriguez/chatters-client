
import {Component, tag, props, styles} from '../../../component'
import {html} from 'lit-html/lib/lit-extended'

import style from './style'

@tag('chtr-switch-button')
@styles(style)
@props({
  left: {
    type: 'string'
  },
  right: {
    type: 'string'
  }
})
export default class SwitchButton extends Component {
  postRenderCallback () {
    this.listen('#container', 'click', (e) => {
      const which = e.target.getAttribute('data-name')
      if (which === this.left || which === this.right) {
        this.dispatchEvent(new CustomEvent('switched', {
          detail: {which},
          composed: true,
          bubbles: true
        }))
      }
    })
  }

  render () {
    return html`
      <div id="container">
        <button id="left" data-name$="${this.left}">${this.left}</button>
        <button id="right" data-name$="${this.right}">${this.right}</button>
      </div>
    `
  }
}

