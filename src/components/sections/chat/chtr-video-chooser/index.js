
import {Component, tag, props, styles} from '../../../component'
import {html} from 'lit-html/lib/lit-extended'

import './video'
import '../chtr-switch-button'
import '../../../ui/chtr-fab'
import style from './style'

@tag('chtr-video-chooser')
@styles(style)
@props({
  peers: {
    type: 'object',
    observe: true,
    default: () => ({})
  },
  selectedCanvas: {
    type: 'string',
    observe: true,
    default: 'self'
  }
})
export default class ChatVideoChooser extends Component {
  switchCanvas ({detail}) {
    const which = detail.which
    this.switch(which)
  }

  render () {
    const peer = this.peers[this.selectedCanvas || ''] || {}
    return html`
      <div id="container">
        <div id="controls">
          <header></header>
          <chtr-video
            peer=${peer}
            ratio=${peer.videoProps && peer.videoProps.aspectRatio}
          ></chtr-video>
          <footer>
            <div></div>
            <div><chtr-fab on-click="${this.hangup}" error=${true}>C</chtr-fab></div>
            <div class="right">
              <chtr-switch-button on-switched=${this.switchCanvas.bind(this)} left="self" right="other"></chtr-switch-button>
            </div>
          </footer>
        </div>
      </div>
    `
  }
}

