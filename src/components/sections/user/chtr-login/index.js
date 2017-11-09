
import {Component, tag} from 'Component'
import {html} from 'lit-html/lib/lit-extended'

import '../chtr-user-action'
import '../../../ui/chtr-label'
import '../../../ui/chtr-input'
import '../../../ui/chtr-link'

@tag('chtr-login')
export default class Login extends Component {
  submit (e) {
    const {elements} = e.currentTarget
    this.emit('login', {
      name: elements['name'].value,
      password: elements['password'].value
    })
  }

  render () {
    return html`
      <chtr-user-action title="Log in">
        <form slot="form" on-submit="${this.submit.bind(this)}">
          <chtr-label label="Nombre">
            <chtr-input><input
              placeholder="Name"
              name="name"
              autofocus
            /></chtr-input>
          </chtr-label>
          <chtr-label label="Contraseña">
            <chtr-input><input
              type="password"
              placeholder="Contraseña"
              name="password"
            /></chtr-input>
          </chtr-label>
          <chtr-button><input type="submit" value="Entrar" /></chtr-button>
        </form>
        <chtr-link href="/signup" slot="link">¿No tienes una cuenta?</chtr-link>
      </chtr-user-action>
    `
  }

  styles () {
    return `
      :host {
        display: block;
      }

      chtr-label {
        margin-bottom: 1em;
      }

      chtr-label:last-of-type {
        margin-bottom: 0;
      }
    `
  }
}
