
import {html, render} from 'lit-html/lib/lit-extended'

const el = Symbol('el')
const observed = Symbol('observed')

export class Component extends HTMLElement {
  connectedCallback () {
    this[el] = this.shadow ? this.attachShadow({mode: 'open'}) : this
    this.preRenderCallback()
    this._render()
    this.postRenderCallback()
  }

  _render () {
    let styles = document.createElement('style')
    styles.innerHTML = this.styles() || ''
    styles = this.styled ? styles : undefined
    let template = this.visual ? this.render() : undefined
    render(html`
      ${styles}
      ${template}`,
      this[el])
  }

  update () {
    this._render()
  }

  static get observedAttributes () {
    return this.prototype[observed] || []
  }

  get node () {
    return this[el]
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
    if (this[el] != null) {
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

  preRenderCallback () {}

  postRenderCallback () {}
  
  $ (query) {
    return this.node.querySelector(query)
  }

  listen (query, event, fn) {
    this.$(query).addEventListener(event, fn)
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
  switch (type) {
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
  switch (type) {
    case 'boolean':
      return value === true ? self.setAttribute(key, '') : self.removeAttribute(key)
    case 'number':
    case 'string':
    default:
      return self.setAttribute(key, value)
  }
}

/*
* {
*   type: 'object',
*   observed: true,
*   default: true
* }
*/
export function props (config) {
  return function (Class) {
    Object.keys(config).forEach((key) => {
      let prop = config[key]
      let sym = Symbol(key)
      let type = prop.type || ''
      type = type.toLowerCase()
      let observe = prop.observe
      let defaultValue = prop.default
      const debug = prop.debug || false

      if (type !== 'object' && observe === true) {
        Class.prototype[observed] = Class.prototype[observed] || []
        Class.prototype[observed].push(key)
      }

      Object.defineProperty(Class.prototype, key, {
        get () {
          if (debug === true) {
            this.log('getting', key)
          }
          if (type !== 'object') {
            const value = parseAttribute(this.getAttribute(key), type)
            return value != null ? value : defaultValue
          } else {
            const value = this[sym]
            return typeof value !== 'undefined' ? value :
              typeof defaultValue === 'function' ? defaultValue() : defaultValue
          }
        },

        set (value) {
          if (debug === true) {
            this.log('setting', key, 'to', value)
          }

          if (type !== 'object') {
            parseProperty(this, key, value, type)
          } else {
            this[sym] = value
            if (observe === true) {
              this.attributeChangedCallback(key)
            }
          }
        }
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

