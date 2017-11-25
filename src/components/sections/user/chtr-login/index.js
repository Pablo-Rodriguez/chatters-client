
import {Component, tag, props, observe} from 'Component'
import {html} from 'lit-html/lib/lit-extended'
import {conditional} from '../../../helpers/directives'

import '../chtr-user-action'
import '../../../ui/chtr-label'
import '../../../ui/chtr-input'
import '../../../ui/chtr-message'
import '../../../ui/chtr-button'
import '../../../ui/chtr-link'

@tag('chtr-login')
@props({
  loading: 'boolean',
  error: 'string',
  message: 'string'
})
@observe(['loading', 'error', 'message'])
export default class Login extends Component {
  submit (e) {
    e.preventDefault()
    const {elements} = e.currentTarget
    this.onemit('user::login', {
      name: elements['name'].value,
      password: elements['password'].value
    })
  }

  render () {
    const hasError = this.error != null && this.error.length > 0
    const hasMessage = this.message != null && this.message.length > 0
    return html`
      <chtr-user-action title="Log in" loading=${this.loading}>
        <form slot="form" on-submit="${this.submit.bind(this)}">
          ${conditional(hasMessage, html`<chtr-message value$=${this.message}></chtr-message>`)}
          ${conditional(hasError, html`<chtr-message error value$=${this.error}></chtr-message>`)}
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

      chtr-message {
        font-size: 20px;
        margin-bottom: .5em;
      }

      chtr-label:last-of-type {
        margin-bottom: 0;
      }
    `
  }
}
