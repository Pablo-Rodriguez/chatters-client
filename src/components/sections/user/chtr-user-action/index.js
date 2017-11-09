
import {Component, tag, styles, props} from 'Component'
import {html} from 'lit-html/lib/lit-extended'

import '../../../ui/fullscreen-form-view'
import '../../../ui/chtr-buttton'
import style from './style'

@tag('chtr-user-action')
@styles(style)
@props({
  title: String
})
export default class ChtrUserAction extends Component {
  render () {
    return html`
      <fullscreen-form-view>
        <h2 slot="title">${this.title}</h2>
        <slot name="form" slot="form"></slot>
        <slot name="link" slot="link"></slot>
      </fullscreen-form-view>
    `
  }
}

