
import {desktop} from '../../../helpers/mediaqueries'

export default (self) => `
  :host {
    display: flex;
    justify-content: stretch;
    align-items: stretch;
    flex: 1 1 30%;
    height: 90vh;
  }

  :host section {
    display: flex;
    flex: 1;
    flex-direction: column-reverse;
    justify-content: space-between;
    align-items: stretch;
  }

  ${desktop(`
    :host {
      border-left: 4px solid var(--chtr-chat-aside-border-color);
    }

    :host section {
      flex-direction: column;
    }
  `)}
`

