
import {Component, tag, props} from 'Component'
import {html} from 'lit-html'

@tag('chtr-link')
@props({
  href: String
})
export class ChtrLink extends Component {
  styles () {
    return `
    :host {
      display: block;
      text-decoration: none;
      color: var(--dark-color, black);
    }
    :host > a, :host > a:visited, :host > a:active {
      color: inherit;
      text-decoration: inherit;
    }
    :host > a:hover {
      color: var(--accent-color, black);
    }
    `
  }

  render () {
    return html`
      <a href="${this.href}">
        <slot></slot>
      </a>
    `
  }
}

