
import {desktop} from '../../../helpers/mediaqueries'

const border = '4px dashed var(--chtr-chat-input-border-color)'

export default (self) => `
  :host {
    display: block;
    border-bottom: ${border};
  }

  :host div {
    padding: 1em;
  }

  ${desktop(`
    :host {
      border-bottom: none;
      border-top: ${border};
    }  
  `)}
`

