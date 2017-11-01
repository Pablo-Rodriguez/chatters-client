
export default (self) => `
  :host {
    display: block;
    background: var(--chtr-label-background, blue);
    padding: var(--chtr-label-padding, 1em);
    padding-top: 0;
    padding-bottom: 0;
    overflow: hidden;
    border-radius: var(--chtr-label-border-radius, 4px);
    box-shadow: 1px 2px 1px rgba(0, 0, 0, .3);
  }

  :host label {
    display: block;
    text-align: center;
    height: 2.5em;
    line-height: 2.5em;
  }

  :host ::slotted(*) {
    margin-bottom: 1em;
  }

  :host ::slotted(*):last-child {
    margin-bottom: 0;
  }
`

