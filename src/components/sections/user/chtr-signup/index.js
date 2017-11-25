
import {Component, tag, props, observe} from 'Component'
import {html} from 'lit-html/lib/lit-extended'
import {conditional} from '../../../helpers/directives'

import '../chtr-user-action'
import '../../../ui/chtr-label'
import '../../../ui/chtr-input'
import '../../../ui/chtr-message'
import '../../../ui/chtr-button'
import '../../../ui/chtr-link'

@tag('chtr-signup')
@props({
  loading: 'boolean',
  error: 'string'
})
@observe(['loading', 'error'])
export default class Signup extends Component {
  submit (e) {
    e.preventDefault()
    const {elements} = e.currentTarget
    this.onemit('user::signup', {
      name: elements['name'].value,
      password: elements['password'].value,
      repeated: elements['repeated'].value
    })
  }

  render () {
    const condition = this.error != null && this.error.length > 0
    return html`
      <chtr-user-action title="Sign up" loading=${this.loading}>
        <form slot="form" on-submit=${this.submit.bind(this)}>
          ${conditional(condition, html`<chtr-message value$=${this.error}></chtr-message>`)}
          <chtr-label label="Nombre">
            <chtr-input><input
              name="name"
              placeholder="Nombre"
              autofocus
            /></chtr-input>
          </chtr-label>
          <chtr-label label="Contraseña">
            <chtr-input><input
              name="password"
              type="password"
              placeholder="Contraseña"
            /></chtr-input>
            <chtr-input><input
              name="repeated"
              type="password"
              placeholder="Repetir contraseña"
            /></chtr-input>
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

      chtr-message {
        margin-bottom: .5em;
        font-size: 20px;
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
