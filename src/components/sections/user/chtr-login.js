
import {Component, tag, props} from 'Component'
import {html} from 'lit-html'

@tag('chtr-login')
@props({
  name: String
})
class Login extends Component {
  styles () {
    return html`
      <style>
        :host {color: red;}
      </style>
    `
  }

  render () {
    return html`
      <h2>Login ${this.name}</h2>
    `
  }
}

