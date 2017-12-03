
import {tablet} from '../../../helpers/mediaqueries'

export default (self) => `
  :host {
    flex: 5 1 70%;
    display: flex;
    background: var(--secondary-color);
  }

  :host section {
    display: flex;
    flex: 1;
    align-items: stretch;
    justify-content: stretch;
  }

  :host chtr-fullscreen-message.big {
    height: 30vh;
  }
`

