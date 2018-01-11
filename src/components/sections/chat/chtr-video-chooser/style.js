
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .6em 1em .5em 1em;
    background: rgba(255, 255, 255, .1);
    z-index: 2;
  }

  :host #fileInput {
    width: 0px;
    height: 0px;
    overflow: hidden;
  }

  :host #fileInput + label {
    display: inline-block;
    background: var(--primary-color);
    padding: 1em;
    color: var(--white-color);
    border-radius: 5px;
    box-shadow: 1px 3px 3px rgba(0, 0, 0, .3);
    cursor: pointer;
  }

  :host chtr-input {
    margin: 0 1em;
  }

  :host chtr-input input {
    max-width: 300px;
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

  :host footer > *, :host header > * {
    flex: 1;
    display: flex;
    justify-content: center;
    margin: 0 .5em;
  }

  :host .media {
    flex: 0;
  }

  :host .left {
    justify-content: flex-start;
  }

  :host .right {
    justify-content: flex-end;
  }

  :host .shrink {
    flex: 0;
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
