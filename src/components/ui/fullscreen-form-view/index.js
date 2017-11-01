
import {Component, tag, styles, props} from 'Component'
import {html} from 'lit-html'

import style from './style'

@tag('fullscreen-form-view')
@styles(style)
@props({
  loading: Boolean
})
export default class FullscreenFormView extends Component {
  render () {
    return html`
      <section>
        <div id="solid">
          <div id="title">
            <slot name="title"></slot>
          </div>
          <div id="box" class="${this.loading ? 'loading' : ''}">
            <div>
              <slot name="form"></slot>
            </div>
          </div>
          <slot name="link"></slot>
        </div>
      </section>
    `
  }
}

