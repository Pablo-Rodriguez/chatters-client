
import {Component, tag, styles} from 'Component'
import {html} from 'lit-html'

import '../../../ui/fullscreen-form-view'
import style from './style'

@tag('chtr-signup')
@styles(style)
export default class Signup extends Component {
  render () {
    return html`
      <fullscreen-form-view>
        <h2 slot="title">Signup</h2>
        <form slot="form">
          <input />
        </form>
      </fullscreen-form-view>
    `
  }
}

