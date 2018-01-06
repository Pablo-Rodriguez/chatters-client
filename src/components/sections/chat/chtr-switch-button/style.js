
export default (self) => `
  :host {
    display: block;
  }
  
  :host button {
    background: var(--primary-color, white);
    border: none;
    padding: 1em;
    color: var(--white-color);
    width: 5em;
    text-align: center;
  }

  :host #left {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    border: 1px solid var(--white-color);
  }

  :host #right {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    border-left: 1px solid var(--white-color);
  }
`

