
export default (self) => `
  :host {
    display: block;
    color: var(--dark-color);
    list-style: none;
    padding: .7em 1.5em;
    border-bottom: 2px solid var(--primary-color);
    cursor: pointer;
  }

  :host(:hover) {
    background-color: var(--primary-color);
    color: var(--white-color);
  }

  :host(:active) {
    color: var(--dark-color);
    background-color: var(--white-color);
  }

  :host(:last-of-type) {
    border-bottom: none;
  }
`

