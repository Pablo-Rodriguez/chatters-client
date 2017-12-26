fabric = require('fabric')

var canvas = new fabric.fabric.Canvas('c');
canvas.selection = true;
var webcamEl = document.getElementById('webcam');
var webcam = new fabric.fabric.Image(webcamEl, {
  left: 539,
  top: 328,
  angle: 0,
  originX: 'center',
  originY: 'center'
});

var owncam = new fabric.fabric.Image(webcamEl, {
  left: 125,
  top: 310,
  angle: 0,
  originX: 'center',
  originY: 'center'
});


// adding webcam video element
getUserMedia({video: true}, function getWebcamAllowed(localMediaStream) {
  var Peer = require('simple-peer')
  var peer = new Peer({
    initiator: location.hash === '#init',
    trickle: false,
    stream: localMediaStream
  })
  var ownvideo = document.getElementById('owncam');
  ownvideo.src = window.URL.createObjectURL(localMediaStream);

  canvas.add(owncam);
  owncam.moveTo(0); // move webcam element to back of zIndex stack
  owncam.getElement().play();

  peer.on('signal', function (data) {
    document.getElementById('yourId').value = JSON.stringify(data)
  })

  document.getElementById('connect').addEventListener('click', function () {
    var otherId = JSON.parse(document.getElementById('otherId').value)
    peer.signal(otherId)
  })
  document.getElementById('circle').addEventListener('click', function () {
    var circle = new fabric.fabric.Circle({
      radius: 20, fill: 'green', left: 100, top: 100
    })
    canvas.add(circle).setActiveObject(circle);
  })
  document.getElementById('send').addEventListener('click', function () {
    var yourMessage = document.getElementById('yourMessage').value
    peer.send(yourMessage)
  })

  peer.on('data', function (data) {
    document.getElementById('messages').textContent += data + '\n'
  })

  peer.on('stream', function (stream) {
    var video = document.getElementById('webcam')
    video.src = window.URL.createObjectURL(stream);
    canvas.add(webcam);
    webcam.moveTo(0); // move webcam element to back of zIndex stack
    webcam.getElement().play();
  })

}, function getWebcamNotAllowed(e) {
  // block will be hit if user selects "no" for browser "allow webcam access" prompt
});

// making navigator.getUserMedia cross-browser compatible
function getUserMedia() {
  var userMediaFunc = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
  if (userMediaFunc) userMediaFunc.apply(navigator, arguments);
}

fabric.fabric.util.requestAnimFrame(function render() {
  canvas.renderAll();
  fabric.fabric.util.requestAnimFrame(render);
});
