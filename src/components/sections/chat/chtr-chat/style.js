
import {desktop} from '../../../helpers/mediaqueries'

export default (self) => `
  :host {
    display: flex;
    margin: 0 auto;
    min-height: 100vh;
    align-items: center;
  }

  :host section {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 85vh;
  }

  ${desktop(`
    :host {
      max-width: 90vw;
      padding: 0 1em;
    }

    :host section {
      flex-direction: row;
      border: 4px solid var(--chtr-chat-border-color);
      border-radius: 4px;
    }
  `)}
`

