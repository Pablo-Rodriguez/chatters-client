
import {Component, tag, styles, props} from 'Component'
import {html} from 'lit-html/lib/lit-extended'

import style from './style'

@tag('fullscreen-form-view')
@styles(style)
@props({
  loading: {
    type: 'boolean',
    observe: true
  }
})
export default class FullscreenFormView extends Component {
  render () {
    const className = this.loading === true ? 'loading' : '';
    return html`
      <section>
        <div id="solid">
          <div id="title">
            <slot name="title"></slot>
          </div>
          <div id="box" className=${className}>
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
