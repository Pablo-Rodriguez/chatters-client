
import getUserMedia from 'getusermedia'
import Peer from 'simple-peer'
import fabric from 'fabric'

export class ChatPeer {
  constructor () {}
  
  createPeer (initiator = true) {
    this.peer = new Peer({
      initiator,
      trickle: false,
      stream: this.outputStream
    })
  }

  getSignalInfo () {
    return new Promise((resolve, reject) => {
      this.peer.on('signal', resolve)
    })
  }

  getParticipantStream () {
    return new Promise((resolve, reject) => {
      this.peer.on('stream', resolve)
    })
  }

  addStream (stream) {
    stream.getTracks().forEach((track) => this.stream.addTrack(track))
  }
  
  async initMedia () {
    const media = await UserMedia.getMedia()
    this.video = media.video
    this.audio = media.audio
    this.videoProps = this.video.getTracks()[0].getSettings()
    this.initCanvas(this.video)
    const canvasStream = this.$canvas.captureStream(25)
    this.outputStream = new MediaStream()
    this.outputStream.addTrack(canvasStream.getTracks()[0])
    this.outputStream.addTrack(this.audio.getTracks()[0])
  }

  fromStream (stream, constraints) {
    this.video = stream.getVideoTracks()[0]
    this.audio = stream.getAudioTracks()[0]
    this.videoProps = constraints
    this.initCanvas(stream)
  }

  initCanvas (stream) {
    this.$canvas = document.createElement('canvas')
    this.$video = document.createElement('video')
    this.$video.src = window.URL.createObjectURL(stream)
    this.$video.play()
    this.$video.width = this.videoProps.width
    this.$video.height = this.videoProps.height

    this.fabric = new fabric.fabric.Canvas(this.$canvas, {
      width: this.$video.width,
      height: this.$video.height
    })
    this.fabric.selection = true
    this.fVideo = new fabric.fabric.Image(this.$video, {
      width: this.$video.width,
      height: this.$video.height,
      selectable: false,
      hoverCursor: 'default'
    })
    this.fabric.add(this.fVideo)
    this.fVideo.moveTo(0)
    this.fVideo.getElement().play()
    this.initialized = true
    this.play()
  }

  getOutputConstraints () {
    return this.outputStream.getVideoTracks()[0].getSettings()
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
    if (this.outputStream instanceof MediaStream) {
      this.outputStream.getTracks().forEach((track) => track.stop())
      this.outputStream = null
    }
  }
}

export class UserMedia {
  static async getMedia () {
    const media = await UserMedia.get({video: {frameRate: 25}, audio: true})
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

