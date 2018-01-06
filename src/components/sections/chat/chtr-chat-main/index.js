
import {Component, tag, props, styles} from '../../../component'
import {html} from 'lit-html/lib/lit-extended'
import {conditional} from '../../../helpers/directives'

import '../chtr-chat-call-request'
import '../../../ui/chtr-fullscreen-message'
import '../chtr-video-chooser'
import style from './style'

@tag('chtr-chat-main')
@styles(style)
@props({
  call: {
    type: 'object',
    observe: true,
    default: () => ({
      calling: false,
      init: false,
      to: null,
      from: null
    })
  }
})
export class ChatMain extends Component {
  accept () {
    this.emit('chat::accept-call')
  }

  reject () {
    this.emit('chat::reject-call')
  }

  switchCanvas (which) {
    this.emit('chat::switch-canvas', which)
  }

  render () {
    if (this.call.calling) {
      if (this.call.init) {
        return wrap(html`
          <chtr-video-chooser
            hangup=${this.reject.bind(this)}
            switch=${this.switchCanvas.bind(this)}
            peers=${this.call.peers}
            selectedCanvas=${this.call.selectedCanvas}
          ></chtr-video-chooser>`)
      } else {
        return wrap(html`
          <chtr-chat-call-request
            accept=${this.accept.bind(this)}
            reject=${this.reject.bind(this)}
            to=${this.call.to}
            from=${this.call.from}
          ></chtr-chat-call-request>`)
      }
    } else {
      return wrap(html`
        <chtr-fullscreen-message title text="Chatters" class="big"></chtr-fullscreen-message>
      `)
    }
  }
}

function wrap (node) {
  return html`
    <section>${node}</section>
  `
}

