
import {Component, tag} from 'Component'
import {html} from 'lit-html'

import '../chtr-user-action'
import '../../../ui/chtr-label'
import '../../../ui/chtr-input'
import '../../../ui/chtr-link'

@tag('chtr-signup')
export default class Signup extends Component {
  render () {
    return html`
      <chtr-user-action title="Sign up" buttonText="crear">
        <chtr-label label="Nombre" slot="form-content">
          <chtr-input placeholder="Nombre" autofocus></chtr-input>
        </chtr-label>
        <chtr-label label="Contraseña" slot="form-content">
          <chtr-input type="password" placeholder="Contraseña"></chtr-input>
          <chtr-input type="password" placeholder="Repetir contraseña"></chtr-input>
        </chtr-label>
        <chtr-link href="/login" slot="link">¿Ya tienes una cuenta?</chtr-link>
      </fullscreen-form-view>
    `
  }
}

