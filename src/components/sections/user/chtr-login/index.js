
import {Component, tag} from 'Component'
import {html} from 'lit-html'

import '../chtr-user-action'
import '../../../ui/chtr-label'
import '../../../ui/chtr-input'
import '../../../ui/chtr-link'

@tag('chtr-login')
export default class Login extends Component {
  render () {
    return html`
      <chtr-user-action title="Log in" buttonText="entrar">
        <chtr-label label="Nombre" slot="form-content">
          <chtr-input placeholder="Nombre" autofocus></chtr-input>
        </chtr-label>
        <chtr-label label="Contraseña" slot="form-content">
          <chtr-input type="password" placeholder="Contraseña"></chtr-input>
        </chtr-label>
        <chtr-link href="/signup" slot="link">¿No tienes una cuenta?</chtr-link>
      </chtr-user-action>
    `
  }
}

