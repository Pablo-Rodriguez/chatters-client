
import {Component, tag} from 'Component'
import {html} from 'lit-html'

import style from './style'

@tag('progress-bar')
export default class ProgressBar extends Component {
  styles () {
    return style
  }
  
  render () {
    return html`
      <div id="primary-progress"></div>
    `
  }

  static get observedAttributes () {
    return ['disabled']
  }

  get disabled () {
    return this.hasAttribute('disabled')
  }

  set disabled (value) {
    if (value) {
      this.setAttribute('disabled', '')
    } else {
      this.removeAttribute('disabled')
    }
  }

  _iterationCallback () {
    this.shadowRoot.querySelector('#primary-progress').classList.add('finished')
  }

  attributeChangedCallback () {
    const progress = this.shadowRoot.querySelector('#primary-progress')
    if (this.disabled) {
      progress.addEventListener('animationiteration', this._iterationCallback.bind(this), {once: true, passive: true})
    } else {
      progress.classList.remove('finished')
    }
  }
}

