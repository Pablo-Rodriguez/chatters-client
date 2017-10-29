
import '@webcomponents/webcomponentsjs/webcomponents-loader'
import '@webcomponents/custom-elements/src/native-shim'
import {html, render} from 'lit-html'

export class Component extends HTMLElement {
  connectedCallback () {
    let el = this.shadow ? this.attachShadow({mode: 'open'}) : this
    let styles = this.styled ? this.styles() : undefined
    let template = this.visual ? this.render() : undefined
    render(html`
      ${styles}
      ${template}`,
      el)
  }
  
  get shadow () {
    return true
  }

  get visual () {
    return true
  }

  get styled () {
    return true
  }

  styles () {
    return html`<style>
      :host {
        display: block;
      }  
    </style>`
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

export function styles (fn) {
  return function (Class) {
    Class.prototype.styles = function () {
      return fn(this)
    }
  }
}

function _getProp (prop) {
  return function (value) {
    return (Class) => {
      Class.prototype.__defineGetter__(prop, () => value)
    }
  }
}

export const shadow = _getProp('shadow')
export const visual = _getProp('visual')
export const styled = _getProp('styled')

