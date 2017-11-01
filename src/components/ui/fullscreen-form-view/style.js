
import {phablet, tablet, desktop} from '../../helpers/mediaqueries'

export default (self) => `
  :host {
    display: block;
    min-height: 100vh;
    font-size: 20px;
  }

  :host #solid {
    background-color: var(--primary-color, white);
    color: var(--white-color, white);
    text-align: center;
    padding: 0 1em;
    height: 7em;
    box-sizing: border-box;
    border-bottom: var(--fullscreen-form-view-border-width, 7px) solid var(--secondary-color, orange);
  }

  :host #title {
    padding: 1em 0;
    font-family: var(--secondary-font);
  }

  :host #title ::slotted(*) {
    margin: 0;
  }

  :host #box {
    border: var(--fullscreen-form-view-border-width, 7px) solid transparent;
    border-radius: calc(var(--fullscreen-form-view-border-radius, 4px) + 4px);
    box-sizing: border-box;
    max-width: 800px;
    margin: 0 auto;
    background-color: var(--secondary-color, orange);
    box-shadow: 0px 3px 3px rgba(0, 0, 0, .3);
  }

  :host #box.loading {
    animation: fullscreen-form-view-loading 1.5s linear infinite;
  }

  :host #box > div {
    border-radius: var(--fullscreen-form-view-border-radius, 4px);
    background-color: var(--white-color, white);
  }

  :host #solid > ::slotted(*) {
    margin-top: 1em;
  }

  ${phablet`
    :host {
      font-size: 22px;
    }
  `}

  ${tablet`
    :host {
      font-size: 24px;
    }
  `}

  ${desktop`
    :host {
      font-size: 32px;
    }
  `}

  @keyframes fullscreen-form-view-loading {
    0% {
      background-color: var(--secondary-color);
    }
    50% {
      background-color: var(--primary-color);
    }
    100% {
      background-color: var(--secondary-color);
    }
  }
`
