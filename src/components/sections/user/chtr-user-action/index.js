
import {Component, tag, styles, props} from 'Component'
import {html} from 'lit-html'

import '../../../ui/fullscreen-form-view'
import '../../../ui/chtr-buttton'
import style from './style'

@tag('chtr-user-action')
@styles(style)
@props({
  title: String,
  buttonText: String
})
export default class ChtrUserAction extends Component {
  render () {
    return html`
      <fullscreen-form-view>
        <h2 slot="title">${this.title}</h2>
        <form slot="form">
          <slot name="form-content"></slot>
          <chtr-button type="submit" value="${this.buttonText}"></chtr-button>
        </form>
        <slot name="link" slot="link"></slot>
      </fullscreen-form-view>
    `
  }
}

