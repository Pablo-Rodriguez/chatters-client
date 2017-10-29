
import {html} from 'lit-html'

export default html`<style>
  :host {
    display: block;
    width: 100%;
    height: 2px;
    position: relative;
    overflow: hidden;
  }
  :host([hidden]) {
    display: none !important;
  }
  #primary-progress {
    background: var(--progress-bar-color, #37A0CE);
    position:  absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: scaleX(0);
    transform-origin: right center;
    animation: indeterminate-bar var(--progress-bar-duration, 2s) var(--progress-bar-delay, 0s) linear infinite;
  }
  #primary-progress.finished {
    animation: none;
  }
  #primary-progress::after {
    content: "";
    transform-origin: center center;
    animation: indeterminate-splitter var(--progress-bar-duration, 2s) var(--progress-bar-delay, 0s) linear infinite;
  }
  #primary-progress.finished::after {
    animation: none;
  }
  @keyframes indeterminate-bar {
    0% {
      transform: scaleX(1) translateX(-100%);
    }
    50% {
      transform: scaleX(1) translateX(0%);
    }
    75% {
      transform: scaleX(1) translateX(0%);
      animation-timing-function: cubic-bezier(.28,.62,.37,.91);
    }
    100% {
      transform: scaleX(0) translateX(0%);
    }
  }
  @keyframes indeterminate-splitter {
    0% {
      transform: scaleX(.75) translateX(-125%);
    }
    30% {
      transform: scaleX(.75) translateX(-125%);
      animation-timing-function: cubic-bezier(.42,0,.6,.8);
    }
    90% {
      transform: scaleX(.75) translateX(125%);
    }
    100% {
      transform: scaleX(.75) translateX(125%);
    }
  }
</style>`
