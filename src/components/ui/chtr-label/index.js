
import {Component, tag, styles, props} from 'Component'
import {html} from 'lit-html/lib/lit-extended'

import style from './style'

@tag('chtr-label')
@styles(style)
@props({
  label: String
})
export default class ChtrLabel extends Component {
  render () {
    return html`
      <div>
        <label>${this.label}</label>
        <slot></slot>
      </div>
    `
  }
}
