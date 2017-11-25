
export default (self) => `
  :host {
    display: block;
  }

  :host span {
    display: block;
    background: var(--chtr-message-background-color, green);
    color: var(--chtr-message-color, white);
    border-radius: var(--chtr-message-border-radius, 4px);
    box-shadow: 1px 2px 1px rgba(0, 0, 0, .3);
    padding: .5em;
  }

  :host([error]) span {
    background: var(--chtr-message-error-background-color, red);
    color: var(--chtr-message-error-color, white);
  }
`
