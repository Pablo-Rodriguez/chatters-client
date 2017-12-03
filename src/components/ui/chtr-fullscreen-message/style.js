
export default (self) => `
  :host {
    display: flex;
    flex: 1;
    background-color: var(--secondary-color);
    font-family: ${self.title ? "var(--secondary-font)" : "var(--primary-font)"};
    align-items: center;
    justify-content: center;
  }

  :host h3 {
    color: var(--light-color);
    font-size: 100px;
    font-weight: normal;
    margin: 0;
  }
`

