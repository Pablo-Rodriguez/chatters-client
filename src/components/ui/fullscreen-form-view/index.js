
import {Component, tag, styles} from 'Component'
import {html} from 'lit-html'

import style from './style'

@tag('fullscreen-form-view')
@styles(style)
export default class FullscreenFormView extends Component {
  render () {
    return html`
      <section>
        <div id="solid">
          <div id="title">
            <slot name="title"></slot>
          </div>
          <div id="box">
            <div>
              <slot name="form"></slot>
            </div>
          </div>
        </div>
      </section>
    `
  }
}

