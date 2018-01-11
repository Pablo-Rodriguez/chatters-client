
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
      this.peer.addAsset({
        type: this.peer.IMAGE_ASSET,
        payload: image,
        config: {
          left: 100,
          top: 100,
          width: 20,
          height: 20
        }
      })
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
        this.peer.addAsset({
          type: this.peer.IMAGE_ASSET,
          payload: $element,
          config: {
            left: 0,
            top: 0,
            width: $element.width,
            height: $element.height
          }
        })
      }
    } else if (file.type.startsWith('video')) {
      this.peer.addAsset({
        type: this.peer.VIDEO_ASSET,
        payload: file,
        config: ($video) => {
          return {
            left: 0,
            top: 0,
            width: $video.videoWidth,
            height: $video.videoHeight
          }
        }
      })
    }
  }

  saveImage () {
    const {height, width} = this.peer.$canvas
    canvasToImage.saveAsJPEG(this.peer.$canvas, width, height)
  }

  removeAssets () {
    if (this.peer) {
      this.peer.removeAssets()
    }
  }

  render () {
    this.peer = this.peers[this.selectedCanvas || ''] || {}
    return html`
      <div id="container">
        <div id="controls">
          <header>
            <div class="left shrink"><chtr-fab on-click=${this.saveImage.bind(this)}>F</chtr-fab></div>
            <div class="shrink media">
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
            <div class="shrink"><chtr-fab>D</chtr-fab></div>
            <div class="right shrink"><chtr-fab error on-click=${this.removeAssets.bind(this)}>R</chtr-fab></div>
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

