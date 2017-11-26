
import {html, render} from 'lit-html/lib/lit-extended'

export class Component extends HTMLElement {
  connectedCallback () {
    this._el = this.shadow ? this.attachShadow({mode: 'open'}) : this
    this._render()
  }

  _render () {
    let styles = document.createElement('style')
    styles.innerHTML = this.styles() || ''
    styles = this.styled ? styles : undefined
    let template = this.visual ? this.render() : undefined
    render(html`
      ${styles}
      ${template}`,
      this._el)
  }

  update () {
    this._render()
  }

  static get observedAttributes () {
    return []
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

  attributeChangedCallback () {
    if (this._el != null) {
      this._render()
    }
  }

  styles () {
    return `
      :host {
        display: block;
      }  
    `
  }

  render () {
    return html`<div></div>`
  }

  log (...args) {
    console.log(this.is, ...args)
  }
}

export function tag (name) {
  return (Class) => {
    window.addEventListener('WebComponentsReady', () => {
      Class.prototype.__defineGetter__('is', () => name)
      if(typeof customElements.get(name) === 'undefined') {
        customElements.define(name, Class)
      }
    })
  }
}

export function parseAttribute (value, type) {
  switch (type.toLowerCase()) {
    case 'boolean':
      return value != null ? true : false
    case 'number':
      return Number(value)
    case 'string':
    default:
      return value
  }
}

export function parseProperty (self, key, value, type) {
  switch (type.toLowerCase()) {
    case 'boolean':
      return value === true ? self.setAttribute(key, '') : self.removeAttribute(key)
    case 'number':
    case 'string':
    default:
      return this.setAttribute(key, number)
  }
}

export function props (config) {
  return function (Class) {
    Object.keys(config).forEach(function (key) {
      Class.prototype.__defineGetter__(key, function () {
        return parseAttribute(this.getAttribute(key), config[key])
      })  
      Class.prototype.__defineSetter__(key, function (value) {
        parseProperty(this, key, value, config[key])
      })  
    })  
  }
}

export function observe (attrs) {
  return function (Class) {
    Class.__defineGetter__('observedAttributes', () => {
      return attrs
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

