
import '@webcomponents/webcomponentsjs/webcomponents-loader'
import '@webcomponents/custom-elements/src/native-shim'
import {html, render} from 'lit-html'

export class Component extends HTMLElement {
  connectedCallback () {
    const shadow = this.attachShadow({mode: 'open'})
    render(html`
      ${this.styles()}
      ${this.render()}`,
      shadow)
  }

  styles () {
    return html`<style></style>`
  }

  render () {
    return html`<div></div>`
  }
}

export function tag (name) {
  return (Class) => {
    Class.prototype.__defineGetter__('is', () => name)
    customElements.define(name, Class)
  }
}

export function props (config) {
  return function (Class) {
    Object.keys(config).forEach(function (key) {
      Class.prototype.__defineGetter__(key, function () {
        return config[key](this.getAttribute(key))
      })  
      Class.prototype.__defineSetter__(key, function (value) {
        this.setAttribute(key, value)
      })  
    })  
  }
}

