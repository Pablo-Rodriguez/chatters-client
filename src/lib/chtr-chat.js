
import getUserMedia from 'getusermedia'
import fabric from 'fabric'

export class WebChat {
  constructor () {}

  async initMedia () {
    const media = await UserMedia.getMedia()
    this.video = media.video
    this.audio = media.audio
    this.videoProps = this.video.getTracks()[0].getSettings()

    this.$canvas = document.createElement('canvas')
    this.$video = document.createElement('video')
    this.$video.src = window.URL.createObjectURL(this.video)
    this.$video.width = this.videoProps.width
    this.$video.height = this.videoProps.height
    const canvasStream = this.$canvas.captureStream()
    this.outputStream = new MediaStream()
    this.outputStream.addTrack(this.audio.getTracks()[0])
    this.outputStream.addTrack(canvasStream.getTracks()[0])

    this.fabric = new fabric.fabric.Canvas(this.$canvas, {
      width: this.videoProps.width,
      height: this.videoProps.height
    })
    this.fabric.selection = true
    this.fVideo = new fabric.fabric.Image(this.$video, {
      width: this.videoProps.width,
      height: this.videoProps.height,
      selectable: false,
      hoverCursor: 'default'
    })
    this.fabric.add(this.fVideo)
    this.fVideo.moveTo(0)
    this.fVideo.getElement().play()
    this.initialized = true
    this.play()
  }

  play () {
    fabric.fabric.util.requestAnimFrame(function render () {
      try {
        this.fabric.renderAll()
        if (this.initialized === true) {
          fabric.fabric.util.requestAnimFrame(render.bind(this))
        }
      } catch (e) {}
    }.bind(this))
  }

  close () {
    this.initialized = false
    this.$canvas.remove()
    this.$video.remove()
    this.$canvas = null
    this.$video = null
    this.fabric = null
    this.fVideo = null
    this.video.getTracks().forEach((track) => track.stop())
    this.audio.getTracks().forEach((track) => track.stop())
    this.video = null
    this.audio = null
    this.media = null
    this.videoProps = null
    this.outputStream.getTracks().forEach((track) => track.stop())
    this.outputStream = null
  }
}

export class UserMedia {
  static async getMedia () {
    const media = await UserMedia.get({video: true, audio: true})
    const video = new MediaStream()
    const audio = new MediaStream()
    video.addTrack(media.getTracks().find((stream) => stream.kind === 'video'))
    audio.addTrack(media.getTracks().find((stream) => stream.kind === 'audio'))
    return {video, audio}
  }

  static get (conf) {
    return new Promise ((resolve, reject) => {
      getUserMedia(conf, (err, stream) => {
        if (err) {
          reject(err)
        } else {
          resolve(stream)
        }
      })
    })
  }
}

