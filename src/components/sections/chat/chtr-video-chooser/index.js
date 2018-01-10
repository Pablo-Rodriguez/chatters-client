
import {Component, tag, props, styles} from '../../../component'
import {html} from 'lit-html/lib/lit-extended'
import fabric from 'fabric'
import emojione from 'emojione'
import canvasToImage from 'canvas-to-image-node'

import './video'
import '../chtr-switch-button'
import '../../../ui/chtr-input'
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
  preRenderCallback () {
    this.list = Object.keys(emojione.emojioneList)
  }

  switchCanvas ({detail}) {
    const which = detail.which
    this.switch(which)
  }

  suggestEmoji (e) {
    const value = e.target.value
    const list = this.list.filter((el) => el.startsWith(value)).slice(0, 10)
    const $list = this.$('#emoji-list')
    $list.innerHTML = ''
    list.forEach((suggest) => {
      const $option = document.createElement('option')
      $option.value = suggest
      $list.appendChild($option)
    })
  }

  insertEmoji (e) {
    if (this.peer) {
      const div = document.createElement('div')
      div.innerHTML = emojione.shortnameToImage(e.target.value)
      const image = div.querySelector('img')
      image.setAttribute('crossOrigin', 'anonymous')
      const fImage = new fabric.fabric.Image(image, {
          left: 100,
          top: 100,
          width: 20,
          height: 20
      })
      this.peer.fabric.add(fImage)
      fImage.moveTo(1)
      e.target.value = ''
      this.$('#emoji-list').innerHTML = ''
    }
  }

  insertFile (e) {
    const file = this.$('#fileInput').files[0]
    let $element, width, height
    if (file.type.startsWith('image')) {
      $element = document.createElement('img')
      $element.src = window.URL.createObjectURL(file)
      $element.onload = () => {
        const fElement = new fabric.fabric.Image($element, {
          left: 0,
          top: 0,
          width: $element.width,
          height: $element.height
        })
        this.peer.fabric.add(fElement)
      }
    } else if (file.type.startsWith('video')) {
      $element = document.createElement('video')
      $element.src = window.URL.createObjectURL(file)
      $element.onloadeddata = () => {
        const fElement = new fabric.fabric.Image($element, {
          left: 0,
          top: 0,
          width: $element.videoWidth,
          height: $element.videoHeight
        })
        this.peer.fabric.add(fElement)
        $element.play()
      }
    }
  }

  saveImage () {
    const {height, width} = this.peer.$canvas
    canvasToImage.saveAsJPEG(this.peer.$canvas, width, height)
  }

  render () {
    this.peer = this.peers[this.selectedCanvas || ''] || {}
    return html`
      <div id="container">
        <div id="controls">
          <header>
            <div class="left shrink"><chtr-fab on-click=${this.saveImage.bind(this)}>F</chtr-fab></div>
            <div id="media">
              <input on-change=${this.insertFile.bind(this)} type="file" id="fileInput"/>
              <label for="fileInput">Media</label>
            </div>
            <chtr-input>
              <input
                placeholder="emoji!! (try :tongue:)"
                list="emoji-list"
                on-input=${this.suggestEmoji.bind(this)}
                on-change=${this.insertEmoji.bind(this)}></input>
              <datalist id="emoji-list"></datalist>
            </chtr-input>
            <div class="right shrink"><chtr-fab>D</chtr-fab></div>
          </header>
          <chtr-video
            peer=${this.peer}
            ratio=${this.peer.videoProps && this.peer.videoProps.aspectRatio}
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

