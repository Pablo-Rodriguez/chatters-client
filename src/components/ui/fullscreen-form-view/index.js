
import {Component, tag, styles, props, observe} from 'Component'
import {html} from 'lit-html/lib/lit-extended'

import style from './style'

@tag('fullscreen-form-view')
@styles(style)
@props({
  loading: 'boolean'
})
@observe(['loading'])
export default class FullscreenFormView extends Component {
  render () {
    console.log(this.is, this.loading)
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
