
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
        :host {color: var(--primary-color, blue);}
      </style>
    `
  }

  render () {
    return html`
      <h2>Login ${this.name}</h2>
      <a href="">Home</a>
    `
  }
}

