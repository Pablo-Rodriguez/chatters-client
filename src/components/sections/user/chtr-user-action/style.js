
export default (self) => `
  :host {
    display: block;
    font-size: 16px;
  }
  
  form {
    padding: 1em 1em 0em 1em;
  }

  ::slotted(chtr-label) {
    margin-bottom: 1em;
  }

  ::slotted(chtr-label:last-of-type) {
    margin-bottom: 0;
  }
`
