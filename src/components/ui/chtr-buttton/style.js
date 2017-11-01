
export default (self) => `
  :host {
    display: block;
    overflow: hidden;
  }

  :host input {
    margin: 1em;
    border: none;
    padding: 1em;
    text-transform: uppercase;
    color: var(--white-color);
    background: var(--primary-color);
    border-radius: 4px;
    box-shadow: 1px 3px 3px rgba(0, 0, 0, .3);
  }

  :host input:focus {
    outline: 0;
    background: var(--secondary-color)
  }

  :host input:hover {
    box-shadow: 1px 3px 6px rgba(0, 0, 0, .3);
  }

  :host input:active {
    box-shadow: 1px 3px 1px rgba(0, 0, 0, .3);
  }
`
