
import {Component, tag, props, styles} from '../../../component'
import {html} from 'lit-html/lib/lit-extended'
import fabric from 'fabric'

import {videoStyle} from './style'

@tag('chtr-video')
@styles(videoStyle)
@props({
  peer: {
    type: 'object',
    observe: true,
    default: () => ({})
  },
  ratio: {
    type: 'number',
    observe: true,
    default: 1
  }
})
export default class ChatVideo extends Component {
  render () {
    const $canvas = this.getFabricCanvas()
    return html`
      ${$canvas} 
    `
  }

  getFabricCanvas () {
    if (this.peer.fabric instanceof fabric.fabric.Canvas) {
      const wrapper = this.peer.fabric.wrapperEl
      wrapper.prepend(this.peer.fabric.getElement())
      return wrapper
    } else {
      return ''
    }
  }
}

