
export default (self) => `
  :host {
    width: 100%;
    display: flex;
    align-items: stretch;
    justify-content: stretch;
  }
  
  :host #container {
    width: 100%;
    display: flex;
    align-items: stretch;
    overflow: hidden;
  }

  :host #controls {
    width: 100%;
    position: relative;
    display: flex;
    align-items: stretch;
    justify-content: stretch;
    background: var(--black-color);
  }

  :host header {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 30px;
    background: rgba(255, 255, 255, .3);
    z-index: 2;
  }

  :host chtr-video {
    z-index: 1;
    width: 100%;
    align-self: center;
  }

  :host footer {
    display: flex;
    padding: .5em 1em .6em 1em;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2;
    background: rgba(255, 255, 255, .1);
  }

  :host footer > * {
    flex: 1;
    display: flex;
    justify-content: center;
  }

  :host .right {
    justify-content: flex-end;
  }
`

export const videoStyle = (self) => `
  :host {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: stretch;
    width: 100%;
    height: 100%;
  }

  :host div {
    width: 100% !important;
    height: initial !important;
  }

  :host canvas {
    width: 100% !important;
    height: auto !important;
    margin: auto 0;
    top: 0px;
    bottom: 0px;
  }
`
