
import {Component, tag, styles} from 'Component'
import {html} from 'lit-html'

import '../../../ui/fullscreen-form-view'
import style from './style'

@tag('chtr-login')
@styles(style)
export default class Login extends Component {
  render () {
    return html`
      <fullscreen-form-view>
        <h2 slot="title">Login</h2>
        <form slot="form">
          <input />
        </form>
      </fullscreen-form-view>
    `
  }
}

