
const size = 2;

export default (self) => `
  :host {
    display: block;
  }

  :host button {
    cursor: pointer;
    color: var(--white-color, white);
    border: none;
    border-radius: 50%;
    width: ${0.9 * size}em;
    height: ${0.9 * size}em;
    line-height: ${0.9 * size}em;
    font-size: ${size}em;
    background: ${background(self)};
    box-shadow: 0 3px 5px rgba(0, 0, 0, .3);
  }

  :host button:hover {
    box-shadow: 0 3px 10px rgba(0, 0, 0, .3);
  }
`

function background (self) {
  return self.error === true ?
    'var(--chtr-fab-error-background)' :
    self.success === true ?
      'var(--chtr-fab-success-background)' :
      'var(--chtr-fab-background)'
}

