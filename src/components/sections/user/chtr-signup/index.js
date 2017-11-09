
import {Component, tag} from 'Component'
import {html} from 'lit-html/lib/lit-extended'

import '../chtr-user-action'
import '../../../ui/chtr-label'
import '../../../ui/chtr-input'
import '../../../ui/chtr-link'

@tag('chtr-signup')
export default class Signup extends Component {
  render () {
    return html`
      <chtr-user-action title="Sign up">
        <form slot="form">
          <chtr-label label="Nombre">
            <chtr-input><input placeholder="Nombre" autofocus /></chtr-input>
          </chtr-label>
          <chtr-label label="Contraseña">
            <chtr-input><input type="password" placeholder="Contraseña" /></chtr-input>
            <chtr-input><input type="password" placeholder="Repetir contraseña" /></chtr-input>
          </chtr-label>
          <chtr-button><input type="submit" value="crear" /></chtr-button>
        </form>
        <chtr-link href="/login" slot="link">¿Ya tienes una cuenta?</chtr-link>
      </fullscreen-form-view>
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
