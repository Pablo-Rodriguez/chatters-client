
import {Component, tag, styles, props} from '../../component'
import {html} from 'lit-html/lib/lit-extended'

import style from './style'

@tag('chtr-fab')
@styles(style)
@props({
  success: {
    type: 'boolean',
    observe: true
  },
  error: {
    type: 'boolean',
    observe: true
  }
})
export default class Fab extends Component {
  render () {
    return html`
      <button><slot></slot></button>
    `
  }
}

