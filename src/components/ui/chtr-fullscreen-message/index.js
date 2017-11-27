
import {Component, tag, props, styles} from '../../component'
import {html} from 'lit-html/lib/lit-extended'

import style from './style'

@tag('chtr-fullscreen-message')
@styles(style)
@props({
  title: 'boolean',
  text: 'string'
})
export class FullScreenMessage extends Component {
  render () {
    return html`
      <h3>${this.text}</h3>
    `
  }
}

